// NOX Bar – Serverkonfiguration
// Passe die Werte an oder setze Umgebungsvariablen beim Start.
module.exports = {
  port: Number(process.env.PORT || 3000),

  // Empfänger der Benachrichtigungen – werden ausschließlich als BCC gesetzt,
  // damit kein Kunde und keine andere Person die Empfängerliste sehen kann.
  ownerEmail: process.env.NOX_OWNER_EMAIL || "hello@nox-kyrenia.com",
  notificationBcc: (process.env.NOX_NOTIFICATION_BCC || "hello@nox-kyrenia.com")
    .split(",").map((s) => s.trim()).filter(Boolean),
  // Neutraler To-Header (kein echter Empfänger sichtbar)
  notificationTo: process.env.NOX_NOTIFICATION_TO || "noreply@nox-kyrenia.com",

  // Token für den Admin-Bereich (admin.html) – unbedingt ändern!
  adminToken: process.env.NOX_ADMIN_TOKEN || "nox-admin-2026",

  // Web3Forms Access Key (kostenlos): https://web3forms.com/
  // Leer lassen -> E-Mails werden in data/notifications.log geschrieben.
  web3formsKey: process.env.WEB3FORMS_KEY || "",

  // Optional: SMTP statt Web3Forms (nodemailer muss installiert sein)
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.SMTP_FROM || "NOX Bar <hello@nox-kyrenia.com>"
  },

  // Reservierungs-Kapazität
  slotCapacity: Number(process.env.NOX_SLOT_CAPACITY || 4), // Parties pro Slot

  // Öffnungszeiten: täglich 17:00 – 05:00
  slots: ["17:00","18:00","19:00","20:00","21:00","22:00","23:00",
          "00:00","01:00","02:00","03:00","04:00"]
};
