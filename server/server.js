// NOX Bar – schlanker Backend-Server (nur Node-Bordmittel, keine npm-Installation nötig)
// Start: node server/server.js
const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const config = require("./config");
const email = require("./email");
const proton = require("./proton-calendar");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");
const RES_FILE = path.join(DATA, "reservations.json");
const LEARN_FILE = path.join(DATA, "chat-learning.json");
const CAL_FILE = path.join(DATA, "nox-calendar.ics");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".md": "text/markdown; charset=utf-8"
};

/* ---------- Hilfsfunktionen ---------- */
function readJson(file, fallback) {
  try { return JSON.parse(fs.readFileSync(file, "utf8")); }
  catch (e) { return fallback; }
}
function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2), "utf8");
}
function reservations() { return readJson(RES_FILE, { reservations: [] }); }
let DEFAULT_QA = [];
for (const candidate of ["../assets/nox-default-qa", "../nox-default-qa"]) {
  try { DEFAULT_QA = require(candidate); break; }
  catch (e) { /* nächsten Pfad versuchen */ }
}
if (!DEFAULT_QA.length) {
  console.warn("[Warnung] nox-default-qa.js weder in assets/ noch im Root gefunden – Starte ohne Standardwissen.");
}
function learning() {
  const data = readJson(LEARN_FILE, null);
  // Beim ersten Start (oder leerer Datei) das mitgelieferte Standardwissen laden
  if (!data || !data.seeded) {
    const fresh = data || { learned: [] };
    if (!fresh.learned || !fresh.learned.length) {
      fresh.learned = DEFAULT_QA.map((q) => ({ ...q }));
    }
    fresh.seeded = true;
    writeJson(LEARN_FILE, fresh);
    return fresh;
  }
  return data;
}

/* ICS-Kalender aus allen bestätigten Reservierungen erzeugen (Proton-Format) */
function updateCalendar() {
  const list = reservations().reservations.filter((r) => r.status !== "cancelled");
  return proton.writeICS(list);
}

function sendJson(res, status, obj) {
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,DELETE,OPTIONS",
    "Cache-Control": "no-store"
  });
  res.end(JSON.stringify(obj));
}

function body(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (c) => {
      raw += c;
      if (raw.length > 1e6) { reject(new Error("Payload zu groß")); req.destroy(); }
    });
    req.on("end", () => {
      try { resolve(raw ? JSON.parse(raw) : {}); }
      catch (e) { reject(new Error("Ungültiges JSON")); }
    });
    req.on("error", reject);
  });
}

function authorized(url) {
  return url.searchParams.get("token") === config.adminToken;
}

function code() {
  return "NX-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}
function validDate(d) {
  return /^\d{4}-\d{2}-\d{2}$/.test(d) && !isNaN(new Date(d).getTime());
}
const STOPWORDS = new Set([
  "der","die","das","und","ist","ich","du","er","sie","es","ein","eine","einen",
  "mit","auf","für","nicht","habt","habe","kann","wird","was","wie","wo","den",
  "dem","des","zum","zur","gibt","bitte","noch","oder","aber","dann",
  "var","yok","bir","ve","için","ordan","alar","mı","mi","mu",
  "это","для","ная","нии","lich","eine","sind","sich","euer","eure"
]);

// Bedeutung gruppieren – Noxi erkennt so auch anders formulierte Fragen
// und Begriffe aus verschiedenen Sprachen als zusammenhängend.
const CONCEPTS = [
  ["park"],                                             // Parkplatz / parken / Parking / Otopark
  ["vega","vejet"],                                     // vegan / vegetarisch
  ["allerg","alerj"],                                   // Allergien
  ["snack","essen","speis","food","yemek","закус"],      // Essen / Snacks
  ["dres","kleid","kıyaf"],                             // Dresscode
  ["zahl","karte","apple","google","pay","ödeme","оплат"], // Bezahlung
  ["terr","auß","drau","teras","веранд"],                // Terrasse / Außenbereich
  ["hund","dog","köpek","собак"],                       // Hunde
  ["happy","aktio","spezial"],                          // Happy Hour / Aktionen
  ["bier","wein","bira","пив","вино"],                  // Bier / Wein
  ["reserv","tisch","buch","platz","table","book","rezerv","masa","брони","стол"],
  ["zeit","uhr","öffn","stund","saat","часы","врем"],    // Öffnungszeiten
  ["preis","kost","teuer","günst","euro","price","fiyat","цен"],
  ["drink","getr","trink","cockt","içki","напит"],       // Getränke
  ["gebur","feier","party","event","birt","doğu","рожден"] // Geburtstag / Feier
];

function normalize(text) {
  return String(text || "").toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOPWORDS.has(w))
    // Stammwort (erste 4 Zeichen) erkennt z. B. "parken" ~ "Parkplatz"
    .map((w) => w.slice(0, 4));
}

