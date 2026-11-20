/* ============================================================
   NOX BAR – Getränkekarte (EINZIGE Datenquelle)
   Diese Datei wird von getraenkekarte.html UND index.html (Noxi) geladen.
   Änderungen an Getränken oder Preisen wirken daher sofort auf beide.
   Preise ohne €-Zeichen angeben.
   ============================================================ */
var NOX_MENU = [
  {
    title:{de:"Signature Cocktails",en:"Signature Cocktails",tr:"İmza Kokteyller"},
    items:[
      {name:"NOX", price:"16", badge:"Signature", desc:{
        de:"Schwarze Johannisbeere · Premium Vodka · Aktivkohle · Zitrus",
        en:"Blackcurrant · premium vodka · activated charcoal · citrus",
        tr:"Kara frenk üzümü · premium votka · aktif kömür · narenciye"}},
      {name:"Midnight Sun", price:"16", desc:{
        de:"Bourbon · Karamellsirup · Cold Brew Espresso · Vanille",
        en:"Bourbon · caramel syrup · cold brew espresso · vanilla",
        tr:"Bourbon · karamel şurubu · soğuk espresso · vanilya"}},
      {name:"Electric Violet", price:"15", desc:{
        de:"Premium Gin · Butterfly Pea Flower Tea · Zitrone · Tonic",
        en:"Premium gin · butterfly pea flower tea · lemon · tonic",
        tr:"Premium cin · kelebek bezelyesi çayı · limon · tonik"}},
      {name:"Dark Matter", price:"16", desc:{
        de:"Mezcal · Schwarzes Sesam-Orgeat · Chili · Limette · Agave",
        en:"Mezcal · black sesame orgeat · chili · lime · agave",
        tr:"Mezcal · siyah susam orgeatı · acı biber · misket limonu · agave"}},
      {name:"The Last Round", price:"18", desc:{
        de:"Single Malt Whisky. Auf Eis. Keine Erklärung nötig.",
        en:"Single malt whisky. On the rocks. No explanation needed.",
        tr:"Tek malt viski. Buzlu. Açıklamaya gerek yok."}}
    ]
  },
  {
    title:{de:"Klassische Cocktails",en:"Classic Cocktails",tr:"Klasik Kokteyller"},
    items:[
      {name:"Mojito",price:"10",desc:{de:"Weißer Rum · Limette · Minze · Zucker · Soda",en:"White rum · lime · mint · sugar · soda",tr:"Beyaz rom · limon · nane · şeker · soda"}},
      {name:"Negroni",price:"11",desc:{de:"Gin · Campari · Roter Vermouth",en:"Gin · Campari · sweet red vermouth",tr:"Cin · Campari · kırmızı vermut"}},
      {name:"Old Fashioned",price:"11",desc:{de:"Bourbon · Zucker · Bitters · Orange",en:"Bourbon · sugar · bitters · orange",tr:"Bourbon · şeker · bitters · portakal"}},
      {name:"Margarita",price:"10",desc:{de:"Tequila · Triple Sec · Limette · Salzrand",en:"Tequila · triple sec · lime · salt rim",tr:"Tequila · triple sec · limon · tuz kenarı"}},
      {name:"Daiquiri",price:"10",desc:{de:"Weißer Rum · Limette · Zuckersirup",en:"White rum · lime · simple syrup",tr:"Beyaz rom · limon · şeker şurubu"}},
      {name:"Espresso Martini",price:"12",desc:{de:"Wodka · Kahlúa · frischer Espresso",en:"Vodka · Kahlúa · fresh espresso",tr:"Votka · Kahlúa · taze espresso"}},
      {name:"Aperol Spritz",price:"10",desc:{de:"Aperol · Prosecco · Soda · Orange",en:"Aperol · Prosecco · soda · orange",tr:"Aperol · Prosecco · soda · portakal"}},
      {name:"Pina Colada",price:"11",desc:{de:"Rum · Kokos · Ananas",en:"Rum · coconut · pineapple",tr:"Rom · hindistan cevizi · ananas"}}
    ]
  },
  {
    title:{de:"Longdrinks & Highballs",en:"Long Drinks & Highballs",tr:"Longdrink & Highball"},
    items:[
      {name:"Gin Tonic",price:"9",desc:{de:"Premium Gin · Tonic · Zitrone oder Limette",en:"Premium gin · tonic · lemon or lime",tr:"Premium cin · tonik · limon"}},
      {name:"Vodka Energy",price:"9",desc:{de:"Vodka · Energy Drink · Limette",en:"Vodka · energy drink · lime",tr:"Votka · enerji içeceği · limon"}},
      {name:"Whisky Cola",price:"10",desc:{de:"Whisky · Cola · Zitrone",en:"Whisky · cola · lemon",tr:"Viski · kola · limon"}},
      {name:"Rum Cola",price:"9",desc:{de:"Rum · Cola · Limette",en:"Rum · cola · lime",tr:"Rom · kola · limon"}},
      {name:"Cuba Libre",price:"9",desc:{de:"Rum · Cola · Limette · Eis",en:"Rum · cola · lime · ice",tr:"Rom · kola · limon · buz"}},
      {name:"Moscow Mule",price:"10",desc:{de:"Vodka · Ginger Beer · Limette",en:"Vodka · ginger beer · lime",tr:"Votka · zencefil birası · limon"}}
    ]
  },
  {
    title:{de:"Biere",en:"Beers",tr:"Biralar"},
    items:[
      {name:"Efes (0,33 l)",price:"4",desc:{de:"Türkisches Pils, moderat gekühlt",en:"Turkish pilsner",tr:"Türk pilsener"}},
      {name:"Bomonti (0,33 l)",price:"4",desc:{de:"Türkisches Lager",en:"Turkish lager",tr:"Türk lager"}},
      {name:"Corona (0,33 l)",price:"6",desc:{de:"Mit Limette",en:"With lime",tr:"Limonlu"}},
      {name:"Heineken (0,33 l)",price:"6",desc:{de:"Internationales Lager",en:"International lager",tr:"Uluslararası lager"}},
      {name:"Draft Beer (0,5 l)",price:"5",desc:{de:"Fassbier vom Zapfhahn",en:"Draft beer on tap",tr:"Fıçı birası"}}
    ]
  },
  {
    title:{de:"Weine & Prosecco",en:"Wines & Prosecco",tr:"Şarap & Prosecco"},
    items:[
      {name:"Hauswein rot (Glas)",price:"7",desc:{de:"Auswahl des Hauses",en:"House red, by the glass",tr:"Ev kırmızı şarabı, bardakta"}},
      {name:"Hauswein weiß (Glas)",price:"7",desc:{de:"Auswahl des Hauses",en:"House white, by the glass",tr:"Ev beyaz şarabı, bardakta"}},
      {name:"Rosé (Glas)",price:"7",desc:{de:"Kühl und fruchtig",en:"Chilled and fruity",tr:"Soğuk ve meyvemsi"}},
      {name:"Prosecco (Glas)",price:"8",desc:{de:"Italienischer Sekt",en:"Italian sparkling wine",tr:"İtalyan köpüklü şarap"}},
      {name:"Prosecco (Flasche)",price:"28",desc:{de:"0,75 l",en:"750 ml",tr:"0,75 l"}},
      {name:"Rotwein (Flasche)",price:"30",desc:{de:"0,75 l · Auswahl des Hauses",en:"750 ml · house selection",tr:"0,75 l · ev seçimi"}}
    ]
  },
  {
    title:{de:"Shots",en:"Shots",tr:"Shotlar"},
    items:[
      {name:"Kamikaze",price:"6",desc:{de:"Wodka · Triple Sec · Limette",en:"Vodka · triple sec · lime",tr:"Votka · triple sec · limon"}},
      {name:"B-52",price:"7",desc:{de:"Kahlúa · Baileys · Grand Marnier",en:"Kahlúa · Baileys · Grand Marnier",tr:"Kahlúa · Baileys · Grand Marnier"}},
      {name:"Tequila",price:"6",desc:{de:"Mit Salz und Limette",en:"With salt and lime",tr:"Tuz ve limon ile"}},
      {name:"Jägermeister",price:"7",desc:{de:"Gut gekühlt",en:"Well chilled",tr:"Soğuk servis"}},
      {name:"Sambuca",price:"7",desc:{de:"Mit oder ohne Kaffeebohne",en:"With or without coffee bean",tr:"Kahve çekirdeği ile/olmadan"}},
      {name:"NOX Shot",price:"8",desc:{de:"Hausspezialität · geheim",en:"House special · secret recipe",tr:"Ev özeli · gizli tarif"}}
    ]
  },
  {
    title:{de:"Alkoholfrei & Mocktails",en:"Alcohol-Free & Mocktails",tr:"Alkolsüz & Mocktail"},
    items:[
      {name:"Virgin Mojito",price:"7",desc:{de:"Limette · Minze · Zucker · Soda",en:"Lime · mint · sugar · soda",tr:"Limon · nane · şeker · soda"}},
      {name:"Virgin Piña Colada",price:"7",desc:{de:"Kokos · Ananas",en:"Coconut · pineapple",tr:"Hindistan cevizi · ananas"}},
      {name:"Electric Free",price:"7",desc:{de:"Butterfly Pea · Zitrone · Tonic",en:"Butterfly pea · lemon · tonic",tr:"Kelebek bezelyesi · limon · tonik"}},
      {name:"Sunset Mocktail",price:"7",desc:{de:"Orange · Grenadine · Soda",en:"Orange · grenadine · soda",tr:"Portakal · grenadin · soda"}},
      {name:"Eistee",price:"4",desc:{de:"Hausgemacht · Pfirsich oder Zitrone",en:"Homemade · peach or lemon",tr:"Ev yapımı · şeftali veya limon"}},
      {name:"Mineralwasser / Säfte",price:"3",desc:{de:"0,33 l · verschiedene Sorten",en:"330 ml · various",tr:"0,33 l · çeşitli"}}
    ]
  },
  {
    title:{de:"Kaffee & Digestif",en:"Coffee & Digestif",tr:"Kahve & Digestif"},
    items:[
      {name:"Espresso",price:"3",desc:{de:"Doppelter Espresso",en:"Double espresso",tr:"Çift espresso"}},
      {name:"Irish Coffee",price:"11",desc:{de:"Kaffee · Irish Whiskey · Sahne",en:"Coffee · Irish whiskey · cream",tr:"Kahve · Irish viski · krema"}},
      {name:"Single Malt Whisky",price:"15",desc:{de:"Verschiedene Sorten · auf Anfrage",en:"Various · ask for selection",tr:"Çeşitli · sorunuz"}},
      {name:"Baileys",price:"9",desc:{de:"Auf Eis oder im Kaffee",en:"On the rocks or in coffee",tr:"Buzlu veya kahveli"}}
    ]
  }
];

var NOX_MENU_STATIC={
  slogan:{de:"Die Nacht gehört dir. · <em>Own the night.</em>",en:"The night belongs to you. · <em>Own the night.</em>",tr:"Gece sana ait. · <em>Own the night.</em>"},
  hours:{de:"Täglich 17:00 – 05:00 Uhr",en:"Daily 17:00 – 05:00",tr:"Her gün 17:00 – 05:00"},
  owner:{de:"Inhaber: Imran Malik",en:"Owner: Imran Malik",tr:"İşletmeci: Imran Malik"},
  hint:{de:"Preise sind Richtwerte · Änderungen vorbehalten.",en:"Prices are indicative · subject to change.",tr:"Fiyatlar tahimidir · değişiklik yapılabilir."}
};
