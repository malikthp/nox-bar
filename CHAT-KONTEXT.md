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
| `getraenkekarte.html` | Komplette Getränkekarte, 8 Kategorien/46 Drinks, DE/EN/TR, druckbar |
| `speisekarte.html` | Kleine Speisekarte, 5 Kategorien/17 Gerichte, DE/EN/TR, druckbar |
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
| `assets/NOX-Bar-Wallpaper*.svg/.png` | Wallpaper, u. a. 4K-Version mit NOX BAR / „Die Nacht gehört dir." / „Own the night." nach User-Vorlage |
| `start-server.bat`, `autostart.vbs` | Manueler Start / Windows-Autostart (Verknüpfung liegt im Startup-Ordner) |
| `README.md`, `CHAT-KONTEXT.md` | Doku |

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

## Offene Punkte / Bedarf

- Für echten E-Mail-Versand mit ICS-Anhang: SMTP-Zugangsdaten (z. B. Proton Mail Bridge) in `server/config.js` eintragen.
- Server läuft als Autostart; falls localhost:3000 nicht erreichbar ist: `start-server.bat` doppelklicken.
- Testdaten wurden entfernt, aber die 18 echten Q&A und die 1 Reservierung sind zu erhalten.
- Keine Google-Zugangsdaten mehr nötig.
- **Essen ist bewusst schweinefleischfrei**: kein Pork/Bacon/Speck/Schinken; Wurstplatte
  mit Rinder-Salami und Puten-Schinken, Spieße mit Hähnchen. Bitte so erhalten!
- QR-Codes liegen in `qr/` und zeigen auf `https://nox-kyrenia.netlify.app` (Vorschlag,
  noch nicht veröffentlicht). Ich kann keine Domain registrieren oder hochladen – nur
  vorbereiten. Bei anderer Domain QR-Codes neu erzeugen.
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
