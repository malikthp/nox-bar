# NOX Bar – Chat-Kontext für neue Sitzungen

Diese Datei enthält den vollständigen Stand der Homepage-Arbeit. Bitte zuerst lesen,
wenn in einem neuen Chat an der NOX-Bar-Website weitergearbeitet wird.

## Grunddaten

- **Projekt:** NOX Bar & Lounge, Kyrenia, Nordzypern
- **Inhaber:** Imran Malik (nach außen im Chat bewusst neutral: „die NOX Bar wurde benachrichtigt")
- **Öffnungszeiten:** täglich **17:00 – 05:00 Uhr** (ursprünglich im Beispiel 20–04, vom User geändert)
- **Kontakt:** hello@nox-kyrenia.com · nox-kyrenia.com · @NOXKyrenia
- **Sprachen:** Deutsch (Standard), Englisch, Türkisch, Russisch
- **Admin-Token:** `nox-admin-2026` (in `server/config.js` änderbar)

## Farbpalette

| Rolle | Hex |
|---|---|
| Hintergrund | `#0B0720` |
| Flächen | `#25134D` |
| Akzent | `#6A2FCB` |
| Glow | `#9D71E8` |
| Hell | `#D1B8FF` |
| Sehr hell | `#F2E9FF` |
| Gold (Banner-Hover) | `#FFD27A` |

## Dateien & Zweck

| Datei | Zweck |
|---|---|
| `index.html` | Homepage: Bebas-Neue-Design (aus User-Beispiel), zentrierte Hero, Theme-Toggle, 4 Sprachen, Sternenhimmel-Canvas, Stern-Chatbot Noxi, Reservierung, Promo-Banner mit goldenem Glow-Hover |
| `getraenkekarte.html` | Komplette Getränkekarte, 8 Kategorien/46 Drinks, DE/EN/TR/RU, druckbar |
| `speisekarte.html` | Kleine Speisekarte, 5 Kategorien/17 Gerichte, DE/EN/TR/RU, druckbar, schweinefleischfrei |
| `assets/nox-food.js` | Datenquelle für Speisen – Karte UND Noxi laden sie (Änderungen wirken auf beide) |
| `assets/nox-menu.js` | **Einzige Datenquelle** für Getränke/Preise – Karte UND Noxi laden diese Datei. Änderungen wirken automatisch auf beide (nach Neuladen). |
| `admin.html` | Admin: Reservierungen anzeigen/stornieren, Q&A hinzufügen/bearbeiten/löschen, Proton-ICS-Verwaltung |
| `server/server.js` | Node-Backend (nur Bordmittel), REST-API, statisches Hosting, Slot-Verwaltung |
| `server/config.js` | Konfiguration (Port 3000, Token, BCC-Empfänger, Kapazität 4 Parties/Slot) |
| `server/email.js` | E-Mail (Web3Forms / SMTP / Log-Fallback), BCC, ICS-Anhang |
| `server/proton-calendar.js` | ICS-Erzeugung für Proton Calendar |
| `data/reservations.json` | Reservierungen (aktuell: 1 Eintrag – nicht löschen!) |
| `data/chat-learning.json` | **18 gelernte Q&A – vom User angelegt, auf jeden Fall erhalten!** |
| `data/nox-calendar.ics` | Gesamt-ICS |
| `data/anhaenge/` | Einzel-ICS pro Reservierung (bei fehlendem SMTP) |
| `print/*.html` | Flyer A4, Banner 1000×350 mm, Brief, Visitenkarten |
| `signatur/email-signatur.html` | E-Mail-Signatur mit Kopier-Funktion |
| `assets/NOX-Bar-Wallpaper*.svg/.png` | Wallpaper: 4K-PC-Version, Text-Version, iPhone-Version (1179×2556), alle im NOX-Look mit NOX BAR / „Die Nacht gehört dir." / „Own the night." |
| `start-server.bat`, `autostart.vbs` | Manueler Start / Windows-Autostart (Verknüpfung liegt im Startup-Ordner) |
| `upload-to-github.ps1` | Lädt alle Dateien per API hoch (Token aus `credentials/github-token.txt`) |
| `token-datei-oeffnen.bat` | Öffnet die Token-Datei in Notepad |
| `README.md`, `CHAT-KONTEXT.md`, `DEPLOYMENT.md` | Doku |

## Wichtige Entscheidungen

- Homepage-Basis war ein vom User geliefertes Beispiel (`Desktop\NOX Project\NOX Webseite\NOX Bar.html`) mit 20–04 Uhr – auf 17–05 umgestellt.
- Chatbot heißt **Noxi**, ist ein **kleiner flauschiger Stern** (nicht zu flauschig!).
- Hintergrund: ganz kleine **Funkelsterne**, aufsteigend, schwingend, drehend, kein Shooting-Star, keine Verbindungslinien mehr, plus sanfte Aurora-Flächen/Glow-Orbs.
- Noxi lernt: unbekannte Fragen → Backend → Admin beantwortet sie → ähnliche Fragen werden erkannt (Stammwörter + Synonymgruppen, Schwelle 52 %). **Antwort ohne Lern-Hinweis.**
- Noxi hängt bei Getränke-/Wissens-Antworten die Rückfrage an: „Möchtest du einen Blick in unsere komplette Getränkekarte werfen oder direkt einen Tisch reservieren?" Chips 📖 Komplette Karte / 📅 Direkt buchen springen zu den Abschnitten.
- Reservierung: Formular **und** geführter Chat-Dialog (Name → Telefon → E-Mail → Datum → Uhrzeit → Personen), landet im ICS und löst BCC-E-Mail aus.
- **Google Kalender wurde verworfen** (User wollte Proton). Proton hat keine API/CalDAV → ICS-Datei wird erzeugt und an die E-Mail angehängt. Google-Dateien wurden gelöscht.
- E-Mail: BCC an `hello@nox-kyrenia.com`, neutraler To-Header. **SMTP ist derzeit nicht konfiguriert** → Nachrichten landen in `data/notifications.log`, ICS in `data/anhaenge/`.
- Wallpaper: keine Bokeh-Kreise, keine Diagonal-Streifen, glatter violetter Verlauf + Sterne, Layout nach User-Bild.

## Live-Betrieb (aktueller Stand!)

- **Live-URL:** `https://nox-bar.onrender.com` – Deploy ist **grün**, API geprüft.
- **GitHub:** `https://github.com/malikthp/nox-bar` (Owner `malikthp`, Branch `main`).
- **Automatisches Hochladen:** `upload-to-github.ps1` lädt alle 31 Dateien per GitHub-API hoch.
  Das Token liegt **lokal** in `credentials/github-token.txt` (nicht im Chat, in `.gitignore`).
  Aufruf: `powershell -ExecutionPolicy Bypass -File .\upload-to-github.ps1`
  Bei 403 fehlten Rechte (Token mit `public_repo` bzw. Contents Read/Write nötig);
  bei 422 war die SHA-Abfrage kaputt (`${api}?ref=${branch}` – ist behoben).
  Nach Upload baut Render automatisch neu.
- **Admin-Token auf Render** ist automatisch generiert und **nicht** `nox-admin-2026`
  (Wert im Render-Dashboard unter Environment kopieren).

## Letzte Änderungen (noch Sichtprüfung auf iPhone offen)

- Getränke- **und** Speisekarte jetzt **DE/EN/TR/RU** (Russisch in `assets/nox-menu.js`
  und `assets/nox-food.js`, Buttons in beiden HTML-Dateien).
- Noxi kennt alle 46 Getränke + 17 Gerichte aus den gemeinsamen Datendateien
  („Was kostet ein Cuba Libre?" / „Was gibt es zu essen?").
- Gold-Glow: **Desktop nur bei Hover**; **Mobile automatisch beim Reinscrollen**
  und verschwindet mit Transition beim Weiter scrollen (`glowObserver` + `.glow-active`).
- „NOX BAR"-Titel ist auf **allen Seiten** ein Link zur Homepage.
- QR-Codes modern, **englische Namen** (HOME / DRINKS MENU / FOOD MENU), keine Icons,
  `qr/qr-codes.html` mit Druckfunktion.
- **Offen:** Datum-Feld auf iPhone war zu breit/zentriert – Fix (-webkit-appearance:none,
  feste Breite, linksbündig) ist hochgeladen; User soll nach ~2–3 Min neu laden und
  ggf. Screenshot schicken.

## Offene Punkte / Bedarf

- Für echten E-Mail-Versand mit ICS-Anhang: SMTP-Zugangsdaten (z. B. Proton Mail Bridge) in `server/config.js` eintragen.
- Server läuft als Autostart; falls localhost:3000 nicht erreichbar ist: `start-server.bat` doppelklicken.
- Testdaten wurden entfernt, aber die 18 echten Q&A und die 1 Reservierung sind zu erhalten.
- Keine Google-Zugangsdaten mehr nötig.
- **Essen ist bewusst schweinefleischfrei**: kein Pork/Bacon/Speck/Schinken; Wurstplatte
  mit Rinder-Salami und Puten-Schinken, Spieße mit Hähnchen. Bitte so erhalten!
- QR-Codes in `qr/` zeigen auf die Live-URL `https://nox-bar.onrender.com`.
  Netlify wurde verworfen (kein Backend möglich). Bei anderer Domain neu erzeugen.
- Node-Hoster vorbereitet: `render.yaml`, `Procfile`, `.gitignore`, `DEPLOYMENT.md`.
  Render generiert einen neuen Admin-Token (nicht mehr `nox-admin-2026`).
  Freier Plan hat temporären Speicher – Daten können bei Redeploy verloren gehen;
  später ggf. Supabase anbinden.

## Start

```bash
node server/server.js
# oder: start-server.bat doppelklicken
# Admin: http://localhost:3000/admin.html  Token: nox-admin-2026
```