function features(text) {
  const stems = normalize(text);
  const set = new Set(stems);
  stems.forEach((stem) => {
    for (const group of CONCEPTS) {
      if (group.some((g) => stem.startsWith(g) || g.startsWith(stem))) {
        set.add("c:" + group[0]);
        break;
      }
    }
  });
  return set;
}

function similarity(a, b) {
  const A = features(a), B = features(b);
  if (!A.size || !B.size) return 0;
  let common = 0;
  A.forEach((x) => { if (B.has(x)) common++; });
  return common / Math.min(A.size, B.size);
}

/* ---------- Reservierungen ---------- */
function availability(date) {
  if (!validDate(date)) return null;
  const booked = reservations().reservations.filter(
    (r) => r.date === date && r.status !== "cancelled"
  );
  return config.slots.map((slot) => {
    const inSlot = booked.filter((r) => r.time === slot);
    const parties = inSlot.length;
    const seats = inSlot.reduce((sum, r) => sum + Number(r.guests || 0), 0);
    return {
      time: slot,
      free: Math.max(0, config.slotCapacity - parties),
      capacity: config.slotCapacity,
      bookedParties: parties,
      bookedSeats: seats
    };
  });
}

async function createReservation(data) {
  const name = String(data.name || "").trim();
  const mail = String(data.email || "").trim();
  const phone = String(data.phone || "").trim();
  const date = String(data.date || "");
  const time = String(data.time || "");
  const guests = Number(data.guests);
  const message = String(data.message || "").trim();
  const lang = String(data.lang || "de");

  if (!name || !mail || !phone || !validDate(date)) {
    return { error: "Bitte Name, E-Mail, Telefon und Datum angeben.", status: 400 };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)) {
    return { error: "Ungültige E-Mail-Adresse.", status: 400 };
  }
  if (!config.slots.includes(time)) {
    return { error: "Ungültige Uhrzeit.", status: 400 };
  }
  if (!Number.isInteger(guests) || guests < 1 || guests > 10) {
    return { error: "Bitte 1 bis 10 Gäste angeben.", status: 400 };
  }

  const slot = availability(date).find((s) => s.time === time);
  if (!slot || slot.free <= 0) {
    return { error: "Dieser Slot ist leider ausgebucht.", status: 409, availability: availability(date) };
  }

  const db = reservations();
  const r = {
    code: code(), name, email: mail, phone, date, time, guests, message, lang,
    source: data.source || "website",
    status: "confirmed", createdAt: new Date().toISOString()
  };
  db.reservations.push(r);
  writeJson(RES_FILE, db);
  updateCalendar();

  // ICS für Proton Calendar erzeugen und an die Benachrichtigung hängen
  const m = email.reservationMail(r);
  const attachment = {
    filename: `NOX-Bar-${r.code}.ics`,
    content: proton.buildICS([r])
  };
  email.send(m.subject, m.body, r.email, attachment).catch((e) => console.error(e));

  return { status: 201, data: { ok: true, reservation: r, availability: availability(date) } };
}

/* ---------- Chat-Lernen ---------- */
function learnQuestion(data) {
  const question = String(data.question || "").trim();
  if (!question) return { status: 400, error: "Keine Frage angegeben." };
  const db = learning();
  const existing = db.learned.find(
    (i) => normalize(i.question).join(" ") === normalize(question).join(" ")
  );
  if (existing) {
    existing.asked = (existing.asked || 0) + 1;
    writeJson(LEARN_FILE, db);
    return { status: 200, data: { ok: true, learned: false, id: existing.id } };
  }
  const item = {
    id: crypto.randomBytes(4).toString("hex"),
    question,
    lang: String(data.lang || "de"),
    answer: "",
    status: "pending",
    asked: 1,
    hits: 0,
    createdAt: new Date().toISOString()
  };
  db.learned.push(item);
  writeJson(LEARN_FILE, db);

  const m = email.learnedMail(item);
  email.send(m.subject, m.body, config.notificationTo).catch((e) => console.error(e));

  return { status: 201, data: { ok: true, learned: true, id: item.id } };
}

