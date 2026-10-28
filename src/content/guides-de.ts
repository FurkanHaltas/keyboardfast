import type { ArticleSet } from "./guides";

/** German translation of the about page and guides. */
export const de: ArticleSet = {
  about: {
    slug: "about",
    title: "Über keyboardfast",
    description:
      "keyboardfast ist ein kostenloser Tipptest in sechs Sprachen mit Code-Modus, ehrlichen Statistiken und einem Übungsmodus, der gezielt deine schwachen Tasten trainiert.",
    minutes: 2,
    sections: [
      {
        heading: "Was keyboardfast ist",
        body: [
          "keyboardfast ist ein Tipptest für alle, die wirklich besser werden wollen, statt nur eine Zahl zu sehen. Du kannst dich auf Englisch, Türkisch, Deutsch, Spanisch, Französisch und Portugiesisch testen oder echten Code in acht Programmiersprachen tippen.",
          "Jedes Ergebnis zeigt mehr als die Geschwindigkeit: Genauigkeit, Konstanz, ein Diagramm Sekunde für Sekunde, die Tasten, die dich gebremst haben, und wie du Buchstaben im Vergleich zu Symbolen tippst.",
        ],
      },
      {
        heading: "Was es anders macht",
        body: [
          {
            list: [
              "Übung, die sich an dich anpasst – nach ein paar Tests weiß keyboardfast, welche Buchstaben und Buchstabenpaare dich am meisten kosten, und baut den Übungstext um sie herum.",
              "Eine Tastatur-Heatmap in deinem eigenen Layout (QWERTZ, türkisches Q, AZERTY und mehr), damit du deine Schwachstellen auf einen Blick siehst.",
              "Eine faire Bestenliste – jedes gewertete Ergebnis wird auf unserem Server nachgespielt und geprüft, damit Skripte und Kopieren-Einfügen nicht auf die Liste kommen.",
              "Ein Code-Modus für Entwickler mit automatischer Einrückung, damit du die Zeichen übst, auf die es ankommt.",
              "Datenschutz zuerst – für Tests brauchst du kein Konto, und du kannst deine Daten jederzeit herunterladen oder löschen.",
            ],
          },
        ],
      },
      {
        heading: "Wer dahintersteht",
        body: [
          "keyboardfast ist ein unabhängiges Projekt von Furkan Haltas, einem Softwareentwickler aus der Türkei. Es begann als Vorhaben, eine schnelle, sorgfältig gestaltete Web-App von Anfang bis Ende selbst zu bauen – von der Tipp-Engine bis zum Server, auf dem sie läuft – und einen Tipptest zu schaffen, der seine Nutzer respektiert.",
          "Ideen, Fehlerberichte und Feedback sind jederzeit willkommen – über den Kontaktlink unten auf jeder Seite.",
        ],
      },
    ],
  },
  guides: [
    {
      slug: "what-is-wpm",
      title: "Was WPM bedeutet und wie Tippgeschwindigkeit gemessen wird",
      description:
        "Wörter pro Minute, Brutto- und Nettogeschwindigkeit, Genauigkeit und Konstanz erklärt – und was eine gute Tippgeschwindigkeit ist.",
      minutes: 5,
      sections: [
        {
          heading: "Ein „Wort“ sind fünf Zeichen",
          body: [
            "Tipptests zählen keine echten Wörter, denn sonst wären „ab“ und „Donaudampfschifffahrt“ gleich viel wert. Stattdessen zählen je fünf Zeichen – einschließlich Leerzeichen und Satzzeichen – als ein Wort. 250 Zeichen in einer Minute ergeben also 50 Wörter pro Minute (WPM), egal welche Wörter es waren.",
            "Dieser Standard macht Ergebnisse zwischen Sprachen und Texten vergleichbar. Sprachen mit langen Wörtern und vielen Sonderzeichen wie Deutsch oder Türkisch fühlen sich trotzdem meist etwas langsamer an.",
          ],
        },
        {
          heading: "Netto- und Bruttogeschwindigkeit",
          body: [
            "keyboardfast zeigt zwei Geschwindigkeiten. Die Bruttogeschwindigkeit zählt jede gedrückte Taste, ob richtig oder falsch. Die Nettogeschwindigkeit – die große WPM-Zahl – zählt nur die Zeichen korrekt getippter Wörter. Tippst du schnell, lässt aber Fehler stehen, wächst der Abstand zwischen beiden.",
            "Im Alltag zählt die Nettogeschwindigkeit: Ein schneller, aber fehlerhafter Absatz muss trotzdem korrigiert werden. Ein kleiner Abstand zwischen Brutto und Netto ist ein Zeichen für sauberes Tippen.",
          ],
        },
        {
          heading: "Genauigkeit und Konstanz",
          body: [
            "Die Genauigkeit ist der Anteil korrekter Tastenanschläge. Auch korrigierte Fehler zählen dagegen, denn du hast Zeit damit verbracht, sie zu machen und zu beheben. Über 95 % ist ein solides Ziel; die Besten bleiben meist über 97 %.",
            "Die Konstanz zeigt, wie gleichmäßig deine Geschwindigkeit während des Tests war. Ein ruhiger Rhythmus bringt einen hohen Wert, Sprints und Pausen einen niedrigen. Wer gleichmäßig tippt, verbessert sich meist schneller, weil die Geschwindigkeit nicht davon abhängt, ob der Text zufällig leicht ist.",
          ],
        },
        {
          heading: "Was ist eine gute Tippgeschwindigkeit?",
          body: [
            "Grobe Bereiche für die Nettogeschwindigkeit bei Alltagstext:",
            {
              list: [
                "Unter 30 WPM – Adlersuchsystem oder ganz am Anfang.",
                "30–45 WPM – etwa der Durchschnitt von Erwachsenen, die regelmäßig tippen.",
                "45–65 WPM – bequem und produktiv; genug für die meiste Büroarbeit.",
                "65–90 WPM – schnell; typisch für erfahrene Zehnfingerschreiber.",
                "Über 100 WPM – außergewöhnlich; nur wenige erreichen das mit gezieltem Training.",
              ],
            },
            "Kürzere Tests liefern höhere Werte, denn einen Sprint hält man 15 Sekunden durch, aber nicht zwei Minuten. Vergleiche dich mit deinen eigenen Ergebnissen im selben Modus – genau das macht die Fortschrittsseite.",
          ],
        },
        {
          heading: "Zu einem verlässlichen Wert kommen",
          body: [
            "Mach mehrere Tests und schau auf deinen Durchschnitt statt auf den besten Lauf. Nimm den 60-Sekunden-Test für einen realistischen Wert, lass Satzzeichen und Zahlen aus, wenn du dich mit anderen vergleichst, und teste in der Sprache, in der du im Alltag wirklich tippst.",
          ],
        },
      ],
    },
    {
      slug: "how-to-type-faster",
      title: "Schneller tippen: ein praktischer Plan",
      description:
        "Ein realistischer Weg Schritt für Schritt zu mehr Tippgeschwindigkeit: zuerst Genauigkeit, kurzes tägliches Üben, schwache Tasten gezielt trainieren und Plateaus überwinden.",
      minutes: 6,
      sections: [
        {
          heading: "Langsamer werden, um schneller zu werden",
          body: [
            "Der häufigste Fehler ist, in einem Tempo zu üben, bei dem man viele Fehler macht. Jeder korrigierte Fehler kostet mehr Zeit, als das Zeichen sorgfältig zu tippen, und wiederholte Fehler trainieren deine Finger darauf, sie erneut zu machen.",
            "Ziele zuerst auf 96–98 % Genauigkeit. Fällst du darunter, nimm Tempo raus, bis die Fehler verschwinden, und lass die Geschwindigkeit von selbst steigen. Ein, zwei Wochen fühlt sich das langsam an – dann zahlt es sich aus.",
          ],
        },
        {
          heading: "Auf den Bildschirm schauen, nicht auf die Tastatur",
          body: [
            "Der Blick nach unten unterbricht den Lesefluss und begrenzt deine Geschwindigkeit auf etwa 40 WPM. Schaust du noch auf die Tasten, ist das Zehnfingersystem die größte Verbesserung, die du machen kannst – siehe unseren Ratgeber zu Grundreihe und Fingerhaltung.",
          ],
        },
        {
          heading: "Wenig, aber oft üben",
          body: [
            "Fünfzehn konzentrierte Minuten am Tag sind besser als zwei Stunden am Sonntag. Tippen ist eine motorische Fähigkeit, und motorische Fähigkeiten festigen sich zwischen den Übungen, besonders im Schlaf. Eine gute Routine:",
            {
              list: [
                "2–3 Aufwärmtests in lockerem Tempo.",
                "5–10 Minuten Übungsmodus auf deinen schwachen Tasten.",
                "2–3 Tests in deinem normalen Tempo, um den Fortschritt zu messen.",
              ],
            },
          ],
        },
        {
          heading: "Zuerst die schwachen Tasten",
          body: [
            "Die meisten verlieren den Großteil ihrer Zeit an einer Handvoll Buchstaben und Buchstabenpaaren. keyboardfast erfasst, wie oft du jede Taste verfehlst und wie lange du dafür brauchst, und zeigt das als Heatmap auf der Ergebnis- und der Fortschrittsseite.",
            "Der Übungsmodus baut Text aus echten Wörtern, die genau diese Tasten enthalten. So bekommst du viel mehr Wiederholungen von dem, was dich bremst – ohne sinnlose Buchstabenfolgen zu tippen.",
          ],
        },
        {
          heading: "Vorauslesen und im Rhythmus bleiben",
          body: [
            "Schnelle Tipper lesen ein, zwei Wörter voraus, sodass ihre Finger nie auf das nächste Wort warten müssen. Halte den Blick leicht vor dem Cursor und tippe gleichmäßig, statt bei leichten Wörtern zu hetzen und bei schweren zu stocken. Der Konstanzwert zeigt, wie gut das klappt.",
          ],
        },
        {
          heading: "Über ein Plateau hinauskommen",
          body: [
            "Jeder bleibt irgendwann stecken. Bewegt sich dein Durchschnitt ein paar Wochen nicht, ändere etwas: einen längeren Test, Satzzeichen einschalten, in einer anderen Sprache oder im Code-Modus üben oder ein paar bewusst langsame, fehlerfreie Tests machen. Abwechslung zwingt deine Finger, sich nicht auf Gewohnheiten zu verlassen, die nur bei einer Art von Text funktionieren.",
          ],
        },
        {
          heading: "Auf den Körper achten",
          body: [
            "Sitz mit lockeren Schultern, die Unterarme etwa auf Höhe der Tastatur, die Handgelenke schwebend statt fest auf dem Tisch. Anspannung macht langsamer und kann auf Dauer wehtun. Mach eine kurze Pause, sobald sich deine Hände müde anfühlen.",
          ],
        },
      ],
    },
    {
      slug: "touch-typing",
      title: "Zehnfingersystem: Grundreihe und Fingerhaltung",
      description:
        "Lerne das Zehnfingersystem Schritt für Schritt: wo deine Finger liegen, welcher Finger welche Taste drückt und wie du umsteigst, ohne an Produktivität zu verlieren.",
      minutes: 6,
      sections: [
        {
          heading: "Was das Zehnfingersystem ist",
          body: [
            "Beim Zehnfingersystem tippst du, ohne auf die Tastatur zu schauen, und jeder Finger ist für seine eigene Tastengruppe zuständig. Deine Finger lernen, wo die Tasten liegen, und deine Augen bleiben beim Text. Fast alle schnellen Tipper schreiben so.",
          ],
        },
        {
          heading: "Die Grundreihe",
          body: [
            "Deine Finger ruhen auf der mittleren Buchstabenreihe und kehren nach jedem Anschlag dorthin zurück. Auf der deutschen QWERTZ-Tastatur liegt die linke Hand auf A S D F und die rechte auf J K L Ö. Die Tasten F und J haben kleine Erhebungen, damit du die Position ohne Hinsehen findest.",
            "Auf der englischen QWERTY-Tastatur ist es A S D F / J K L und die Taste danach, auf der türkischen Q-Tastatur A S D F / J K L Ş und auf der französischen AZERTY-Tastatur Q S D F / J K L M.",
          ],
        },
        {
          heading: "Welcher Finger drückt welche Taste",
          body: [
            "Jeder Finger deckt eine schräge Spalte über und unter seiner Grundtaste ab:",
            {
              list: [
                "Die Zeigefinger leisten die meiste Arbeit: Jeder deckt zwei Spalten ab – links F, G, R, T, V, B, rechts J, H, U, Z, N, M.",
                "Die Mittelfinger decken die Spalten D und K ab (E, C und I, Komma).",
                "Die Ringfinger decken die Spalten S und L ab (W, X und O, Punkt).",
                "Die kleinen Finger decken A, Y und alles rechts der rechten Grundtasten ab (P, Ü, Ö, Ä, ß, Bindestrich) sowie Umschalt, Eingabe und Rücktaste.",
                "Die Daumen drücken die Leertaste – meist der Daumen der Hand, die den letzten Buchstaben nicht getippt hat.",
              ],
            },
            "Auf QWERTZ liegen die Umlaute Ü, Ö und Ä alle am rechten Rand, sodass dein rechter kleiner Finger mehr arbeitet als im Englischen. Erscheinen diese Tasten auf deiner Heatmap rot, ist das der Grund.",
          ],
        },
        {
          heading: "So lernst du es",
          body: [
            {
              list: [
                "Fang langsam und genau an; 15–20 WPM ohne Hinsehen sind ein gutes erstes Ziel.",
                "Schau nicht nach unten. Wenn du musst, schau lieber auf den Bildschirm, um zu sehen, was du getippt hast.",
                "Übe jeden Tag 15–20 Minuten statt in langen Sitzungen.",
                "Nutze den Übungsmodus, sobald du ein paar Tests hast – er bringt dich auf die Tasten, die du meidest.",
              ],
            },
          ],
        },
        {
          heading: "Rechne mit einer vorübergehenden Verlangsamung",
          body: [
            "Wenn du schon mit ein paar Fingern tippst, wirst du beim Umstieg eine Weile langsamer – oft zwei bis vier Wochen. Die meisten überholen ihr altes Tempo nach ein bis zwei Monaten und werden danach noch lange besser, während das Adlersuchsystem meist bei etwa 40 WPM stehen bleibt. Musst du produktiv bleiben, nutze das Zehnfingersystem zuerst nur beim Üben und steig ganz um, sobald du dein altes Tempo wieder erreichst.",
          ],
        },
      ],
    },
    {
      slug: "typing-for-programmers",
      title: "Tippgeschwindigkeit für Programmierer",
      description:
        "Warum Tippen für Entwickler trotzdem zählt, welche Zeichen beim Programmieren bremsen und wie du Klammern, Symbole und Einrückung im Code-Modus übst.",
      minutes: 5,
      sections: [
        {
          heading: "Zählt Tippgeschwindigkeit beim Programmieren?",
          body: [
            "Programmierer verbringen mehr Zeit mit Denken als mit Tippen, also ist reine Geschwindigkeit nicht alles. Aber Tippen, das keine Aufmerksamkeit braucht, lässt dir die Aufmerksamkeit für das Problem. Musst du überlegen, wo die geschweifte Klammer ist, fehlt dieser Fokus beim Code – und in Chats, Reviews, Commit-Nachrichten und Dokumentation tippen Entwickler auch viel normalen Text.",
          ],
        },
        {
          heading: "Code ist eine andere Art von Text",
          body: [
            "Code steckt voller Zeichen, die normales Tipptraining nie übt: runde, eckige und geschweifte Klammern, Anführungszeichen, Semikolons, Operatoren, Unterstriche und camelCase. Viele davon brauchen die Umschalttaste oder – auf deutschen und anderen europäischen Layouts – AltGr, was sie viel langsamer macht als Buchstaben.",
            "Die Ergebnisseite von keyboardfast vergleicht dein Tempo bei Symbolen mit dem bei Buchstaben. Brauchst du für Symbole doppelt so lange, liegen dort die leichtesten Gewinne.",
          ],
        },
        {
          heading: "So funktioniert der Code-Modus",
          body: [
            "Der Code-Modus bietet echte, idiomatische Codeausschnitte in acht Sprachen, darunter JavaScript, TypeScript, Python, Go und Rust. Die Einrückung wird – wie in einem modernen Editor – für dich getippt, und am Zeilenende drückst du Enter. So übst du die Zeichen, die du beim Programmieren wirklich tippst, nicht die Leerzeichen, die ein Editor ohnehin einfügt.",
          ],
        },
        {
          heading: "Tipps für schnelleres Code-Tippen",
          body: [
            {
              list: [
                "Lerne, wo jedes Symbol liegt, ohne hinzusehen – besonders { } [ ] ( ) < > auf deinem Layout.",
                "Nutze die richtige Umschalttaste: die auf der Hand gegenüber der Taste, die du drückst.",
                "Viele Entwickler mit deutscher Tastatur wechseln zum Programmieren auf ein US-Layout, weil Klammern dort kein AltGr brauchen. Probier es aus, wenn Symbole dein Engpass sind.",
                "Übe die Muster deiner Hauptsprache: Arrow Functions, List Comprehensions, Fehlerbehandlung.",
                "Lerne die Tastenkürzel deines Editors für Vervollständigung, mehrere Cursor und das Verschieben von Zeilen – sie sparen mehr Zeit als jedes zusätzliche WPM.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
