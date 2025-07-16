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
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-wave">👋</div>
                <span>Je suis Hamza Mounir, fondateur de Pixl.</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-pulse">💡</div>
                <span>
                  +10 ans d&apos;expérience produit / tech, 2 ans à fond dans
                  l&apos;IA.
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-bounce">🎯</div>
                <span>
                  On résout des problèmes concrets, on ne fait pas de buzzwords.
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-spin-slow">🚀</div>
                <span>
                  Notre mission : livrer des outils utiles, localement
                  pertinents, et exécutables.
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Le problème qu'on voit",
        subtitle: "Des problèmes qui ne sont toujours pas réglés…",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-shake">⚠️</div>
                <span>Outils métiers peu adaptés, souvent manuels.</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-pulse">🔒</div>
                <span>
                  Solutions locales rigides, étrangères peu localisées.
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-bounce">📉</div>
                <span>Résultat : perte de temps, erreurs, surcharge.</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-2xl animate-bounce">👉</span>
                  <span
                    className="animate-fade-in-right"
                    style={{ animationDelay: "0.8s" }}
                  >
                    Il est temps de concevoir local-first, mais avec ambition.
                  </span>
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Predict : un cas concret",
        subtitle: "Automatiser la comptabilité sans complexité",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">🤖</div>
                <span>
                  Extraction automatique de factures, matching bancaire, RAG
                  comptable.
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">🇧🇪</div>
                <span>Fonctionne déjà en Belgique.</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">⚡</div>
                <span>
                  API + architecture modulaire → déployable au Maroc rapidement.
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">🧩</div>
                <span>
                  Chaque brique peut être utilisée dans d&apos;autres contextes
                  (OCR, assistants, etc.)
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Pixl, un studio d'outils modulaires",
        subtitle: "Un atelier pour résoudre des problèmes métiers",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">📝</div>
                <span>Générateurs de contenu SEO & marketing</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">🤖</div>
                <span>Assistants clients basés sur la base interne</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">📄</div>
                <span>Extraction et traitement de documents métiers</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">⚙️</div>
                <span>Automatisation de tâches métier</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span
                  className="font-bold text-pixl-teal animate-fade-in-right"
                  style={{ animationDelay: "1s" }}
                >
                  IA quand c&apos;est utile. Code quand c&apos;est nécessaire.
                  Impact tout le temps.
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Le pont MRE ↔ Local",
        subtitle: "Créer une vraie passerelle entre les savoir-faire",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-bounce">🏗️</div>
                <span>Les MRE savent builder. Les locaux ont le terrain.</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-pulse">🔗</div>
                <span>Ce qu&apos;il manque : la connexion.</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-wiggle">🇲🇦</div>
                <span>
                  On veut tester, transmettre, construire et distribuer avec et
                  pour les marocains.
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Ce qu'on cherche",
        subtitle: "On ne cherche pas de levée, on cherche du terrain",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-bounce">🔍</div>
                <span>Comprendre les cas concrets marocains</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-pulse">🤝</div>
                <span>Travailler avec des partenaires terrain</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">⚡</div>
                <span>Tester rapidement et apprendre</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">🎯</div>
                <span>Co-concevoir localement avec un vrai impact</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-2xl animate-bounce">👉</span>
                  <span
                    className="animate-fade-in-right"
                    style={{ animationDelay: "1s" }}
                  >
                    Ce qu&apos;il nous manque : la distribution, le contexte,
                    les contacts
                  </span>
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Idées concrètes de collaboration",
        subtitle: "Ce qu'on peut construire ensemble",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">🧪</div>
                <span>Test de Predict avec des cabinets marocains</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">🔌</div>
                <span>
                  Plug de briques Pixl dans vos apps (Kool, fintech app)
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">🌐</div>
                <span>
                  Lancer une plateforme MRE ↔ Locaux (talents & projets)
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">🚀</div>
                <span>
                  Pixl x Ora Technologies Innovation Lab (1 idée → 1 outil
                  rapide)
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Pourquoi maintenant",
        subtitle: "Le bon moment pour innover intelligemment",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">✅</div>
                <span>
                  Le besoin est réel, la tech est prête, les talents sont là.
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">📈</div>
                <span>Le marché marocain évolue vite.</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-wiggle">💪</div>
                <span>Les MRE veulent s&apos;investir.</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-spin-slow">🧱</div>
                <span>
                  Predict est une première brique, mais on peut aller bien plus
                  loin.
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Clôture",
        subtitle: "On veut construire, pas juste impressionner.",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-3xl animate-pulse">🧠</span>
                  <span>
                    On ne vend pas de buzzwords. On résout des problèmes.
                  </span>
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-3xl animate-bounce">🌍</span>
                  <span>On veut que la tech marocaine rayonne.</span>
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-3xl animate-spin-slow">🔁</span>
                  <span>Predict n&apos;est que la première brique.</span>
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-3xl animate-wiggle">🤝</span>
                  <span>On est là pour apprendre, partager, co-créer.</span>
                </span>
              </div>
            </div>
          </>
        ),
      },
    ],
  },
  ecommerce: {
    passcode: "54321", // 5-digit passcode for E-commerce presentation
    partnerLogo: null,
    partnerName: "E-commerce MVP",
    slides: [
      {
        title: "De l'idée à la première vente",
        subtitle: "Comment créer un MVP e-commerce qui génère du chiffre",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-wave">👋</div>
                <span>
                  De l&apos;idée au cash : 30 jours pour valider votre concept
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-pulse">💡</div>
                <span>Un framework testé pour lancer rapidement</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-bounce">🎯</div>
                <span>
                  Focus sur la validation marché, pas la perfection technique
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-spin-slow">🚀</div>
                <span>
                  Cas concret : &quot;EcoChic&quot; - vêtements écoresponsables
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Le problème classique",
        subtitle: "Pourquoi 90% des e-commerces échouent",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-shake">❌</div>
                <span>Trop de temps sur le site, pas assez sur le marché</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-pulse">💸</div>
                <span>Budget épuisé avant la première vente</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-wiggle">🤔</div>
                <span>Produit créé sans validation client</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-bounce">🔍</div>
                <span>Aucune donnée pour optimiser</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-2xl animate-bounce">👉</span>
                  <span
                    className="animate-fade-in-right"
                    style={{ animationDelay: "1s" }}
                  >
                    Solution : Vendre avant de construire
                  </span>
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "EcoChic : Notre cas d'étude",
        subtitle: "Vêtements écoresponsables made in Morocco",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">🌱</div>
                <span>Concept : Mode durable, production locale</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">👥</div>
                <span>Cible : Femmes 25-40 ans, conscientes environnement</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">💰</div>
                <span>Budget : 5000€ pour 30 jours</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">🎯</div>
                <span>Objectif : 10 ventes en 30 jours</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span
                  className="font-bold text-pixl-teal animate-fade-in-right"
                  style={{ animationDelay: "1s" }}
                >
                  " &quot;Vendre 1 produit à 10 personnes, pas 10 produits à 1
                  personne&quot;"
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Semaine 1 : Validation rapide",
        subtitle: "Tester l'appétit marché sans investir",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">📱</div>
                <span>Landing page simple : Canva + Carrd (2h)</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">📸</div>
                <span>Photos produits : iPhone + lumière naturelle</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">🎯</div>
                <span>Facebook Ads : 50€ pour tester l&apos;intérêt</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">📊</div>
                <span>Métriques : CTR &gt; 2%, CPC &lt; 0.5€</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-2xl animate-bounce">📈</span>
                  <span
                    className="animate-fade-in-right"
                    style={{ animationDelay: "1s" }}
                  >
                    Résultat EcoChic : 3.2% CTR, 847 clics, 23 emails collectés
                  </span>
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Semaine 2 : Pré-commandes",
        subtitle: "Vendre avant de produire",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">💳</div>
                <span>Stripe checkout : Pré-commande avec -30%</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">📧</div>
                <span>Email aux 23 prospects : Offre limitée</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">🎥</div>
                <span>Vidéo produit : 60 secondes sur TikTok/Insta</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">🤝</div>
                <span>Partenariat micro-influenceuse : Échange produit</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-2xl animate-bounce">💰</span>
                  <span
                    className="animate-fade-in-right"
                    style={{ animationDelay: "1s" }}
                  >
                    Résultat : 7 pré-commandes = 490€ de CA validé
                  </span>
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Semaine 3 : Production & logistique",
        subtitle: "Concrétiser les commandes",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">🏭</div>
                <span>Fournisseur local : 48h de production</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">📦</div>
                <span>Packaging DIY : Papier kraft + sticker EcoChic</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">🚚</div>
                <span>Livraison : Amana ou main propre</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">📱</div>
                <span>Communication : WhatsApp pour le suivi</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span
                  className="font-bold text-pixl-teal animate-fade-in-right"
                  style={{ animationDelay: "1s" }}
                >
                  Coût total production : 210€ pour 7 unités (marge 57%)
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Semaine 4 : Optimisation & scale",
        subtitle: "Capitaliser sur les premiers succès",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">⭐</div>
                <span>Collecte témoignages et photos clients</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">🔄</div>
                <span>Relance anciens prospects avec social proof</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">📈</div>
                <span>Augmentation budget ads : 150€ supplémentaires</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">🎯</div>
                <span>Lookalike audiences basées sur acheteurs</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-2xl animate-bounce">🎉</span>
                  <span
                    className="animate-fade-in-right"
                    style={{ animationDelay: "1s" }}
                  >
                    Résultat final : 12 ventes = 840€ CA, objectif dépassé !
                  </span>
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Les outils indispensables",
        subtitle: "Stack technique minimaliste mais efficace",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">🌐</div>
                <span>Landing : Carrd (9$/mois) ou Shopify Lite</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">💳</div>
                <span>Paiement : Stripe (2.9% + 0.30€)</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">📊</div>
                <span>Analytics : Google Analytics + Facebook Pixel</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">📧</div>
                <span>Email : Mailchimp (gratuit jusqu'à 2000 contacts)</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span
                  className="font-bold text-pixl-teal animate-fade-in-right"
                  style={{ animationDelay: "1s" }}
                >
                  Coût total outils : 47€/mois max
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Les métriques qui comptent",
        subtitle: "Mesurer ce qui génère du chiffre",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">🎯</div>
                <span>CTR publicité : &gt; 2% (EcoChic : 3.2%)</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">📧</div>
                <span>Taux conversion email : &gt; 15% (EcoChic : 30%)</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">💰</div>
                <span>CAC (Coût Acquisition Client) : &lt; 20€</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">🔄</div>
                <span>LTV/CAC ratio : &gt; 3 (EcoChic : 4.2)</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span
                  className="font-bold text-pixl-teal animate-fade-in-right"
                  style={{ animationDelay: "1s" }}
                >
                  "Ce qui ne se mesure pas ne s'améliore pas"
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Prochaines étapes",
        subtitle: "De MVP à business pérenne",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl animate-pulse">🏪</div>
                <span>Site e-commerce complet (Shopify, WooCommerce)</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl animate-bounce">📦</div>
                <span>Automatisation logistique et stock</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <div className="text-3xl animate-spin-slow">👥</div>
                <span>Équipe : Community manager + assistant logistique</span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <div className="text-3xl animate-wiggle">🌍</div>
                <span>Expansion : Nouvelles collections + marchés</span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-2xl animate-bounce">🚀</span>
                  <span
                    className="animate-fade-in-right"
                    style={{ animationDelay: "1s" }}
                  >
                    Objectif 6 mois : 50 ventes/mois, 3500€ CA mensuel
                  </span>
                </span>
              </div>
            </div>
          </>
        ),
      },
      {
        title: "Récapitulatif",
        subtitle: "La méthode qui marche",
        content: (
          <>
            <div className="space-y-6 text-left">
              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-3xl animate-pulse">⚡</span>
                  <span>Rapide : 30 jours pour valider</span>
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-3xl animate-bounce">💰</span>
                  <span>Économique : Moins de 500€ d'investissement</span>
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.6s" }}
              >
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-3xl animate-spin-slow">🎯</span>
                  <span>Validé : Ventes réelles avant gros investissement</span>
                </span>
              </div>

              <div
                className="flex items-start gap-4 animate-fade-in-up"
                style={{ animationDelay: "0.8s" }}
              >
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-3xl animate-wiggle">📊</span>
                  <span>
                    Data-driven : Décisions basées sur métriques réelles
                  </span>
                </span>
              </div>
            </div>

            <div className="mt-8 relative text-left">
              <div className="absolute inset-0 bg-gradient-to-r from-pixl-teal/20 to-transparent rounded-lg animate-pulse"></div>
              <div className="relative p-4 border-l-4 border-pixl-teal bg-pixl-teal/5 rounded-r-lg">
                <span className="font-bold text-pixl-teal flex items-start gap-3">
                  <span className="text-2xl animate-bounce">💡</span>
                  <span
                    className="animate-fade-in-right"
                    style={{ animationDelay: "1s" }}
                  >
                    Prêt à lancer votre MVP ? Commencez demain !
                  </span>
                </span>
              </div>
            </div>
          </>
        ),
      },
    ],
  },
  // Add more configurations here for other companies
} as const;

export type SlideConfig =
  (typeof slideConfigurations)[keyof typeof slideConfigurations];