function matchLearned(question) {
  const answered = learning().learned.filter((i) => i.status === "answered" && i.answer);
  let best = null, score = 0;
  for (const item of answered) {
    const s = similarity(question, item.question);
    if (s > score) { score = s; best = item; }
  }
  if (best && score >= 0.52) {
    best.hits = (best.hits || 0) + 1;
    writeJson(LEARN_FILE, learning());
    return { found: true, answer: best.answer, question: best.question, score: Number(score.toFixed(2)) };
  }
  return { found: false };
}

/* ---------- Statische Dateien ---------- */
function serveStatic(req, res, url) {
  let p = decodeURIComponent(url.pathname);
  if (p === "/" || p === "/index.html") p = "/index.html";
  const file = path.join(ROOT, path.normalize(p).replace(/^(\.\.[/\\])+/, ""));
  if (!file.startsWith(ROOT)) { sendJson(res, 403, { error: "Verboten" }); return; }
  fs.stat(file, (err, st) => {
    if (err || !st.isFile()) {
      sendJson(res, 404, { error: "Nicht gefunden" });
      return;
    }
    res.writeHead(200, {
      "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    fs.createReadStream(file).pipe(res);
  });
}

/* ---------- Router ---------- */
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

  if (req.method === "OPTIONS") { sendJson(res, 204, {}); return; }

  try {
    /* Öffentliche API – enthält bewusst KEINE Gäste-, Namen- oder Kontaktdaten */
    if (url.pathname === "/api/availability/summary" && req.method === "GET") {
      const d = url.searchParams.get("date");
      const slots = availability(d);
      if (!slots) return sendJson(res, 400, { error: "Ungültiges Datum" });
      const free = slots.filter((s) => s.free > 0);
      return sendJson(res, 200, {
        date: d,
        freeCount: free.length,
        freeSlots: free.map((s) => s.time),
        note: "Nur freie Zeiten – ohne Namen, E-Mails oder Telefonnummern."
      });
    }

    if (url.pathname === "/api/availability" && req.method === "GET") {
      const a = availability(url.searchParams.get("date"));
      return a ? sendJson(res, 200, { date: url.searchParams.get("date"), slots: a })
               : sendJson(res, 400, { error: "Ungültiges Datum" });
    }

    if (url.pathname === "/api/reservations" && req.method === "POST") {
      const result = await createReservation(await body(req));
      return sendJson(res, result.status, result.data || { error: result.error, availability: result.availability });
    }

    if (url.pathname === "/api/chat/learn" && req.method === "POST") {
      const result = learnQuestion(await body(req));
      return sendJson(res, result.status, result.data || { error: result.error });
    }

    if (url.pathname === "/api/chat/match" && req.method === "GET") {
      return sendJson(res, 200, matchLearned(url.searchParams.get("q") || ""));
    }

    // Reservierung direkt aus dem Chat (Noxi fragt die Daten selbst ab)
    if (url.pathname === "/api/chat/reservation" && req.method === "POST") {
      const payload = await body(req);
      const result = await createReservation({ ...payload, source: "chat" });
      return sendJson(res, result.status, result.data || { error: result.error, availability: result.availability });
    }

    /* Admin-API */
    if (url.pathname === "/api/admin/data" && req.method === "GET") {
      if (!authorized(url)) return sendJson(res, 401, { error: "Nicht autorisiert" });
      return sendJson(res, 200, { reservations: reservations().reservations, learned: learning().learned });
    }

    if (url.pathname === "/api/admin/answer" && req.method === "POST") {
      if (!authorized(url)) return sendJson(res, 401, { error: "Nicht autorisiert" });
      const d = await body(req);
      const db = learning();
      const item = db.learned.find((i) => i.id === d.id);
      if (!item) return sendJson(res, 404, { error: "Frage nicht gefunden" });
      item.answer = String(d.answer || "").trim();
      item.status = item.answer ? "answered" : "pending";
      item.answeredAt = new Date().toISOString();
      writeJson(LEARN_FILE, db);
      return sendJson(res, 200, { ok: true, item });
    }

    if (url.pathname === "/api/admin/qa" && req.method === "POST") {
      if (!authorized(url)) return sendJson(res, 401, { error: "Nicht autorisiert" });
      const d = await body(req);
      const question = String(d.question || "").trim();
      const answer = String(d.answer || "").trim();
      if (!question || !answer) return sendJson(res, 400, { error: "Frage und Antwort nötig" });
      const db = learning();
      const item = {
        id: crypto.randomBytes(4).toString("hex"),
        question, answer, lang: String(d.lang || "de"), status: "answered",
        asked: 0, hits: 0, source: "admin", createdAt: new Date().toISOString(),
        answeredAt: new Date().toISOString()
      };
      db.learned.push(item);
      writeJson(LEARN_FILE, db);
      const m = email.learnedMail({ ...item, question: `NEUES Q&A: ${question}` });
      email.send(m.subject, m.body, config.notificationTo).catch((e) => console.error(e));
      return sendJson(res, 201, { ok: true, item });
    }

    // Frage/Antwort bearbeiten
    if (url.pathname === "/api/admin/qa/update" && req.method === "POST") {
      if (!authorized(url)) return sendJson(res, 401, { error: "Nicht autorisiert" });
      const d = await body(req);
      const db = learning();
      const item = db.learned.find((i) => i.id === d.id);
      if (!item) return sendJson(res, 404, { error: "Eintrag nicht gefunden" });
      if (d.question !== undefined) item.question = String(d.question).trim();
      if (d.answer !== undefined) item.answer = String(d.answer).trim();
      if (d.lang !== undefined) item.lang = String(d.lang);
      if (!item.question || !item.answer) {
        return sendJson(res, 400, { error: "Frage und Antwort dürfen nicht leer sein" });
      }
      item.status = item.answer ? "answered" : "pending";
      item.updatedAt = new Date().toISOString();
      writeJson(LEARN_FILE, db);
      return sendJson(res, 200, { ok: true, item });
    }

    // Frage/Antwort löschen
    if (url.pathname === "/api/admin/qa/delete" && req.method === "POST") {
      if (!authorized(url)) return sendJson(res, 401, { error: "Nicht autorisiert" });
      const d = await body(req);
      const db = learning();
      const index = db.learned.findIndex((i) => i.id === d.id);
      if (index === -1) return sendJson(res, 404, { error: "Eintrag nicht gefunden" });
      const [removed] = db.learned.splice(index, 1);
      writeJson(LEARN_FILE, db);
      return sendJson(res, 200, { ok: true, removed });
    }

    if (url.pathname === "/api/admin/calendar/status" && req.method === "GET") {
      if (!authorized(url)) return sendJson(res, 401, { error: "Nicht autorisiert" });
      return sendJson(res, 200, proton.status());
    }

    if (url.pathname === "/api/admin/calendar/test" && req.method === "POST") {
      if (!authorized(url)) return sendJson(res, 401, { error: "Nicht autorisiert" });
      try { return sendJson(res, 200, await proton.testConnection()); }
      catch (e) { return sendJson(res, 500, { ok: false, error: e.message }); }
    }

    if (url.pathname === "/api/admin/calendar/sync" && req.method === "POST") {
      if (!authorized(url)) return sendJson(res, 401, { error: "Nicht autorisiert" });
      try {
        const list = reservations().reservations;
        const result = await proton.syncAll(list);
        return sendJson(res, 200, result);
      } catch (e) { return sendJson(res, 500, { ok: false, error: e.message }); }
    }

    if (url.pathname === "/api/admin/calendar.ics" && req.method === "GET") {
      if (!authorized(url)) return sendJson(res, 401, { error: "Nicht autorisiert" });
      updateCalendar();
      const ics = proton.readICS();
      res.writeHead(200, {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="nox-bar-reservierungen.ics"',
        "Cache-Control": "no-store"
      });
      return res.end(ics);
    }

    const cancel = url.pathname.match(/^\/api\/admin\/reservations\/([A-Za-z0-9-]+)\/cancel$/);
    if (cancel && req.method === "POST") {
      if (!authorized(url)) return sendJson(res, 401, { error: "Nicht autorisiert" });
      const db = reservations();
      const r = db.reservations.find((x) => x.code === cancel[1]);
      if (!r) return sendJson(res, 404, { error: "Reservierung nicht gefunden" });
      r.status = "cancelled";
      writeJson(RES_FILE, db);
      updateCalendar();
      return sendJson(res, 200, { ok: true, reservation: r });
    }

    serveStatic(req, res, url);
  } catch (e) {
    sendJson(res, 500, { error: e.message || "Serverfehler" });
  }
});

server.listen(config.port, () => {
  console.log(`\n🎧 NOX Bar Server läuft auf http://localhost:${config.port}`);
  console.log(`   Reservierungen: ${RES_FILE}`);
  console.log(`   Chat-Lernen:    ${LEARN_FILE}`);
  console.log(`   Admin:          http://localhost:${config.port}/admin.html`);
  const ps = proton.status();
  console.log(`   Proton Calendar: ${ps.provider} · ICS mit ${ps.events} Terminen (${ps.file})`);
  if (!config.web3formsKey && !config.smtp.host) {
    console.log("   ℹ Kein E-Mail-Provider konfiguriert -> Benachrichtigungen in data/notifications.log");
  }
});
