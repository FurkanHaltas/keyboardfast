import type { Docs } from "./legal";

/** German translation of the English legal texts (the English and Turkish versions prevail). */
export const de: Docs = {
  privacy: {
    title: "Datenschutzerklärung",
    intro:
      "Diese Erklärung beschreibt, welche personenbezogenen Daten keyboardfast ({site}) verarbeitet, zu welchem Zweck und welche Rechte du hast. Sie richtet sich nach dem türkischen Datenschutzgesetz Nr. 6698 (KVKK) und der EU-Datenschutz-Grundverordnung (DSGVO).",
    sections: [
      {
        heading: "Verantwortlicher",
        body: [
          "Verantwortlich ist {owner}, der Betreiber von keyboardfast. Zu allen Fragen rund um diese Erklärung erreichst du uns unter {email}.",
        ],
      },
      {
        heading: "Nutzung ohne Konto",
        body: [
          "Du kannst Tipptests ohne Anmeldung machen. Deine Einstellungen (Theme, Testoptionen) und Testergebnisse werden nur im lokalen Speicher deines Browsers abgelegt. Sie werden nicht an uns übertragen, und du kannst sie jederzeit löschen, indem du die Websitedaten in deinem Browser entfernst.",
        ],
      },
      {
        heading: "Daten, die wir bei einem Konto verarbeiten",
        body: [
          "E-Mail-Adresse – um dich mit einem Einmal-Link anzumelden und dein Konto zu erkennen.",
          "Wenn du „Weiter mit Google“ wählst, übermittelt Google uns deine E-Mail-Adresse, deinen Namen, dein Profilbild und deine Konto-ID. Wir verwenden nur die E-Mail-Adresse und die Konto-ID für die Anmeldung; dein Google-Passwort erhalten wir nie.",
          "Benutzername – der öffentliche Name, den du wählst; er wird in der Bestenliste zusammen mit deinen besten Ergebnissen angezeigt.",
          "Testergebnisse – Geschwindigkeit (WPM), Genauigkeit, Konstanz, Zeichenzahlen, Testmodus und -sprache, Datum und Uhrzeit jedes Tests sowie eine kompakte Statistik pro Taste (Treffer, Fehler, durchschnittliche Zeit), mit der wir deine schwachen Tasten anzeigen.",
          "Testprüfung – wenn du angemeldet einen Test beendest, werden die in diesem Test gedrückten Tasten und deren Zeitpunkte einmalig an unseren Server gesendet, damit er das Ergebnis neu berechnen und prüfen kann, dass es nicht von einem Skript stammt. Gespeichert wird nur das Ergebnis; das Tastenprotokoll wird sofort verworfen. Es umfasst nur den Testtext, nichts anderes, was du tippst.",
          "Wir erheben keine Passwörter (die Anmeldung ist passwortlos), keine Zahlungsdaten und keinen genauen Standort.",
        ],
      },
      {
        heading: "Technische Daten",
        body: [
          "Wie jede Website erhält unser Server bei jeder Anfrage deine IP-Adresse und Browserinformationen. Wir nutzen sie nur, um die Website auszuliefern und vor Missbrauch zu schützen. Serverprotokolle werden automatisch rotiert und nicht länger als dafür nötig aufbewahrt.",
        ],
      },
      {
        heading: "Zwecke und Rechtsgrundlagen",
        body: [
          "Bereitstellung der von dir gewünschten Kontofunktionen – Ergebnisse speichern, Fortschritt anzeigen, Platzierung in der Bestenliste (KVKK Art. 5 Abs. 2 lit. c; DSGVO Art. 6 Abs. 1 lit. b, Vertragserfüllung).",
          "Sicherheit des Dienstes und Verhinderung von Betrug und Missbrauch (KVKK Art. 5 Abs. 2 lit. f; DSGVO Art. 6 Abs. 1 lit. f, berechtigte Interessen).",
          "Wir verkaufen deine Daten nicht, erstellen keine Werbeprofile und treffen keine automatisierten Entscheidungen mit rechtlicher Wirkung über dich.",
        ],
      },
      {
        heading: "Dienstleister",
        body: [
          "Supabase Inc. betreibt unsere Datenbank und unser Anmeldesystem. Deine Kontodaten werden in der Region Europäische Union (Frankfurt, Deutschland) gespeichert.",
          "Unser Anbieter für virtuelle Server hostet die Website selbst.",
          "Anmelde-E-Mails werden von Resend Inc. über noreply@keyboardfast.com versendet.",
          "Wenn du dich mit Google anmeldest, bestätigt Google LLC (für Nutzer in Europa Google Ireland Ltd.) deine Identität nach seiner eigenen Datenschutzerklärung.",
          "Diese Anbieter verarbeiten Daten nur nach unseren Weisungen. Da einige von ihnen außerhalb der Türkei ansässig sind, kann die Nutzung eines Kontos eine Übermittlung personenbezogener Daten ins Ausland bedeuten; dies geschieht nur im erforderlichen Umfang und mit den geeigneten Garantien nach KVKK Art. 9 und Kapitel V DSGVO.",
        ],
      },
      {
        heading: "Speicherdauer",
        body: [
          "Kontodaten und Ergebnisse werden gespeichert, bis du dein Konto löschst. Du kannst dein Konto jederzeit über das Kontomenü löschen; dabei werden deine E-Mail-Adresse, dein Benutzername und alle Ergebnisse dauerhaft aus unserer Datenbank entfernt.",
        ],
      },
      {
        heading: "Deine Rechte",
        body: [
          "Nach KVKK Art. 11 und der DSGVO kannst du Auskunft darüber verlangen, ob deine Daten verarbeitet werden, eine Kopie erhalten, sie berichtigen oder löschen lassen, der Verarbeitung widersprechen und Informationen zu Übermittlungen anfordern. Über das Kontomenü kannst du alle deine Daten als JSON-Datei herunterladen und dein Konto direkt löschen.",
          "Für alle anderen Anliegen schreib an {email}. Wir antworten innerhalb von 30 Tagen. Du hast außerdem das Recht, dich bei der türkischen Datenschutzbehörde (KVKK) oder der Datenschutzaufsichtsbehörde deines Landes zu beschweren.",
        ],
      },
      {
        heading: "Kinder",
        body: [
          "keyboardfast steht allen offen, Konten sind jedoch für Personen ab 16 Jahren gedacht. Wenn du jünger bist, frag bitte vor der Kontoerstellung einen Elternteil oder Erziehungsberechtigten.",
        ],
      },
      {
        heading: "Änderungen dieser Erklärung",
        body: [
          "Wir aktualisieren diese Seite, wenn sich die Art der Datenverarbeitung ändert. Das Datum oben zeigt die aktuelle Fassung. Wesentliche Änderungen kündigen wir auf der Website an.",
        ],
      },
    ],
  },
  cookies: {
    title: "Cookie-Richtlinie",
    intro:
      "keyboardfast nutzt nur den Speicher, den die Website zum Funktionieren braucht. Wir verwenden keine Werbe-, Analyse- oder sonstigen Tracking-Cookies, daher wird keine Einwilligung zum Tracking abgefragt.",
    sections: [
      {
        heading: "Was wir in deinem Browser speichern",
        body: [
          "locale (Cookie, 1 Jahr) – merkt sich die gewählte Sprache der Oberfläche.",
          "kf:settings (lokaler Speicher) – dein Theme und deine Testoptionen.",
          "kf:history (lokaler Speicher) – Ergebnisse von Tests ohne Anmeldung; angemeldete Nutzer haben eine lokale Kopie ihrer eigenen Ergebnisse, damit die Website schnell bleibt.",
          "kf:pending (lokaler Speicher) – Ergebnisse, die offline entstanden sind und noch in dein Konto hochgeladen werden.",
          "kf:ticket (lokaler Speicher) – ein vorab geladenes Testticket, mit dem dein nächster Test für die Bestenliste geprüft werden kann (nur angemeldet).",
          "kf:consent (lokaler Speicher) – merkt sich, dass du den Cookie-Hinweis gesehen hast.",
          "sb-…-auth-token (lokaler Speicher) – hält dich angemeldet. Er wird nur bei der Anmeldung gesetzt und bei der Abmeldung entfernt.",
        ],
      },
      {
        heading: "Warum keine Einwilligung nötig ist",
        body: [
          "Alle oben genannten Einträge sind für die von dir genutzten Funktionen unbedingt erforderlich oder speichern Entscheidungen, die du selbst getroffen hast. Nach den ePrivacy-Vorschriften und dem KVKK erfordern sie keine vorherige Einwilligung. Keiner davon wird zu Marketingzwecken an Dritte weitergegeben.",
        ],
      },
      {
        heading: "So entfernst du sie",
        body: [
          "Du kannst alles jederzeit löschen, indem du dich abmeldest und die Websitedaten für {site} in deinen Browsereinstellungen löschst. Die Website funktioniert weiter, aber deine lokalen Ergebnisse und Einstellungen werden zurückgesetzt.",
        ],
      },
      {
        heading: "Künftige Änderungen",
        body: [
          "Sollten wir jemals optionale Cookies (zum Beispiel für Analyse oder Werbung) einführen, fragen wir vorher nach deiner Einwilligung und aktualisieren diese Richtlinie.",
        ],
      },
    ],
  },
  terms: {
    title: "Nutzungsbedingungen",
    intro: "Diese Bedingungen gelten für die Nutzung von keyboardfast ({site}). Mit der Nutzung der Website stimmst du ihnen zu.",
    sections: [
      {
        heading: "Der Dienst",
        body: [
          "keyboardfast ist ein kostenloser Tipptest. Wir können Funktionen jederzeit hinzufügen, ändern oder entfernen. Der Dienst wird kostenlos und ohne Verfügbarkeitsgarantie bereitgestellt.",
        ],
      },
      {
        heading: "Dein Konto",
        body: [
          "Für ein Konto brauchst du eine gültige E-Mail-Adresse, über die du verfügst. Schütze den Zugang zu diesem Postfach, denn dorthin werden die Anmeldelinks geschickt. Ein Konto pro Person.",
          "Dein Benutzername darf keine anderen Personen nachahmen, keine beleidigende oder hetzerische Sprache enthalten und für nichts werben. Benutzernamen, die gegen diese Regel verstoßen, können wir ändern oder entfernen.",
        ],
      },
      {
        heading: "Fair Play",
        body: [
          "Ergebnisse müssen aus deinem eigenen Tippen stammen. Bots, Skripte, Makros, veränderte Clients oder andere Wege, Ergebnisse einzureichen, die du nicht selbst getippt hast, sind nicht erlaubt. Solche Ergebnisse können wir entfernen, aus der Bestenliste ausblenden oder die beteiligten Konten schließen.",
          "Versuche nicht, den Dienst zu stören, auf Daten anderer Nutzer zuzugreifen oder Sicherheitsmaßnahmen zu umgehen.",
        ],
      },
      {
        heading: "Inhalte und geistiges Eigentum",
        body: [
          "Design, Code und Texte der Website gehören {owner}, sofern nicht anders angegeben. Wortlisten und Codebeispiele werden nur zum Tippen üben bereitgestellt.",
        ],
      },
      {
        heading: "Gewährleistung und Haftung",
        body: [
          "keyboardfast wird „wie besehen“ bereitgestellt. Wir geben unser Bestes, damit Ergebnisse korrekt und Daten sicher sind, können aber nicht garantieren, dass der Dienst immer verfügbar und fehlerfrei ist oder dass nie Daten verloren gehen. Soweit gesetzlich zulässig, haften wir nicht für mittelbare Schäden aus der Nutzung des Dienstes.",
        ],
      },
      {
        heading: "Beendigung der Nutzung",
        body: [
          "Du kannst die Nutzung jederzeit beenden und dein Konto über das Kontomenü löschen. Konten, die schwer oder wiederholt gegen diese Bedingungen verstoßen, können wir sperren.",
        ],
      },
      {
        heading: "Anwendbares Recht und Änderungen",
        body: [
          "Es gilt das Recht der Republik Türkei. Zwingende Verbraucherschutzvorschriften deines Wohnsitzlandes bleiben unberührt. Wir können diese Bedingungen aktualisieren; das Datum oben zeigt die aktuelle Fassung. Fragen: {email}.",
        ],
      },
    ],
  },
};
