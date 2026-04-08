import type { LucideIcon } from "lucide-react";
import { Workflow, Network } from "lucide-react";
import type { SupportedLanguages } from "@/lib/translations";

type Localized = Record<SupportedLanguages, string>;

export interface BlogPostData {
  slug: string;
  icon: LucideIcon;
  date: string;
  authors: { name: string; linkedin: string }[];
  title: Localized;
  description: Localized;
  category: Localized;
  tags: Record<SupportedLanguages, string[]>;
  readTime: Localized;
  content: Localized;
}

export interface BlogPost {
  slug: string;
  icon: LucideIcon;
  date: string;
  authors: { name: string; linkedin: string }[];
  title: string;
  description: string;
  category: string;
  tags: string[];
  readTime: string;
  content: string;
}

function resolve(post: BlogPostData, lang: SupportedLanguages): BlogPost {
  return {
    slug: post.slug,
    icon: post.icon,
    date: post.date,
    authors: post.authors,
    title: post.title[lang],
    description: post.description[lang],
    category: post.category[lang],
    tags: post.tags[lang],
    readTime: post.readTime[lang],
    content: post.content[lang],
  };
}

const blogPosts: BlogPostData[] = [
  {
    slug: "ai-is-not-about-models-its-about-systems",
    icon: Network,
    date: "2026-04-08",
    authors: [
      { name: "Hamza Mounir", linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/" },
    ],
    title: {
      en: "AI Is Not About Models. It's About Systems.",
      fr: "L'IA n'est pas une affaire de modèles. C'est une affaire de systèmes.",
      nl: "AI draait niet om modellen. Het draait om systemen.",
    },
    description: {
      en: "Why companies won't get real value from AI by stacking tools on top of chaos, and why systems matter more than models.",
      fr: "Pourquoi les entreprises ne tireront pas de vraie valeur de l'IA en empilant des outils sur le chaos, et pourquoi les systèmes comptent plus que les modèles.",
      nl: "Waarom bedrijven geen echte waarde uit AI halen door tools bovenop chaos te stapelen, en waarom systemen belangrijker zijn dan modellen.",
    },
    category: {
      en: "Strategy",
      fr: "Stratégie",
      nl: "Strategie",
    },
    tags: {
      en: ["AI Systems", "Operations", "Strategy"],
      fr: ["Systèmes IA", "Opérations", "Stratégie"],
      nl: ["AI-systemen", "Operations", "Strategie"],
    },
    readTime: {
      en: "7 min",
      fr: "7 min",
      nl: "7 min",
    },
    content: {
      en: `
Over the past year, AI has moved from experimentation to daily use. Teams now rely on it to write content, answer customers, analyze data, support operations, and accelerate software development. The tools are better than ever, easier to access, and improving at remarkable speed.

And yet, inside many companies, the underlying reality has not changed as much as expected.

Decisions remain inconsistent. Knowledge is still scattered across documents, chats, tools, and individuals. Teams continue to depend on a few key people rather than on repeatable systems. The issue is not that AI is underperforming. The issue is that most organizations are trying to plug AI into environments that were already fragmented before AI arrived.

AI is not failing. The way companies integrate it is.

## The Illusion of Progress

On the surface, adoption looks strong. Leadership is investing. Employees are experimenting. New workflows are appearing across departments. But when you look closely, the gains are often narrow.

Support teams may answer faster, but not always consistently. Marketing teams may produce more content, but alignment suffers. Operations teams may automate steps, yet still rely on manual oversight to catch avoidable issues. In each case, AI appears useful, but not transformative.

That is because most companies are using AI as a layer on top of broken structures. They expect it to compensate for disconnected knowledge, vague rules, and inconsistent execution. It cannot.

The problem is not capability. It is structure.

## The Problems AI Exposes

Long before AI entered the picture, most organizations already had three persistent weaknesses.

The first is fragmented knowledge. Important information lives in too many places, with too little connection between them. Policies sit in one tool, project decisions in another, tribal knowledge in private conversations, and practical know-how in the heads of experienced employees.

The second is inconsistent work. Most companies do have standards, but those standards are not applied evenly. Two people doing the same task can produce very different outcomes because the rules are interpreted differently, remembered differently, or not visible at the moment of execution.

The third is overdependence on individuals. Expertise is concentrated instead of distributed. Onboarding takes too long. Teams repeat mistakes because the reasoning behind previous decisions was never captured in a usable way.

These are not AI problems. They are system problems. AI simply makes them impossible to ignore.

## From Tools to Systems

This is where the conversation needs to change.

Most organizations still think of AI as a tool. They add a chatbot, automate a workflow, or speed up content production. These improvements can be valuable, but they are local optimizations. They do not change how the company actually operates.

The real shift happens when AI is no longer treated as a standalone feature, but as the interface between knowledge, rules, and execution.

The important question is no longer "What can AI do?" The better question is "How should work be structured so AI can support it reliably?"

Once you ask that, the architecture becomes clearer.

A useful AI system is not just a model generating outputs. It is a chain that connects what the company knows, how it wants to operate, how work gets done, and where human judgment remains essential.

Knowledge leads into guidelines. Guidelines shape execution. Execution remains accountable through human validation.

## Knowledge: Defining What Is True

Every company already has knowledge. The issue is rarely a lack of information. The issue is that information is poorly organized.

A strong knowledge layer does more than store documents. It connects decisions, context, history, and relationships between pieces of information. It turns scattered data into something navigable and meaningful.

When this layer is structured properly, both employees and AI can work from the same foundation. A support agent no longer guesses the correct answer based on memory. A marketer no longer reinterprets the brand every time they write. An operator no longer rebuilds context from scratch for every recurring task.

Clarity becomes the starting point.

## Guidelines: Defining What Is Allowed

Knowledge alone does not guarantee consistency. Two people can access the same information and still make different choices.

This is why guidelines matter. Guidelines define the standards, constraints, and expectations that shape how the organization works. They clarify what quality looks like, what should be avoided, and what must always be respected.

In many companies, these rules exist only passively. They sit in slide decks, internal docs, or the heads of experienced team members. That makes them easy to overlook and hard to apply consistently.

When guidelines are embedded into AI systems, they become active rather than passive. They stop being reminders and start becoming operating logic.

> Knowledge tells you what is true.
> Guidelines tell you what is allowed.

## Execution: Supporting What Gets Done

This is the layer people usually notice first. It is where AI assistants, copilots, agents, and automated workflows actually interact with daily work.

But execution only becomes reliable when it is grounded in structured knowledge and shaped by active guidelines. Without those layers, AI produces outputs in isolation. With them, AI operates inside a system.

That changes the nature of execution. It is no longer improvised. It becomes guided.

A task is no longer simply performed by an individual using a clever tool. It is executed within a framework that provides context, constraints, and consistency.

That is where scale starts to become real.

## Human Validation: Keeping Responsibility Where It Belongs

None of this removes the need for human judgment. It makes that judgment more effective.

Humans remain accountable for decisions, tradeoffs, and outcomes. AI can accelerate, assist, and guide, but responsibility stays with people. That is not a weakness in the system. It is one of its defining strengths.

Human validation preserves critical thinking. It protects trust. It ensures that expertise is not displaced, but reinforced.

The goal is not to remove humans from the loop. It is to give them a better loop.

## What Changes When the System Is in Place

When these layers are connected, the impact is not just incremental productivity. The organization itself becomes more coherent.

Support teams can respond faster without sacrificing consistency. Marketing can move faster while protecting tone and quality. Operations can reduce repetitive coordination and rely on clearer workflows. Leadership gains better visibility because work is happening inside a connected system rather than across disconnected islands.

For employees, the change is even more immediate. Less time is spent searching, guessing, and redoing work. More time is spent executing with context.

| Function | Before AI System | With AI System |
|---|---|---|
| Customer Support | Inconsistent answers and slow onboarding | Faster, aligned, guideline-based responses |
| Marketing | Content quality varies by person | Consistent tone and faster execution |
| Operations | Manual coordination and repetitive work | Structured workflows and less friction |
| Leadership | Limited visibility across teams | Better context and clearer decisions |
| Employees | Searching, guessing, and redoing work | Guided execution with shared context |

The pattern is simple: less friction, more alignment, better outcomes.

## AI as a Distribution Layer for Expertise

One of the most important effects of this approach is that it changes how expertise flows through a company.

In most organizations, expertise is concentrated. It lives with senior employees, in specific teams, or inside undocumented decisions. That creates bottlenecks and makes quality difficult to scale.

A systems-based AI approach allows companies to encode how decisions are made, how work should be executed, and which standards must be followed. Once that knowledge is embedded into the operating system of the company, it becomes accessible to everyone.

This does not replace experts. It extends their reach.

AI does not remove expertise. It scales it.

## A Simple Example

Take something as basic as communication guidelines. In many companies, marketing defines a tone of voice, positioning rules, and messaging principles. But once those guidelines leave the marketing team, consistency starts to break down.

A developer writing release notes, a support agent replying to a customer, and a marketer launching a campaign may all interpret the same brand differently.

Now imagine those guidelines are embedded directly into the system. Every output, whether it is a customer response, internal document, campaign draft, or product message, is generated within the same rules.

Consistency no longer depends on reminders or repeated reviews. It becomes part of the system itself.

That is a much more meaningful use of AI than simply generating text faster.

## The Real Opportunity

Many companies are focused on the wrong question. They ask which model to choose, which tool to buy, or which feature to adopt next.

Those are not irrelevant questions, but they are surface-level ones.

The deeper opportunity is to design the underlying system that allows AI to be useful across the organization in a reliable way. The companies that benefit most from AI will not necessarily be the ones with access to the newest model. They will be the ones that create the clearest connection between knowledge, rules, execution, and human oversight.

> The winners will not just have better tools.
> They will have better systems.

## Looking Ahead

This points toward a different kind of organization.

Not one where AI replaces work, but one where work is structured so AI can support it properly. An organization where knowledge is connected, rules are applied consistently, execution is guided in real time, and humans operate with full context instead of partial visibility.

This is not a distant vision. It is already beginning to take shape.

## Final Thought

AI is often framed as a productivity tool. That framing is too narrow.

Its real value is not just speed. It is the ability to help organizations work with greater clarity, consistency, and scale. But that only happens when AI is treated as part of the operating system of the company, not as a disconnected feature layered on top of chaos.

AI is not about what it can generate.

It is about how your organization is structured to use it.
      `.trim(),

      fr: `
Au cours de l'année écoulée, l'IA est passée du stade de l'expérimentation à celui de l'usage quotidien. Les équipes l'utilisent désormais pour rédiger du contenu, répondre aux clients, analyser des données, soutenir les opérations et accélérer le développement logiciel. Les outils n'ont jamais été aussi performants, aussi accessibles, et ils progressent à grande vitesse.

Et pourtant, dans beaucoup d'entreprises, la réalité de fond n'a pas autant changé qu'on aurait pu l'espérer.

Les décisions restent incohérentes. La connaissance reste dispersée entre documents, conversations, outils et individus. Les équipes dépendent encore de quelques personnes clés au lieu de s'appuyer sur des systèmes reproductibles. Le problème n'est pas que l'IA ne soit pas performante. Le problème est que la plupart des organisations essaient d'injecter l'IA dans des environnements déjà fragmentés avant même son arrivée.

L'IA n'échoue pas. C'est sa manière d'être intégrée dans les entreprises qui échoue.

## L'illusion du progrès

En apparence, l'adoption est forte. La direction investit. Les équipes expérimentent. De nouveaux workflows apparaissent dans plusieurs départements. Mais dès qu'on regarde de plus près, les gains restent souvent limités.

Le support peut répondre plus vite, mais pas toujours de manière cohérente. Le marketing peut produire davantage de contenu, mais l'alignement en souffre. Les opérations peuvent automatiser certaines étapes, tout en dépendant encore de contrôles manuels pour éviter des erreurs prévisibles. Dans chaque cas, l'IA semble utile, sans être réellement transformative.

Cela s'explique simplement : la plupart des entreprises utilisent l'IA comme une couche ajoutée par-dessus des structures déjà défaillantes. Elles attendent d'elle qu'elle compense une connaissance déconnectée, des règles floues et une exécution incohérente. Elle ne le peut pas.

Le problème n'est pas la capacité. C'est la structure.

## Les problèmes que l'IA met en lumière

Bien avant l'arrivée de l'IA, la plupart des organisations souffraient déjà de trois faiblesses persistantes.

La première est la fragmentation de la connaissance. Les informations importantes vivent dans trop d'endroits, avec trop peu de liens entre elles. Les politiques sont dans un outil, les décisions projet dans un autre, le savoir implicite dans des conversations privées, et le savoir-faire pratique dans la tête des collaborateurs expérimentés.

La deuxième est l'incohérence dans le travail. La plupart des entreprises ont bien des standards, mais ils ne sont pas appliqués de façon homogène. Deux personnes réalisant la même tâche peuvent produire des résultats très différents parce que les règles sont interprétées différemment, retenues différemment, ou tout simplement absentes au moment de l'exécution.

La troisième est la dépendance excessive aux individus. L'expertise est concentrée au lieu d'être diffusée. L'onboarding est lent. Les équipes répètent les mêmes erreurs parce que le raisonnement derrière les décisions passées n'a jamais été capturé dans une forme exploitable.

Ces problèmes ne sont pas des problèmes d'IA. Ce sont des problèmes de système. L'IA ne fait que les rendre impossibles à ignorer.

## Des outils aux systèmes

C'est là que la conversation doit changer.

La plupart des organisations considèrent encore l'IA comme un outil. Elles ajoutent un chatbot, automatisent un workflow, ou accélèrent la production de contenu. Ces améliorations peuvent être utiles, mais elles restent locales. Elles ne transforment pas réellement la façon dont l'entreprise fonctionne.

Le vrai basculement se produit lorsque l'IA n'est plus traitée comme une fonctionnalité isolée, mais comme l'interface entre la connaissance, les règles et l'exécution.

La vraie question n'est plus : "Que peut faire l'IA ?" La meilleure question est : "Comment structurer le travail pour que l'IA puisse le soutenir de manière fiable ?"

À partir de là, l'architecture devient plus claire.

Un système d'IA utile n'est pas simplement un modèle qui génère des sorties. C'est une chaîne qui relie ce que l'entreprise sait, la manière dont elle veut fonctionner, la manière dont le travail est exécuté, et l'endroit où le jugement humain reste essentiel.

La connaissance alimente les règles. Les règles structurent l'exécution. L'exécution reste responsable grâce à la validation humaine.

## Connaissance : définir ce qui est vrai

Chaque entreprise possède déjà de la connaissance. Le problème n'est presque jamais le manque d'information. Le problème est que cette information est mal organisée.

Une couche de connaissance solide ne se contente pas de stocker des documents. Elle relie les décisions, le contexte, l'historique et les relations entre les informations. Elle transforme des données dispersées en un ensemble navigable et exploitable.

Lorsque cette couche est correctement structurée, les employés comme l'IA peuvent travailler à partir de la même base. Un agent support ne devine plus la bonne réponse. Un marketeur ne réinterprète plus la marque à chaque contenu. Un opérateur ne reconstruit plus le contexte à partir de zéro à chaque tâche récurrente.

La clarté devient le point de départ.

## Règles : définir ce qui est permis

La connaissance seule ne garantit pas la cohérence. Deux personnes peuvent accéder à la même information et malgré tout faire des choix différents.

C'est là que les règles deviennent essentielles. Elles définissent les standards, les contraintes et les attentes qui structurent la manière dont l'organisation fonctionne. Elles précisent ce que signifie la qualité, ce qu'il faut éviter, et ce qui doit toujours être respecté.

Dans beaucoup d'entreprises, ces règles n'existent que de manière passive. Elles vivent dans des slides, des documents internes ou la mémoire de quelques personnes expérimentées. Elles sont donc faciles à oublier et difficiles à appliquer de manière cohérente.

Quand ces règles sont intégrées aux systèmes d'IA, elles deviennent actives au lieu de rester passives. Elles cessent d'être de simples rappels pour devenir de la logique opérationnelle.

> La connaissance dit ce qui est vrai.
> Les règles disent ce qui est permis.

## Exécution : soutenir ce qui doit être fait

C'est la couche que l'on remarque le plus facilement. C'est là que les assistants IA, copilots, agents et workflows automatisés interagissent avec le travail quotidien.

Mais l'exécution ne devient fiable que lorsqu'elle repose sur une connaissance structurée et sur des règles actives. Sans ces couches, l'IA produit des sorties de manière isolée. Avec elles, elle agit à l'intérieur d'un système.

Cela change profondément la nature de l'exécution. Elle n'est plus improvisée. Elle devient guidée.

Une tâche n'est plus simplement réalisée par une personne utilisant un outil intelligent. Elle est exécutée dans un cadre qui fournit contexte, contraintes et cohérence.

C'est là que l'échelle commence à devenir réelle.

## Validation humaine : garder la responsabilité au bon endroit

Rien de tout cela ne supprime le besoin de jugement humain. Au contraire, cela le rend plus efficace.

Les humains restent responsables des décisions, des arbitrages et des résultats. L'IA peut accélérer, assister et guider, mais la responsabilité reste humaine. Ce n'est pas une faiblesse du système. C'est l'une de ses forces structurelles.

La validation humaine préserve l'esprit critique. Elle protège la confiance. Elle garantit que l'expertise n'est pas déplacée, mais renforcée.

L'objectif n'est pas de retirer les humains de la boucle. L'objectif est de leur offrir une meilleure boucle.

## Ce qui change quand le système est en place

Lorsque ces couches sont reliées, l'impact ne se limite pas à quelques gains de productivité. C'est l'organisation elle-même qui devient plus cohérente.

Le support peut répondre plus vite sans sacrifier la cohérence. Le marketing peut aller plus vite tout en protégeant le ton et la qualité. Les opérations peuvent réduire la coordination répétitive et s'appuyer sur des workflows plus clairs. La direction gagne en visibilité parce que le travail se déroule à l'intérieur d'un système connecté plutôt qu'à travers des silos déconnectés.

Pour les employés, le changement est encore plus concret. Moins de temps passé à chercher, deviner et refaire. Plus de temps à exécuter avec du contexte.

| Fonction | Avant le système IA | Avec le système IA |
|---|---|---|
| Support client | Réponses incohérentes et onboarding lent | Réponses plus rapides, alignées et guidées |
| Marketing | La qualité du contenu dépend de la personne | Ton cohérent et exécution plus rapide |
| Opérations | Coordination manuelle et travail répétitif | Workflows structurés et moins de friction |
| Direction | Visibilité limitée entre les équipes | Plus de contexte et de meilleures décisions |
| Employés | Chercher, deviner et recommencer | Exécution guidée avec contexte partagé |

Le schéma est simple : moins de friction, plus d'alignement, de meilleurs résultats.

## L'IA comme couche de distribution de l'expertise

L'un des effets les plus importants de cette approche est qu'elle transforme la manière dont l'expertise circule dans l'entreprise.

Dans la plupart des organisations, l'expertise est concentrée. Elle vit chez les profils seniors, dans certaines équipes, ou dans des décisions jamais documentées. Cela crée des goulots d'étranglement et rend la qualité difficile à faire monter à l'échelle.

Une approche systémique de l'IA permet aux entreprises d'encoder la manière dont les décisions sont prises, dont le travail doit être exécuté, et quels standards doivent être suivis. Une fois cette connaissance intégrée dans le système opérant de l'entreprise, elle devient accessible à tous.

Cela ne remplace pas les experts. Cela étend leur portée.

L'IA ne supprime pas l'expertise. Elle la met à l'échelle.

## Un exemple simple

Prenons quelque chose d'aussi simple que des guidelines de communication. Dans beaucoup d'entreprises, le marketing définit un ton de voix, des règles de positionnement et des principes de messaging. Mais dès que ces guidelines sortent de l'équipe marketing, la cohérence commence à se dégrader.

Un développeur qui écrit une release note, un agent support qui répond à un client, et un marketeur qui lance une campagne peuvent tous interpréter la même marque différemment.

Maintenant, imaginez que ces guidelines soient directement intégrées dans le système. Chaque sortie, qu'il s'agisse d'une réponse client, d'un document interne, d'un draft de campagne ou d'un message produit, est générée à l'intérieur des mêmes règles.

La cohérence ne dépend plus de rappels ou de relectures répétées. Elle devient une propriété du système lui-même.

C'est une utilisation bien plus intéressante de l'IA que le simple fait de générer du texte plus vite.

## La véritable opportunité

Beaucoup d'entreprises se concentrent sur la mauvaise question. Elles demandent quel modèle choisir, quel outil acheter, ou quelle fonctionnalité adopter ensuite.

Ces questions ne sont pas inutiles, mais elles restent superficielles.

L'opportunité la plus profonde consiste à concevoir le système sous-jacent qui permet à l'IA d'être réellement utile, de manière fiable, à l'échelle de toute l'organisation. Les entreprises qui tireront le plus de valeur de l'IA ne seront pas forcément celles qui auront accès au dernier modèle. Ce seront celles qui construiront le lien le plus clair entre connaissance, règles, exécution et supervision humaine.

> Les gagnants n'auront pas seulement de meilleurs outils.
> Ils auront de meilleurs systèmes.

## Vers quoi on va

Tout cela dessine une autre forme d'organisation.

Pas une organisation où l'IA remplace le travail, mais une organisation où le travail est structuré pour que l'IA puisse réellement le soutenir. Une organisation où la connaissance est connectée, où les règles sont appliquées de manière cohérente, où l'exécution est guidée en temps réel, et où les humains travaillent avec un contexte complet plutôt qu'avec une visibilité partielle.

Ce n'est pas une vision lointaine. C'est déjà en train de commencer.

## Dernière idée

L'IA est souvent présentée comme un simple outil de productivité. Cette vision est trop étroite.

Sa vraie valeur n'est pas seulement la vitesse. C'est sa capacité à aider les organisations à travailler avec plus de clarté, de cohérence et d'échelle. Mais cela n'arrive que lorsque l'IA est traitée comme une partie du système opérant de l'entreprise, et non comme une fonctionnalité ajoutée par-dessus le chaos.

L'IA ne se résume pas à ce qu'elle peut générer.

Elle dépend de la manière dont votre organisation est structurée pour l'utiliser.
      `.trim(),

      nl: `
Het afgelopen jaar is AI verschoven van experiment naar dagelijks gebruik. Teams gebruiken het nu om content te schrijven, klanten te helpen, data te analyseren, operations te ondersteunen en softwareontwikkeling te versnellen. De tools zijn beter dan ooit, veel toegankelijker, en gaan razendsnel vooruit.

En toch is de onderliggende realiteit in veel bedrijven veel minder veranderd dan verwacht.

Beslissingen blijven inconsistent. Kennis blijft verspreid over documenten, chats, tools en individuen. Teams blijven afhankelijk van een paar sleutelpersonen in plaats van van herhaalbare systemen. Het probleem is niet dat AI ondermaats presteert. Het probleem is dat de meeste organisaties AI proberen toe te voegen aan omgevingen die al versnipperd waren voordat AI opkwam.

AI faalt niet. De manier waarop bedrijven het integreren faalt.

## De illusie van vooruitgang

Op papier lijkt adoptie sterk. Leiderschap investeert. Medewerkers experimenteren. Nieuwe workflows verschijnen in meerdere afdelingen. Maar zodra je beter kijkt, blijken de winsten vaak beperkt.

Supportteams kunnen sneller antwoorden, maar niet altijd consistent. Marketingteams kunnen meer content produceren, maar de afstemming lijdt eronder. Operationele teams kunnen stappen automatiseren, maar vertrouwen nog steeds op manuele controles om voorspelbare fouten op te vangen. In elk geval lijkt AI nuttig, maar niet echt transformerend.

Dat komt omdat de meeste bedrijven AI gebruiken als een extra laag bovenop gebrekkige structuren. Ze verwachten dat AI versnipperde kennis, vage regels en inconsistente uitvoering compenseert. Dat kan het niet.

Het probleem is niet capaciteit. Het is structuur.

## De problemen die AI blootlegt

Lang voordat AI op het toneel verscheen, worstelden de meeste organisaties al met drie hardnekkige zwaktes.

De eerste is gefragmenteerde kennis. Belangrijke informatie leeft op te veel plekken, met te weinig verband ertussen. Beleidsregels zitten in de ene tool, projectbeslissingen in een andere, impliciete kennis in privégesprekken en praktische expertise in de hoofden van ervaren medewerkers.

De tweede is inconsistent werk. De meeste bedrijven hebben wel standaarden, maar die worden niet gelijkmatig toegepast. Twee mensen die dezelfde taak uitvoeren, kunnen heel verschillende resultaten produceren omdat regels anders worden geïnterpreteerd, anders worden onthouden, of simpelweg niet zichtbaar zijn op het moment van uitvoering.

De derde is een te grote afhankelijkheid van individuen. Expertise is geconcentreerd in plaats van verspreid. Onboarding duurt te lang. Teams herhalen fouten omdat de redenering achter eerdere beslissingen nooit bruikbaar is vastgelegd.

Dit zijn geen AI-problemen. Dit zijn systeemproblemen. AI maakt ze alleen onmogelijk om te negeren.

## Van tools naar systemen

Hier moet het gesprek veranderen.

De meeste organisaties zien AI nog steeds als een tool. Ze voegen een chatbot toe, automatiseren een workflow of versnellen contentproductie. Die verbeteringen kunnen waardevol zijn, maar blijven lokale optimalisaties. Ze veranderen niet fundamenteel hoe het bedrijf werkt.

De echte verschuiving gebeurt wanneer AI niet langer wordt behandeld als een losse feature, maar als de interface tussen kennis, regels en uitvoering.

De belangrijke vraag is niet langer "Wat kan AI doen?" De betere vraag is "Hoe moet werk worden gestructureerd zodat AI het betrouwbaar kan ondersteunen?"

Zodra je die vraag stelt, wordt de architectuur helderder.

Een bruikbaar AI-systeem is niet simpelweg een model dat outputs genereert. Het is een keten die verbindt wat het bedrijf weet, hoe het wil opereren, hoe werk wordt uitgevoerd en waar menselijk oordeel essentieel blijft.

Kennis voedt richtlijnen. Richtlijnen sturen uitvoering. Uitvoering blijft verantwoord via menselijke validatie.

## Kennis: definiëren wat waar is

Elk bedrijf heeft al kennis. Het probleem is zelden een gebrek aan informatie. Het probleem is dat die informatie slecht georganiseerd is.

Een sterke kennislaag doet meer dan documenten opslaan. Ze verbindt beslissingen, context, geschiedenis en relaties tussen informatie. Ze verandert verspreide data in iets navigeerbaars en betekenisvols.

Wanneer die laag goed is gestructureerd, kunnen zowel medewerkers als AI vanuit dezelfde basis werken. Een supportmedewerker hoeft het juiste antwoord niet langer te gokken. Een marketeer hoeft het merk niet telkens opnieuw te interpreteren. Een operator hoeft context niet telkens opnieuw op te bouwen voor terugkerend werk.

Helderheid wordt het vertrekpunt.

## Richtlijnen: definiëren wat toegestaan is

Kennis alleen garandeert geen consistentie. Twee mensen kunnen toegang hebben tot dezelfde informatie en toch verschillende keuzes maken.

Daarom zijn richtlijnen essentieel. Richtlijnen definiëren de standaarden, beperkingen en verwachtingen die bepalen hoe de organisatie werkt. Ze maken duidelijk wat kwaliteit betekent, wat vermeden moet worden en wat altijd gerespecteerd moet worden.

In veel bedrijven bestaan deze regels alleen passief. Ze leven in slides, interne documenten of in het hoofd van ervaren medewerkers. Daardoor zijn ze makkelijk te vergeten en moeilijk consequent toe te passen.

Wanneer richtlijnen in AI-systemen worden ingebed, worden ze actief in plaats van passief. Ze stoppen met louter herinneringen te zijn en worden operationele logica.

> Kennis vertelt je wat waar is.
> Richtlijnen vertellen je wat toegestaan is.

## Uitvoering: ondersteunen wat gedaan moet worden

Dit is de laag die mensen meestal als eerste opmerken. Hier interageren AI-assistenten, copilots, agents en geautomatiseerde workflows met het dagelijkse werk.

Maar uitvoering wordt pas betrouwbaar wanneer ze steunt op gestructureerde kennis en actieve richtlijnen. Zonder die lagen produceert AI outputs in isolatie. Met die lagen werkt AI binnen een systeem.

Dat verandert de aard van uitvoering. Ze is niet langer geïmproviseerd. Ze wordt gestuurd.

Een taak wordt niet langer simpelweg uitgevoerd door een individu met een slimme tool. Ze wordt uitgevoerd binnen een kader dat context, beperkingen en consistentie levert.

Daar begint schaal echt te worden.

## Menselijke validatie: verantwoordelijkheid op de juiste plek houden

Niets hiervan elimineert de nood aan menselijk oordeel. Het maakt dat oordeel effectiever.

Mensen blijven verantwoordelijk voor beslissingen, afwegingen en resultaten. AI kan versnellen, ondersteunen en begeleiden, maar verantwoordelijkheid blijft bij mensen. Dat is geen zwakte van het systeem. Het is een van de kernsterktes ervan.

Menselijke validatie bewaart kritisch denken. Ze beschermt vertrouwen. Ze zorgt ervoor dat expertise niet wordt verdrongen, maar versterkt.

Het doel is niet om mensen uit de lus te halen. Het doel is om hen een betere lus te geven.

## Wat verandert wanneer het systeem er staat

Wanneer deze lagen verbonden zijn, is de impact meer dan incrementele productiviteit. De organisatie zelf wordt coherenter.

Supportteams kunnen sneller reageren zonder consistentie te verliezen. Marketing kan sneller bewegen terwijl toon en kwaliteit beschermd blijven. Operations kan repetitieve coördinatie verminderen en vertrouwen op duidelijkere workflows. Leiderschap krijgt beter zicht omdat werk plaatsvindt binnen een verbonden systeem in plaats van over losse eilanden heen.

Voor medewerkers is de verandering nog directer. Minder tijd gaat naar zoeken, gokken en opnieuw doen. Meer tijd gaat naar uitvoeren met context.

| Functie | Voor een AI-systeem | Met een AI-systeem |
|---|---|---|
| Customer support | Inconsistente antwoorden en trage onboarding | Snellere, afgestemde en richtlijn-gebaseerde antwoorden |
| Marketing | Contentkwaliteit verschilt per persoon | Consistente toon en snellere uitvoering |
| Operations | Manuele coördinatie en repetitief werk | Gestructureerde workflows en minder frictie |
| Leiderschap | Beperkt zicht tussen teams | Meer context en duidelijkere beslissingen |
| Medewerkers | Zoeken, gokken en werk opnieuw doen | Begeleide uitvoering met gedeelde context |

Het patroon is eenvoudig: minder frictie, meer afstemming, betere resultaten.

## AI als distributielaag voor expertise

Een van de belangrijkste effecten van deze aanpak is dat ze verandert hoe expertise door een bedrijf stroomt.

In de meeste organisaties is expertise geconcentreerd. Ze leeft bij senior medewerkers, in specifieke teams of in ongedocumenteerde beslissingen. Dat creëert bottlenecks en maakt kwaliteit moeilijk schaalbaar.

Een systeembenadering van AI laat bedrijven vastleggen hoe beslissingen worden genomen, hoe werk moet worden uitgevoerd en welke standaarden gevolgd moeten worden. Zodra die kennis is ingebed in het besturingssysteem van het bedrijf, wordt ze beschikbaar voor iedereen.

Dat vervangt experts niet. Het vergroot hun bereik.

AI verwijdert expertise niet. Het schaalt ze.

## Een eenvoudig voorbeeld

Neem iets basaals als communicatierichtlijnen. In veel bedrijven definieert marketing een tone of voice, positioneringsregels en messagingprincipes. Maar zodra die richtlijnen buiten het marketingteam terechtkomen, begint consistentie af te brokkelen.

Een developer die release notes schrijft, een supportmedewerker die een klant antwoordt en een marketeer die een campagne lanceert, kunnen hetzelfde merk allemaal anders interpreteren.

Stel je nu voor dat die richtlijnen rechtstreeks in het systeem zijn ingebed. Elke output, of het nu gaat om een klantantwoord, intern document, campagnedraft of productboodschap, wordt gegenereerd binnen dezelfde regels.

Consistentie hangt dan niet langer af van herinneringen of herhaalde reviews. Ze wordt een eigenschap van het systeem zelf.

Dat is een veel betekenisvollere toepassing van AI dan simpelweg sneller tekst genereren.

## De echte opportuniteit

Veel bedrijven focussen op de verkeerde vraag. Ze vragen welk model ze moeten kiezen, welke tool ze moeten kopen of welke feature ze als volgende moeten adopteren.

Die vragen zijn niet irrelevant, maar ze blijven oppervlakkig.

De diepere opportuniteit is om het onderliggende systeem te ontwerpen dat AI in staat stelt om op een betrouwbare manier waardevol te zijn in de hele organisatie. De bedrijven die het meest van AI zullen profiteren, zijn niet noodzakelijk de bedrijven met toegang tot het nieuwste model. Het zijn de bedrijven die de duidelijkste verbinding creëren tussen kennis, regels, uitvoering en menselijk toezicht.

> De winnaars zullen niet alleen betere tools hebben.
> Ze zullen betere systemen hebben.

## Vooruitkijken

Dit wijst op een ander type organisatie.

Niet een organisatie waarin AI werk vervangt, maar een organisatie waarin werk zo is gestructureerd dat AI het goed kan ondersteunen. Een organisatie waarin kennis verbonden is, regels consequent worden toegepast, uitvoering in real time wordt gestuurd en mensen werken met volledige context in plaats van gedeeltelijk zicht.

Dit is geen verre toekomstvisie. Het begint nu al vorm te krijgen.

## Slotgedachte

AI wordt vaak voorgesteld als een productiviteitstool. Dat frame is te beperkt.

De echte waarde is niet alleen snelheid. Het is het vermogen om organisaties te helpen werken met meer helderheid, consistentie en schaal. Maar dat gebeurt alleen wanneer AI wordt behandeld als onderdeel van het besturingssysteem van het bedrijf, en niet als een losse feature bovenop chaos.

AI draait niet om wat het kan genereren.

Het draait om hoe je organisatie is gestructureerd om het te gebruiken.
      `.trim(),
    },
  },
  {
    slug: "the-baton-pattern",
    icon: Workflow,
    date: "2026-02-16",
    authors: [
      { name: "Hamza Mounir", linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/" },
      { name: "Sanawar Syed Azor Ali", linkedin: "https://www.linkedin.com/in/sanawar-syed/" },
    ],
    title: {
      en: "The Baton Pattern",
      fr: "Le Baton Pattern",
      nl: "Het Baton Pattern",
    },
    description: {
      en: "A lightweight handoff protocol for multi-agent AI pipelines. A small JSON object that carries context between workflow stages.",
      fr: "Un protocole de transmission léger pour les pipelines IA multi-agents. Un petit objet JSON qui transporte le contexte entre les étapes.",
      nl: "Een lichtgewicht overdrachtsprotocol voor multi-agent AI-pipelines. Een klein JSON-object dat context meedraagt tussen workflowstappen.",
    },
    category: {
      en: "Engineering",
      fr: "Ingénierie",
      nl: "Engineering",
    },
    tags: {
      en: ["AI Agents", "Design Patterns", "Orchestration"],
      fr: ["Agents IA", "Design Patterns", "Orchestration"],
      nl: ["AI Agents", "Design Patterns", "Orchestratie"],
    },
    readTime: {
      en: "5 min",
      fr: "5 min",
      nl: "5 min",
    },
    content: {
      en: `
## The Problem

When multiple AI agents work together in a pipeline — one plans, another builds, another reviews — they need context from each other. But:

- Passing full artifacts (code, docs) between every stage **costs too many tokens**
- Even with full artifacts, agents miss the *why* — the decisions and constraints behind the work

Without a structured handoff, agents repeat work or contradict earlier decisions.

---

## The Solution

The **baton** is a small JSON object (~1,000 tokens) that travels between stages. Each agent reads it before starting and patches it when done.

Think of it like a relay race baton — except this one carries notes.

---

## Structure

| Field | Purpose |
|-------|---------|
| \`goal\` | One-sentence objective |
| \`current_state\` | What's true right now |
| \`decision_log\` | Key decisions made (append-only) |
| \`constraints\` | Hard rules to respect |
| \`open_questions\` | Unresolved issues |
| \`work_scope\` | Files/modules involved |
| \`artifacts\` | References to produced outputs |
| \`acceptance\` | Tests/checks that must pass |

---

## How It Works

### 1. Initialize

The baton starts with a goal and an initial state.

### 2. Inject

Before each stage, the baton is injected into the agent's prompt as markdown.

### 3. Patch

After executing, the agent returns a \`baton_patch\` — only the fields that changed get updated.

### 4. Repeat

The updated baton feeds into the next stage until the workflow completes.

---

## Baton vs. Artifacts

| | Baton | Artifacts |
|---|---|---|
| **Size** | ~1,000 tokens | 1k–100k+ tokens |
| **Content** | Decisions, state, constraints | Actual code, plans, docs |
| **Included** | Always | Selectively |
| **Purpose** | *Why* and *what matters* | *What was produced* |

The baton tells the next agent **what happened and why**. Artifacts are the actual work product.

---

## Key Design Choices

**Append-only decisions.** Earlier decisions are never erased. This prevents contradictions.

**Replace semantics for state.** \`current_state\` is replaced each time — it reflects *current* truth, not history.

**Budget-friendly.** At ~1,000 tokens, the baton always fits in context.

**Full audit trail.** Every patch is recorded with timestamp and stage ID.

---

## When to Use This

The baton pattern works for any **multi-step AI pipeline** where:

- Agents need context from previous steps
- Token budgets are limited
- Decisions must be consistent across stages
- You need to trace how context evolved

It's intentionally simple — just a JSON object with merge-patch updates.
      `.trim(),

      fr: `
## Le Problème

Quand plusieurs agents IA travaillent ensemble dans un pipeline — l'un planifie, l'autre construit, un autre vérifie — ils ont besoin du contexte des étapes précédentes. Mais :

- Transmettre tous les artefacts (code, docs) entre chaque étape **coûte trop de tokens**
- Même avec les artefacts complets, les agents manquent le *pourquoi* — les décisions et contraintes derrière le travail

Sans un mécanisme de transmission structuré, les agents répètent le travail ou contredisent des décisions antérieures.

---

## La Solution

Le **baton** est un petit objet JSON (~1 000 tokens) qui voyage entre les étapes. Chaque agent le lit avant de commencer et le met à jour quand il a terminé.

Pensez-y comme un témoin de course de relais — sauf que celui-ci porte des notes.

---

## Structure

| Champ | Objectif |
|-------|----------|
| \`goal\` | Objectif en une phrase |
| \`current_state\` | Ce qui est vrai maintenant |
| \`decision_log\` | Décisions prises (ajout uniquement) |
| \`constraints\` | Règles à respecter |
| \`open_questions\` | Questions non résolues |
| \`work_scope\` | Fichiers/modules concernés |
| \`artifacts\` | Références aux sorties produites |
| \`acceptance\` | Tests/vérifications à passer |

---

## Comment ça marche

### 1. Initialiser

Le baton commence avec un objectif et un état initial.

### 2. Injecter

Avant chaque étape, le baton est injecté dans le prompt de l'agent en markdown.

### 3. Patcher

Après exécution, l'agent retourne un \`baton_patch\` — seuls les champs modifiés sont mis à jour.

### 4. Répéter

Le baton mis à jour alimente l'étape suivante jusqu'à la fin du workflow.

---

## Baton vs. Artefacts

| | Baton | Artefacts |
|---|---|---|
| **Taille** | ~1 000 tokens | 1k–100k+ tokens |
| **Contenu** | Décisions, état, contraintes | Code, plans, docs |
| **Inclus** | Toujours | Sélectivement |
| **Objectif** | *Pourquoi* et *ce qui compte* | *Ce qui a été produit* |

Le baton dit à l'agent suivant **ce qui s'est passé et pourquoi**. Les artefacts sont le produit du travail.

---

## Choix de Conception

**Décisions en ajout uniquement.** Les décisions antérieures ne sont jamais effacées. Cela évite les contradictions.

**Remplacement pour l'état.** \`current_state\` est remplacé à chaque fois — il reflète la vérité *actuelle*, pas l'historique.

**Économe en tokens.** À ~1 000 tokens, le baton tient toujours dans le contexte.

**Traçabilité complète.** Chaque patch est enregistré avec un horodatage et un identifiant d'étape.

---

## Quand l'utiliser

Le baton pattern fonctionne pour tout **pipeline IA multi-étapes** où :

- Les agents ont besoin du contexte des étapes précédentes
- Les budgets de tokens sont limités
- Les décisions doivent être cohérentes entre les étapes
- Vous devez tracer l'évolution du contexte

C'est volontairement simple — juste un objet JSON avec des mises à jour merge-patch.
      `.trim(),

      nl: `
## Het Probleem

Wanneer meerdere AI-agents samenwerken in een pipeline — de ene plant, de andere bouwt, een andere controleert — hebben ze context van elkaar nodig. Maar:

- Alle artefacten (code, docs) doorgeven tussen elke stap **kost te veel tokens**
- Zelfs met volledige artefacten missen agents het *waarom* — de beslissingen en beperkingen achter het werk

Zonder een gestructureerd overdrachtsmechanisme herhalen agents werk of spreken ze eerdere beslissingen tegen.

---

## De Oplossing

De **baton** is een klein JSON-object (~1.000 tokens) dat meereist tussen stappen. Elke agent leest het voor aanvang en werkt het bij na afloop.

Denk eraan als een estafettestokje — maar dan eentje dat aantekeningen meedraagt.

---

## Structuur

| Veld | Doel |
|------|------|
| \`goal\` | Doelstelling in één zin |
| \`current_state\` | Wat nu waar is |
| \`decision_log\` | Genomen beslissingen (alleen toevoegen) |
| \`constraints\` | Harde regels om te respecteren |
| \`open_questions\` | Onopgeloste vragen |
| \`work_scope\` | Betrokken bestanden/modules |
| \`artifacts\` | Verwijzingen naar geproduceerde outputs |
| \`acceptance\` | Tests/controles die moeten slagen |

---

## Hoe het werkt

### 1. Initialiseren

De baton begint met een doel en een beginstatus.

### 2. Injecteren

Voor elke stap wordt de baton als markdown in de prompt van de agent geïnjecteerd.

### 3. Patchen

Na uitvoering retourneert de agent een \`baton_patch\` — alleen de gewijzigde velden worden bijgewerkt.

### 4. Herhalen

De bijgewerkte baton voedt de volgende stap totdat de workflow is voltooid.

---

## Baton vs. Artefacten

| | Baton | Artefacten |
|---|---|---|
| **Grootte** | ~1.000 tokens | 1k–100k+ tokens |
| **Inhoud** | Beslissingen, status, beperkingen | Code, plannen, docs |
| **Meegestuurd** | Altijd | Selectief |
| **Doel** | *Waarom* en *wat telt* | *Wat er is geproduceerd* |

De baton vertelt de volgende agent **wat er is gebeurd en waarom**. Artefacten zijn het daadwerkelijke werkproduct.

---

## Ontwerpkeuzes

**Alleen toevoegen voor beslissingen.** Eerdere beslissingen worden nooit gewist. Dit voorkomt tegenspraak.

**Vervangen voor status.** \`current_state\` wordt elke keer vervangen — het weerspiegelt de *huidige* waarheid, niet de geschiedenis.

**Zuinig met tokens.** Met ~1.000 tokens past de baton altijd in de context.

**Volledige audit trail.** Elke patch wordt opgeslagen met tijdstempel en stap-ID.

---

## Wanneer gebruiken

Het baton pattern werkt voor elke **multi-staps AI-pipeline** waar:

- Agents context nodig hebben van eerdere stappen
- Tokenbudgetten beperkt zijn
- Beslissingen consistent moeten zijn tussen stappen
- U moet kunnen traceren hoe de context evolueerde

Het is bewust eenvoudig — gewoon een JSON-object met merge-patch updates.
      `.trim(),
    },
  },
];

export function getAllBlogPosts(lang: SupportedLanguages = "en"): BlogPost[] {
  return [...blogPosts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .map((p) => resolve(p, lang));
}

export function getBlogPost(slug: string, lang: SupportedLanguages = "en"): BlogPost | undefined {
  const post = blogPosts.find((p) => p.slug === slug);
  return post ? resolve(post, lang) : undefined;
}
