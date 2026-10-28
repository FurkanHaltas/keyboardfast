import type { Docs } from "./legal";

/** French translation of the English legal texts (the English and Turkish versions prevail). */
export const fr: Docs = {
  privacy: {
    title: "Politique de confidentialité",
    intro:
      "Cette politique explique quelles données personnelles keyboardfast ({site}) traite, pourquoi, et quels sont vos droits. Elle est rédigée conformément à la loi turque n° 6698 sur la protection des données personnelles (KVKK) et au Règlement général sur la protection des données de l'UE (RGPD).",
    sections: [
      {
        heading: "Responsable du traitement",
        body: [
          "Le responsable du traitement est {owner}, exploitant de keyboardfast. Pour toute question relative à cette politique, écrivez-nous à {email}.",
        ],
      },
      {
        heading: "Utiliser le site sans compte",
        body: [
          "Vous pouvez faire des tests de frappe sans vous connecter. Vos réglages (thème, options de test) et vos résultats sont enregistrés uniquement dans le stockage local de votre navigateur. Ils ne nous sont pas transmis et vous pouvez les supprimer à tout moment en effaçant les données du site dans votre navigateur.",
        ],
      },
      {
        heading: "Données traitées lorsque vous créez un compte",
        body: [
          "Adresse e-mail : pour vous connecter avec un lien à usage unique et identifier votre compte.",
          "Si vous choisissez « Continuer avec Google », Google nous transmet votre adresse e-mail, votre nom, votre photo de profil et l'identifiant de votre compte. Nous n'utilisons que l'adresse e-mail et l'identifiant pour la connexion ; nous ne recevons jamais votre mot de passe Google.",
          "Nom d'utilisateur : le nom public que vous choisissez ; il apparaît dans le classement avec vos meilleurs scores.",
          "Résultats des tests : vitesse (MPM), précision, régularité, nombre de caractères, mode et langue du test, date et heure de chaque test, ainsi qu'un résumé compact par touche (réussites, erreurs, temps moyen) servant à afficher vos touches faibles.",
          "Vérification des tests : lorsque vous terminez un test en étant connecté, les touches pressées pendant ce test et leur chronologie sont envoyées une seule fois à notre serveur, afin qu'il recalcule le score et vérifie qu'il n'a pas été produit par un script. Seul le score obtenu est conservé ; le journal des frappes est supprimé immédiatement. Il ne concerne que le texte du test, rien d'autre de ce que vous tapez.",
          "Nous ne collectons ni mots de passe (la connexion se fait sans mot de passe), ni données de paiement, ni localisation précise.",
        ],
      },
      {
        heading: "Données techniques",
        body: [
          "Comme tout site web, notre serveur reçoit votre adresse IP et des informations sur votre navigateur à chaque requête. Nous les utilisons uniquement pour fournir le site et le protéger contre les abus. Les journaux du serveur font l'objet d'une rotation automatique et ne sont pas conservés plus longtemps que nécessaire à cette fin.",
        ],
      },
      {
        heading: "Finalités et bases légales",
        body: [
          "Fournir les fonctionnalités de compte que vous demandez : enregistrer vos résultats, afficher votre progression et vous classer (KVKK art. 5(2)(c) ; RGPD art. 6(1)(b), exécution d'un contrat).",
          "Assurer la sécurité du service et prévenir la triche et les abus (KVKK art. 5(2)(f) ; RGPD art. 6(1)(f), intérêts légitimes).",
          "Nous ne vendons pas vos données, ne créons pas de profils publicitaires et ne prenons aucune décision automatisée produisant des effets juridiques à votre égard.",
        ],
      },
      {
        heading: "Prestataires",
        body: [
          "Supabase Inc. héberge notre base de données et notre système de connexion. Les données de votre compte sont stockées dans sa région Union européenne (Francfort, Allemagne).",
          "Notre fournisseur de serveurs virtuels héberge le site lui-même.",
          "Les e-mails de connexion sont envoyés par Resend Inc. depuis noreply@keyboardfast.com.",
          "Si vous vous connectez avec Google, Google LLC (Google Ireland Ltd. pour les utilisateurs en Europe) confirme votre identité selon sa propre politique de confidentialité.",
          "Ces prestataires ne traitent les données que sur nos instructions. Certains étant établis hors de Turquie, l'utilisation d'un compte peut impliquer un transfert de données personnelles à l'étranger ; ce transfert n'a lieu que dans la mesure nécessaire au service et avec les garanties appropriées exigées par l'art. 9 de la KVKK et le chapitre V du RGPD.",
        ],
      },
      {
        heading: "Durée de conservation",
        body: [
          "Les données du compte et les résultats sont conservés jusqu'à la suppression de votre compte. Vous pouvez le supprimer à tout moment depuis le menu du compte ; votre adresse e-mail, votre nom d'utilisateur et tous vos résultats sont alors définitivement effacés de notre base de données.",
        ],
      },
      {
        heading: "Vos droits",
        body: [
          "En vertu de l'art. 11 de la KVKK et du RGPD, vous pouvez demander si vos données sont traitées, en obtenir une copie, les faire rectifier ou effacer, vous opposer au traitement et demander des informations sur les transferts. Vous pouvez télécharger toutes vos données au format JSON et supprimer votre compte directement depuis le menu du compte.",
          "Pour toute autre demande, écrivez à {email}. Nous répondons sous 30 jours. Vous avez également le droit d'introduire une réclamation auprès de l'Autorité turque de protection des données personnelles (KVKK) ou de l'autorité de protection des données de votre pays.",
        ],
      },
      {
        heading: "Enfants",
        body: [
          "keyboardfast est ouvert à tous, mais les comptes sont destinés aux personnes âgées de 16 ans ou plus. Si vous êtes plus jeune, demandez l'accord d'un parent ou d'un tuteur avant de créer un compte.",
        ],
      },
      {
        heading: "Modifications de cette politique",
        body: [
          "Nous mettrons cette page à jour si notre manière de traiter les données change. La date en haut indique la version en vigueur. Les changements importants seront annoncés sur le site.",
        ],
      },
    ],
  },
  cookies: {
    title: "Politique relative aux cookies",
    intro:
      "keyboardfast n'utilise que le stockage nécessaire à son fonctionnement. Nous n'utilisons aucun cookie publicitaire, analytique ou de suivi ; aucun consentement au suivi n'est donc demandé.",
    sections: [
      {
        heading: "Ce que nous stockons dans votre navigateur",
        body: [
          "locale (cookie, 1 an) : mémorise la langue d'interface choisie.",
          "kf:settings (stockage local) : votre thème et vos options de test.",
          "kf:history (stockage local) : résultats des tests effectués sans être connecté ; les utilisateurs connectés disposent d'une copie locale de leurs propres résultats pour que le site reste rapide.",
          "kf:pending (stockage local) : résultats en attente d'envoi vers votre compte lorsque vous étiez hors ligne.",
          "kf:ticket (stockage local) : un ticket de test obtenu à l'avance qui permet de vérifier votre prochain test pour le classement (utilisateurs connectés uniquement).",
          "kf:consent (stockage local) : mémorise que vous avez vu le bandeau relatif aux cookies.",
          "sb-…-auth-token (stockage local) : vous garde connecté. Il n'est créé qu'à la connexion et supprimé à la déconnexion.",
        ],
      },
      {
        heading: "Pourquoi aucun consentement n'est requis",
        body: [
          "Tous les éléments ci-dessus sont strictement nécessaires aux fonctionnalités que vous utilisez ou enregistrent des choix que vous avez faits vous-même. Selon les règles ePrivacy et la KVKK, ils ne nécessitent pas de consentement préalable. Aucun n'est partagé avec des tiers à des fins de marketing.",
        ],
      },
      {
        heading: "Comment les supprimer",
        body: [
          "Vous pouvez tout supprimer à tout moment en vous déconnectant puis en effaçant les données du site {site} dans les paramètres de votre navigateur. Le site continuera de fonctionner, mais vos résultats locaux et vos préférences seront réinitialisés.",
        ],
      },
      {
        heading: "Évolutions",
        body: [
          "Si nous ajoutons un jour des cookies facultatifs (par exemple pour la mesure d'audience ou la publicité), nous vous demanderons votre consentement avant de les déposer et mettrons cette politique à jour.",
        ],
      },
    ],
  },
  terms: {
    title: "Conditions d'utilisation",
    intro: "Ces conditions s'appliquent lorsque vous utilisez keyboardfast ({site}). En utilisant le site, vous les acceptez.",
    sections: [
      {
        heading: "Le service",
        body: [
          "keyboardfast est un test de vitesse de frappe gratuit. Nous pouvons ajouter, modifier ou supprimer des fonctionnalités à tout moment. Le service est fourni gratuitement et sans garantie de disponibilité.",
        ],
      },
      {
        heading: "Votre compte",
        body: [
          "Pour créer un compte, il vous faut une adresse e-mail valide dont vous avez le contrôle. Protégez l'accès à cette messagerie, car les liens de connexion y sont envoyés. Un compte par personne.",
          "Votre nom d'utilisateur ne doit pas usurper l'identité d'autrui, contenir de propos injurieux ou haineux, ni faire de publicité. Nous pouvons modifier ou supprimer les noms d'utilisateur qui enfreignent cette règle.",
        ],
      },
      {
        heading: "Fair-play",
        body: [
          "Les résultats doivent provenir de votre propre frappe. L'utilisation de bots, scripts, macros, clients modifiés ou de tout autre moyen de soumettre des résultats que vous n'avez pas tapés est interdite. Nous pouvons supprimer ces résultats, les masquer du classement ou fermer les comptes concernés.",
          "N'essayez pas de perturber le service, d'accéder aux données d'autres utilisateurs ou de contourner les mesures de sécurité.",
        ],
      },
      {
        heading: "Contenu et propriété intellectuelle",
        body: [
          "Le design, le code et les textes du site appartiennent à {owner}, sauf mention contraire. Les listes de mots et les extraits de code sont fournis uniquement pour s'entraîner à la frappe.",
        ],
      },
      {
        heading: "Exclusion de garantie et responsabilité",
        body: [
          "keyboardfast est fourni « en l'état ». Nous faisons de notre mieux pour que les résultats soient exacts et les données en sécurité, mais nous ne pouvons garantir que le service sera toujours disponible, exempt d'erreurs, ni qu'aucune donnée ne sera jamais perdue. Dans la mesure permise par la loi, nous ne sommes pas responsables des dommages indirects résultant de l'utilisation du service.",
        ],
      },
      {
        heading: "Fin de l'utilisation",
        body: [
          "Vous pouvez cesser d'utiliser le service et supprimer votre compte à tout moment depuis le menu du compte. Nous pouvons suspendre les comptes qui enfreignent ces conditions de manière grave ou répétée.",
        ],
      },
      {
        heading: "Droit applicable et modifications",
        body: [
          "Ces conditions sont régies par le droit de la République de Turquie. Les règles impératives de protection des consommateurs de votre pays de résidence restent applicables. Nous pouvons mettre à jour ces conditions ; la date en haut indique la version en vigueur. Questions : {email}.",
        ],
      },
    ],
  },
};
