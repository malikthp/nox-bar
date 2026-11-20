# NOX Bar – Design-Paket & Website mit Backend

Alles für die Website der **NOX Bar** (Kyrenia, Nordzypern · Inhaber: Imran Malik)
inklusive Reservierungs-Backend und lernendem Chatbot.

👉 **Für neue Sitzungen: bitte zuerst `CHAT-KONTEXT.md` lesen** – dort steht der
komplette Stand inklusive Entscheidungen, Daten und offenen Punkten.
👉 **Veröffentlichen:** siehe `DEPLOYMENT.md` (Render/Railway, vorbereitet mit
`render.yaml` und `Procfile`).

## ⚠️ Wichtiger Hinweis zu Domain & Veröffentlichung

Ich kann **keine Domain registrieren und die Seite nicht auf einen Server hochladen** –
dafür wären dein Google-/Hosting-Konto und deine Zugangsdaten nötig, die ich nicht habe
und auch nicht entgegennehmen darf. Was ich getan habe:

- QR-Codes für den Vorschlag **`https://nox-kyrenia.netlify.app`** erzeugt (`qr/`-Ordner)
- Alle Dateien sind fertig und können per **Drag & Drop** auf einen kostenlosen
  Hoster hochgeladen werden (z. B. https://app.netlify.com/drop → Ordner hineinziehen).
  Das ergibt kostenlos die Adresse `nox-kyrenia.netlify.app` (oder einen ähnlichen Namen).

**Technische Grenze:** Auf rein statischem Free-Hosting läuft das Node-Backend nicht.
Dann funktionieren Reservierungs-API, freie Slots und Noxi-Lernen nicht – das Formular
fällt automatisch auf `mailto:` zurück. Für volle Funktion braucht es einen Node-Hoster
(z. B. Render/Railway). Sag mir, welchen Weg du gehen willst, dann bereite ich die
Dateien entsprechend vor.

## Schnellstart

```bash
# 1. Server starten (Node.js 18+ reicht, KEIN npm install nötig)
node server/server.js

# 2. Website öffnen
http://localhost:3000

# 3. Admin-Bereich öffnen
http://localhost:3000/admin.html
# Token: nox-admin-2026  (in server/config.js ändern!)
```

### Automatischer Start mit Windows
Im Autostart-Ordner liegt die Verknüpfung **„NOX Bar Server"**. Sie startet beim
Windows-Login unsichtbar über `autostart.vbs` den Server. Manuell geht das gleiche
mit einem Doppelklick auf `start-server.bat`.

`npm start` funktioniert ebenfalls. `nodemailer` in `package.json` ist **optional**
und nur für SMTP nötig – ohne Installation läuft alles über Web3Forms oder den Log-Fallback.

## Farbpalette

| Rolle | Hex |
|---|---|
| Hintergrund | `#0B0720` |
| Flächen | `#25134D` |
| Akzent | `#6A2FCB` |
| Glow | `#9D71E8` |
| Hell | `#D1B8FF` |
| Sehr hell | `#F2E9FF` |
| Gold | `#FFD27A` |

## Dateien

| Datei | Zweck |
|---|---|
| `index.html` | Website (4 Sprachen, Theme-Toggle, Sternenhimmel, Stern-Chatbot mit Reservierungs-Dialog, Glow-Banner) |
| `admin.html` | Admin: Reservierungen, Q&A-Training, Kalender-Download |
| `getraenkekarte.html` | Komplette Getränkekarte: 8 Kategorien, 46 Getränke, DE/EN/TR/RU, druckbar |
| `assets/nox-menu.js` | **Einzige Datenquelle** für Getränke/Preise – wird von Karte UND Noxi geladen |
| `speisekarte.html` | Kleine Speisekarte: 5 Kategorien/17 Gerichte, DE/EN/TR, druckbar |
| `assets/nox-food.js` | Datenquelle für die Speisekarte – wird von Karte UND Noxi geladen |
| `server/server.js` | Backend: API, statisches Hosting, Slot-Verwaltung |
| `server/config.js` | Konfiguration (Port, Token, E-Mail, Kapazität) |
| `server/email.js` | E-Mail-Versand (Web3Forms / SMTP / Log-Fallback) |
| `data/reservations.json` | Gespeicherte Reservierungen (wird automatisch erstellt) |
| `data/chat-learning.json` | Von Noxi gelernte & manuell beigebrachte Fragen/Antworten |
| `data/nox-calendar.ics` | ICS-Kalender aller Reservierungen (automatisch erzeugt) |
| `data/notifications.log` | E-Mail-Fallback, wenn kein Provider konfiguriert ist |
| `assets/NOX-Bar-Wallpaper.svg` | Desktop-Hintergrundbild, 3840 × 2160, skalierbar |
| `assets/NOX-Bar-Wallpaper-Text.svg` | Wallpaper mit NOX BAR + „Die Nacht gehört dir." / „Own the night." |
| `assets/NOX-Bar-Wallpaper-Text.png` | Gleiches Wallpaper als 4K-PNG (3840 × 2160) |
| `assets/NOX-Bar-Wallpaper-iPhone.png/.svg` | iPhone-Wallpaper (1179 × 2556) im NOX-Look |
| `print/*.html` | Flyer (A4), Banner (1000 × 350 mm), Brief, Visitenkarten |
| `signatur/email-signatur.html` | E-Mail-Signatur mit „HTML kopieren" |

## API-Endpunkte

| Methode | Pfad | Beschreibung |
|---|---|---|
| GET | `/api/availability?date=...` | Freie Slots (inkl. Rest-Kapazität, keine Gästedaten) |
| GET | `/api/availability/summary?date=...` | Nur freie Zeiten als Text – bewusst ohne private Inhalte |
| POST | `/api/reservations` | Reservierung anlegen + E-Mail + Kalender |
| POST | `/api/chat/reservation` | Reservierung aus dem Noxi-Chat anlegen |
| POST | `/api/chat/learn` | Neue Frage speichern (Noxi lernt) |
| GET | `/api/chat/match?q=...` | Passende gelernte Antwort finden |
| GET | `/api/admin/data?token=...` | Alle Reservierungen & Fragen |
| POST | `/api/admin/answer?token=...` | Antwort auf offene Frage speichern |
| POST | `/api/admin/qa?token=...` | Frage + Antwort direkt beibringen |
| POST | `/api/admin/qa/update?token=...` | Frage/Antwort bearbeiten |
| POST | `/api/admin/qa/delete?token=...` | Frage/Antwort löschen |
| GET | `/api/admin/calendar.ics?token=...` | ICS-Kalender herunterladen |
| GET | `/api/admin/calendar/status?token=...` | Proton-ICS Status |
| POST | `/api/admin/calendar/test?token=...` | ICS validieren |
| POST | `/api/admin/calendar/sync?token=...` | ICS neu erzeugen |
| POST | `/api/admin/reservations/{code}/cancel?token=...` | Stornieren (Slot wird frei) |

## Proton Calendar

**Wichtig:** Proton Calendar stellt bewusst **keine API und kein CalDAV** bereit
(Ende-zu-Ende-Verschlüsselung). Eine direkte, automatische Beschreibung wie bei
Google ist technisch nicht möglich.

Die Lösung hier: Bei jeder Reservierung wird automatisch eine **ICS-Datei**
erzeugt und **an die Benachrichtigungs-E-Mail angehängt**. In Proton Calendar
(https://calendar.proton.me) kannst du diesen Anhang mit einem Klick importieren.

### So geht's

1. Reservierung eingehen (Formular oder Noxi-Chat).
2. Benachrichtigungs-E-Mail öffnen – enthält `NOX-Bar-<CODE>.ics` als Anhang.
3. Anhang in Proton Calendar importieren.
   Alternativ: Admin → **„📅 ICS herunterladen"** → in Proton unter
   *Einstellungen → Import/Export → Aus ICS importieren* hochladen.

### Admin-Bereich

Unter **„Proton Calendar"** findest du:
- **🔌 ICS prüfen** – validiert die erzeugte Datei
- **📅 ICS herunterladen** – alle Reservierungen als `.ics`
- **🔄 ICS neu erzeugen** – Datei aus aktuellen Reservierungen neu schreiben

### Ohne SMTP konfiguriert

Fällt der E-Mail-Versand auf das Log zurück, liegen die einzelnen ICS-Dateien
zusätzlich unter `data/anhaenge/` – kannst du direkt in Proton importieren.

### Dauerhaft abonnieren (optional)

Proton kann externe Kalender per **Share-Link** abonnieren (nur lesend). Dafür
müsste `data/nox-calendar.ics` öffentlich erreichbar gemacht werden – das wird
hier **bewusst nicht empfohlen**, weil dann Reservierungsdaten einsehbar wären.

## E-Mail-Benachrichtigungen (BCC)

Benachrichtigungen gehen **ausschließlich als BCC** an die hinterlegten Adressen.
Kunden und andere Mitarbeitende sehen dadurch **weder die Empfängerliste noch dass
überhaupt benachrichtigt wurde**. Im `To`-Feld steht nur ein neutraler Platzhalter
(`noreply@nox-kyrenia.com`). Die Chat-Bestätigung sagt deshalb auch nur
„die NOX Bar wurde benachrichtigt".

Mehrere Empfänger kommasepariert setzen:
```bash
NOX_NOTIFICATION_BCC="hello@nox-kyrenia.com,bar@nox-kyrenia.com" node server/server.js
```

Standardmäßig werden Benachrichtigungen in `data/notifications.log` geschrieben.
Für echte E-Mails eine der beiden Optionen in `server/config.js` setzen:

**Option A – Web3Forms (empfohlen, kostenlos, kein npm nötig):**
1. Auf https://web3forms.com/ einen Access Key anfordern.
2. `web3formsKey` in `server/config.js` eintragen ODER Umgebungsvariable setzen:
   ```bash
   WEB3FORMS_KEY=dein-key node server/server.js
   ```

**Option B – SMTP (mit `npm install`, empfohlen für echtes BCC):**
```bash
npm install
SMTP_HOST=smtp.example.com SMTP_PORT=587 SMTP_USER=... SMTP_PASS=... node server/server.js
```
Web3Forms kennt kein BCC und eignet sich daher nur, wenn ein einzelnes Postfach
benachrichtigt werden soll.

## Wie Noxi lernt

1. Gibt es eine Frage, die keiner der Standard-Regeln entspricht, fragt Noxi das
   Backend nach einer gelernten Antwort.
2. Findet sich keine, speichert Noxi die Frage **einmalig pro Sitzung** und meldet
   dir per E-Mail (bzw. Log), dass eine neue Frage dazugekommen ist.
3. Du antwortest in `admin.html` – ab sofort gibt Noxi diese Antwort bei ähnlichen
   Fragen (Stammwörter + Synonym-/Bedeutungsgruppen, Schwelle ≥ 52 %) zurück.
   Antworten erfolgen ohne Hinweis darauf, dass sie „gelernt" wurden.
   Bei Getränke- und gelernten Antworten hängt Noxi eine Rückfrage an
   („Möchtest du einen Blick in unsere komplette Getränkekarte werfen oder
   direkt einen Tisch reservieren?"). Die Chips **📖 Komplette Karte** und
   **📅 Direkt buchen** springen direkt zum jeweiligen Abschnitt.
   Treffer werden mitgezählt.
4. Du kannst Noxi auch **direkt neues Wissen beibringen** (Admin → „Noxi neues
   Wissen beibringen"): Frage, Antwort und Sprache eingeben – sofort verfügbar.
5. Alle Einträge lassen sich im Admin unter **„Noxis gelernte Fragen"** mit
   **✏️ Bearbeiten** (Frage, Antwort, Sprache) und **🗑 Löschen** verwalten.

Bei jedem neuen Q&A und jeder neuen Frage geht eine Benachrichtigung an dich.

## Reservierungen

- Kapazität: **4 Parties pro Slot** (in `server/config.js` änderbar)
- Slots: 17:00 – 04:00, Öffnungszeiten **täglich 17:00 – 05:00**
- Das Formular zeigt nur freie Slots; ausgebuchte sind deaktiviert.
- Jede Reservierung bekommt einen Code (z. B. `NX-A1B2C3D4`).
- **Noxi fragt selbst nach Reservierungen**: auf „Welche Zeiten sind frei?" zeigt
  er nur freie Slots (nie Namen, E-Mails oder Telefonnummern), bietet die Buchung
  an und fragt nacheinander Name, Telefon, E-Mail, Datum, Uhrzeit und Gäste ab.
- Jede Reservierung – ob über Formular oder Chat – landet automatisch im
  **ICS-Kalender** (`admin.html` → „Kalender (ICS)") und löst eine **E-Mail** aus.
- Bei Stornierung im Admin wird der Slot automatisch wieder frei und der Kalender aktualisiert.
- Fällt der Server aus, greift automatisch der `mailto:`-Fallback.

## Speisekarte

Unter `speisekarte.html` liegt die kleine Speisekarte (NOX Black Sliders,
Noxi's Star Nuggets, Nussmischungen, Chips, Käse- & Wurstplatten, After-Hours-
Specials). Sie ist über **Navigation → Speisekarte** und den Noxi-Chip
**🍽 Speisekarte** erreichbar. Datenquelle ist `assets/nox-food.js` – Noxi kennt
deshalb jedes Gericht und antwortet z. B. auf „Was gibt es zu essen?" oder
„Was kostet die Käse- und Wurstplatte groß?" direkt mit Preis und Beschreibung.

## Getränkekarte

Die komplette Karte liegt unter `getraenkekarte.html` und ist von der Homepage
über **Navigation → Getränkekarte**, den Button unter den Signature Drinks und
den Noxi-Chip **📖 Komplette Karte** erreichbar.

- **8 Kategorien / 46 Getränke**, Sprachumschalter **DE / EN / TR**
- Druckbar als A4-PDF (Button „🖨 Drucken / PDF")
- **Preise/Getränke zentral ändern:** in `assets/nox-menu.js` steht bei jedem
  Getränk `price:"…"`. Diese Datei ist die **einzige Datenquelle**: Karte und
  Noxi lesen beide daraus. Nach dem Speichern und Neuladen kennt Noxi automatisch
  alle Änderungen (neue Drinks, neue Preise, neue Beschreibungen).
- Noxi kennt jedes einzelne Getränk: nach z. B. „Was kostet ein Cuba Libre?"
  antwortet er mit Preis und Beschreibung direkt aus der Karte.
- **Preise (2026, an Girne/Kyrenia orientiert):** lokale Biere €4, importierte €6,
  Standard-Cocktails €9–12, Signature/Premium €15–18, Shots €6–8, Mocktails €7,
  Softdrinks €3. Quellen: NightCalc Kyrenia-Index 2026, NeonTrails Girne-Drink-Guide
  2025. Es sind **Richtwerte** – bitte mit deinen tatsächlichen Kassenpreisen abgleichen.

## Drucken / als PDF

HTML-Datei im Browser öffnen → „Als PDF / … drucken" → Ziel „Als PDF speichern".
Wichtig: **Hintergrundgrafiken** in den Druckoptionen aktivieren.

## Aktuelle Inhalte

- Kontakt: hello@nox-kyrenia.com · nox-kyrenia.com · @NOXKyrenia
- Sprachen: Deutsch (Standard), Englisch, Türkisch, Russisch
- Signature Drinks: NOX, Midnight Sun, Electric Violet, Dark Matter, The Last Round
- Events: NOX Nights, Dark Hours, Guest DJ, The Last Round

## Sicherheitshinweis

Vor produktivem Einsatz unbedingt `adminToken` in `server/config.js` ändern und
HTTPS sowie ein echtes E-Mail-Passwort über Umgebungsvariablen bereitstellen.
