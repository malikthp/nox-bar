// E-Mail-Benachrichtigungen – Web3Forms, SMTP (optional) oder Datei-Fallback
const https = require("https");
const fs = require("fs");
const path = require("path");
const config = require("./config");

const LOG = path.join(__dirname, "..", "data", "notifications.log");

function logFallback(subject, body) {
  fs.mkdirSync(path.dirname(LOG), { recursive: true });
  const line = `\n===== ${new Date().toISOString()} =====\n${subject}\n${body}\n`;
  fs.appendFileSync(LOG, line, "utf8");
  console.log(`[E-Mail-Fallback] ${subject} -> data/notifications.log`);
  return Promise.resolve({ sent: false, provider: "log" });
}

function viaWeb3Forms(subject, body, replyTo) {
  // Web3Forms-Zustellung an das im Dashboard hinterlegte Postfach.
  // Es gibt dort keine echte BCC-Option – deshalb niemals Empfängeradressen
  // im Payload mitschicken. Für echtes BCC SMTP verwenden.
  const payload = JSON.stringify({
    access_key: config.web3formsKey,
    subject: subject,
    from_name: "NOX Bar Assistant",
    reply_to: replyTo || config.notificationTo,
    message: body
  });

  return new Promise((resolve, reject) => {
    const req = https.request(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload),
          "Accept": "application/json"
        }
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            console.log("[E-Mail] Via Web3Forms versendet.");
            resolve({ sent: true, provider: "web3forms", response: data });
          } else {
            reject(new Error(`Web3Forms ${res.statusCode}: ${data}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(payload);
    req.end();
  });
}

async function viaSmtp(subject, body, replyTo, attachment) {
  const nodemailer = require("nodemailer"); // optional
  const { smtp } = config;
  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465,
    auth: smtp.user ? { user: smtp.user, pass: smtp.pass } : undefined
  });
  const mail = {
    from: smtp.from,
    to: config.notificationTo,          // neutraler Platzhalter
    bcc: config.notificationBcc,        // echte Empfänger – für alle unsichtbar
    replyTo: replyTo || config.notificationTo,
    subject,
    text: body
  };
  if (attachment) {
    mail.attachments = [{
      filename: attachment.filename,
      content: attachment.content,
      contentType: "text/calendar"
    }];
  }
  await transporter.sendMail(mail);
  console.log(`[E-Mail] Via SMTP versendet (BCC an ${config.notificationBcc.length} Empfänger).`);
  return { sent: true, provider: "smtp" };
}

async function send(subject, body, replyTo, attachment) {
  if (config.web3formsKey) {
    try { return await viaWeb3Forms(subject, body, replyTo); }
    catch (e) { console.error("[E-Mail] Web3Forms fehlgeschlagen:", e.message); }
  }
  if (config.smtp.host) {
    try { return await viaSmtp(subject, body, replyTo, attachment); }
    catch (e) { console.error("[E-Mail] SMTP fehlgeschlagen:", e.message); }
  }
  if (attachment) {
    // Ohne SMTP: ICS lokal ablegen, damit sie in Proton importiert werden kann
    const fs = require("fs");
    const path = require("path");
    const dir = path.join(__dirname, "..", "data", "anhaenge");
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, attachment.filename), attachment.content, "utf8");
  }
  return logFallback(subject, body + (attachment ? `\n\n📅 Proton-ICS: data/anhaenge/${attachment.filename}` : ""));
}

function reservationMail(r) {
  const subject = `Neue Reservierung NOX Bar – ${r.code} – ${r.date} ${r.time}`;
  const body =
    `Hallo Imran,\n\n` +
    `eine neue Tischreservierung ist eingegangen:\n\n` +
    `Reservierungscode: ${r.code}\n` +
    `Name: ${r.name}\n` +
    `E-Mail: ${r.email}\n` +
    `Telefon: ${r.phone}\n` +
    `Datum: ${r.date}\n` +
    `Uhrzeit: ${r.time} Uhr\n` +
    `Personen: ${r.guests}\n` +
    `Nachricht: ${r.message || "–"}\n\n` +
    `Status: ${r.status}\nErstellt: ${r.createdAt}\n`;
  return { subject, body };
}

function learnedMail(item) {
  const subject = `Noxi hat eine neue Frage gelernt – ${item.question.slice(0, 60)}`;
  const body =
    `Hallo Imran,\n\n` +
    `Noxi konnte folgende Frage noch nicht beantworten und hat sie gespeichert:\n\n` +
    `Frage (${item.lang || "de"}): ${item.question}\n` +
    `Häufigkeit: ${item.asked}x\n` +
    `Zeitpunkt: ${item.createdAt}\n\n` +
    `Antworten kannst du sie im Admin-Bereich: admin.html\n`;
  return { subject, body };
}

module.exports = { send, reservationMail, learnedMail };
