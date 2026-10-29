import type { ArticleSet } from "./guides";

/** French translation of the about page and guides. */
export const fr: ArticleSet = {
  about: {
    slug: "about",
    title: "À propos de keyboardfast",
    description:
      "keyboardfast est un test de frappe gratuit en 14 langues, avec un mode code, des statistiques honnêtes et un mode entraînement qui cible vos touches faibles.",
    minutes: 2,
    sections: [
      {
        heading: "Ce qu'est keyboardfast",
        body: [
          "keyboardfast est un test de vitesse de frappe conçu pour celles et ceux qui veulent vraiment progresser, pas seulement voir un chiffre. Vous pouvez vous tester dans 14 langues, du français et de l'anglais au polonais, au russe et à l'indonésien, ou taper du vrai code dans huit langages de programmation.",
          "Chaque résultat va au-delà de la vitesse : précision, régularité, un graphique seconde par seconde, les touches qui vous ont ralenti et la façon dont vous tapez les lettres par rapport aux symboles.",
        ],
      },
      {
        heading: "Ce qui le rend différent",
        body: [
          {
            list: [
              "Un entraînement qui s'adapte à vous : après quelques tests, keyboardfast sait quelles lettres et quelles paires de lettres vous coûtent le plus et construit le texte d'entraînement autour d'elles.",
              "Une carte de chaleur du clavier dans votre propre disposition (AZERTY, QWERTZ, Q turc et plus) pour voir vos points faibles d'un coup d'œil.",
              "Un classement équitable : chaque résultat classé est rejoué et vérifié sur notre serveur, si bien que les scripts et le copier-coller n'y entrent pas.",
              "Un mode code pour les développeurs, avec indentation automatique pour vous entraîner sur les caractères qui comptent.",
              "La confidentialité d'abord : aucun compte n'est nécessaire pour faire des tests, et vous pouvez télécharger ou supprimer vos données à tout moment.",
            ],
          },
        ],
      },
      {
        heading: "Qui est derrière",
        body: [
          "keyboardfast est un projet indépendant créé et géré par Furkan Haltas, développeur logiciel en Turquie. Il est né de l'envie de construire de bout en bout une application web rapide et soignée – du moteur de frappe jusqu'au serveur qui l'héberge – et de proposer un test de frappe qui respecte ses utilisateurs.",
          "Idées, signalements de bugs et retours sont toujours les bienvenus via le lien de contact en bas de chaque page.",
        ],
      },
    ],
  },
  guides: [
    {
      slug: "what-is-wpm",
      title: "Ce que signifie MPM et comment on mesure la vitesse de frappe",
      description:
        "Mots par minute, vitesse brute et nette, précision et régularité expliquées – et ce qu'est une bonne vitesse de frappe.",
      minutes: 5,
      sections: [
        {
          heading: "Un « mot » fait cinq caractères",
          body: [
            "Les tests de frappe ne comptent pas de vrais mots, sinon « a » et « extraordinairement » vaudraient autant. À la place, chaque groupe de cinq caractères – espaces et ponctuation compris – compte pour un mot. Taper 250 caractères en une minute correspond donc à 50 mots par minute (MPM, ou WPM en anglais), quels que soient les mots.",
            "Cette norme rend les résultats comparables d'une langue et d'un texte à l'autre, même si les langues aux mots longs et aux nombreux caractères spéciaux, comme l'allemand ou le turc, paraissent souvent un peu plus lentes.",
          ],
        },
        {
          heading: "Vitesse nette et vitesse brute",
          body: [
            "keyboardfast affiche deux vitesses. La vitesse brute compte chaque touche pressée, juste ou non. La vitesse nette – le grand chiffre – ne compte que les caractères des mots tapés correctement. Si vous tapez vite en laissant des erreurs derrière vous, l'écart entre les deux se creuse.",
            "Dans la vraie vie, c'est la vitesse nette qui compte : un paragraphe rapide mais plein d'erreurs doit de toute façon être corrigé. Un faible écart entre brute et nette est le signe d'une frappe propre.",
          ],
        },
        {
          heading: "Précision et régularité",
          body: [
            "La précision est la part des frappes correctes. Les erreurs corrigées comptent aussi contre vous, car vous avez passé du temps à les faire puis à les réparer. Dépasser 95 % est un bon objectif ; les meilleurs restent généralement au-dessus de 97 %.",
            "La régularité montre à quel point votre vitesse a été constante pendant le test. Un rythme stable obtient un score élevé, les accélérations et les pauses un score bas. Les personnes régulières progressent souvent plus vite, car leur vitesse ne dépend pas de la facilité du texte.",
          ],
        },
        {
          heading: "Qu'est-ce qu'une bonne vitesse de frappe ?",
          body: [
            "Fourchettes indicatives de vitesse nette sur un texte courant :",
            {
              list: [
                "Moins de 30 MPM : frappe en cherchant les touches, ou débutant.",
                "30–45 MPM : à peu près la moyenne des adultes qui tapent régulièrement.",
                "45–65 MPM : confortable et productif ; suffisant pour la plupart des travaux de bureau.",
                "65–90 MPM : rapide ; typique des dactylos expérimentés.",
                "Plus de 100 MPM : exceptionnel ; atteint par peu de personnes avec un entraînement ciblé.",
              ],
            },
            "Les tests courts donnent des chiffres plus élevés, car on tient un sprint 15 secondes mais pas deux minutes. Comparez-vous à vos propres résultats dans le même mode : c'est exactement ce que fait la page de progression.",
          ],
        },
        {
          heading: "Obtenir un chiffre fiable",
          body: [
            "Faites plusieurs tests et regardez votre moyenne plutôt que votre meilleur score. Utilisez le test de 60 secondes pour une valeur réaliste, désactivez ponctuation et chiffres pour vous comparer aux autres, et testez-vous dans la langue que vous tapez réellement au quotidien.",
          ],
        },
      ],
    },
    {
      slug: "how-to-type-faster",
      title: "Taper plus vite : un plan concret",
      description:
        "Une méthode réaliste, étape par étape, pour gagner en vitesse : la précision d'abord, un entraînement court et quotidien, le travail des touches faibles et le dépassement des plateaux.",
      minutes: 6,
      sections: [
        {
          heading: "Ralentir pour aller plus vite",
          body: [
            "L'erreur la plus courante est de s'entraîner à une vitesse où l'on fait beaucoup de fautes. Chaque erreur corrigée coûte plus de temps que de taper le caractère avec soin, et les erreurs répétées habituent vos doigts à les refaire.",
            "Visez d'abord 96 à 98 % de précision. Si vous passez en dessous, ralentissez jusqu'à ce que les erreurs disparaissent, puis laissez la vitesse monter d'elle-même. Cela paraît lent pendant une ou deux semaines, puis ça commence à payer.",
          ],
        },
        {
          heading: "Regarder l'écran, pas le clavier",
          body: [
            "Baisser les yeux casse le fil de la lecture et plafonne votre vitesse autour de 40 MPM. Si vous regardez encore les touches, apprendre la dactylographie est la plus grande amélioration possible – voir notre guide sur la rangée de base et le placement des doigts.",
          ],
        },
        {
          heading: "S'entraîner peu mais souvent",
          body: [
            "Quinze minutes concentrées par jour valent mieux que deux heures le dimanche. Taper est une compétence motrice, et les compétences motrices se consolident entre les séances, surtout pendant le sommeil. Une bonne routine :",
            {
              list: [
                "2–3 tests d'échauffement à un rythme détendu.",
                "5–10 minutes de mode entraînement sur vos touches faibles.",
                "2–3 tests à votre rythme habituel pour mesurer vos progrès.",
              ],
            },
          ],
        },
        {
          heading: "Corriger d'abord ses touches faibles",
          body: [
            "La plupart des gens perdent l'essentiel de leur temps sur une poignée de lettres et de paires de lettres. keyboardfast enregistre la fréquence à laquelle vous ratez chaque touche et le temps qu'elle vous prend, puis l'affiche sur une carte de chaleur dans les pages de résultats et de progression.",
            "Le mode entraînement compose un texte à partir de vrais mots contenant ces touches : vous répétez bien plus souvent exactement ce qui vous ralentit, sans taper de suites de lettres absurdes.",
          ],
        },
        {
          heading: "Lire en avance et garder le rythme",
          body: [
            "Les personnes qui tapent vite lisent un ou deux mots en avance, si bien que leurs doigts n'attendent jamais le mot suivant. Gardez les yeux légèrement devant le curseur et tapez à un rythme régulier plutôt que de foncer sur les mots faciles et de bloquer sur les difficiles. Le score de régularité montre si cela fonctionne.",
          ],
        },
        {
          heading: "Dépasser un plateau",
          body: [
            "Tout le monde stagne à un moment. Si votre moyenne ne bouge plus pendant quelques semaines, changez quelque chose : passez à un test plus long, activez la ponctuation, entraînez-vous dans une autre langue ou en mode code, ou faites quelques tests volontairement lents et parfaits. La variété force vos doigts à ne plus compter sur des habitudes qui ne marchent que pour un type de texte.",
          ],
        },
        {
          heading: "Prendre soin de son corps",
          body: [
            "Asseyez-vous les épaules détendues, les avant-bras à peu près au niveau du clavier et les poignets légèrement suspendus plutôt qu'appuyés sur le bureau. La tension ralentit et peut, à la longue, faire mal. Faites une courte pause dès que vos mains sont fatiguées.",
          ],
        },
      ],
    },
    {
      slug: "touch-typing",
      title: "Dactylographie : rangée de base et placement des doigts",
      description:
        "Apprenez la dactylographie pas à pas : où reposent vos doigts, quel doigt frappe quelle touche et comment changer sans perdre en productivité.",
      minutes: 6,
      sections: [
        {
          heading: "Qu'est-ce que la dactylographie ?",
          body: [
            "Taper à l'aveugle, c'est taper sans regarder le clavier, chaque doigt étant responsable de son propre groupe de touches. Vos doigts apprennent où se trouvent les touches et vos yeux restent sur le texte. Presque toutes les personnes qui tapent vite font ainsi.",
          ],
        },
        {
          heading: "La rangée de base",
          body: [
            "Vos doigts reposent sur la rangée centrale de lettres et y reviennent après chaque frappe. Sur un clavier AZERTY français, la main gauche repose sur Q S D F et la main droite sur J K L M. Les touches F et J portent de petits reliefs pour retrouver la position sans regarder.",
            "Sur le QWERTY anglais, c'est A S D F / J K L et la touche suivante ; sur le QWERTZ allemand, A S D F / J K L Ö ; et sur le Q turc, A S D F / J K L Ş.",
          ],
        },
        {
          heading: "Quel doigt pour quelle touche",
          body: [
            "Chaque doigt couvre une colonne diagonale de touches au-dessus et en dessous de sa touche de base :",
            {
              list: [
                "Les index font le plus gros du travail : chacun couvre deux colonnes, F, G, R, T, V, B à gauche et J, H, U, Y, N et la virgule à droite.",
                "Les majeurs couvrent les colonnes D et K (E, C et I, point-virgule).",
                "Les annulaires couvrent les colonnes S et L (Z, X et O, deux-points).",
                "Les auriculaires couvrent Q, A, W et tout ce qui se trouve à droite des touches de base de la main droite (P, M, ù, l'accent circonflexe et le point d'exclamation), ainsi que Maj, Entrée et Retour arrière.",
                "Les pouces frappent la barre d'espace, généralement celui de la main qui n'a pas tapé la dernière lettre.",
              ],
            },
            "En AZERTY, les lettres accentuées é, è, à et ç se trouvent sur la rangée des chiffres : elles demandent un grand écart aux doigts. Si elles apparaissent en rouge sur votre carte de chaleur, c'est la raison.",
          ],
        },
        {
          heading: "Comment l'apprendre",
          body: [
            {
              list: [
                "Commencez lentement et précisément ; 15 à 20 MPM sans regarder est un bon premier objectif.",
                "Ne baissez pas les yeux. Si vous en avez besoin, regardez plutôt l'écran pour voir ce que vous avez tapé.",
                "Entraînez-vous 15 à 20 minutes chaque jour plutôt qu'en longues séances.",
                "Utilisez le mode entraînement dès que vous avez quelques tests : il vous amènera sur les touches que vous évitez.",
              ],
            },
          ],
        },
        {
          heading: "Prévoir un ralentissement temporaire",
          body: [
            "Si vous tapez déjà avec quelques doigts, le changement vous ralentira un moment – souvent deux à quatre semaines. La plupart des gens dépassent leur ancienne vitesse en un ou deux mois et continuent de progresser longtemps après, alors que la frappe en cherchant les touches plafonne en général vers 40 MPM. Si vous devez rester productif, pratiquez d'abord la dactylographie pendant vos séances d'entraînement et basculez complètement une fois votre ancienne vitesse retrouvée.",
          ],
        },
      ],
    },
    {
      slug: "typing-for-programmers",
      title: "La vitesse de frappe pour les développeurs",
      description:
        "Pourquoi la frappe compte encore pour les développeurs, quels caractères ralentissent quand on code et comment travailler crochets, symboles et indentation avec le mode code.",
      minutes: 5,
      sections: [
        {
          heading: "La vitesse de frappe compte-t-elle pour coder ?",
          body: [
            "Les développeurs passent plus de temps à réfléchir qu'à taper, donc la vitesse brute n'est pas tout. Mais une frappe qui ne demande aucune attention laisse votre attention au problème. Si vous devez chercher l'accolade, c'est autant de concentration en moins pour le code – et dans les discussions, revues de code, messages de commit et documentation, les développeurs tapent aussi beaucoup de texte ordinaire.",
          ],
        },
        {
          heading: "Le code est un autre type de texte",
          body: [
            "Le code est plein de caractères que l'entraînement classique ne travaille jamais : parenthèses, crochets, accolades, guillemets, points-virgules, opérateurs, tirets bas et camelCase. Beaucoup demandent Maj ou, sur l'AZERTY et d'autres dispositions européennes, la touche Alt Gr, ce qui les rend bien plus lents que les lettres.",
            "La page de résultats de keyboardfast compare votre vitesse sur les symboles et sur les lettres. Si les symboles vous prennent deux fois plus de temps, c'est là que se trouvent les gains les plus faciles.",
          ],
        },
        {
          heading: "Comment fonctionne le mode code",
          body: [
            "Le mode code propose de vrais extraits idiomatiques dans huit langages, dont JavaScript, TypeScript, Python, Go et Rust. L'indentation est tapée pour vous – comme le ferait un éditeur moderne – et vous appuyez sur Entrée en fin de ligne. Vous vous entraînez ainsi sur les caractères que vous tapez vraiment en codant, pas sur les espaces qu'un éditeur ajouterait de toute façon.",
          ],
        },
        {
          heading: "Conseils pour coder plus vite",
          body: [
            {
              list: [
                "Apprenez où se trouve chaque symbole sans regarder – surtout { } [ ] ( ) < > sur votre disposition.",
                "Utilisez la bonne touche Maj : celle de la main opposée à la touche que vous frappez.",
                "Beaucoup de développeurs en AZERTY passent à une disposition américaine pour coder, car les crochets n'y demandent pas Alt Gr. Essayez si les symboles sont votre point faible.",
                "Entraînez-vous sur les motifs de votre langage principal : fonctions fléchées, compréhensions de listes, gestion des erreurs.",
                "Apprenez les raccourcis de votre éditeur pour l'autocomplétion, les curseurs multiples et le déplacement de lignes – ils font gagner plus de temps que n'importe quel MPM supplémentaire.",
              ],
            },
          ],
        },
      ],
    },
  ],
};
