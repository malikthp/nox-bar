// Proton Calendar Anbindung
// Proton bietet keine API und kein CalDAV (nur ICS-Import / ICS-Abo).
// Deshalb: ICS erzeugen, im Admin zum Download anbieten und als Anhang an die
// Benachrichtigungs-E-Mail hängen – Proton importiert ICS-Anhänge direkt.
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "data", "nox-calendar.ics");

function esc(s) {
  return String(s || "").replace(/([,;\\])/g, "\\$1").replace(/\n/g, "\\n");
}
function stamp(d) {
  return d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function buildICS(list) {
  const events = (list || []).filter((r) => r.status !== "cancelled").map((r) => {
    const [y, m, d] = r.date.split("-").map(Number);
    const [hh, mm] = r.time.split(":").map(Number);
    const start = new Date(Date.UTC(y, m - 1, d, hh, mm));
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    return [
      "BEGIN:VEVENT",
      `UID:${r.code}@nox-kyrenia.com`,
      `DTSTAMP:${stamp(new Date())}`,
      `DTSTART:${stamp(start)}`,
      `DTEND:${stamp(end)}`,
      `SUMMARY:${esc(`NOX Bar – Tisch ${r.code} (${r.guests} Pers.)`)}`,
      `DESCRIPTION:${esc(`Reservierung ${r.code}\\nGast: ${r.name}\\nPersonen: ${r.guests}\\nQuelle: ${r.source || "Website"}`)}`,
      "END:VEVENT"
    ].join("\r\n");
  });

  return [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//NOX Bar//Reservierungen//DE",
    "CALSCALE:GREGORIAN", "METHOD:PUBLISH", ...events, "END:VCALENDAR", ""
  ].join("\r\n");
}

function writeICS(list) {
  fs.mkdirSync(path.dirname(FILE), { recursive: true });
  fs.writeFileSync(FILE, buildICS(list), "utf8");
  return FILE;
}

function readICS() {
  if (!fs.existsSync(FILE)) writeICS([]);
  return fs.readFileSync(FILE, "utf8");
}

function status() {
  const count = (readICS().match(/BEGIN:VEVENT/g) || []).length;
  return {
    provider: "Proton Calendar",
    mode: "ICS",
    enabled: true,
    file: FILE,
    events: count,
    note: "Proton unterstützt keine API/CalDAV. Termine werden als ICS erzeugt und per E-Mail versendet."
  };
}

async function testConnection() {
  const ics = readICS();
  if (!ics.includes("BEGIN:VCALENDAR")) throw new Error("ICS-Datei ungültig");
  return { ok: true, provider: "Proton Calendar", events: (ics.match(/BEGIN:VEVENT/g) || []).length };
}

async function syncAll(list) {
  writeICS(list);
  return { ok: true, synced: (list || []).length };
}

module.exports = { buildICS, writeICS, readICS, status, testConnection, syncAll };
