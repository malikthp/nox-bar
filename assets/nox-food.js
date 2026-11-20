/* ============================================================
   NOX BAR – Speisekarte (EINZIGE Datenquelle)
   Wird von speisekarte.html UND index.html (Noxi) geladen.
   ============================================================ */
var NOX_FOOD = [
  {
    title:{de:"NOX Signature Snacks",en:"NOX Signature Snacks",tr:"NOX İmza Atıştırmalıkları"},
    items:[
      {name:"NOX Black Sliders",price:"8",desc:{
        de:"Mini-Burger mit Aktivkohle-Brioche, Pulled Beef oder Halloumi, violetter Dip",
        en:"Mini burgers with activated-charcoal brioche, pulled beef or halloumi, purple dip",
        tr:"Aktif kömürlü brioche ile mini burger, pulled beef veya halloumi, mor sos"}},
      {name:"Noxi's Star Nuggets",price:"6",desc:{
        de:"Sternförmige Halloumi- oder Hähnchen-Nuggets mit Flieder-Dip",
        en:"Star-shaped halloumi or chicken nuggets with lavender dip",
        tr:"Yıldız şeklinde halloumi veya tavuk nugget, leylak sos ile"}},
      {name:"Glow-Skewers",price:"7",desc:{
        de:"Kleine Spieße, serviert auf beleuchtetem Teller",
        en:"Small skewers served on a lit plate",
        tr:"Işıklı tabakta servis edilen küçük şişler"}},
      {name:"Electric Jelly Bites",price:"5",desc:{
        de:"Butterfly-Pea-Gelee – wechselt mit Zitrone die Farbe von Violett zu Pink",
        en:"Butterfly pea jelly – changes from violet to pink with lemon",
        tr:"Kelebek bezelyesi jölesi – limonla mor'dan pembeye döner"}}
    ]
  },
  {
    title:{de:"Kleine Köstlichkeiten",en:"Little Bites",tr:"Küçük Lezzetler"},
    items:[
      {name:"Truffle Popcorn",price:"4",desc:{
        de:"Frisch gepoppt mit Trüffelöl und Parmesan",
        en:"Freshly popped with truffle oil and parmesan",
        tr:"Trüffel yağı ve parmesan ile taze patlamış mısır"}},
      {name:"Smoked Olives & Almonds",price:"5",desc:{
        de:"Oliven und Mandeln unter einer Rauchglocke serviert",
        en:"Olives and almonds served under a smoke cloche",
        tr:"Duman kapanı altında servis edilen zeytin ve badem"}},
      {name:"Chili-Lime Watermelon",price:"5",desc:{
        de:"Wassermelonen-Spieße mit Chili, Limette und Feta-Schaum",
        en:"Watermelon skewers with chili, lime and feta foam",
        tr:"Acı biber, limon ve feta köpüğü ile karpuz şişleri"}},
      {name:"Dark Chocolate & Mastic Bites",price:"5",desc:{
        de:"Kleine Pralinen mit zyprischem Mastix und Pistazie",
        en:"Small pralines with Cypriot mastic and pistachio",
        tr:"Kıbrıs mastiği ve fıstıklı küçük pralineler"}}
    ]
  },
  {
    title:{de:"Zum Knabbern",en:"To Nibble",tr:"Atıştırmalık"},
    items:[
      {name:"NOX Nussmischung",price:"5",desc:{
        de:"Geröstete Mandeln, Cashews und Pistazien, leicht gesalzen",
        en:"Roasted almonds, cashews and pistachios, lightly salted",
        tr:"Kavrulmuş badem, kaju ve fıstık, hafif tuzlu"}},
      {name:"Sweet Nut Mix",price:"5",desc:{
        de:"Nussmischung mit Honig und Mastix",
        en:"Nut mix with honey and mastic",
        tr:"Bal ve mastixli kuruyemiş karışımı"}},
      {name:"Chili-Lime Nuts",price:"5",desc:{
        de:"Geröstete Nüsse mit Chili und Limettensalz",
        en:"Roasted nuts with chili and lime salt",
        tr:"Acı biber ve limon tuzlu kavrulmuş kuruyemiş"}},
      {name:"Hausgemachte Chips",price:"4",desc:{
        de:"Kartoffelchips aus dem Haus, Paprika oder Trüffel",
        en:"Homemade potato chips, paprika or truffle",
        tr:"Ev yapımı patates cipsi, biber veya trüffel"}}
    ]
  },
  {
    title:{de:"Käse & Wurst",en:"Cheese & Cold Cuts",tr:"Peynir & Şarküteri"},
    items:[
      {name:"Käse- & Wurstplatte klein",price:"12",desc:{
        de:"Halloumi, gereifter Cheddar, Rinder-Salami, Puten-Schinken, Oliven, Honig & Cracker (für 1–2)",
        en:"Halloumi, aged cheddar, beef salami, turkey ham, olives, honey & crackers (for 1–2)",
        tr:"Halloumi, eskitilmiş cheddar, dana salam, hindi jambon, zeytin, bal ve kraker (1–2 kişi)"}},
      {name:"Käse- & Wurstplatte groß",price:"20",desc:{
        de:"Die große Auswahl für 2–3 Personen",
        en:"The large selection for 2–3 people",
        tr:"2–3 kişilik büyük seçim"}},
      {name:"Halloumi & Hähnchen Spieße",price:"7",desc:{
        de:"Gegrillte Spieße mit Halloumi und Hähnchen, Honig-Dip",
        en:"Grilled skewers with halloumi and chicken, honey dip",
        tr:"Halloumi ve tavuklu ızgara şiş, bal sos ile"}}
    ]
  },
  {
    title:{de:"Erst ab 02:00 Uhr",en:"Only after 02:00",tr:"Sadece 02:00'dan sonra"},
    items:[
      {name:"After-Hours Croissant Sliders",price:"7",desc:{
        de:"Mini-Croissants mit Ei, Hähnchen oder Halloumi – nur in der zweiten Nachthälfte",
        en:"Mini croissants with egg, chicken or halloumi – only in the small hours",
        tr:"Yumurta, tavuk veya halloumi'li mini kruvasan – sadece gece yarısından sonra"}},
      {name:"Midnight Bao Buns",price:"8",desc:{
        de:"Gedämpfte Bao-Buns mit Pulled Chicken oder crispy Halloumi",
        en:"Steamed bao buns with pulled chicken or crispy halloumi",
        tr:"Pulled tavuk veya çıtır halloumi'li buharda bao ekmeği"}}
    ]
  }
];

var NOX_FOOD_STATIC={
  hint:{de:"Preise sind Richtwerte · Änderungen vorbehalten.",en:"Prices are indicative · subject to change.",tr:"Fiyatlar tahimidir · değişiklik yapılabilir."},
  late:{de:"Spätnacht-Spezial: ab 02:00 Uhr",en:"Late-night special: from 02:00",tr:"Gece özeli: 02:00'dan itibaren"}
};
