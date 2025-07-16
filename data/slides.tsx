// Slide configurations with passcode protection
// Passcodes are hashed for security
export const slideConfigurations = {
  ora: {
    passcode: "27849", // 5-digit passcode for Ora Technologies
    partnerLogo:
      "https://media.licdn.com/dms/image/v2/D4D0BAQFyhyb2nI-ePQ/company-logo_100_100/company-logo_100_100/0/1738314575167?e=1755734400&v=beta&t=w773Eac6Bw5xt0FTw_S1HbA5UTNhzW1T9rcGL0i0Exs",
    partnerName: "Ora Technologies",
    slides: [
      {
        title: "Qui est Pixl ?",
        subtitle: "Construire des outils utiles, pas juste de la tech.",
        content: (
          <>
            Je suis Hamza Mounir, fondateur de Pixl.
            <br />
            <br />
            +10 ans d&apos;expérience produit / tech, 2 ans à fond dans
            l&apos;IA.
            <br />
            <br />
            On résout des problèmes concrets, on ne fait pas de buzzwords.
            <br />
            <br />
            Notre mission : livrer des outils utiles, localement pertinents, et
            exécutables.
          </>
        ),
      },
      {
        title: "Le problème qu'on voit",
        subtitle: "Des problèmes qui ne sont toujours pas réglés…",
        content: (
          <>
            Outils métiers peu adaptés, souvent manuels.
            <br />
            Solutions locales rigides, étrangères peu localisées.
            <br />
            Résultat : perte de temps, erreurs, surcharge.
            <br />
            <br />
            <span className="font-bold text-pixl-teal">
              👉 Il est temps de concevoir local-first, mais avec ambition.
            </span>
          </>
        ),
      },
      {
        title: "Predict : un cas concret",
        subtitle: "Automatiser la comptabilité sans complexité",
        content: (
          <>
            Extraction automatique de factures, matching bancaire, RAG
            comptable.
            <br />
            Fonctionne déjà en Belgique.
            <br />
            API + architecture modulaire → déployable au Maroc rapidement.
            <br />
            Chaque brique peut être utilisée dans d&apos;autres contextes (OCR,
            assistants, etc.)
          </>
        ),
      },
      {
        title: "Pixl, un studio d'outils modulaires",
        subtitle: "Un atelier pour résoudre des problèmes métiers",
        content: (
          <>
            Générateurs de contenu SEO & marketing
            <br />
            Assistants clients basés sur la base interne
            <br />
            Extraction et traitement de documents métiers
            <br />
            Automatisation de tâches métier
            <br />
            <br />
            <span className="font-bold text-pixl-teal">
              IA quand c&apos;est utile. Code quand c&apos;est nécessaire.
              Impact tout le temps.
            </span>
          </>
        ),
      },
      {
        title: "Le pont MRE ↔ Local",
        subtitle: "Créer une vraie passerelle entre les savoir-faire",
        content: (
          <>
            Les MRE savent builder. Les locaux ont le terrain.
            <br />
            Ce qu&apos;il manque : la connexion.
            <br />
            On veut tester, transmettre, construire et distribuer avec et pour
            les marocains.
          </>
        ),
      },
      {
        title: "Ce qu&apos;on cherche",
        subtitle: "On ne cherche pas de levée, on cherche du terrain",
        content: (
          <>
            Comprendre les cas concrets marocains
            <br />
            Travailler avec des partenaires terrain
            <br />
            Tester rapidement et apprendre
            <br />
            Co-concevoir localement avec un vrai impact
            <br />
            <br />
            <span className="font-bold text-pixl-teal">
              👉 Ce qu&apos;il nous manque : la distribution, le contexte, les
              contacts
            </span>
          </>
        ),
      },
      {
        title: "Idées concrètes de collaboration",
        subtitle: "Ce qu'on peut construire ensemble",
        content: (
          <>
            Test de Predict avec des cabinets marocains
            <br />
            Plug de briques Pixl dans vos apps (Kool, fintech app)
            <br />
            Lancer une plateforme MRE ↔ Locaux (talents & projets)
            <br />
            Pixl x Ora Technologies Innovation Lab (1 idée → 1 outil rapide)
          </>
        ),
      },
      {
        title: "Pourquoi maintenant",
        subtitle: "Le bon moment pour innover intelligemment",
        content: (
          <>
            Le besoin est réel, la tech est prête, les talents sont là.
            <br />
            Le marché marocain évolue vite.
            <br />
            Les MRE veulent s&apos;investir.
            <br />
            Predict est une première brique, mais on peut aller bien plus loin.
          </>
        ),
      },
      {
        title: "Clôture",
        subtitle: "On veut construire, pas juste impressionner.",
        content: (
          <>
            <span className="font-bold text-pixl-teal">
              🧠 On ne vend pas de buzzwords. On résout des problèmes.
            </span>
            <br />
            <br />
            <span className="font-bold text-pixl-teal">
              🌍 On veut que la tech marocaine rayonne.
            </span>
            <br />
            <br />
            <span className="font-bold text-pixl-teal">
              🔁 Predict n&apos;est que la première brique.
            </span>
            <br />
            <br />
            <span className="font-bold text-pixl-teal">
              🤝 On est là pour apprendre, partager, co-créer.
            </span>
          </>
        ),
      },
    ],
  },
  // Add more configurations here for other companies
} as const;

export type SlideConfig =
  (typeof slideConfigurations)[keyof typeof slideConfigurations];
