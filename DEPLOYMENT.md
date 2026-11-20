# NOX Bar – Veröffentlichen (Node-Hoster)

Diese Anleitung führt dich Schritt für Schritt durch das Veröffentlichen.
Ich kann das nicht für dich machen (kein Zugriff auf deine Konten), aber alle
Dateien sind vorbereitet.

## Empfohlen: Render (kostenloser Web Service)

### 1. GitHub-Repository anlegen
1. Auf https://github.com einloggen → **New repository**
2. Name z. B. `nox-bar`, **Public**, ohne README erstellen
3. In das leere Repo alle Projektdateien hochladen:
   - Entweder im Browser über **Add file → Upload files** (gesamten Ordner auswählen)
   - Oder mit Git:
     ```bash
     cd "C:\Users\surfa\Documente\Standardprojekt"
     git init
     git add .
     git commit -m "NOX Bar initial"
     git remote add origin https://github.com/DEINNAME/nox-bar.git
     git push -u origin main
     ```

### 2. Render verbinden
1. https://render.com → Account erstellen/einloggen
2. **New → Web Service** → GitHub-Repo `nox-bar` auswählen
3. Render erkennt `render.yaml` automatisch und übernimmt:
   - Build: `npm install`
   - Start: `node server/server.js`
   - Region: Frankfurt
   - Plan: Free
4. **Create Web Service** klicken

### 3. Wichtige Einstellung danach
Unter **Environment** im Render-Dashboard:
- `NOX_ADMIN_TOKEN` wurde automatisch generiert → **Wert kopieren und sicher aufbewahren**
  (das ist dein neues Admin-Passwort; das lokale `nox-admin-2026` gilt nicht mehr)
- Optional: `WEB3FORMS_KEY` eintragen, damit E-Mails wirklich versendet werden
- Optional: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` für SMTP statt Web3Forms

### 4. Adresse
Danach läuft die Seite z. B. unter:
```
https://nox-bar.onrender.com
```
Die QR-Codes in `qr/` zeigen derzeit auf `nox-kyrenia.netlify.app` – **sag mir deine
echte Render-URL, dann erzeuge ich die QR-Codes neu.**

## Alternative: Railway
1. https://railway.app → Login mit GitHub
2. **New Project → Deploy from GitHub repo**
3. Railway erkennt den `Procfile` (`web: node server/server.js`)
4. Unter **Variables** dieselben Umgebungsvariablen setzen wie oben
5. Unter **Settings → Generate Domain** eine kostenlose URL erzeugen

## ⚠️ Grenzen des kostenlosen „Free Plan"

1. **Temporärer Speicher:** Reservierungen und gelernte Fragen liegen in JSON-Dateien.
   Bei einem Neustart/Redeploy können diese Daten verloren gehen. Für echten
   Dauerbetrieb später eine Datenbank (z. B. Supabase – hat auch einen Free Plan)
   anbinden. Sag mir Bescheid, dann baue ich das um.
2. **Cold Start:** Nach längerer Inaktivität braucht der Free Plan ca. 30–60 Sekunden
   bis zur ersten Antwort. Das ist normal.
3. **E-Mail ohne Key:** Ohne `WEB3FORMS_KEY`/SMTP landen Benachrichtigungen nur in
   `data/notifications.log` – auf dem Hoster ebenfalls nicht dauerhaft. Für echte Mails
   unbedingt einen Provider eintragen.

## Was dann online funktioniert
- ✅ Homepage, Getränkekarte, Speisekarte, 4 Sprachen, Theme, Noxi, QR-Codes
- ✅ Reservierungen mit automatischer Slot-Prüfung und Bestätigungscode
- ✅ Noxi lernt, Admin-Bereich, ICS-Kalender, E-Mail-Benachrichtigung (mit Provider)

## Lokal weiterhin möglich
`start-server.bat` doppelklicken → alles läuft auf `http://localhost:3000`.
