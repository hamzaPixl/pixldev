import type { LucideIcon } from "lucide-react";
import { Workflow } from "lucide-react";
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
