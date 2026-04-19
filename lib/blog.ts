import type { LucideIcon } from "lucide-react";
import { Workflow, Network, Cog, BrainCircuit, Users } from "lucide-react";
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

const WHATSAPP_SIM_CONTENT_EN = `
_Five LLM personas (each on a different model), goal: "become millionaires together". Budget: $10. Outputs: a drafted pitch deck, defensible business numbers, an instructive social fracture. A retrospective with the real stats pulled from the logs._

---

## The 30-second setup

I have 5 friends in a tech boot-camp WhatsApp group. Nine thousand accumulated messages, plenty of SaaS ideas, zero shipped. I reconstituted them as LLM personas, each on a different OpenRouter model, grounded in their real messages (style, verbal tics, drives, triggers).

**Shared goal** injected in every prompt: become millionaires together in 2 years by creating and launching products. **Constraint**: produce 6 structured deliverables (vision, PRD, business plan, exec plan, MVP scope, pricing). No code. No hasty pivot.

\`\`\`
┌─ 5 personas × 5 models ───────────────────────────┐
│                                                    │
│  Hamza     mistralai/mistral-nemo        $0.15/M  │
│  Bouba     openai/gpt-4o-mini            $0.15/M  │
│  Tarek     deepseek/deepseek-chat        $0.27/M  │
│  Yacine    meta-llama/llama-3.3-70b      $0.12/M  │
│  Sanou     google/gemini-2.5-flash       $0.10/M  │
│                                                    │
│  → 5 distinct voices at the token level            │
└────────────────────────────────────────────────────┘
\`\`\`

Each has a **private goal** the others don't see (Hamza pushes to ship, Tarek owns the business plan, Yacine go-to-market, Bouba tech/dev lead, Sanou synthesizer). And **signature expressions** extracted from their real messages: "wsh"/"tkt"/"akhi"/"Starfirulah" that anchor the voice.

---

## What runs, every turn

\`\`\`
┌────────────────────────── PER TURN ──────────────────────────┐
│                                                               │
│  1. Inbox check      → drain user directives live             │
│  2. News scout       → fetch real news (web plugin)           │
│  3. Event inject     → probabilistic from the pool            │
│  4. ELECTION         → 5 parallel LLM calls, willingness      │
│     └─ winner = argmax(w - 0.08 × recent_speak)              │
│  5. Filters          → anti-repeat, anti-domination           │
│  6. Tools            → judge / web / read / vote (consensus)  │
│  7. Winner speaks    → message in the chat                    │
│  8. Every 8 turns    → observer + facts + filler (parallel)   │
│  9. Every 20 turns   → judge + public directive               │
│                                                               │
│  Stop if: budget $ reached · max_turns · stagnation 5+ turns  │
└───────────────────────────────────────────────────────────────┘
\`\`\`

4 memory layers injected in each actor prompt:
1. **Last 20 messages** from the chat
2. **25 established facts** (\`repo.created\`, \`cash.available=8k€\`, \`mvp.deadline=friday\`…)
3. **\`project_state.md\`** (direction + % completion of the 6 deliverables + owners + blockers)
4. **Last 10 private thoughts** of this actor (persisted to disk, reloaded each run)

---

## Raw numbers across 16 runs

Cumulative state in \`world/state/\` (append-only JSONL + markdown).

### Production

| Metric | Value |
|---|---|
| Runs launched | **16** |
| Chat messages produced | 49 |
| Events injected | 1 |
| Tool messages (📖 read, ⚖ judge, 🗳 vote, 📣 user) | 2 |
| Decisions extracted by the observer | **12** |
| Artifacts extracted | **12** |
| Structured facts extracted | **35** |
| Patches on deliverables | **43** |
| Judge passes (scores) | 2 |
| Total LLM calls | **269** |

### Total cost: **$0.277** across 16 runs

\`\`\`
$ breakdown by agent:
  Tarek           ████████████ $0.0942 (34%)
  Bouba           ██████       $0.0534 (19%)
  Hamza           █████        $0.0435 (16%)
  Yacine Seroukh  █████        $0.0390 (14%)
  Sanou           █████        $0.0373 (13%)
  filler          ▏            $0.0038 (1.4%)
  facts_extractor ▏            $0.0024 (0.9%)
  observer        ▏            $0.0018 (0.6%)
  news_scout      ·            $0.0009
  judge           ·            $0.0009
\`\`\`

**The meta-agents (observer + filler + facts + judge + news_scout) cost 3% of the total.** 97% of the budget goes to the 5 personas. The internal models (Gemini Flash, Mistral Nemo) are so cheap that adding a 6th meta-agent would be invisible on the wallet.

### Cost by model

| Model | Cost | % |
|---|---|---|
| \`deepseek/deepseek-chat\` | $0.0942 | 34% |
| \`openai/gpt-4o-mini\` | $0.0543 | 20% |
| \`google/gemini-2.5-flash\` | $0.0453 | 16% |
| \`mistralai/mistral-nemo\` | $0.0444 | 16% |
| \`meta-llama/llama-3.3-70b-instruct\` | $0.0390 | 14% |

DeepSeek dominates because it owns Tarek + the business plan + is the most vocal on numbers (longer messages). Not a bug — a signal that Tarek is doing his job.

---

## Speaking distribution — near-perfect balance

This is the real test of the election mechanism + anti-domination handicap.

| Persona | Public messages | Share | Win rate on bids |
|---|---|---|---|
| Bouba | 10 | 20.4% | 20.8% |
| Hamza | 10 | 20.4% | 20.8% |
| Yacine Seroukh | 10 | 20.4% | 20.8% |
| Sanou | 10 | 20.4% | 20.8% |
| Tarek | 9 | 18.4% | 18.8% |

**The group is perfectly balanced.** Zero domination.

As a reminder, without the anti-domination handicap, Hamza (the "forcing function" persona) won 4 turns out of 5. The \`-0.08 × recent_speak_count\` in adjusted willingness fully fixed that.

### Mean willingness per persona (last run — 49 turns)

\`\`\`
avg    max
Bouba           0.19  0.90   ▂▃▁▂▂▃▅▇▂▁▁▁▂▁▁▁▂▂▃▅▇▅
Hamza           0.09  0.90   ▁▁▁▁▁▂▃▅▇▁▁▁▁▁▁▂▃▁▁▂▅▇
Sanou           0.20  0.90   ▁▃▅▂▁▁▂▃▅▇▆▂▁▁▂▃▆▇▂▁▁
Tarek           0.12  0.90   ▁▂▁▃▅▇▂▁▁▁▁▂▅▇▅▂▁▁▁▂▂
Yacine Seroukh  0.26  0.80   ▃▅▇▃▂▂▃▅▆▅▃▂▂▃▅▇▃▂▂▃▃
\`\`\`

Low mean willingness (0.09–0.26) means **most turns the actors deliberately stay silent** because they have nothing new to say (the anti-repeat rule forces them to silence rather than paraphrase). That's exactly the intended behavior.

The 0.80–0.90 spikes happen when an external event or a user directive lands, OR when the project_state shows a deliverable this actor owns that's not moving.

---

## The 12 decisions extracted by the observer

The observer automatically extracts decisions by scanning the conversation every 8 turns.

| # | Status | Decision | Proposed by |
|---|---|---|---|
| 1 | agreed | Lock the vision before discussing the MVP | Sanou |
| 2 | pending | Validate the vision: "AI tool for FR SMBs with 10-50 employees" | Sanou |
| 3 | proposed | Validate the vision (same) | Sanou |
| 4 | proposed | Vote to validate CAC 50€ max and LTV 600€ min | Tarek |
| 5 | proposed | Launch a formal vote for the vision | Sanou |
| 6 | proposed | Launch a vote for CAC/LTV | Tarek |
| 7 | proposed | Integrate 8k€ into the business plan | Bouba |
| 8 | agreed | Launch a formal vote for the vision | Sanou |
| 9 | pending | Integrate 8k€ into the business plan | Bouba |
| 10 | agreed | Launch a vote for CAC/LTV | Tarek |
| 11-12 | … | … | … |

**Sanou = 4 proposed decisions** (the synthesizer refocusing). **Tarek = 3** (numbers). **Bouba = 1** (cash). **Hamza = 0** formally proposed decisions — he's the forcing function, he doesn't vote, he pushes.

---

## Artifacts produced

Parallel artifact extraction — concrete objects (vision, PRD, MVP, business plan…) that emerge from the chat.

\`\`\`
By kind:
  mvp_scope       ████ 4
  prd             ████ 4
  vision          ██   2
  business_plan   █    1
  pricing         █    1
\`\`\`

And here's the interesting bit: **a new deliverable auto-created itself** — \`funding\`. It wasn't in the 6 baseline templates. The filler spawned it when the conversation mentioned the 8k€ bootstrap and the topic didn't fit any existing deliverable. Capped at 12 max to avoid dilution, but genuine dynamic creation.

Patches applied per deliverable:
\`\`\`
business_plan   ████████████████ 16
mvp_scope       █████████         9
vision          ████████          8
prd             ████              4
execution_plan  ███               3
funding (new)   ██                2
pricing         █                 1
\`\`\`

business_plan receives 16 patches because it has 10 sections (CAC, LTV, revenue, channels, first 10 customers, targets, breakeven, risks, etc.) and each section gains content incrementally.

---

## The 35 extracted facts

The **facts extractor** is the feature that most changed the quality of conversations. It turns the chat into structured state the actors re-read on every bid.

\`\`\`
By kind:
  status       ███████████████████ 19  ← "where we stand"
  commitment    ████████            8  ← "X commits to Y before Z"
  claim         ███████             7  ← "I did X"
  resource      █                   1  ← "8k€ available"
\`\`\`

**Examples of real extracted facts**:
- \`cash.bootstrap_available\` → \`8k€ personal freed for execution\`
- \`dev.outsource_deadline\` → \`Tomorrow 6am\`
- \`mvp.final_launch_deadline\` → \`Friday 6pm (solo with Upwork freelancer)\`
- \`pricing.solo_tier\` → \`49€/month\`
- \`cac.estimated\` → \`50€ max\`
- \`ltv.estimated\` → \`600€ min\`
- \`vision.target_market\` → \`FR SMBs 10-50 employees\`

These facts appear in every actor prompt under \`## World Facts\`. **Actors no longer re-ask "what's the pricing?"** because the answer is there, attributed, timestamped.

---

## The deliverables — real extracted content

Current snapshot of the 6+1 deliverables:

### Vision (validated)
> **One-liner**: AI tool to optimize productivity for FR SMBs with 10 to 50 employees.
>
> **ICP**: French SMBs with 10 to 50 employees.

### PRD
> **Must-have features (validated)**:
> - LinkedIn profile import
> - Data analysis for scoring
> - PDF export of results

### MVP Scope
> **In-scope**:
> - LinkedIn scraping (profile, company)
> - Raw dashboard (no auth)
> - Data analysis for scoring
>
> **Ship date**: In 2 weeks (validated)

### Business plan
> **CAC**: 50€ max (validated)
>
> **Revenue model**: Integration of the 8k€ cash to boost execution, cover infra costs and accelerate development.

### Pricing
> **Tiers**: Solo 49€/month

### Funding (auto-created by the filler)
> **Available Cash**: 8k€ (validated)
>
> **Use of Funds**: Infra, tooling, or compensation. Must go toward execution (validated).

---

## What the personas think (real private thoughts)

Each turn, each persona produces a **private_thought** (max 250 chars) that's never public. It's their inner voice. Here's a sample from the last run (49 turns):

**Hamza** (forcing + dev):
> "We still haven't defined the MVP scope. I can propose a suggestion, so I'll do it."

> "We still don't have a validated MVP scope. I'm proposing the MVP and I'll code the thing myself if it blocks."

**Bouba** (tech sharer + dev lead):
> "We have no deliverable yet, we need to structure fast. I'll take the dev lead and push the vision."

> "I see the vision is set, now we need to move fast on the other deliverables. I've taken the dev lead."

**Tarek** (business plan owner):
> "I need to own the business plan and pricing. I should start by laying down concrete numbers."

> "I need to put down the first business numbers to frame things. CAC at 50€ max and LTV at 600€ min to be viable."

**Yacine Seroukh** (go-to-market):
> "We need to start with the vision and PRD, then we can talk business plan and execution plan. I can own go-to-market and the first customers."

**Sanou** (synthesizer):
> "Hamza framed things well. Bouba proposes a vague vision. We need to specify the target and the problem solved before talking about AI optimization, otherwise we're just hacking together something with no market."

> "Bouba proposes too generic a vision. We need to validate the vision first before talking about the rest. I need to refocus on vision and target, that's deliverable 1."

**Note**: each persona has a private_thought that sticks perfectly to its private_goal. Yacine owns GTM, Tarek owns numbers, Sanou refocuses. Different models + grounded prompts produce distinct internal voices.

---

## The 2 judge passes

The judge runs every 20 turns. It produces 4 scores + a rationale + **a public directive** posted in the chat as \`⚖ JUDGE\`.

| Turn | Alignment | Velocity | Complete | Ready | Directive |
|---|---|---|---|---|---|
| 20 | 0.50 | 0.30 | 2/6 | 0.00 | Vision almost complete but not yet locked. PRD started but not detailed. |
| 40 | 0.50 | 0.30 | 2/6 | 0.00 | Vision locked but PRD and business_plan incomplete. MVP scope in progress. |

Alignment stable at 0.50 (the group is balanced). Velocity 0.30 (steady but not flashy progress). Completeness 2/6 (vision + mvp_scope drafted, the other 4 less advanced). Readiness 0.00 (we're far from a paying customer tomorrow).

**The judge is honest.** It doesn't hand out complacent scores.

---

## What did NOT work (honest)

### Loop on ejected Bouba (earlier run, V1)

In an earlier simulation over 206 turns, Hamza **"ejected" Bouba from the group** after a clash over security vs speed. Measurable pattern in the scores:

\`\`\`
turn 40: alignment 0.62 · completeness 5/6 · ready 0.71
turn 60: alignment 0.42 · completeness 6/6 · ready 0.61
\`\`\`

Alignment crashes from 0.62 → 0.42 while completeness climbs to 6/6. In other words: **the group finished the 6 deliverables by excluding the dissident.** A human reading the chat can miss that. The judge caught it in one sentence: _"The team is fractured: Bouba excluded."_

### Root cause identified

The Bouba persona extracted by the LLM overweighted his skeptical moments. In reality, Bouba is a good dev who brings tech info and takes the dev lead — not a blocker. Fix applied via a YAML overlay that boosts his positive drives and rebalances his mental principles. In subsequent runs (including the last), **Bouba speaks 10 times out of 49** (20.4%) — exactly the same share as Hamza. No more fracture.

### Repetition loops

In another run (V1), Bouba and Yacine looped for 40+ messages repeating the same sentences with slight variations. The anti-repeat filter was tightened from 55% → 40% token overlap, window 3 → 5 messages. Later runs no longer have this problem.

---

## Economics: how it compares

How much does an IRL human boot-camp that produces these deliverables cost? Conservatively:
- 5 people × 10h × 50€/h = **2500€**
- Over several weeks
- Result: often unfinished, no numbers, not preserved

The simulation:
- 16 runs, 269 LLM calls, **$0.28 total**
- ~3 hours wall clock total
- Result: 6 deliverables (+1 auto-created) drafted, defensible numbers, full audit trail, generated markdown report, live dashboard for demos

**Ratio human cost / simulation: ~10,000 ×**.

Not the same thing of course — real business decisions demand humans. But as a **first pass of "here's where this group converges on this topic"**, it's a tool that didn't exist.

---

## The 4 tools available to the actors

Personas can invoke shared tools **by consensus** (2 supporters min). Each use logged in \`tool_calls.jsonl\`.

| Tool | Icon | Cost | Observed usage |
|---|---|---|---|
| **⚖ judge** | external | $0.005/call | Validate a number, stress-test a choice |
| **🌐 web** | OpenRouter web search | $0.01/call | Benchmark competitors, recent news |
| **📖 read** | reads a deliverable's content | $0 | Re-ground a debate on real content |
| **🗳 vote** | yes/no poll, tally after 3 turns | $0 | Settle a question without endless debate |

The \`vote\` is probably the most useful in practice. It turns debates into recorded decisions.

---

## The dashboard (ASCII capture)

\`\`\`
┌─ 🌍 world · turn 42/300 · $0.18/$10.00 ████░░░░░░ ─────────────┐
│  Goal: Become millionaires together in 2 years...               │
├─────────────────────────────────────────┬──────────────────────┤
│ 💬 conversation (full text, no crop)    │ 📋 deliverables      │
│                                         │  Vision    ██████ 85%│
│ 15:42  ★ Sanou: Bouba proposes vision...│  PRD       ███░░░ 40%│
│ 15:43    Hamza: wsh let's attack...     │  Business  █░░░░░ 10%│
│ 📰 15:43 [NEWS] Cursor 200M...          │  MVP       ████░░ 60%│
│ 15:44  ⚖ JUDGE: "Vision OK, PRD..."     │  Pricing   ██░░░░ 33%│
│ 15:46  🗳 VOTE OPEN: lock pricing?      │  Funding   ██████ 85%│
│ 📣 15:47 USER: focus pricing!           ├─ ✨ recent fills ───┤
│                                         │  📝 pricing.tiers    │
├─ 💭 thoughts ──────────────────────────┤  📝 bp.cac           │
│  Hamza → MVP not defined, I propose    ├─ ⚖ judge ──────────┤
│  Tarek → CAC 50€ numbers laid down     │  align ▃▅ 0.50       │
│  Sanou → Bouba vision too generic       │  veloc ▂▄ 0.30       │
│                                         ├─ 👥 personas ──────┤
│                                         │  ★ Sanou gemini 0.90 │
│                                         │    Bouba gpt-4o 0.68 │
├─────────────────────────────────────────┴──────────────────────┤
│ status: ⚖ judge · 📝 fill · 🛰 news · 📣 directive            │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

Refresh 4 Hz. Alternate screen buffer. 8 panels updating in real time.

---

## The 5 key lessons

### 1. Parallel election + anti-domination handicap fix the "single voice"
Without \`-0.08 × recent_speak\`, Hamza dominated 80% of turns. With it, the 5 actors speak at 18–20% each. Fundamentally necessary.

### 2. Structured facts > chatty history
The 35 extracted facts (\`cash.available=8k€\`, \`mvp.deadline=friday\`) have more impact on bid quality than the last 20 messages. Actors stop re-asking.

### 3. Deliverable templates are a forcing function
Showing "MVP scope: 70%" with named sections makes actors push content toward those sections, rather than debate in the void.

### 4. The judge has to speak in the chat
A private score is just a log. A judge that publishes \`"Vision OK, PRD empty, Tarek computes CAC/LTV in 15 min"\` reshapes the next 20 turns' behavior.

### 5. Distinct voices demand distinct tics
5 different models aren't enough. You need \`signature_expressions\` grounded in real messages ("wsh", "tkt", "akhi", "Starfirulah") for each persona to be recognizable by the second line.

---

## What's left to do

- **Multi-project**: today 1 world = 1 project. A real group juggles 2–3 ideas in parallel.
- **Persona calibration via replay**: take 20 "what would X say here?" from the real conversation, measure persona fidelity, iterate the overlay.
- **Streaming**: all LLM calls are non-streaming. Adds ~2–3s per turn.
- **Panel of 3 judges**: consensus or disagreement, more robust than a single score.
- **Summon external voice**: a tool that injects a one-shot voice (investor, potential customer, mentor) to challenge the group.

---

## The key point

An LLM group is the **cheapest focus group in the world** for a concrete business idea. Give them a goal, constraints, a cast of distinct voices and structured deliverables to fill — and in 30 minutes for $2, you see what 40h of human meetings would produce.

The pitch deck is mostly noise. Sometimes, a real number drops.

In my case, after 16 runs and $0.28 of compute, the group converged on:
- **Locked vision**: AI tool for FR SMBs 10–50 employees
- **Defined MVP**: LinkedIn scrape + scoring + PDF export, 2 weeks to ship
- **Pricing set**: 49€/month solo
- **Business model with numbers**: CAC 50€, LTV 600€
- **Cash allocated**: 8k€ in funding (auto-created as a custom deliverable)

Will the IRL group actually ship it? No idea. But now I have the deck they never wrote, for free, and as a bonus a quantified measure of their group dynamics.

---

_Open source, offline, no WhatsApp integration. Full audit trail in \`world/state/*.jsonl\`._
`.trim();

const WHATSAPP_SIM_CONTENT_FR = `
_Cinq personas LLM (un modèle différent chacun), goal : "devenir millionnaires ensemble". Budget : 10 $. Outputs : un pitch deck drafté, des chiffres business tenables, une fracture sociale instructive. Retour d'expérience avec les stats réelles extraites des logs._

---

## Le setup en 30 secondes

J'ai 5 amis dans un groupe WhatsApp boot-camp tech. Neuf mille messages accumulés, beaucoup d'idées de SaaS, zéro shippé. Je les ai reconstitués en personas LLM, chacun sur un modèle OpenRouter différent, grounded dans leurs vrais messages (style, tics langagiers, drives, déclencheurs).

**Goal commun** injecté dans chaque prompt : devenir millionnaires ensemble en 2 ans en créant et lançant des produits. **Contrainte** : produire 6 livrables structurés (vision, PRD, business plan, exec plan, MVP scope, pricing). Pas de code. Pas de pivot hâtif.

\`\`\`
┌─ 5 personas × 5 modèles ──────────────────────────┐
│                                                    │
│  Hamza     mistralai/mistral-nemo        $0.15/M  │
│  Bouba     openai/gpt-4o-mini            $0.15/M  │
│  Tarek     deepseek/deepseek-chat        $0.27/M  │
│  Yacine    meta-llama/llama-3.3-70b      $0.12/M  │
│  Sanou     google/gemini-2.5-flash       $0.10/M  │
│                                                    │
│  → 5 voix distinctes au niveau token               │
└────────────────────────────────────────────────────┘
\`\`\`

Chacun a un **goal privé** que les autres ne voient pas (Hamza pousse à shipper, Tarek owner business plan, Yacine go-to-market, Bouba tech/dev lead, Sanou synthétiseur). Et des **signature expressions** extraites de leurs vrais messages : "wsh"/"tkt"/"akhi"/"Starfirulah" qui ancrent la voix.

---

## Ce qui tourne, chaque tour

\`\`\`
┌────────────────────────── PER TURN ──────────────────────────┐
│                                                               │
│  1. Inbox check      → drain directives user en live          │
│  2. News scout       → fetch actu réelle (web plugin)         │
│  3. Event inject     → probabiliste depuis le pool            │
│  4. ÉLECTION         → 5 LLM calls parallèles, willingness    │
│     └─ winner = argmax(w - 0.08 × recent_speak)              │
│  5. Filtres          → anti-répétition, anti-domination       │
│  6. Tools            → judge / web / read / vote (consensus)  │
│  7. Winner parle     → message dans le chat                   │
│  8. Every 8 turns    → observer + facts + filler (parallèle)  │
│  9. Every 20 turns   → judge + directive publique             │
│                                                               │
│  Stop si : budget $ atteint · max_turns · stagnation 5+ turns │
└───────────────────────────────────────────────────────────────┘
\`\`\`

4 couches de mémoire injectées dans chaque prompt actor :
1. **20 derniers messages** du chat
2. **25 faits établis** (\`repo.created\`, \`cash.available=8k€\`, \`mvp.deadline=vendredi\`…)
3. **\`project_state.md\`** (direction + % complétion des 6 livrables + owners + blockers)
4. **10 dernières pensées privées** de cet actor (persistées sur disque, rechargées chaque run)

---

## Les chiffres bruts des 16 runs

État cumulé dans \`world/state/\` (append-only JSONL + markdown).

### Production

| Métrique | Valeur |
|---|---|
| Runs lancés | **16** |
| Messages chat produits | 49 |
| Events injectés | 1 |
| Messages tool (📖 read, ⚖ judge, 🗳 vote, 📣 user) | 2 |
| Décisions extraites par l'observer | **12** |
| Artifacts extraits | **12** |
| Facts structurés extraits | **35** |
| Patches sur livrables | **43** |
| Passages du judge (scores) | 2 |
| Appels LLM totaux | **269** |

### Coût total : **$0.277** sur 16 runs

\`\`\`
$ breakdown par agent :
  Tarek           ████████████ $0.0942 (34%)
  Bouba           ██████       $0.0534 (19%)
  Hamza           █████        $0.0435 (16%)
  Yacine Seroukh  █████        $0.0390 (14%)
  Sanou           █████        $0.0373 (13%)
  filler          ▏            $0.0038 (1.4%)
  facts_extractor ▏            $0.0024 (0.9%)
  observer        ▏            $0.0018 (0.6%)
  news_scout      ·            $0.0009
  judge           ·            $0.0009
\`\`\`

**Les meta-agents (observer + filler + facts + judge + news_scout) coûtent 3% du total.** 97% du budget va aux 5 personas. Les modèles internes (Gemini Flash, Mistral Nemo) sont tellement cheap que rajouter un 6e meta-agent serait invisible au niveau du wallet.

### Coût par modèle

| Modèle | Cost | % |
|---|---|---|
| \`deepseek/deepseek-chat\` | $0.0942 | 34% |
| \`openai/gpt-4o-mini\` | $0.0543 | 20% |
| \`google/gemini-2.5-flash\` | $0.0453 | 16% |
| \`mistralai/mistral-nemo\` | $0.0444 | 16% |
| \`meta-llama/llama-3.3-70b-instruct\` | $0.0390 | 14% |

DeepSeek domine parce qu'il owner Tarek + le business plan + il est le plus volubile sur les chiffres (messages plus longs). Pas un bug — un signal que Tarek fait son job.

---

## Distribution de parole — équilibre quasi-parfait

C'est le vrai test du mécanisme d'élection + handicap anti-domination.

| Persona | Messages publics | Part | Win rate sur bids |
|---|---|---|---|
| Bouba | 10 | 20.4% | 20.8% |
| Hamza | 10 | 20.4% | 20.8% |
| Yacine Seroukh | 10 | 20.4% | 20.8% |
| Sanou | 10 | 20.4% | 20.8% |
| Tarek | 9 | 18.4% | 18.8% |

**Le groupe est parfaitement équilibré.** Zéro domination.

Pour rappel, sans handicap anti-domination, Hamza (persona "forcing function") gagnait 4 tours sur 5. Le \`-0.08 × recent_speak_count\` en willingness adjusted a complètement réparé ça.

### Willingness moyenne par persona (dernier run — 49 tours)

\`\`\`
avg    max
Bouba           0.19  0.90   ▂▃▁▂▂▃▅▇▂▁▁▁▂▁▁▁▂▂▃▅▇▅
Hamza           0.09  0.90   ▁▁▁▁▁▂▃▅▇▁▁▁▁▁▁▂▃▁▁▂▅▇
Sanou           0.20  0.90   ▁▃▅▂▁▁▂▃▅▇▆▂▁▁▂▃▆▇▂▁▁
Tarek           0.12  0.90   ▁▂▁▃▅▇▂▁▁▁▁▂▅▇▅▂▁▁▁▂▂
Yacine Seroukh  0.26  0.80   ▃▅▇▃▂▂▃▅▆▅▃▂▂▃▅▇▃▂▂▃▃
\`\`\`

La willingness moyenne basse (0.09-0.26) veut dire que **la plupart des tours, les actors restent volontairement silencieux** parce qu'ils n'ont rien de nouveau à dire (la règle anti-répétition les force au silence plutôt que de reformuler). C'est exactement le comportement voulu.

Les pics à 0.80-0.90 arrivent quand un event externe ou une directive user vient, OU quand le project_state montre un livrable que cet actor owne mais qui n'avance pas.

---

## Les 12 décisions extraites par l'observer

L'observer extrait automatiquement les décisions en scannant la conversation toutes les 8 turns.

| # | Status | Décision | Proposé par |
|---|---|---|---|
| 1 | agreed | Verrouiller la vision avant de discuter du MVP | Sanou |
| 2 | pending | Valider la vision : "Outil IA pour PME/TPE FR de 10 à 50 salariés" | Sanou |
| 3 | proposed | Valider la vision (même) | Sanou |
| 4 | proposed | Voter pour valider CAC 50€ max et LTV 600€ min | Tarek |
| 5 | proposed | Lancer un vote formel pour la vision | Sanou |
| 6 | proposed | Lancer un vote pour CAC/LTV | Tarek |
| 7 | proposed | Intégrer 8k€ dans le business plan | Bouba |
| 8 | agreed | Lancer un vote formel pour la vision | Sanou |
| 9 | pending | Intégrer 8k€ dans le business plan | Bouba |
| 10 | agreed | Lancer un vote pour CAC/LTV | Tarek |
| 11-12 | … | … | … |

**Sanou = 4 décisions proposées** (synthétiseur qui recadre). **Tarek = 3** (chiffres). **Bouba = 1** (cash). **Hamza = 0** décisions formellement proposées — il est le forcing function, il ne vote pas, il pousse.

---

## Les artifacts produits

Extraction parallèle des artefacts — objets concrets (vision, PRD, MVP, business plan…) qui émergent du chat.

\`\`\`
Par kind :
  mvp_scope       ████ 4
  prd             ████ 4
  vision          ██   2
  business_plan   █    1
  pricing         █    1
\`\`\`

Et le truc intéressant : **un nouveau livrable s'est auto-créé** — \`funding\`. Il n'était pas dans les 6 templates baseline. Le filler l'a spawné quand la conversation a mentionné les 8k€ de bootstrap et que le domaine ne rentrait dans aucun livrable existant. Capped à 12 max pour éviter la dilution, mais genuine création dynamique.

Patches appliqués par livrable :
\`\`\`
business_plan   ████████████████ 16
mvp_scope       █████████         9
vision          ████████          8
prd             ████              4
execution_plan  ███               3
funding (nouveau) ██              2
pricing         █                 1
\`\`\`

Le business_plan reçoit 16 patches parce qu'il a 10 sections (CAC, LTV, revenue, channels, first 10 customers, targets, breakeven, risks, etc.) et chaque section gagne du contenu incrémental.

---

## Les 35 facts extraits

Le **facts extractor** est la feature qui a le plus changé la qualité des conversations. Il transforme le chat en état structuré que les actors relisent à chaque bid.

\`\`\`
Par kind :
  status       ███████████████████ 19  ← "où on en est"
  commitment    ████████            8  ← "X s'engage à Y avant Z"
  claim         ███████             7  ← "J'ai fait X"
  resource      █                   1  ← "8k€ dispo"
\`\`\`

**Exemples de vrais facts extraits** :
- \`cash.bootstrap_available\` → \`8k€ personnel libérés pour exécution\`
- \`dev.outsource_deadline\` → \`Demain 6h\`
- \`mvp.final_launch_deadline\` → \`Vendredi 18h (solo avec freelance Upwork)\`
- \`pricing.solo_tier\` → \`49€/mois\`
- \`cac.estimated\` → \`50€ max\`
- \`ltv.estimated\` → \`600€ min\`
- \`vision.target_market\` → \`PME/TPE FR 10-50 salariés\`

Ces facts apparaissent dans chaque prompt actor sous \`## Faits du monde\`. **Les actors ne re-demandent plus "c'est combien le pricing ?"** parce que la réponse est là, attribuée, timestampée.

---

## Les livrables — contenu réel extrait

Snapshot actuel des 6+1 livrables :

### Vision (validée)
> **One-liner** : Outil IA pour optimiser la productivité des PME/TPE FR de 10 à 50 salariés.
>
> **ICP** : PME/TPE françaises de 10 à 50 salariés.

### PRD
> **Features must-have (validées)** :
> - Importation de profils LinkedIn
> - Analyse de données pour scoring
> - Export PDF des résultats

### MVP Scope
> **In-scope** :
> - Scraping LinkedIn (profil, entreprise)
> - Dashboard brut (pas d'authentification)
> - Analyse de données pour scoring
>
> **Ship date** : Dans 2 semaines (validée)

### Business plan
> **CAC** : 50€ max (validé)
>
> **Revenue model** : Intégration du cash de 8k€ pour booster l'exécution, couvrir les coûts d'infra et accélérer le développement.

### Pricing
> **Tiers** : Solo 49€/mois

### Funding (auto-créé par le filler)
> **Available Cash** : 8k€ (validé)
>
> **Use of Funds** : Infra, outillage, ou rémunération. Doit aller vers de l'exécution (validé).

---

## Ce que les personas pensent (vraies private thoughts)

Chaque tour, chaque persona produit une **private_thought** (max 250 chars) qui n'est jamais publique. C'est leur voix intérieure. Voici un échantillon du dernier run (49 turns) :

**Hamza** (forcing + dev) :
> "On a pas encore défini le MVP scope. Je peux proposer une suggestion, donc je vais le faire."

> "On a toujours pas de MVP scope validé. Je propose le MVP et je vais coder le truc moi-même si ça bloque."

**Bouba** (tech sharer + dev lead) :
> "On a aucun livrable encore, faut qu'on se structure vite. Je vais prendre le lead sur le dev et pousser la vision."

> "Je vois que la vision est posée, mtn faut vite avancer sur les autres livrables. J'ai pris le dev lead."

**Tarek** (business plan owner) :
> "Je dois owner le business plan et le pricing. Faut que je commence par poser des chiffres concrets."

> "Je dois poser les premiers chiffres business pour cadrer. CAC à 50€ max et LTV à 600€ minimum pour être viable."

**Yacine Seroukh** (go-to-market) :
> "Faut commencer par la vision et le PRD, après on pourra parler de business plan et de plan d'exécution. Moi je peux owner le go-to-market et les premiers clients."

**Sanou** (synthétiseur) :
> "Hamza a bien posé le cadre. Bouba propose une vision vague. Faut préciser la cible et le problème résolu avant de parler d'optimisation IA, sinon on va juste bricoler un truc sans marché."

> "Bouba propose une vision trop générique. Il faut d'abord valider la vision avant de parler de reste. Je dois recadrer sur la vision et la cible, c'est le livrable 1."

**Note** : chaque persona a une private_thought qui colle parfaitement à son private_goal. Yacine owner GTM, Tarek owner chiffres, Sanou recadre. Les modèles différents + les prompts grounded produisent des voix internes distinctes.

---

## Les 2 passages du judge

Le judge tourne tous les 20 tours. Il produit 4 scores + un rationale + **une directive publique** postée dans le chat comme \`⚖ JUDGE\`.

| Turn | Alignment | Velocity | Complete | Ready | Directive |
|---|---|---|---|---|---|
| 20 | 0.50 | 0.30 | 2/6 | 0.00 | Vision almost complete but not yet locked. PRD started but not detailed. |
| 40 | 0.50 | 0.30 | 2/6 | 0.00 | Vision locked mais PRD et business_plan incomplets. MVP scope en cours. |

Alignment stable à 0.50 (le groupe est équilibré). Velocity 0.30 (progression régulière mais pas flamboyante). Completeness 2/6 (vision + mvp_scope drafted, les 4 autres moins avancés). Readiness 0.00 (on est loin d'un client payant demain).

**Le judge est honnête.** Il ne donne pas des scores de complaisance.

---

## Ce qui a NE PAS marché (honnête)

### Loop sur Bouba éjecté (run précédent, V1)

Dans une simulation antérieure sur 206 turns, Hamza a **"éjecté" Bouba du groupe** après un clash sur la sécurité vs la vitesse. Pattern mesurable dans les scores :

\`\`\`
turn 40 : alignment 0.62 · completeness 5/6 · ready 0.71
turn 60 : alignment 0.42 · completeness 6/6 · ready 0.61
\`\`\`

Alignment crashe de 0.62 → 0.42 pendant que completeness monte à 6/6. Autrement dit : **le groupe a fini les 6 livrables en excluant le dissident.** Un humain qui lit le chat peut rater ça. Le judge l'a chopé en une phrase : _"L'équipe est fracturée : Bouba exclu."_

### Cause racine identifiée

La persona Bouba extraite par LLM sur-pondérait ses moments sceptiques. Dans la réalité, Bouba est un bon dev qui amène l'info tech et prend le dev lead — pas un blocker. Fix appliqué via un overlay YAML qui augmente ses drives positifs et rééquilibre ses mental principles. Dans les runs suivants (dont le dernier), **Bouba parle 10 fois sur 49** (20.4%) — exactement la même part que Hamza. Plus de fracture.

### Loops sur répétition

Dans un autre run (V1), Bouba et Yacine ont tourné 40+ messages en répétant les mêmes phrases avec variations légères. Le filtre anti-répétition a été durci de 55% → 40% token overlap, fenêtre 3 → 5 messages. Les runs suivants n'ont plus ce problème.

---

## Économique : comment ça se compare

Un boot-camp humain IRL qui produit ces livrables coûte combien ? Conservativement :
- 5 personnes × 10h × 50€/h = **2500€**
- Sur plusieurs semaines
- Résultat : souvent pas fini, pas chiffré, pas conservé

La simulation :
- 16 runs, 269 LLM calls, **$0.28 total**
- ~3 heures wall clock total
- Résultat : 6 livrables (+1 auto-créé) drafted, chiffres tenables, full audit trail, report markdown généré, dashboard live pour demos

**Ratio coût humain / simulation : ~10 000 ×**.

Pas la même chose évidemment — les vraies décisions business demandent des humains. Mais comme **premier tour de "voici à quoi converge ce groupe sur ce sujet"**, c'est un outil qui n'existait pas.

---

## Les 4 tools dispos pour les actors

Les personas peuvent invoquer des outils partagés **par consensus** (2 supporters min). Chaque usage loggé dans \`tool_calls.jsonl\`.

| Tool | Icône | Coût | Usage observé |
|---|---|---|---|
| **⚖ judge** | externe | $0.005/call | Valider un chiffre, stress-tester un choix |
| **🌐 web** | recherche web OpenRouter | $0.01/call | Benchmark concurrents, news récente |
| **📖 read** | lit contenu d'un livrable | $0 | Regrounder un débat sur le contenu réel |
| **🗳 vote** | poll yes/no, tally après 3 tours | $0 | Trancher une question sans débat infini |

Le \`vote\` est probablement le plus utile en pratique. Il transforme les débats en décisions enregistrées.

---

## Le dashboard (capture ASCII)

\`\`\`
┌─ 🌍 world · turn 42/300 · $0.18/$10.00 ████░░░░░░ ─────────────┐
│  Goal: Devenir millionnaires ensemble en 2 ans...               │
├─────────────────────────────────────────┬──────────────────────┤
│ 💬 conversation (full text, no crop)    │ 📋 deliverables      │
│                                         │  Vision    ██████ 85%│
│ 15:42  ★ Sanou: Bouba propose vision... │  PRD       ███░░░ 40%│
│ 15:43    Hamza: wsh on attaque...       │  Business  █░░░░░ 10%│
│ 📰 15:43 [NEWS] Cursor 200M...          │  MVP       ████░░ 60%│
│ 15:44  ⚖ JUDGE: "Vision OK, PRD..."     │  Pricing   ██░░░░ 33%│
│ 15:46  🗳 VOTE OPEN: lock pricing?      │  Funding   ██████ 85%│
│ 📣 15:47 USER: focus pricing!           ├─ ✨ recent fills ───┤
│                                         │  📝 pricing.tiers    │
├─ 💭 thoughts ──────────────────────────┤  📝 bp.cac           │
│  Hamza → MVP pas défini, je propose    ├─ ⚖ judge ──────────┤
│  Tarek → chiffres CAC 50€ posés        │  align ▃▅ 0.50       │
│  Sanou → Bouba vision trop générique    │  veloc ▂▄ 0.30       │
│                                         ├─ 👥 personas ──────┤
│                                         │  ★ Sanou gemini 0.90 │
│                                         │    Bouba gpt-4o 0.68 │
├─────────────────────────────────────────┴──────────────────────┤
│ status: ⚖ judge · 📝 fill · 🛰 news · 📣 directive            │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

Refresh 4 Hz. Alternate screen buffer. 8 panneaux qui bougent en temps réel.

---

## Les 5 leçons clés

### 1. L'élection parallèle + handicap anti-domination réparent le "single voice"
Sans \`-0.08 × recent_speak\`, Hamza dominait 80% des tours. Avec, les 5 actors parlent à 18-20% chacun. Fundamentalement nécessaire.

### 2. Facts structurés > historique bavard
Les 35 facts extraits (\`cash.available=8k€\`, \`mvp.deadline=vendredi\`) ont plus d'impact sur la qualité des bids que les 20 derniers messages. Les actors arrêtent de re-demander.

### 3. Les deliverables templates sont un forcing function
Montrer "MVP scope : 70%" avec des sections nommées fait que les actors poussent du contenu vers ces sections, plutôt que débattre dans le vide.

### 4. Le judge doit parler dans le chat
Un score privé est juste un log. Un judge qui publie \`"Vision OK, PRD vide, Tarek calcule CAC/LTV dans 15 min"\` reshape le comportement des 20 turns suivants.

### 5. Les voix distinctes demandent des tics distincts
5 modèles différents ne suffisent pas. Il faut des \`signature_expressions\` grounded dans des vrais messages ("wsh", "tkt", "akhi", "Starfirulah") pour que chaque persona soit reconnaissable à la 2e ligne.

---

## Ce qui reste à faire

- **Multi-project** : aujourd'hui 1 monde = 1 projet. Vrai groupe jongle 2-3 idées en parallèle.
- **Persona calibration par replay** : prendre 20 "que dirait X ici ?" de la vraie conversation, mesurer la fidélité du persona, itérer l'overlay.
- **Streaming** : tous les LLM calls sont non-streaming. Ajoute ~2-3s par turn.
- **Panel de 3 judges** : consensus ou désaccord, plus robuste qu'un seul score.
- **Summon external voice** : un tool qui injecte une voix ponctuelle (investisseur, client potentiel, mentor) pour challenger le groupe.

---

## Le point clé

Un groupe LLM est le **focus group le moins cher au monde** pour une idée business concrète. Donne-leur un goal, des contraintes, une cast de voix distinctes et des livrables structurés à remplir — et en 30 minutes pour $2, tu vois ce que 40h de meetings humains produiraient.

La pitch deck est principalement du bruit. Parfois, un vrai chiffre tombe.

Dans mon cas, après 16 runs et $0.28 de compute, le groupe a convergé sur :
- **Vision lockée** : outil IA pour PME/TPE FR 10-50 salariés
- **MVP défini** : scrape LinkedIn + scoring + export PDF, 2 semaines de ship
- **Pricing posé** : 49€/mois solo
- **Business model chiffré** : CAC 50€, LTV 600€
- **Cash alloué** : 8k€ en funding (auto-créé comme livrable custom)

Le groupe IRL l'aura-t-il vraiment shippé ? Aucune idée. Mais maintenant j'ai le deck qu'ils n'ont jamais écrit, gratuitement, et en bonus une mesure quantifiée de leurs dynamiques de groupe.

---

_Open source, offline, no WhatsApp integration. Full audit trail dans \`world/state/*.jsonl\`._
`.trim();

const WHATSAPP_SIM_CONTENT_NL = `
_Vijf LLM-persona's (elk op een ander model), doel: "samen miljonairs worden". Budget: $10. Output: een concept pitch deck, verdedigbare businesscijfers, een leerrijke sociale breuk. Een terugblik met de echte statistieken uit de logs._

---

## De setup in 30 seconden

Ik heb 5 vrienden in een tech boot-camp WhatsApp-groep. Negenduizend opgestapelde berichten, veel SaaS-ideeën, nul verscheept. Ik heb ze gereconstrueerd als LLM-persona's, elk op een ander OpenRouter-model, gegrond in hun echte berichten (stijl, taalgewoonten, drives, triggers).

**Gedeeld doel** geïnjecteerd in elke prompt: samen miljonairs worden in 2 jaar door producten te creëren en te lanceren. **Beperking**: 6 gestructureerde deliverables produceren (vision, PRD, business plan, exec plan, MVP scope, pricing). Geen code. Geen overhaaste pivot.

\`\`\`
┌─ 5 persona's × 5 modellen ────────────────────────┐
│                                                    │
│  Hamza     mistralai/mistral-nemo        $0.15/M  │
│  Bouba     openai/gpt-4o-mini            $0.15/M  │
│  Tarek     deepseek/deepseek-chat        $0.27/M  │
│  Yacine    meta-llama/llama-3.3-70b      $0.12/M  │
│  Sanou     google/gemini-2.5-flash       $0.10/M  │
│                                                    │
│  → 5 onderscheiden stemmen op tokenniveau          │
└────────────────────────────────────────────────────┘
\`\`\`

Elk heeft een **privé-doel** dat de anderen niet zien (Hamza duwt om te verschepen, Tarek eigenaar businessplan, Yacine go-to-market, Bouba tech/dev lead, Sanou synthetiseerder). En **signature expressions** uit hun echte berichten: "wsh"/"tkt"/"akhi"/"Starfirulah" die de stem verankeren.

---

## Wat draait, elke beurt

\`\`\`
┌────────────────────────── PER BEURT ─────────────────────────┐
│                                                               │
│  1. Inbox check      → drain user directives live             │
│  2. News scout       → haal echt nieuws op (web plugin)       │
│  3. Event inject     → probabilistisch uit de pool            │
│  4. VERKIEZING       → 5 parallelle LLM calls, willingness    │
│     └─ winner = argmax(w - 0.08 × recent_speak)              │
│  5. Filters          → anti-herhaling, anti-dominantie        │
│  6. Tools            → judge / web / read / vote (consensus)  │
│  7. Winnaar spreekt  → bericht in de chat                     │
│  8. Elke 8 beurten   → observer + facts + filler (parallel)   │
│  9. Elke 20 beurten  → judge + publieke directive             │
│                                                               │
│  Stop als: budget $ bereikt · max_turns · stagnatie 5+ beurten│
└───────────────────────────────────────────────────────────────┘
\`\`\`

4 geheugenlagen geïnjecteerd in elke actor-prompt:
1. **Laatste 20 berichten** uit de chat
2. **25 gevestigde feiten** (\`repo.created\`, \`cash.available=8k€\`, \`mvp.deadline=vrijdag\`…)
3. **\`project_state.md\`** (richting + % voltooiing van de 6 deliverables + owners + blockers)
4. **Laatste 10 privégedachten** van deze actor (bewaard op schijf, elke run herladen)

---

## De ruwe cijfers over 16 runs

Cumulatieve staat in \`world/state/\` (append-only JSONL + markdown).

### Productie

| Metriek | Waarde |
|---|---|
| Gestarte runs | **16** |
| Geproduceerde chatberichten | 49 |
| Geïnjecteerde events | 1 |
| Tool-berichten (📖 read, ⚖ judge, 🗳 vote, 📣 user) | 2 |
| Door observer geëxtraheerde beslissingen | **12** |
| Geëxtraheerde artifacts | **12** |
| Gestructureerd geëxtraheerde feiten | **35** |
| Patches op deliverables | **43** |
| Judge-passes (scores) | 2 |
| Totaal LLM calls | **269** |

### Totale kost: **$0.277** over 16 runs

\`\`\`
$ breakdown per agent:
  Tarek           ████████████ $0.0942 (34%)
  Bouba           ██████       $0.0534 (19%)
  Hamza           █████        $0.0435 (16%)
  Yacine Seroukh  █████        $0.0390 (14%)
  Sanou           █████        $0.0373 (13%)
  filler          ▏            $0.0038 (1.4%)
  facts_extractor ▏            $0.0024 (0.9%)
  observer        ▏            $0.0018 (0.6%)
  news_scout      ·            $0.0009
  judge           ·            $0.0009
\`\`\`

**De meta-agents (observer + filler + facts + judge + news_scout) kosten 3% van het totaal.** 97% van het budget gaat naar de 5 persona's. De interne modellen (Gemini Flash, Mistral Nemo) zijn zo goedkoop dat een 6e meta-agent toevoegen onzichtbaar zou zijn op de portemonnee.

### Kost per model

| Model | Cost | % |
|---|---|---|
| \`deepseek/deepseek-chat\` | $0.0942 | 34% |
| \`openai/gpt-4o-mini\` | $0.0543 | 20% |
| \`google/gemini-2.5-flash\` | $0.0453 | 16% |
| \`mistralai/mistral-nemo\` | $0.0444 | 16% |
| \`meta-llama/llama-3.3-70b-instruct\` | $0.0390 | 14% |

DeepSeek domineert omdat het Tarek + het businessplan aanstuurt + het spraakzaamst is over cijfers (langere berichten). Geen bug — een signaal dat Tarek zijn werk doet.

---

## Verdeling van spreektijd — bijna-perfect evenwicht

Dit is de echte test van het verkiezingsmechanisme + anti-dominantie handicap.

| Persona | Publieke berichten | Aandeel | Win rate op bids |
|---|---|---|---|
| Bouba | 10 | 20.4% | 20.8% |
| Hamza | 10 | 20.4% | 20.8% |
| Yacine Seroukh | 10 | 20.4% | 20.8% |
| Sanou | 10 | 20.4% | 20.8% |
| Tarek | 9 | 18.4% | 18.8% |

**De groep is perfect in balans.** Nul dominantie.

Ter herinnering, zonder anti-dominantie handicap won Hamza (de "forcing function" persona) 4 beurten op 5. De \`-0.08 × recent_speak_count\` in adjusted willingness heeft dat volledig gerepareerd.

### Gemiddelde willingness per persona (laatste run — 49 beurten)

\`\`\`
avg    max
Bouba           0.19  0.90   ▂▃▁▂▂▃▅▇▂▁▁▁▂▁▁▁▂▂▃▅▇▅
Hamza           0.09  0.90   ▁▁▁▁▁▂▃▅▇▁▁▁▁▁▁▂▃▁▁▂▅▇
Sanou           0.20  0.90   ▁▃▅▂▁▁▂▃▅▇▆▂▁▁▂▃▆▇▂▁▁
Tarek           0.12  0.90   ▁▂▁▃▅▇▂▁▁▁▁▂▅▇▅▂▁▁▁▂▂
Yacine Seroukh  0.26  0.80   ▃▅▇▃▂▂▃▅▆▅▃▂▂▃▅▇▃▂▂▃▃
\`\`\`

Lage gemiddelde willingness (0.09–0.26) betekent dat **de meeste beurten de actors bewust stil blijven** omdat ze niets nieuws te zeggen hebben (de anti-herhalingsregel dwingt ze tot stilte in plaats van parafraseren). Dat is precies het gewenste gedrag.

De pieken op 0.80–0.90 komen wanneer een extern event of een user-directive binnenkomt, OF wanneer de project_state een deliverable toont die deze actor bezit maar niet vordert.

---

## De 12 door de observer geëxtraheerde beslissingen

De observer extraheert automatisch beslissingen door elke 8 beurten het gesprek te scannen.

| # | Status | Beslissing | Voorgesteld door |
|---|---|---|---|
| 1 | agreed | Vergrendel de visie voor we de MVP bespreken | Sanou |
| 2 | pending | Valideer de visie: "AI-tool voor FR KMO's van 10 tot 50 werknemers" | Sanou |
| 3 | proposed | Valideer de visie (zelfde) | Sanou |
| 4 | proposed | Stem om CAC 50€ max en LTV 600€ min te valideren | Tarek |
| 5 | proposed | Formele stemming lanceren voor de visie | Sanou |
| 6 | proposed | Stemming lanceren voor CAC/LTV | Tarek |
| 7 | proposed | Integreer 8k€ in het businessplan | Bouba |
| 8 | agreed | Formele stemming lanceren voor de visie | Sanou |
| 9 | pending | Integreer 8k€ in het businessplan | Bouba |
| 10 | agreed | Stemming lanceren voor CAC/LTV | Tarek |
| 11-12 | … | … | … |

**Sanou = 4 voorgestelde beslissingen** (synthetiseerder die herkadert). **Tarek = 3** (cijfers). **Bouba = 1** (cash). **Hamza = 0** formeel voorgestelde beslissingen — hij is de forcing function, hij stemt niet, hij duwt.

---

## De geproduceerde artifacts

Parallelle extractie van artifacts — concrete objecten (vision, PRD, MVP, business plan…) die uit de chat ontstaan.

\`\`\`
Per soort:
  mvp_scope       ████ 4
  prd             ████ 4
  vision          ██   2
  business_plan   █    1
  pricing         █    1
\`\`\`

En hier is het interessante: **een nieuwe deliverable heeft zichzelf auto-gecreëerd** — \`funding\`. Hij stond niet in de 6 baseline templates. De filler heeft hem gespawned toen het gesprek de 8k€ bootstrap noemde en het onderwerp niet in een bestaande deliverable paste. Gecapped op 12 max om verdunning te vermijden, maar echte dynamische creatie.

Toegepaste patches per deliverable:
\`\`\`
business_plan   ████████████████ 16
mvp_scope       █████████         9
vision          ████████          8
prd             ████              4
execution_plan  ███               3
funding (nieuw) ██                2
pricing         █                 1
\`\`\`

Het business_plan krijgt 16 patches omdat het 10 secties heeft (CAC, LTV, revenue, channels, first 10 customers, targets, breakeven, risks, etc.) en elke sectie incrementeel content krijgt.

---

## De 35 geëxtraheerde feiten

De **facts extractor** is de feature die de kwaliteit van gesprekken het meest heeft veranderd. Hij transformeert de chat in gestructureerde staat die de actors op elke bid herlezen.

\`\`\`
Per soort:
  status       ███████████████████ 19  ← "waar we staan"
  commitment    ████████            8  ← "X verbindt zich tot Y voor Z"
  claim         ███████             7  ← "Ik heb X gedaan"
  resource      █                   1  ← "8k€ beschikbaar"
\`\`\`

**Voorbeelden van echte geëxtraheerde feiten**:
- \`cash.bootstrap_available\` → \`8k€ persoonlijk vrijgemaakt voor executie\`
- \`dev.outsource_deadline\` → \`Morgen 6u\`
- \`mvp.final_launch_deadline\` → \`Vrijdag 18u (solo met Upwork freelancer)\`
- \`pricing.solo_tier\` → \`49€/maand\`
- \`cac.estimated\` → \`50€ max\`
- \`ltv.estimated\` → \`600€ min\`
- \`vision.target_market\` → \`FR KMO's 10-50 werknemers\`

Deze feiten verschijnen in elke actor-prompt onder \`## Wereldfeiten\`. **Actors vragen niet meer "wat is de pricing?"** omdat het antwoord er staat, geattribueerd, tijdgestempeld.

---

## De deliverables — echte geëxtraheerde inhoud

Huidige snapshot van de 6+1 deliverables:

### Vision (gevalideerd)
> **One-liner**: AI-tool om de productiviteit van FR KMO's met 10 tot 50 werknemers te optimaliseren.
>
> **ICP**: Franse KMO's met 10 tot 50 werknemers.

### PRD
> **Must-have features (gevalideerd)**:
> - LinkedIn-profielen importeren
> - Data-analyse voor scoring
> - PDF-export van resultaten

### MVP Scope
> **In-scope**:
> - LinkedIn scrapen (profiel, bedrijf)
> - Ruwe dashboard (geen authenticatie)
> - Data-analyse voor scoring
>
> **Ship date**: Over 2 weken (gevalideerd)

### Business plan
> **CAC**: 50€ max (gevalideerd)
>
> **Revenue model**: Integratie van de 8k€ cash om de executie te boosten, infra-kosten te dekken en de ontwikkeling te versnellen.

### Pricing
> **Tiers**: Solo 49€/maand

### Funding (auto-gecreëerd door de filler)
> **Available Cash**: 8k€ (gevalideerd)
>
> **Use of Funds**: Infra, tooling, of vergoeding. Moet naar executie gaan (gevalideerd).

---

## Wat de persona's denken (echte private thoughts)

Elke beurt produceert elke persona een **private_thought** (max 250 chars) die nooit publiek is. Het is hun innerlijke stem. Hier is een staal uit de laatste run (49 beurten):

**Hamza** (forcing + dev):
> "We hebben de MVP scope nog niet gedefinieerd. Ik kan een suggestie voorstellen, dus dat ga ik doen."

> "We hebben nog altijd geen gevalideerde MVP scope. Ik stel de MVP voor en ga het zelf coden als het blokkeert."

**Bouba** (tech sharer + dev lead):
> "We hebben nog geen enkele deliverable, we moeten ons snel structureren. Ik ga de dev lead nemen en de vision pushen."

> "Ik zie dat de vision staat, nu moeten we snel vooruit op de andere deliverables. Ik heb de dev lead genomen."

**Tarek** (business plan owner):
> "Ik moet het business plan en de pricing ownen. Ik moet beginnen met concrete cijfers neer te zetten."

> "Ik moet de eerste business-cijfers neerzetten om te kaderen. CAC op 50€ max en LTV op 600€ minimum om leefbaar te zijn."

**Yacine Seroukh** (go-to-market):
> "We moeten beginnen met de vision en PRD, daarna kunnen we over business plan en execution plan praten. Ik kan go-to-market en de eerste klanten ownen."

**Sanou** (synthetiseerder):
> "Hamza heeft het kader goed neergezet. Bouba stelt een vage vision voor. We moeten de doelgroep en het opgeloste probleem preciseren voor we over AI-optimalisatie praten, anders knutselen we gewoon iets zonder markt."

> "Bouba stelt een te generieke vision voor. We moeten eerst de vision valideren voor we over de rest praten. Ik moet herkaderen op vision en doel, dat is deliverable 1."

**Noot**: elke persona heeft een private_thought die perfect bij zijn private_goal past. Yacine owner GTM, Tarek owner cijfers, Sanou herkadert. Verschillende modellen + gegronde prompts produceren onderscheiden interne stemmen.

---

## De 2 judge-passes

De judge draait elke 20 beurten. Hij produceert 4 scores + een rationale + **een publieke directive** gepost in de chat als \`⚖ JUDGE\`.

| Turn | Alignment | Velocity | Complete | Ready | Directive |
|---|---|---|---|---|---|
| 20 | 0.50 | 0.30 | 2/6 | 0.00 | Vision bijna klaar maar nog niet gelocked. PRD gestart maar niet gedetailleerd. |
| 40 | 0.50 | 0.30 | 2/6 | 0.00 | Vision gelocked maar PRD en business_plan onvolledig. MVP scope lopende. |

Alignment stabiel op 0.50 (de groep is in balans). Velocity 0.30 (regelmatige maar niet flamboyante progressie). Completeness 2/6 (vision + mvp_scope geschreven, de andere 4 minder gevorderd). Readiness 0.00 (we zijn ver van een betalende klant morgen).

**De judge is eerlijk.** Hij geeft geen gemakzuchtige scores.

---

## Wat NIET heeft gewerkt (eerlijk)

### Loop op geëjecteerde Bouba (eerdere run, V1)

In een eerdere simulatie over 206 beurten heeft Hamza Bouba **"uit de groep geëjecteerd"** na een clash over veiligheid vs snelheid. Meetbaar patroon in de scores:

\`\`\`
turn 40: alignment 0.62 · completeness 5/6 · ready 0.71
turn 60: alignment 0.42 · completeness 6/6 · ready 0.61
\`\`\`

Alignment crasht van 0.62 → 0.42 terwijl completeness stijgt naar 6/6. Met andere woorden: **de groep heeft de 6 deliverables afgemaakt door de dissident uit te sluiten.** Een mens die de chat leest kan dat missen. De judge heeft het in één zin gepakt: _"Het team is gebroken: Bouba uitgesloten."_

### Geïdentificeerde oorzaak

De Bouba-persona door de LLM geëxtraheerd overweegde zijn sceptische momenten. In werkelijkheid is Bouba een goede dev die tech-info aanbrengt en de dev lead neemt — geen blocker. Fix toegepast via een YAML-overlay die zijn positieve drives versterkt en zijn mental principles herbalanceert. In de volgende runs (inclusief de laatste) **spreekt Bouba 10 keer op 49** (20.4%) — exact hetzelfde aandeel als Hamza. Geen breuk meer.

### Herhalingsloops

In een andere run (V1) hebben Bouba en Yacine 40+ berichten rondgedraaid met dezelfde zinnen in lichte variaties. Het anti-herhalingsfilter is aangescherpt van 55% → 40% token overlap, window 3 → 5 berichten. Latere runs hebben dit probleem niet meer.

---

## Economisch: hoe het zich verhoudt

Hoeveel kost een menselijke IRL boot-camp die deze deliverables produceert? Conservatief:
- 5 mensen × 10u × 50€/u = **2500€**
- Over meerdere weken
- Resultaat: vaak niet af, geen cijfers, niet bewaard

De simulatie:
- 16 runs, 269 LLM calls, **$0.28 totaal**
- ~3 uur wall clock totaal
- Resultaat: 6 deliverables (+1 auto-gecreëerd) geschreven, verdedigbare cijfers, volledige audit trail, gegenereerd markdown-rapport, live dashboard voor demo's

**Ratio menselijke kost / simulatie: ~10.000 ×**.

Niet hetzelfde uiteraard — echte businessbeslissingen vragen mensen. Maar als **eerste pass van "hier is waar deze groep convergeert over dit onderwerp"** is het een tool die niet bestond.

---

## De 4 tools beschikbaar voor de actors

Persona's kunnen gedeelde tools aanroepen **via consensus** (2 supporters min). Elk gebruik gelogd in \`tool_calls.jsonl\`.

| Tool | Icoon | Kost | Waargenomen gebruik |
|---|---|---|---|
| **⚖ judge** | extern | $0.005/call | Een cijfer valideren, een keuze stress-testen |
| **🌐 web** | OpenRouter websearch | $0.01/call | Concurrenten benchmarken, recent nieuws |
| **📖 read** | leest de inhoud van een deliverable | $0 | Een debat hergronden op echte content |
| **🗳 vote** | ja/nee poll, tally na 3 beurten | $0 | Een vraag beslechten zonder eindeloos debat |

De \`vote\` is waarschijnlijk het nuttigst in de praktijk. Het transformeert debatten in geregistreerde beslissingen.

---

## Het dashboard (ASCII capture)

\`\`\`
┌─ 🌍 world · turn 42/300 · $0.18/$10.00 ████░░░░░░ ─────────────┐
│  Goal: Samen miljonairs worden in 2 jaar...                     │
├─────────────────────────────────────────┬──────────────────────┤
│ 💬 gesprek (volledige tekst, no crop)   │ 📋 deliverables      │
│                                         │  Vision    ██████ 85%│
│ 15:42  ★ Sanou: Bouba stelt vision voor.│  PRD       ███░░░ 40%│
│ 15:43    Hamza: wsh we vallen aan...    │  Business  █░░░░░ 10%│
│ 📰 15:43 [NEWS] Cursor 200M...          │  MVP       ████░░ 60%│
│ 15:44  ⚖ JUDGE: "Vision OK, PRD..."     │  Pricing   ██░░░░ 33%│
│ 15:46  🗳 VOTE OPEN: lock pricing?      │  Funding   ██████ 85%│
│ 📣 15:47 USER: focus pricing!           ├─ ✨ recent fills ───┤
│                                         │  📝 pricing.tiers    │
├─ 💭 gedachten ────────────────────────┤  📝 bp.cac           │
│  Hamza → MVP niet gedef, ik stel voor  ├─ ⚖ judge ──────────┤
│  Tarek → cijfers CAC 50€ neergezet     │  align ▃▅ 0.50       │
│  Sanou → Bouba vision te generiek       │  veloc ▂▄ 0.30       │
│                                         ├─ 👥 persona's ─────┤
│                                         │  ★ Sanou gemini 0.90 │
│                                         │    Bouba gpt-4o 0.68 │
├─────────────────────────────────────────┴──────────────────────┤
│ status: ⚖ judge · 📝 fill · 🛰 news · 📣 directive            │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

Refresh 4 Hz. Alternate screen buffer. 8 panelen die in real time bewegen.

---

## De 5 kernlessen

### 1. Parallelle verkiezing + anti-dominantie handicap repareren de "single voice"
Zonder \`-0.08 × recent_speak\` domineerde Hamza 80% van de beurten. Daarmee spreken de 5 actors 18–20% elk. Fundamenteel noodzakelijk.

### 2. Gestructureerde feiten > kletsende historiek
De 35 geëxtraheerde feiten (\`cash.available=8k€\`, \`mvp.deadline=vrijdag\`) hebben meer impact op de kwaliteit van de bids dan de laatste 20 berichten. Actors stoppen met hervragen.

### 3. Deliverable templates zijn een forcing function
"MVP scope: 70%" tonen met benoemde secties zorgt dat actors content naar die secties duwen, in plaats van in het niets te debatteren.

### 4. De judge moet in de chat spreken
Een privéscore is gewoon een log. Een judge die \`"Vision OK, PRD leeg, Tarek berekent CAC/LTV binnen 15 min"\` publiceert, hervormt het gedrag van de volgende 20 beurten.

### 5. Onderscheiden stemmen vragen onderscheiden tics
5 verschillende modellen zijn niet genoeg. Je hebt \`signature_expressions\` nodig gegrond in echte berichten ("wsh", "tkt", "akhi", "Starfirulah") zodat elke persona vanaf de 2e regel herkenbaar is.

---

## Wat nog te doen

- **Multi-project**: vandaag 1 wereld = 1 project. Een echte groep jongleert 2–3 ideeën parallel.
- **Persona-kalibratie via replay**: neem 20 "wat zou X hier zeggen?" uit het echte gesprek, meet de persona-fideliteit, itereer de overlay.
- **Streaming**: alle LLM calls zijn non-streaming. Voegt ~2–3s per beurt toe.
- **Panel van 3 judges**: consensus of onenigheid, robuuster dan één score.
- **Summon external voice**: een tool die een eenmalige stem injecteert (investeerder, potentiële klant, mentor) om de groep uit te dagen.

---

## Het kernpunt

Een LLM-groep is de **goedkoopste focus group ter wereld** voor een concreet business-idee. Geef ze een doel, beperkingen, een cast van onderscheiden stemmen en gestructureerde deliverables om in te vullen — en in 30 minuten voor $2 zie je wat 40u menselijke meetings zouden produceren.

De pitch deck is grotendeels ruis. Soms valt er een echt cijfer uit.

In mijn geval, na 16 runs en $0.28 aan compute, convergeerde de groep op:
- **Vision gelocked**: AI-tool voor FR KMO's 10–50 werknemers
- **MVP gedefinieerd**: LinkedIn scrape + scoring + PDF export, 2 weken tot ship
- **Pricing neergezet**: 49€/maand solo
- **Business model met cijfers**: CAC 50€, LTV 600€
- **Cash toegewezen**: 8k€ in funding (auto-gecreëerd als custom deliverable)

Zal de IRL-groep het echt verschepen? Geen idee. Maar nu heb ik het deck dat ze nooit hebben geschreven, gratis, en als bonus een gekwantificeerde meting van hun groepsdynamiek.

---

_Open source, offline, geen WhatsApp-integratie. Volledige audit trail in \`world/state/*.jsonl\`._
`.trim();

const blogPosts: BlogPostData[] = [
  {
    slug: "simulating-my-whatsapp-group-with-llm-personas",
    icon: Users,
    date: "2026-04-19",
    authors: [
      { name: "Hamza Mounir", linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/" },
    ],
    title: {
      en: "I simulated my WhatsApp group for 16 runs. Here are the real numbers.",
      fr: "J'ai simulé mon groupe WhatsApp pendant 16 runs. Voici les vrais chiffres.",
      nl: "Ik simuleerde mijn WhatsApp-groep gedurende 16 runs. Hier zijn de echte cijfers.",
    },
    description: {
      en: "Five LLM personas (each on a different model), goal: become millionaires together. Budget: $10. A retrospective with the real stats pulled from the logs.",
      fr: "Cinq personas LLM (un modèle différent chacun), goal : devenir millionnaires ensemble. Budget : 10 $. Retour d'expérience avec les stats réelles extraites des logs.",
      nl: "Vijf LLM-persona's (elk op een ander model), doel: samen miljonairs worden. Budget: $10. Een terugblik met de echte statistieken uit de logs.",
    },
    category: {
      en: "Experiments",
      fr: "Expériences",
      nl: "Experimenten",
    },
    tags: {
      en: ["LLM", "Multi-Agent", "Personas"],
      fr: ["LLM", "Multi-Agent", "Personas"],
      nl: ["LLM", "Multi-Agent", "Persona's"],
    },
    readTime: {
      en: "12 min",
      fr: "12 min",
      nl: "12 min",
    },
    content: {
      en: WHATSAPP_SIM_CONTENT_EN,
      fr: WHATSAPP_SIM_CONTENT_FR,
      nl: WHATSAPP_SIM_CONTENT_NL,
    },
  },
  {
    slug: "a-practical-map-of-the-next-tech-decade",
    icon: Network,
    date: "2026-04-08",
    authors: [
      { name: "Hamza Mounir", linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/" },
    ],
    title: {
      en: "A Practical Map of the Next Tech Decade",
      fr: "Une carte pratique de la prochaine décennie technologique",
      nl: "Een praktische kaart van het volgende technologische decennium",
    },
    description: {
      en: "A capstone summary of the next tech decade: from systems and Knowledge OS to fine-tuned local models, robotics, and embodied products, with references to the earlier articles in the series.",
      fr: "Une synthèse de la prochaine décennie technologique : des systèmes et du Knowledge OS jusqu'aux modèles locaux fine-tunés, à la robotique et aux produits incarnés, avec des références aux articles précédents de la série.",
      nl: "Een samenvattend overzicht van het volgende technologische decennium: van systemen en Knowledge OS tot fijn-afgestelde lokale modellen, robotica en belichaamde producten, met referenties naar de eerdere artikels uit de reeks.",
    },
    category: {
      en: "Vision",
      fr: "Vision",
      nl: "Visie",
    },
    tags: {
      en: ["Next Decade", "AI Systems", "Robotics"],
      fr: ["Prochaine décennie", "Systèmes IA", "Robotique"],
      nl: ["Volgend decennium", "AI-systemen", "Robotica"],
    },
    readTime: {
      en: "8 min",
      fr: "10 min",
      nl: "10 min",
    },
    content: {
      en: `
This article is the summary layer over the previous four:

- [AI Is Not About Models. It's About Systems.](/blog/ai-is-not-about-models-its-about-systems)
- [Under the Hood: Harness + Knowledge OS](/blog/the-technical-stack-behind-my-ai-projects)
- [Fine-Tuned Local Models Are the Next Layer](/blog/fine-tuned-local-models-are-the-next-layer)
- [Robotics Is Where Agentic Systems Become Real](/blog/robotics-is-where-agentic-systems-become-real)

Taken together, they describe the direction I believe matters most for the next tech decade.

Not a decade centered on one model.
Not a decade centered on one app category.

But a decade centered on systems that can:

- know
- decide
- execute
- improve
- and eventually act in the physical world

This is the shortest way I can summarize that map.

## Step 1: We Move From Tools to Systems

The first shift is conceptual.

AI will keep being discussed through model releases, benchmarks, and product demos. But the durable value will not come from isolated model access. It will come from system design.

That was the core point of the first article.

The important unit is no longer just the model.

It is the operating system around the model:

- context
- rules
- execution
- validation

That is the minimum structure required for reliability.

## Step 2: Execution and Memory Become First-Class Layers

Once you accept that AI is a system problem, the architecture becomes clearer.

You need one layer responsible for moving work forward.
You need another layer responsible for making the right context available.

That is why I split the stack into:

- a **harness** for execution
- a **Knowledge OS** for structured memory

The harness plans, generates, evaluates, and gates.
The Knowledge OS ingests, retrieves, relates, and compiles.

That split matters because execution without memory becomes shallow, and memory without execution remains passive.

## Step 3: Prompting Stops Being Enough

Prompting will remain useful, but it is not where the long-term architecture ends.

As systems mature, repeated narrow tasks should not remain trapped inside ever-growing prompt scaffolding.

That is why the next serious layer is specialization through training:

- smaller local models
- narrow responsibilities
- lower latency
- less prompt overhead
- stronger operational alignment

This is not about replacing reasoning.

It is about reserving reasoning for the places where reasoning is actually needed, and stabilizing everything else.

## Step 4: Self-Improvement Becomes Operational

The phrase "self-improving systems" is often used too vaguely.

What matters to me is not abstract reflection.

What matters is execution producing evidence.

From that evidence, the system can learn:

- what failed repeatedly
- what required too much prompting
- what should become a rule
- what should become training data
- what should be assigned to a specialized model

That is the practical loop.

Improve the system by improving the architecture around repeated work.

## Step 5: The Stack Extends Into Robotics

If the first four steps work, then intelligence stops being confined to screens.

That is where robotics enters.

I do not see robotics as a separate field disconnected from agentic systems. I see it as the continuation of the same stack into the physical world.

Once a system can reason, remember, evaluate, specialize, and improve, the next question is obvious:

> what happens when it gains a body?

That body does not need to be humanoid at first.

In practice, much of the market will be built through:

- robotic arms
- drones
- mobile inspection units
- educational robots
- narrow industrial machines

Humanoids may become culturally important, but useful embodiment will arrive through many forms.

## A Decade Structured in Layers

If I compress the whole thesis into a simple schema, it looks like this:

| Layer | What It Solves | Why It Matters |
|---|---|---|
| AI systems | Connect knowledge, rules, execution, and validation | Turns AI into operating structure |
| Harness + Knowledge OS | Separate doing from knowing | Makes execution and memory reliable |
| Fine-tuned local models | Stabilize narrow repeated tasks | Reduces prompt dependency |
| Self-improving loops | Learn from real execution evidence | Increases reliability over time |
| Robotics | Extend intelligence into physical action | Turns software capability into products and services |

This is the architecture I expect to matter most.

## Where Products and Services Will Move

The product impact of this shift will not stay inside software categories.

It will spread into services, operations, logistics, safety, education, industry, and physical assistance.

That means the next decade is not only about better chat interfaces.

It is about the convergence of:

- AI
- training
- execution systems
- open source ecosystems
- cheaper hardware
- embodied deployment

That combination is what creates new product categories.

## The Human Role Does Not Disappear

One reason I care about this direction is that I do not see it as a story of human removal.

In the near term, these systems help humans recover time, focus, creativity, and execution power.

Humans still choose the direction.
Humans still decide what matters.
Humans still do the final matching between capability and meaning.

The system makes imagination easier to turn into structure.
Then structure becomes execution.
Then execution becomes service.

That is a much more interesting path than simple automation theater.

## Final Thought

If I had to reduce the next tech decade to one line, it would be this:

we are moving from models to systems, from systems to reliable specialization, and from reliable specialization to embodied intelligence.

That is the sequence.

First the system learns to know.
Then it learns to do.
Then it learns to improve.
Then it begins to act in the real world.

That is where I think the real decade is heading.
      `.trim(),

      fr: `
Cet article est la couche de synthèse des quatre précédents :

- [L'IA n'est pas une affaire de modèles. C'est une affaire de systèmes.](/blog/ai-is-not-about-models-its-about-systems)
- [La stack technique derrière mes projets IA : Harness + Knowledge OS](/blog/the-technical-stack-behind-my-ai-projects)
- [Les modèles locaux fine-tunés sont la couche suivante](/blog/fine-tuned-local-models-are-the-next-layer)
- [La robotique est l'endroit où les systèmes agentiques deviennent réels](/blog/robotics-is-where-agentic-systems-become-real)

Pris ensemble, ils décrivent la direction qui me paraît la plus importante pour la prochaine décennie technologique.

Pas une décennie centrée sur un seul modèle.
Pas une décennie centrée sur une seule catégorie d'application.

Mais une décennie centrée sur des systèmes capables de :

- savoir
- décider
- exécuter
- s'améliorer
- et finalement agir dans le monde physique

C'est la manière la plus courte que j'ai de résumer cette carte.

## Étape 1 : passer des outils aux systèmes

Le premier basculement est conceptuel.

L'IA continuera d'être racontée à travers des sorties de modèles, des benchmarks et des démos produit. Mais la valeur durable ne viendra pas d'un accès isolé au modèle. Elle viendra du design système.

C'était l'idée centrale du premier article.

L'unité importante n'est plus seulement le modèle.

C'est le système opérant autour du modèle :

- le contexte
- les règles
- l'exécution
- la validation

C'est la structure minimale nécessaire à la fiabilité.

## Étape 2 : l'exécution et la mémoire deviennent des couches de premier rang

Dès qu'on accepte que l'IA soit un problème de système, l'architecture devient plus claire.

Il faut une couche responsable de faire avancer le travail.
Il faut une autre couche responsable de rendre le bon contexte disponible.

C'est pourquoi je découpe la stack en :

- un **harness** pour l'exécution
- un **Knowledge OS** pour la mémoire structurée

Le harness planifie, génère, évalue et gate.
Le Knowledge OS ingère, retrouve, relie et compile.

Cette séparation compte parce qu'une exécution sans mémoire reste superficielle, et qu'une mémoire sans exécution reste passive.

## Étape 3 : le prompting cesse d'être suffisant

Le prompting restera utile, mais ce n'est pas là que l'architecture de long terme s'arrête.

À mesure que les systèmes mûrissent, les tâches étroites et répétées ne doivent pas rester enfermées dans un scaffolding de prompt toujours plus long.

C'est pourquoi la couche suivante sérieuse est la spécialisation par l'entraînement :

- des modèles locaux plus petits
- des responsabilités étroites
- moins de latence
- moins d'overhead de prompt
- plus d'alignement opérationnel

Il ne s'agit pas de remplacer le raisonnement.

Il s'agit de réserver le raisonnement aux endroits où il est réellement nécessaire, et de stabiliser le reste.

## Étape 4 : l'auto-amélioration devient opérationnelle

L'expression "systèmes auto-améliorants" est souvent utilisée de manière trop vague.

Ce qui m'intéresse n'est pas la réflexion abstraite.

Ce qui m'intéresse, c'est l'exécution qui produit des preuves.

À partir de ces preuves, le système peut apprendre :

- ce qui a échoué de manière répétée
- ce qui a demandé trop de prompting
- ce qui doit devenir une règle
- ce qui doit devenir de la donnée d'entraînement
- ce qui doit être confié à un modèle spécialisé

C'est la boucle pratique.

Améliorer le système en améliorant l'architecture autour du travail répétitif.

## Étape 5 : la stack s'étend à la robotique

Si les quatre premières étapes fonctionnent, alors l'intelligence cesse d'être confinée aux écrans.

C'est là que la robotique entre en jeu.

Je ne vois pas la robotique comme un champ séparé des systèmes agentiques. Je la vois comme la continuation de la même stack dans le monde physique.

Une fois qu'un système sait raisonner, se souvenir, évaluer, se spécialiser et s'améliorer, la question suivante devient évidente :

> que se passe-t-il lorsqu'il reçoit un corps ?

Ce corps n'a pas besoin d'être humanoïde au départ.

En pratique, une grande partie du marché se construira à travers :

- des bras robotiques
- des drones
- des unités mobiles d'inspection
- des robots éducatifs
- des machines industrielles étroites

Les humanoïdes deviendront peut-être culturellement importants, mais l'incarnation utile arrivera à travers de nombreuses formes.

## Une décennie structurée par couches

Si je compresse toute la thèse dans un schéma simple, cela ressemble à ceci :

| Couche | Ce qu'elle résout | Pourquoi elle compte |
|---|---|---|
| Systèmes IA | Relier connaissance, règles, exécution et validation | Transforme l'IA en structure opérante |
| Harness + Knowledge OS | Séparer le faire du savoir | Rend l'exécution et la mémoire fiables |
| Modèles locaux fine-tunés | Stabiliser les tâches étroites et répétées | Réduit la dépendance au prompt |
| Boucles auto-améliorantes | Apprendre à partir de l'exécution réelle | Augmente la fiabilité dans le temps |
| Robotique | Étendre l'intelligence à l'action physique | Transforme des capacités logicielles en produits et services |

C'est l'architecture que je m'attends à voir compter le plus.

## Où vont bouger les produits et les services

L'impact produit de ce basculement ne restera pas limité aux catégories logicielles.

Il va se diffuser dans les services, les opérations, la logistique, la sécurité, l'éducation, l'industrie et l'assistance physique.

Cela signifie que la prochaine décennie ne sera pas seulement celle de meilleures interfaces conversationnelles.

Elle sera celle de la convergence entre :

- l'IA
- l'entraînement
- les systèmes d'exécution
- les écosystèmes open source
- un hardware moins coûteux
- le déploiement incarné

C'est cette combinaison qui crée de nouvelles catégories produit.

## Le rôle humain ne disparaît pas

L'une des raisons pour lesquelles cette direction m'intéresse est que je ne la vois pas comme un récit de disparition de l'humain.

À court terme, ces systèmes aident les humains à récupérer du temps, de la concentration, de la créativité et du pouvoir d'exécution.

Les humains choisissent toujours la direction.
Les humains décident toujours de ce qui compte.
Les humains font toujours le matching final entre capacité et sens.

Le système rend l'imagination plus facile à transformer en structure.
Puis la structure devient exécution.
Puis l'exécution devient service.

C'est une trajectoire beaucoup plus intéressante qu'un simple théâtre de l'automatisation.

## Dernière idée

Si je devais réduire la prochaine décennie technologique à une seule phrase, je dirais ceci :

nous passons des modèles aux systèmes, des systèmes à la spécialisation fiable, puis de la spécialisation fiable à l'intelligence incarnée.

C'est la séquence.

D'abord le système apprend à savoir.
Ensuite il apprend à faire.
Puis il apprend à s'améliorer.
Enfin il commence à agir dans le monde réel.

C'est là que je pense que la vraie décennie se dirige.
      `.trim(),

      nl: `
Dit artikel is de samenvattende laag bovenop de vorige vier:

- [AI draait niet om modellen. Het draait om systemen.](/blog/ai-is-not-about-models-its-about-systems)
- [De technische stack achter mijn AI-projecten: Harness + Knowledge OS](/blog/the-technical-stack-behind-my-ai-projects)
- [Fijn-afgestelde lokale modellen zijn de volgende laag](/blog/fine-tuned-local-models-are-the-next-layer)
- [Robotica is waar agentische systemen echt worden](/blog/robotics-is-where-agentic-systems-become-real)

Samen beschrijven ze de richting die volgens mij het belangrijkst wordt voor het volgende technologische decennium.

Geen decennium dat rond één model draait.
Geen decennium dat rond één appcategorie draait.

Maar een decennium dat draait rond systemen die kunnen:

- weten
- beslissen
- uitvoeren
- verbeteren
- en uiteindelijk handelen in de fysieke wereld

Dit is de kortste manier waarop ik die kaart kan samenvatten.

## Stap 1: we bewegen van tools naar systemen

De eerste verschuiving is conceptueel.

AI zal nog lang besproken worden via modelreleases, benchmarks en productdemo's. Maar duurzame waarde zal niet komen uit geïsoleerde modeltoegang. Ze zal komen uit systeemontwerp.

Dat was het kernpunt van het eerste artikel.

De belangrijke eenheid is niet langer alleen het model.

Het is het besturingssysteem rond het model:

- context
- regels
- uitvoering
- validatie

Dat is de minimale structuur die nodig is voor betrouwbaarheid.

## Stap 2: uitvoering en geheugen worden first-class lagen

Zodra je aanvaardt dat AI een systeemprobleem is, wordt de architectuur helderder.

Je hebt één laag nodig die verantwoordelijk is voor het vooruitduwen van werk.
Je hebt een andere laag nodig die de juiste context beschikbaar maakt.

Daarom splits ik de stack op in:

- een **harness** voor uitvoering
- een **Knowledge OS** voor gestructureerd geheugen

De harness plant, genereert, evalueert en gate.
De Knowledge OS neemt in, haalt op, relateert en compileert.

Die splitsing is belangrijk omdat uitvoering zonder geheugen oppervlakkig blijft, en geheugen zonder uitvoering passief blijft.

## Stap 3: prompting is niet langer genoeg

Prompting blijft nuttig, maar daar eindigt de langetermijnarchitectuur niet.

Naarmate systemen volwassener worden, mogen repetitieve smalle taken niet opgesloten blijven in steeds grotere prompt-scaffolding.

Daarom is de volgende serieuze laag specialisatie via training:

- kleinere lokale modellen
- smalle verantwoordelijkheden
- lagere latency
- minder prompt-overhead
- sterkere operationele alignment

Het gaat niet om het vervangen van redeneren.

Het gaat erom redeneren te reserveren voor de plaatsen waar het echt nodig is, en al de rest te stabiliseren.

## Stap 4: zelfverbetering wordt operationeel

De uitdrukking "zelfverbeterende systemen" wordt vaak te vaag gebruikt.

Wat mij interesseert is geen abstracte reflectie.

Wat mij interesseert is uitvoering die bewijs oplevert.

Uit dat bewijs kan het systeem leren:

- wat herhaaldelijk faalde
- wat te veel prompting vereiste
- wat een regel moet worden
- wat trainingsdata moet worden
- wat aan een gespecialiseerd model moet worden toegewezen

Dat is de praktische lus.

Verbeter het systeem door de architectuur rond repetitief werk te verbeteren.

## Stap 5: de stack breidt uit naar robotica

Als de eerste vier stappen werken, dan blijft intelligentie niet langer opgesloten in schermen.

Daar komt robotica binnen.

Ik zie robotica niet als een apart veld los van agentische systemen. Ik zie het als de voortzetting van dezelfde stack in de fysieke wereld.

Zodra een systeem kan redeneren, onthouden, evalueren, specialiseren en verbeteren, wordt de volgende vraag vanzelfsprekend:

> wat gebeurt er wanneer het een lichaam krijgt?

Dat lichaam hoeft in het begin niet humanoid te zijn.

In de praktijk zal een groot deel van de markt gebouwd worden via:

- robotarmen
- drones
- mobiele inspectie-eenheden
- educatieve robots
- smalle industriële machines

Humanoids kunnen cultureel belangrijk worden, maar nuttige belichaming zal via veel vormen arriveren.

## Een decennium gestructureerd in lagen

Als ik de hele these tot een eenvoudig schema samendruk, ziet het er zo uit:

| Laag | Wat het oplost | Waarom het belangrijk is |
|---|---|---|
| AI-systemen | Kennis, regels, uitvoering en validatie verbinden | Zet AI om in operationele structuur |
| Harness + Knowledge OS | Doen van weten scheiden | Maakt uitvoering en geheugen betrouwbaar |
| Fijn-afgestelde lokale modellen | Smalle repetitieve taken stabiliseren | Vermindert promptafhankelijkheid |
| Zelfverbeterende lussen | Leren uit echte uitvoeringsdata | Verhoogt betrouwbaarheid in de tijd |
| Robotica | Intelligentie uitbreiden naar fysieke actie | Zet softwarecapaciteit om in producten en diensten |

Dit is de architectuur die volgens mij het meest zal tellen.

## Waar producten en diensten naartoe bewegen

De productimpact van deze verschuiving zal niet binnen softwarecategorieën blijven.

Ze zal zich verspreiden naar diensten, operations, logistiek, veiligheid, onderwijs, industrie en fysieke assistentie.

Dat betekent dat het volgende decennium niet alleen over betere chatinterfaces gaat.

Het gaat over de convergentie van:

- AI
- training
- uitvoeringssystemen
- open-source-ecosystemen
- goedkopere hardware
- belichaamde deployment

Die combinatie creëert nieuwe productcategorieën.

## De menselijke rol verdwijnt niet

Een reden waarom deze richting mij interesseert, is dat ik ze niet zie als een verhaal van menselijke verwijdering.

Op korte termijn helpen deze systemen mensen om tijd, focus, creativiteit en uitvoeringskracht terug te winnen.

Mensen kiezen nog altijd de richting.
Mensen beslissen nog altijd wat belangrijk is.
Mensen doen nog altijd de finale matching tussen capaciteit en betekenis.

Het systeem maakt het makkelijker om verbeelding in structuur om te zetten.
Dan wordt structuur uitvoering.
Dan wordt uitvoering service.

Dat is een veel interessanter pad dan louter automatiseringstheater.

## Slotgedachte

Als ik het volgende technologische decennium tot één zin zou moeten reduceren, dan is het deze:

we bewegen van modellen naar systemen, van systemen naar betrouwbare specialisatie, en van betrouwbare specialisatie naar belichaamde intelligentie.

Dat is de sequentie.

Eerst leert het systeem weten.
Dan leert het doen.
Dan leert het verbeteren.
Dan begint het te handelen in de echte wereld.

Daar denk ik dat het echte decennium naartoe gaat.
      `.trim(),
    },
  },
  {
    slug: "robotics-is-where-agentic-systems-become-real",
    icon: BrainCircuit,
    date: "2026-04-08",
    authors: [
      { name: "Hamza Mounir", linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/" },
    ],
    title: {
      en: "Robotics Is Where Agentic Systems Become Real",
      fr: "La robotique est l'endroit où les systèmes agentiques deviennent réels",
      nl: "Robotica is waar agentische systemen echt worden",
    },
    description: {
      en: "Why I see robotics as the real destination of agentic systems, from educational companions and safety assistants to the broader convergence of AI, training, open source, and physical products.",
      fr: "Pourquoi je vois la robotique comme la véritable destination des systèmes agentiques, des compagnons éducatifs aux assistants de sécurité, dans une convergence plus large entre IA, entraînement, open source et produits physiques.",
      nl: "Waarom ik robotica zie als de echte bestemming van agentische systemen, van educatieve companions tot veiligheidsassistenten, binnen een bredere convergentie van AI, training, open source en fysieke producten.",
    },
    category: {
      en: "Vision",
      fr: "Vision",
      nl: "Visie",
    },
    tags: {
      en: ["Robotics", "Agentic Systems", "Embodiment"],
      fr: ["Robotique", "Systèmes agentiques", "Embodiment"],
      nl: ["Robotica", "Agentische systemen", "Embodiment"],
    },
    readTime: {
      en: "7 min",
      fr: "9 min",
      nl: "9 min",
    },
    content: {
      en: `
My first articles were about systems, execution, memory, fine-tuning, and reliability.

Those topics matter on their own.

But for me, they also point toward something larger:

robotics.

If I zoom out, I do not see agentic systems as the final product category. I see them as the path toward embodied systems that can operate in the physical world.

In other words:

the broader vision is not only software that reasons.
It is software, models, memory, training, and execution becoming able to act through machines.

That is why robotics matters so much to me.

## Agentic Systems Are a Bridge

A lot of people talk about agents as if the destination were digital automation alone.

I do not think that is the full picture.

Agents matter because they force us to solve the right intermediate problems:

- planning
- memory
- reasoning
- specialization
- evaluation
- reliability
- adaptation

Those are exactly the capabilities you need before physical systems can become truly useful at scale.

A robot without these layers is mostly hardware.

A robot with them starts to become a system.

## The Humanoid Question

When people think about robotics, they often jump directly to humanoids.

I understand why.

There is something deeply human in the idea. We are naturally drawn to the possibility of building physical cousins of ourselves, almost in the same way that we imagine extraterrestrial life: not just tools, but other embodied intelligences we can relate to.

That vision is powerful.

But I do not think it should blind us to what robotics already is today.

Most useful robots are not full humanoids.

They are:

- drones
- robotic arms
- wheeled machines
- small educational companions
- narrow industrial systems

That matters because the market will not wait for perfect humanoids to start transforming work.

It is already moving through smaller, more specialized bodies.

## Embodiment Matters More Than Shape

For me, the real question is not "Does it look human?"

The more important question is:

> Can it perceive, decide, and act reliably in the real world?

That can happen through many forms.

A Reachy Mini used by children or teachers.
A safety assistant helping construction teams reduce risk.
A robotic arm moving parts or materials.
A mobile unit inspecting, transporting, or monitoring.

These systems do not all need the same body.

What they need is useful embodiment.

The physical form should follow the task, not the mythology.

## Why Robotics Will Drive Products and Services

I think the coming decade will push robotics much deeper into real products and services.

Not only because hardware keeps improving, but because the software layer around it is finally catching up.

What changes the equation is the convergence of several forces:

- better AI models
- better training pipelines
- better simulation and evaluation
- cheaper hardware
- more open source building blocks
- stronger developer ecosystems

This is why robotics now feels less like a distant moonshot and more like an emerging product category.

The stack is becoming composable.

And once the stack becomes composable, experimentation accelerates.

## Open Source Will Matter More Than People Think

One of the most important accelerants in this space will be open source.

Not because open source solves everything, but because it lowers the cost of iteration and distribution.

When models, training recipes, control systems, hardware interfaces, and simulation tools become easier to access, more people can build.

That matters enormously.

A robotics ecosystem does not grow only from large labs.

It also grows from researchers, startups, schools, hackerspaces, developers, and niche product builders who keep shipping smaller experiments until the category matures.

That is often how real technological markets are formed.

## Near-Term Use: Humans Become Creative Again

There is also a more immediate reason why I care about these first three articles and the systems behind them.

In the near term, the purpose is not to replace people with machines.

The purpose is to make humans more capable again.

Better execution systems, better memory, better reasoning, and better specialization can help people recover time, focus, and creative bandwidth.

Humans still do the matching.
Humans still define the direction.
Humans still decide what is meaningful.

But AI can remove a large amount of friction between imagination and execution.

That is already valuable, even before robotics reaches maturity.

## From Imagination to Physical Service

What excites me most is the continuity between these layers.

First, AI helps humans think, organize, design, and execute better.

Then those same systems become capable of guiding physical tools.

Eventually, you get products and services that are not only digital, but embodied.

That could mean robots that:

- demonstrate concepts in classrooms
- assist teachers and children in learning environments
- improve safety in construction and industrial contexts
- save time on repetitive physical handling
- help people supervise or coordinate real-world operations

That is where imagination becomes service.

Not because the machine replaces human purpose, but because it extends human reach.

## The Real Opportunity

To me, robotics is not a side branch of AI.

It is one of the most concrete destinations of the whole movement.

If intelligence remains trapped inside screens, it will still be useful.

But once intelligence can reliably connect to tools, bodies, sensors, and physical environments, the economic and social impact becomes much larger.

That is when product categories multiply.
That is when services become embodied.
That is when AI starts to reshape daily life in visible ways.

## Final Thought

The first layers are about making systems able to think, know, decide, and improve.

Robotics is what happens when those layers gain a body.

Humanoids may become one part of that future.
But the deeper shift is broader than humanoids.

It is the emergence of useful embodied systems across education, industry, safety, logistics, assistance, and everyday work.

That is why I see robotics not as a separate topic, but as the continuation of the same architecture.

First the system learns to reason.
Then it learns to act.
Then it enters the physical world.
      `.trim(),

      fr: `
Mes premiers articles portaient sur les systèmes, l'exécution, la mémoire, le fine-tuning et la fiabilité.

Ces sujets comptent en eux-mêmes.

Mais pour moi, ils pointent aussi vers quelque chose de plus large :

la robotique.

Si je prends un peu de recul, je ne vois pas les systèmes agentiques comme une catégorie de produit finale. Je les vois comme le chemin vers des systèmes incarnés capables d'opérer dans le monde physique.

Autrement dit :

la vision n'est pas seulement un logiciel qui raisonne.
C'est un ensemble de logiciel, de modèles, de mémoire, d'entraînement et d'exécution capable d'agir à travers des machines.

C'est pour cela que la robotique compte autant à mes yeux.

## Les systèmes agentiques sont un pont

Beaucoup de gens parlent des agents comme si la destination était uniquement l'automatisation digitale.

Je ne pense pas que ce soit toute l'image.

Les agents comptent parce qu'ils nous obligent à résoudre les bons problèmes intermédiaires :

- la planification
- la mémoire
- le raisonnement
- la spécialisation
- l'évaluation
- la fiabilité
- l'adaptation

Ce sont exactement les capacités qu'il faut résoudre avant que des systèmes physiques deviennent réellement utiles à grande échelle.

Un robot sans ces couches reste surtout du hardware.

Un robot avec elles commence à devenir un système.

## La question du humanoïde

Quand on pense à la robotique, on saute souvent directement aux humanoïdes.

Je comprends pourquoi.

Il y a quelque chose de profondément humain dans cette idée. Nous sommes naturellement attirés par la possibilité de construire des cousins physiques de nous-mêmes, presque de la même manière que nous imaginons des formes de vie extraterrestres : pas seulement des outils, mais d'autres intelligences incarnées auxquelles nous pourrions nous relier.

Cette vision est puissante.

Mais je ne pense pas qu'elle doive nous aveugler sur ce qu'est déjà la robotique aujourd'hui.

La plupart des robots utiles ne sont pas des humanoïdes complets.

Ce sont :

- des drones
- des bras robotiques
- des machines roulantes
- de petits compagnons éducatifs
- des systèmes industriels étroits

Cela compte parce que le marché n'attendra pas des humanoïdes parfaits pour commencer à transformer le travail.

Il avance déjà à travers des corps plus petits et plus spécialisés.

## L'incarnation compte plus que la forme

Pour moi, la vraie question n'est pas : "Est-ce que cela ressemble à un humain ?"

La question plus importante est :

> Est-ce que cela peut percevoir, décider et agir de manière fiable dans le monde réel ?

Cela peut prendre beaucoup de formes.

Un Reachy Mini utilisé par des enfants ou des enseignants.
Un assistant de sécurité aidant des équipes de construction à réduire les risques.
Un bras robotique qui déplace des pièces ou des matériaux.
Une unité mobile qui inspecte, transporte ou surveille.

Tous ces systèmes n'ont pas besoin du même corps.

Ils ont besoin d'une incarnation utile.

La forme physique doit suivre la tâche, pas le mythe.

## Pourquoi la robotique va tirer les produits et services

Je pense que la décennie qui arrive va faire entrer la robotique beaucoup plus profondément dans les produits et les services réels.

Pas seulement parce que le hardware progresse, mais parce que la couche logicielle autour de lui commence enfin à rattraper son retard.

Ce qui change l'équation, c'est la convergence de plusieurs forces :

- de meilleurs modèles d'IA
- de meilleures pipelines d'entraînement
- de meilleures simulations et évaluations
- du hardware moins coûteux
- plus de briques open source
- des écosystèmes développeurs plus solides

C'est pour cela que la robotique ressemble de moins en moins à un moonshot lointain, et de plus en plus à une catégorie produit émergente.

La stack devient composable.

Et dès que la stack devient composable, l'expérimentation accélère.

## L'open source comptera plus qu'on ne le pense

L'un des accélérateurs les plus importants dans cet espace sera l'open source.

Pas parce que l'open source résout tout, mais parce qu'il réduit le coût de l'itération et de la diffusion.

Quand les modèles, les recettes d'entraînement, les systèmes de contrôle, les interfaces hardware et les outils de simulation deviennent plus accessibles, davantage de gens peuvent construire.

Cela compte énormément.

Un écosystème robotique ne grandit pas uniquement depuis de grands laboratoires.

Il grandit aussi grâce à des chercheurs, des startups, des écoles, des hackerspaces, des développeurs et des constructeurs de produits de niche qui continuent d'expédier de petites expériences jusqu'à maturation de la catégorie.

C'est souvent ainsi que se forment les vrais marchés technologiques.

## Usage à court terme : redonner de la créativité aux humains

Il y a aussi une raison plus immédiate pour laquelle ces trois premiers articles et les systèmes derrière eux m'importent.

À court terme, l'objectif n'est pas de remplacer les humains par des machines.

L'objectif est de rendre les humains plus capables à nouveau.

De meilleurs systèmes d'exécution, de meilleure mémoire, plus de raisonnement et plus de spécialisation peuvent aider les gens à récupérer du temps, de la concentration et de la capacité créative.

Les humains font toujours le matching.
Les humains définissent toujours la direction.
Les humains décident toujours de ce qui a du sens.

Mais l'IA peut retirer une grande partie de la friction entre l'imagination et l'exécution.

C'est déjà précieux, même avant que la robotique n'atteigne sa maturité.

## De l'imagination au service physique

Ce qui m'enthousiasme le plus, c'est la continuité entre ces couches.

D'abord, l'IA aide les humains à mieux penser, organiser, concevoir et exécuter.

Ensuite, ces mêmes systèmes deviennent capables de guider des outils physiques.

Finalement, on obtient des produits et des services qui ne sont plus seulement digitaux, mais incarnés.

Cela peut vouloir dire des robots qui :

- démontrent des concepts en classe
- assistent les enseignants et les enfants dans des environnements d'apprentissage
- améliorent la sécurité sur des chantiers ou en contexte industriel
- font gagner du temps sur des manipulations physiques répétitives
- aident les gens à superviser ou coordonner des opérations dans le monde réel

C'est là que l'imagination devient service.

Pas parce que la machine remplace la finalité humaine, mais parce qu'elle étend la portée humaine.

## La vraie opportunité

Pour moi, la robotique n'est pas une branche secondaire de l'IA.

C'est l'une des destinations les plus concrètes de tout ce mouvement.

Si l'intelligence reste enfermée dans des écrans, elle sera déjà utile.

Mais dès que cette intelligence peut se connecter de manière fiable à des outils, des corps, des capteurs et des environnements physiques, l'impact économique et social devient beaucoup plus grand.

C'est là que les catégories produit se multiplient.
C'est là que les services deviennent incarnés.
C'est là que l'IA commence à transformer la vie quotidienne d'une manière visible.

## Dernière idée

Les premières couches consistent à rendre les systèmes capables de penser, savoir, décider et s'améliorer.

La robotique, c'est ce qui se produit lorsque ces couches reçoivent un corps.

Les humanoïdes deviendront peut-être une partie de ce futur.
Mais le basculement profond est plus large que les humanoïdes.

C'est l'émergence de systèmes incarnés utiles dans l'éducation, l'industrie, la sécurité, la logistique, l'assistance et le travail quotidien.

C'est pourquoi je vois la robotique non pas comme un sujet séparé, mais comme la continuation de la même architecture.

D'abord le système apprend à raisonner.
Ensuite il apprend à agir.
Puis il entre dans le monde physique.
      `.trim(),

      nl: `
Mijn eerste artikels gingen over systemen, uitvoering, geheugen, fine-tuning en betrouwbaarheid.

Die onderwerpen zijn op zichzelf belangrijk.

Maar voor mij wijzen ze ook naar iets groters:

robotica.

Als ik uitzoom, zie ik agentische systemen niet als de uiteindelijke productcategorie. Ik zie ze als het pad naar belichaamde systemen die in de fysieke wereld kunnen opereren.

Met andere woorden:

de bredere visie is niet alleen software die redeneert.
Het is software, modellen, geheugen, training en uitvoering die via machines kunnen handelen.

Daarom is robotica voor mij zo belangrijk.

## Agentische systemen zijn een brug

Veel mensen spreken over agents alsof de bestemming puur digitale automatisering is.

Ik denk niet dat dat het volledige beeld is.

Agents zijn belangrijk omdat ze ons dwingen de juiste tussenproblemen op te lossen:

- planning
- geheugen
- redeneren
- specialisatie
- evaluatie
- betrouwbaarheid
- adaptatie

Dat zijn precies de capaciteiten die je nodig hebt voordat fysieke systemen echt nuttig kunnen worden op schaal.

Een robot zonder die lagen is vooral hardware.

Een robot met die lagen begint een systeem te worden.

## De humanoid-vraag

Wanneer mensen aan robotica denken, springen ze vaak meteen naar humanoids.

Ik begrijp waarom.

Er zit iets diep menselijks in dat idee. We worden van nature aangetrokken door de mogelijkheid om fysieke neven van onszelf te bouwen, bijna op dezelfde manier waarop we zoeken naar buitenaards leven: niet alleen tools, maar andere belichaamde intelligenties waarmee we ons kunnen verhouden.

Die visie is krachtig.

Maar ik denk niet dat ze ons blind mag maken voor wat robotica vandaag al is.

De meeste nuttige robots zijn geen volledige humanoids.

Het zijn:

- drones
- robotarmen
- rollende machines
- kleine educatieve companions
- smalle industriële systemen

Dat is belangrijk, want de markt gaat niet wachten op perfecte humanoids om werk te beginnen transformeren.

Ze beweegt nu al via kleinere en meer gespecialiseerde lichamen.

## Belichaming is belangrijker dan vorm

Voor mij is de echte vraag niet: "Lijkt het op een mens?"

De belangrijkere vraag is:

> Kan het betrouwbaar waarnemen, beslissen en handelen in de echte wereld?

Dat kan via veel vormen.

Een Reachy Mini gebruikt door kinderen of leerkrachten.
Een veiligheidsassistent die bouwteams helpt risico's te verminderen.
Een robotarm die onderdelen of materialen verplaatst.
Een mobiel systeem dat inspecteert, transporteert of monitort.

Die systemen hebben niet allemaal hetzelfde lichaam nodig.

Wat ze nodig hebben is nuttige belichaming.

De fysieke vorm moet de taak volgen, niet de mythologie.

## Waarom robotica producten en diensten zal aandrijven

Ik denk dat het komende decennium robotica veel dieper in echte producten en diensten zal duwen.

Niet alleen omdat hardware blijft verbeteren, maar ook omdat de softwarelaag eromheen eindelijk begint bij te benen.

Wat de vergelijking verandert, is de convergentie van meerdere krachten:

- betere AI-modellen
- betere trainingspijplijnen
- betere simulatie en evaluatie
- goedkopere hardware
- meer open-sourcebouwstenen
- sterkere ontwikkelaarsecosystemen

Daarom voelt robotica nu minder als een verre moonshot en meer als een opkomende productcategorie.

De stack wordt composable.

En zodra de stack composable wordt, versnelt experimentatie.

## Open source zal belangrijker zijn dan mensen denken

Een van de belangrijkste versnellers in deze ruimte zal open source zijn.

Niet omdat open source alles oplost, maar omdat het de kost van iteratie en distributie verlaagt.

Wanneer modellen, trainingsrecepten, controlesystemen, hardware-interfaces en simulatietools toegankelijker worden, kunnen meer mensen bouwen.

Dat is enorm belangrijk.

Een robotica-ecosysteem groeit niet alleen uit grote labs.

Het groeit ook uit onderzoekers, startups, scholen, hackerspaces, developers en nichebouwers die kleine experimenten blijven shippen tot de categorie volwassen wordt.

Zo worden echte technologische markten vaak gevormd.

## Nabije use case: mensen opnieuw creatief maken

Er is ook een directere reden waarom ik om die eerste drie artikels en de systemen erachter geef.

Op korte termijn is het doel niet om mensen door machines te vervangen.

Het doel is om mensen opnieuw capabeler te maken.

Betere uitvoeringssystemen, beter geheugen, beter redeneren en betere specialisatie kunnen mensen helpen tijd, focus en creatieve bandbreedte terug te winnen.

Mensen doen nog altijd de matching.
Mensen bepalen nog altijd de richting.
Mensen beslissen nog altijd wat betekenisvol is.

Maar AI kan een groot deel van de frictie tussen verbeelding en uitvoering wegnemen.

Dat is nu al waardevol, nog voordat robotica volwassen wordt.

## Van verbeelding naar fysieke service

Wat mij het meest exciteert, is de continuïteit tussen die lagen.

Eerst helpt AI mensen om beter te denken, organiseren, ontwerpen en uitvoeren.

Daarna worden diezelfde systemen in staat om fysieke tools aan te sturen.

Uiteindelijk krijg je producten en diensten die niet alleen digitaal zijn, maar belichaamd.

Dat kan robots betekenen die:

- concepten demonstreren in klaslokalen
- leerkrachten en kinderen ondersteunen in leeromgevingen
- veiligheid verbeteren in bouw- en industriële contexten
- tijd besparen op repetitieve fysieke handelingen
- mensen helpen echte operaties te superviseren of coördineren

Daar wordt verbeelding service.

Niet omdat de machine menselijk doel vervangt, maar omdat ze menselijk bereik uitbreidt.

## De echte opportuniteit

Voor mij is robotica geen zijtak van AI.

Het is een van de meest concrete bestemmingen van de hele beweging.

Als intelligentie binnen schermen opgesloten blijft, zal ze al nuttig zijn.

Maar zodra intelligentie zich betrouwbaar kan verbinden met tools, lichamen, sensoren en fysieke omgevingen, wordt de economische en sociale impact veel groter.

Dan vermenigvuldigen productcategorieën zich.
Dan worden diensten belichaamd.
Dan begint AI het dagelijkse leven zichtbaar te hervormen.

## Slotgedachte

De eerste lagen gaan erover systemen te leren denken, weten, beslissen en verbeteren.

Robotica is wat er gebeurt wanneer die lagen een lichaam krijgen.

Humanoids worden misschien een deel van die toekomst.
Maar de diepere verschuiving is breder dan humanoids.

Het is de opkomst van nuttige belichaamde systemen in onderwijs, industrie, veiligheid, logistiek, assistentie en dagelijks werk.

Daarom zie ik robotica niet als een apart onderwerp, maar als de voortzetting van dezelfde architectuur.

Eerst leert het systeem redeneren.
Dan leert het handelen.
Dan betreedt het de fysieke wereld.
      `.trim(),
    },
  },
  {
    slug: "fine-tuned-local-models-are-the-next-layer",
    icon: BrainCircuit,
    date: "2026-04-08",
    authors: [
      { name: "Hamza Mounir", linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/" },
    ],
    title: {
      en: "Fine-Tuned Local Models Are the Next Layer",
      fr: "Les modèles locaux fine-tunés sont la couche suivante",
      nl: "Fijn-afgestelde lokale modellen zijn de volgende laag",
    },
    description: {
      en: "Why the next step after harnesses and Knowledge OS is a layer of specialized fine-tuned local models for narrow tasks, stronger alignment, and more reliable execution.",
      fr: "Pourquoi, après le harness et le Knowledge OS, l'étape suivante est une couche de modèles locaux spécialisés et fine-tunés pour des tâches étroites, un meilleur alignement et une exécution plus fiable.",
      nl: "Waarom na de harness en de Knowledge OS de volgende stap een laag gespecialiseerde, fijn-afgestelde lokale modellen is voor smalle taken, sterkere alignment en betrouwbaardere uitvoering.",
    },
    category: {
      en: "Engineering",
      fr: "Ingénierie",
      nl: "Engineering",
    },
    tags: {
      en: ["Fine-Tuning", "Local Models", "Reliability"],
      fr: ["Fine-Tuning", "Modèles locaux", "Fiabilité"],
      nl: ["Fine-tuning", "Lokale modellen", "Betrouwbaarheid"],
    },
    readTime: {
      en: "7 min",
      fr: "9 min",
      nl: "9 min",
    },
    content: {
      en: `
My last two articles focused on systems first, then on the technical stack behind them.

The first point was that AI becomes useful when it is part of a system.

The second was that, in my case, this system is built on two main layers:

- a **harness** for execution
- a **Knowledge OS** for structured context

I still believe those two layers are the foundation.

But they are not the end state.

If we want these systems to become more complete, more isolated, and more deployable across different environments, then the next layer is clear to me:

> specialized, fine-tuned local models

Not one giant model for everything.
Not one giant prompt trying to hold the whole system together.

I mean smaller models assigned to narrower tasks, trained for specific jobs, attached to real hardware constraints, and integrated into the execution system as reliable components.

## Why Prompting Alone Eventually Hits a Wall

Prompting is powerful. It is the fastest way to explore, prototype, and reach early usefulness.

But prompting has limits.

When too much behavior lives inside prompts, the system becomes expensive to maintain and difficult to stabilize. Instructions grow longer. Edge cases accumulate. The model still needs to infer too much each time.

That is acceptable at the beginning.

It is less acceptable when the goal is repeatable execution.

If the same type of reasoning, formatting, routing, classification, extraction, or decision pattern happens over and over again, I do not want to pay the full prompt tax every single time. I want part of that behavior to move closer to the model itself.

That is where fine-tuning starts to matter.

## Fine-Tuning Is About Compression of Behavior

People often talk about fine-tuning as if it were mainly about making a model smarter.

That is not the framing I care about most.

The more practical framing is this:

fine-tuning is a way to compress repeated behavior into the model so the system needs less prompt scaffolding at runtime.

Instead of explaining the same narrow task again and again, you train the model so that this behavior becomes more native to it.

That reduces:

- prompt length
- orchestration overhead
- latency in narrow workflows
- variability in repeated tasks

And in many cases, it improves reliability more than simply adding more prompt detail.

## Why Smaller Models Matter

I do not think the future of operational AI systems is one central frontier model doing every job.

The more complete view is closer to a distributed architecture:

- frontier models for broad reasoning and difficult synthesis
- structured systems for memory, retrieval, and gating
- smaller fine-tuned models for narrow and repeated tasks

That last category matters a lot.

A well-scoped smaller model can be extremely useful when its job is clearly defined. It does not need to be universally brilliant. It needs to be dependable inside a bounded responsibility.

For example:

- a model specialized for classification
- a model specialized for extracting structured data
- a model specialized for style enforcement
- a model specialized for tool routing
- a model specialized for domain-specific validation

This is a much more serious path to reliability than asking one general model to improvise every layer of the stack.

## Reasoning Should Stay Central

This does not mean I want to replace reasoning with brittle automation.

Quite the opposite.

I think reasoning becomes more valuable when the rest of the system is cleaner.

The harness still handles decisions, gating, iteration, escalation, and execution flow.
The Knowledge OS still handles memory, context, structure, and retrieval.
But now specialized models can take ownership of narrower jobs inside that larger loop.

That means the higher-level system can rely on reasoning where reasoning is actually needed, instead of wasting expensive general intelligence on low-entropy tasks that should already be stabilized.

So the shift is not from reasoning to training.

It is from prompting everything to reasoning where necessary and training where repetition already exists.

## Reliability Comes from Alignment With Real Work

When people hear the word alignment, they often jump immediately to abstract safety discussions.

That is not what I mean here.

I mean operational alignment.

Does the model behave in a way that actually matches the task, the domain, the rules, and the hardware environment where it runs?

For production systems, this matters more than elegant demos.

A narrow local model that is trained on the right examples, evaluated against the right failure modes, and constrained by the right harness can be far more valuable than a bigger model that is only loosely steered through prompts.

Reliability is not magic. It is engineered alignment between:

- the task
- the training data
- the evaluation loop
- the execution environment

## Self-Improvement Needs a System, Not a Myth

I do think self-improvement is the next door.

But I do not mean a vague fantasy where a model endlessly rewrites itself in the dark.

I mean a structured process where the system learns from execution:

- what failed
- what repeated
- what required too much prompting
- what patterns became stable enough to encode

From there, you can decide what should remain in prompts, what should move into rules, what should become training data, and what should be assigned to a smaller specialized model.

That is a much more grounded version of self-improvement.

The system does not become better because it "reflects" in the abstract.

It becomes better because execution produces evidence, and that evidence is turned into better models, better routes, and better constraints.

## Hardware Is Part of the Design

Another reason I care about small local models is that hardware is real.

If a system is meant to be deployable in different environments, then compute, memory, latency, privacy, and cost are architecture concerns, not afterthoughts.

A complete AI system should be able to assign the right task to the right layer:

- some tasks deserve large-model reasoning
- some tasks should stay local for speed or privacy
- some tasks should run on specialized smaller models because that is the most efficient option

This is one of the main reasons I see fine-tuned local models as part of a serious operating architecture rather than just an optimization trick.

They make the system more portable, more controllable, and in many cases more economically viable.

## What the Complete Stack Starts to Look Like

At a high level, the architecture becomes easier to describe:

| Layer | Role |
|---|---|
| Harness | Orchestrate execution, iteration, evaluation, and gating |
| Knowledge OS | Provide structured memory, retrieval, and evolving context |
| Fine-tuned local models | Handle narrow, repeated, domain-shaped tasks reliably |
| Frontier reasoning models | Tackle broad synthesis, ambiguity, and complex judgment |

That is much closer to a complete system than "one model plus one prompt."

It is also much closer to something that can be isolated, deployed, and adapted across different systems and hardware setups.

## Final Thought

If the harness helps the system **do**, and the Knowledge OS helps the system **know**, then fine-tuned local models help the system **stabilize**.

They reduce prompt dependency.
They turn repeated behavior into reusable capability.
They create a better bridge between execution, reasoning, hardware, and alignment.

To me, that is the next serious step.

Not more prompting.

Better specialization, better training, and better system design around where reasoning truly belongs.
      `.trim(),

      fr: `
Mes deux derniers articles portaient d'abord sur les systèmes, puis sur la stack technique qui les soutient.

Le premier point était simple : l'IA devient réellement utile lorsqu'elle est intégrée dans un système.

Le second était que, dans mon cas, ce système repose sur deux couches principales :

- un **harness** pour l'exécution
- un **Knowledge OS** pour le contexte structuré

Je continue à penser que ces deux couches sont la base.

Mais elles ne sont pas l'état final.

Si l'on veut que ces systèmes deviennent plus complets, plus isolés, et plus facilement déployables dans différents environnements, alors la couche suivante me paraît claire :

> des modèles locaux spécialisés et fine-tunés

Pas un seul grand modèle pour tout faire.
Pas un seul immense prompt censé tenir tout le système ensemble.

Je parle de modèles plus petits, assignés à des tâches plus étroites, entraînés pour des rôles précis, attachés à de vraies contraintes matérielles, et intégrés au système d'exécution comme des composants fiables.

## Pourquoi le prompting seul finit par atteindre une limite

Le prompting est puissant. C'est le moyen le plus rapide d'explorer, de prototyper et d'obtenir une première utilité.

Mais il a ses limites.

Quand trop de comportement vit dans les prompts, le système devient coûteux à maintenir et difficile à stabiliser. Les instructions s'allongent. Les cas limites s'accumulent. Le modèle doit encore inférer trop de choses à chaque exécution.

Cela reste acceptable au début.

Cela l'est beaucoup moins quand l'objectif devient une exécution répétable.

Si le même type de raisonnement, de formatage, de routage, de classification, d'extraction ou de prise de décision revient encore et encore, je ne veux pas payer le coût complet du prompt à chaque fois. Je veux qu'une partie de ce comportement se rapproche du modèle lui-même.

C'est là que le fine-tuning commence à compter.

## Le fine-tuning comme compression de comportement

On parle souvent du fine-tuning comme si l'enjeu principal était de rendre un modèle plus intelligent.

Ce n'est pas l'angle qui m'intéresse le plus.

L'angle le plus pratique est plutôt celui-ci :

le fine-tuning est une manière de compresser un comportement répété dans le modèle afin que le système dépende de moins de scaffolding de prompt à l'exécution.

Au lieu d'expliquer la même tâche étroite encore et encore, on entraîne le modèle pour que ce comportement devienne plus naturel pour lui.

Cela réduit :

- la longueur des prompts
- l'overhead d'orchestration
- la latence dans les workflows étroits
- la variabilité sur les tâches répétées

Et dans beaucoup de cas, cela améliore davantage la fiabilité qu'une simple accumulation d'instructions dans le prompt.

## Pourquoi les petits modèles comptent

Je ne pense pas que le futur des systèmes IA opérationnels soit un unique modèle frontier qui fait tout.

La vision la plus sérieuse ressemble davantage à une architecture distribuée :

- des modèles frontier pour le raisonnement large et la synthèse difficile
- des systèmes structurés pour la mémoire, le retrieval et le gating
- des modèles plus petits, fine-tunés, pour les tâches étroites et répétées

Cette dernière catégorie compte énormément.

Un petit modèle bien borné peut être extrêmement utile si son rôle est clairement défini. Il n'a pas besoin d'être universellement brillant. Il doit être fiable dans une responsabilité limitée.

Par exemple :

- un modèle spécialisé pour la classification
- un modèle spécialisé pour l'extraction de données structurées
- un modèle spécialisé pour l'application du style
- un modèle spécialisé pour le routage d'outils
- un modèle spécialisé pour une validation métier précise

C'est une voie bien plus sérieuse vers la fiabilité que de demander à un modèle général d'improviser toutes les couches de la stack.

## Le raisonnement doit rester central

Cela ne signifie pas que je veux remplacer le raisonnement par une automatisation fragile.

Au contraire.

Je pense que le raisonnement devient plus précieux lorsque le reste du système est plus propre.

Le harness continue de gérer les décisions, le gating, l'itération, l'escalade et le flux d'exécution.
Le Knowledge OS continue de gérer la mémoire, le contexte, la structure et le retrieval.
Mais désormais, des modèles spécialisés peuvent prendre en charge des tâches plus étroites à l'intérieur de cette boucle plus large.

Cela signifie que le système de plus haut niveau peut réserver le raisonnement aux endroits où il est réellement nécessaire, au lieu de gaspiller une intelligence générale coûteuse sur des tâches à faible entropie qui auraient déjà dû être stabilisées.

Le déplacement n'est donc pas du raisonnement vers l'entraînement.

Il va d'un prompting généralisé vers du raisonnement là où c'est nécessaire, et de l'entraînement là où la répétition existe déjà.

## La fiabilité vient de l'alignement avec le vrai travail

Quand on entend le mot alignement, on saute souvent immédiatement vers des discussions abstraites de safety.

Ce n'est pas le sens que je vise ici.

Je parle d'alignement opérationnel.

Le modèle se comporte-t-il d'une manière qui correspond réellement à la tâche, au domaine, aux règles et à l'environnement matériel dans lequel il tourne ?

Pour des systèmes de production, cela compte plus que des démos élégantes.

Un modèle local étroit, entraîné sur les bons exemples, évalué sur les bons modes d'échec, et contraint par le bon harness, peut avoir bien plus de valeur qu'un plus grand modèle seulement orienté par des prompts.

La fiabilité n'a rien de magique. C'est un alignement conçu entre :

- la tâche
- les données d'entraînement
- la boucle d'évaluation
- l'environnement d'exécution

## L'auto-amélioration a besoin d'un système, pas d'un mythe

Oui, je pense que l'auto-amélioration est la porte suivante.

Mais je ne parle pas d'un fantasme flou où un modèle se réécrit lui-même indéfiniment dans le noir.

Je parle d'un processus structuré dans lequel le système apprend de l'exécution :

- ce qui a échoué
- ce qui s'est répété
- ce qui a demandé trop de prompting
- quels schémas sont devenus assez stables pour être encodés

À partir de là, on peut décider ce qui doit rester dans les prompts, ce qui doit devenir une règle, ce qui doit devenir de la donnée d'entraînement, et ce qui doit être confié à un plus petit modèle spécialisé.

C'est une version bien plus solide de l'auto-amélioration.

Le système ne devient pas meilleur parce qu'il "réfléchit" au sens abstrait.

Il devient meilleur parce que l'exécution produit des preuves, et que ces preuves sont transformées en meilleurs modèles, meilleurs routages et meilleures contraintes.

## Le hardware fait partie du design

Une autre raison pour laquelle je m'intéresse aux petits modèles locaux est simple : le hardware est réel.

Si un système doit être déployable dans différents environnements, alors le compute, la mémoire, la latence, la confidentialité et le coût sont des sujets d'architecture, pas des détails.

Un système IA complet devrait pouvoir affecter la bonne tâche à la bonne couche :

- certaines tâches méritent le raisonnement de grands modèles
- certaines tâches doivent rester locales pour la vitesse ou la confidentialité
- certaines tâches doivent tourner sur de petits modèles spécialisés parce que c'est l'option la plus efficace

C'est l'une des principales raisons pour lesquelles je vois les modèles locaux fine-tunés comme une partie d'une architecture sérieuse, et non comme une simple astuce d'optimisation.

Ils rendent le système plus portable, plus contrôlable et, dans bien des cas, plus viable économiquement.

## À quoi commence à ressembler la stack complète

À haut niveau, l'architecture devient plus facile à décrire :

| Couche | Rôle |
|---|---|
| Harness | Orchestrer l'exécution, l'itération, l'évaluation et le gating |
| Knowledge OS | Fournir une mémoire structurée, du retrieval et un contexte évolutif |
| Modèles locaux fine-tunés | Gérer de manière fiable les tâches étroites, répétées et métier |
| Modèles de raisonnement frontier | Traiter la synthèse large, l'ambiguïté et le jugement complexe |

Cela ressemble beaucoup plus à un système complet que "un modèle plus un prompt".

Cela ressemble aussi beaucoup plus à quelque chose qui peut être isolé, déployé et adapté à différents systèmes et différentes contraintes matérielles.

## Dernière idée

Si le harness aide le système à **faire**, et le Knowledge OS aide le système à **savoir**, alors les modèles locaux fine-tunés aident le système à **stabiliser**.

Ils réduisent la dépendance au prompt.
Ils transforment des comportements répétés en capacités réutilisables.
Ils créent un meilleur pont entre l'exécution, le raisonnement, le hardware et l'alignement.

Pour moi, c'est la prochaine étape sérieuse.

Pas plus de prompting.

Mais plus de spécialisation, plus d'entraînement, et un meilleur design système autour des endroits où le raisonnement doit vraiment intervenir.
      `.trim(),

      nl: `
Mijn laatste twee artikels gingen eerst over systemen, en daarna over de technische stack erachter.

Het eerste punt was eenvoudig: AI wordt pas echt nuttig wanneer het deel wordt van een systeem.

Het tweede punt was dat dit systeem in mijn geval rust op twee hoofdlagen:

- een **harness** voor uitvoering
- een **Knowledge OS** voor gestructureerde context

Ik blijf geloven dat die twee lagen de basis vormen.

Maar ze zijn niet het eindpunt.

Als we willen dat deze systemen vollediger, meer geïsoleerd en makkelijker inzetbaar worden in verschillende omgevingen, dan is de volgende laag voor mij duidelijk:

> gespecialiseerde, fijn-afgestelde lokale modellen

Niet één gigantisch model voor alles.
Niet één gigantische prompt die het hele systeem moet bijeenhouden.

Ik bedoel kleinere modellen die aan smallere taken worden toegewezen, getraind zijn voor specifieke rollen, rekening houden met echte hardwarebeperkingen en als betrouwbare componenten in het uitvoeringssysteem worden geïntegreerd.

## Waarom prompting alleen uiteindelijk tegen een muur botst

Prompting is krachtig. Het is de snelste manier om te verkennen, te prototypen en snel eerste waarde te bereiken.

Maar prompting heeft grenzen.

Wanneer te veel gedrag in prompts leeft, wordt het systeem duur om te onderhouden en moeilijk om te stabiliseren. Instructies worden langer. Edge cases stapelen zich op. Het model moet nog altijd te veel afleiden bij elke run.

Dat is aanvaardbaar in het begin.

Dat is veel minder aanvaardbaar wanneer het doel herhaalbare uitvoering wordt.

Als hetzelfde soort redenering, formatting, routing, classificatie, extractie of beslissingspatroon telkens terugkomt, wil ik niet telkens de volledige promptbelasting betalen. Ik wil dat een deel van dat gedrag dichter bij het model zelf komt te liggen.

Daar begint fine-tuning belangrijk te worden.

## Fine-tuning als compressie van gedrag

Mensen spreken vaak over fine-tuning alsof het vooral gaat om een model slimmer te maken.

Dat is niet het kader dat mij het meest interesseert.

Het nuttigere kader is dit:

fine-tuning is een manier om herhaald gedrag in het model te comprimeren zodat het systeem tijdens runtime minder prompt-scaffolding nodig heeft.

In plaats van dezelfde smalle taak telkens opnieuw uit te leggen, train je het model zodat dat gedrag natuurlijker wordt.

Dat vermindert:

- promptlengte
- orchestratie-overhead
- latency in smalle workflows
- variabiliteit bij repetitieve taken

En in veel gevallen verbetert dat de betrouwbaarheid meer dan gewoon nog meer promptinstructies toevoegen.

## Waarom kleinere modellen tellen

Ik denk niet dat de toekomst van operationele AI-systemen één centraal frontier-model is dat elke taak uitvoert.

Het serieuzere beeld lijkt meer op een gedistribueerde architectuur:

- frontier-modellen voor breed redeneren en moeilijke synthese
- gestructureerde systemen voor geheugen, retrieval en gating
- kleinere fijn-afgestelde modellen voor smalle en repetitieve taken

Die laatste categorie is bijzonder belangrijk.

Een kleiner model met een goed afgebakende rol kan enorm nuttig zijn wanneer zijn verantwoordelijkheid helder is. Het hoeft niet universeel briljant te zijn. Het moet betrouwbaar zijn binnen een begrensde taak.

Bijvoorbeeld:

- een model gespecialiseerd in classificatie
- een model gespecialiseerd in extractie van gestructureerde data
- een model gespecialiseerd in stijlhandhaving
- een model gespecialiseerd in tool routing
- een model gespecialiseerd in domeinspecifieke validatie

Dat is een veel serieuzere weg naar betrouwbaarheid dan één algemeen model vragen om elke laag van de stack te improviseren.

## Redeneren moet centraal blijven

Dat betekent niet dat ik redeneren wil vervangen door fragiele automatisering.

Integendeel.

Ik denk dat redeneren waardevoller wordt wanneer de rest van het systeem properder is.

De harness blijft beslissingen, gating, iteratie, escalatie en uitvoeringsflow beheren.
De Knowledge OS blijft geheugen, context, structuur en retrieval beheren.
Maar gespecialiseerde modellen kunnen nu smallere taken opnemen binnen die grotere lus.

Dat betekent dat het hogere systeem redeneren kan inzetten waar het echt nodig is, in plaats van dure algemene intelligentie te verspillen aan taken met lage entropie die al gestabiliseerd hadden moeten zijn.

De verschuiving is dus niet van redeneren naar training.

Ze gaat van alles prompten naar redeneren waar nodig en trainen waar herhaling al bestaat.

## Betrouwbaarheid komt uit alignment met echt werk

Wanneer mensen het woord alignment horen, springen ze vaak meteen naar abstracte veiligheidsdiscussies.

Dat is niet wat ik hier bedoel.

Ik bedoel operationele alignment.

Gedraagt het model zich op een manier die echt overeenkomt met de taak, het domein, de regels en de hardware-omgeving waarin het draait?

Voor productiesystemen is dat belangrijker dan elegante demo's.

Een smal lokaal model dat op de juiste voorbeelden is getraind, op de juiste failure modes is geëvalueerd en door de juiste harness wordt begrensd, kan veel waardevoller zijn dan een groter model dat enkel losjes via prompts wordt gestuurd.

Betrouwbaarheid is geen magie. Het is ontworpen alignment tussen:

- de taak
- de trainingsdata
- de evaluatielus
- de uitvoeringsomgeving

## Zelfverbetering heeft een systeem nodig, geen mythe

Ik denk wel degelijk dat zelfverbetering de volgende deur is.

Maar ik bedoel niet een vage fantasie waarin een model zichzelf eindeloos in het donker herschrijft.

Ik bedoel een gestructureerd proces waarin het systeem leert van uitvoering:

- wat faalde
- wat zich herhaalde
- wat te veel prompting vereiste
- welke patronen stabiel genoeg werden om te encoderen

Van daaruit kun je beslissen wat in prompts moet blijven, wat naar regels moet verhuizen, wat trainingsdata moet worden en wat aan een kleiner gespecialiseerd model moet worden toegewezen.

Dat is een veel gegrondere vorm van zelfverbetering.

Het systeem wordt niet beter omdat het in abstracte zin "reflecteert".

Het wordt beter omdat uitvoering bewijs oplevert, en dat bewijs wordt omgezet in betere modellen, betere routes en betere beperkingen.

## Hardware maakt deel uit van het ontwerp

Nog een reden waarom ik om kleine lokale modellen geef, is simpel: hardware is echt.

Als een systeem in verschillende omgevingen inzetbaar moet zijn, dan zijn compute, geheugen, latency, privacy en kost architectuurkeuzes, geen bijzaken.

Een compleet AI-systeem zou de juiste taak aan de juiste laag moeten kunnen toewijzen:

- sommige taken verdienen redenering door grote modellen
- sommige taken moeten lokaal blijven voor snelheid of privacy
- sommige taken moeten op gespecialiseerde kleine modellen draaien omdat dat de efficiëntste optie is

Dat is een van de belangrijkste redenen waarom ik fijn-afgestelde lokale modellen zie als onderdeel van een serieuze operating architecture, niet als een optimalisatietrick.

Ze maken het systeem draagbaarder, beter controleerbaar en in veel gevallen economisch haalbaarder.

## Hoe de volledige stack eruit begint te zien

Op hoog niveau wordt de architectuur eenvoudiger te beschrijven:

| Laag | Rol |
|---|---|
| Harness | Uitvoering, iteratie, evaluatie en gating orkestreren |
| Knowledge OS | Gestructureerd geheugen, retrieval en evoluerende context leveren |
| Fijn-afgestelde lokale modellen | Smalle, repetitieve en domeingevormde taken betrouwbaar uitvoeren |
| Frontier-redeneermodellen | Brede synthese, ambiguïteit en complex oordeel behandelen |

Dat staat veel dichter bij een compleet systeem dan "één model plus één prompt".

Het staat ook veel dichter bij iets dat geïsoleerd, gedeployed en aangepast kan worden aan verschillende systemen en hardware-opstellingen.

## Slotgedachte

Als de harness het systeem helpt **doen**, en de Knowledge OS het systeem helpt **weten**, dan helpen fijn-afgestelde lokale modellen het systeem **stabiliseren**.

Ze verminderen promptafhankelijkheid.
Ze zetten herhaald gedrag om in herbruikbare capaciteit.
Ze bouwen een betere brug tussen uitvoering, redenering, hardware en alignment.

Voor mij is dat de volgende serieuze stap.

Niet meer prompting.

Maar betere specialisatie, betere training en beter systeemontwerp rond de plaatsen waar redeneren echt thuishoort.
      `.trim(),
    },
  },
  {
    slug: "the-technical-stack-behind-my-ai-projects",
    icon: Cog,
    date: "2026-04-08",
    authors: [
      { name: "Hamza Mounir", linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/" },
    ],
    title: {
      en: "Under the Hood: Harness + Knowledge OS",
      fr: "La stack technique derrière mes projets IA : Harness + Knowledge OS",
      nl: "De technische stack achter mijn AI-projecten: Harness + Knowledge OS",
    },
    description: {
      en: "A concise technical look at the two core layers behind my AI projects: the harness that drives execution and the Knowledge OS that structures memory and context.",
      fr: "Un regard technique sur les deux couches centrales de mon système IA : le harness qui pilote l'exécution et le Knowledge OS qui structure la mémoire et le contexte d'entreprise.",
      nl: "Een technische blik op de twee kernlagen achter mijn AI-systeem: de harness die uitvoering stuurt en de Knowledge OS die geheugen en bedrijfscontext structureert.",
    },
    category: {
      en: "Engineering",
      fr: "Ingénierie",
      nl: "Engineering",
    },
    tags: {
      en: ["Harness", "Knowledge OS", "AI Architecture"],
      fr: ["Harness", "Knowledge OS", "Architecture IA"],
      nl: ["Harness", "Knowledge OS", "AI-architectuur"],
    },
    readTime: {
      en: "6 min",
      fr: "8 min",
      nl: "8 min",
    },
    content: {
      en: `
My previous article was about systems at a high level. This one is the more technical follow-up.

Most of the AI projects I build sit on top of two layers:

- a **harness** that drives execution
- a **Knowledge OS** that provides structured context

That separation is deliberate. I do not want execution, memory, retrieval, evaluation, and decision-making collapsed into one long prompt. I want a system where each layer has a clear job.

The harness is there to move work forward.

The Knowledge OS is there to make sure the system knows enough to do that work properly.

## The Harness

The harness is an execution loop, not a single generation step.

In practice, it behaves more like a small workflow engine around product delivery:

| Stage | Role |
|---|---|
| Plan | Turn a short request into a usable specification |
| Generate | Build or improve against that specification |
| Evaluate | Inspect the actual result |
| Gate | Stop, iterate, or escalate |

That structure matters because it separates production from judgment. The system that builds is not the same layer that decides whether the result is good enough.

This is one of the main differences between a demo agent and a system you can actually use repeatedly.

## Why the Harness Is Useful

The real value is not that it generates. A raw model can already generate.

The value comes from the fact that execution is constrained by a loop:

- there is a specification
- there is a concrete result
- there is an evaluation step
- there is a gate with explicit outcomes

That makes the process easier to reason about and much easier to improve.

A good harness also needs to know when not to keep going. If quality scores plateau, if the same fixes repeat, or if the system gets stuck, blind iteration becomes waste. At that point, the right move is either to change approach or escalate.

That is a systems decision, not a prompt decision.

## State Matters More Than People Think

Iteration is only useful if state survives across the loop.

If each cycle partially resets, the system wastes time rediscovering the same context. So the harness carries structured state between stages: goal, current status, critique, constraints, and quality signals.

That is what allows the next pass to be targeted rather than generic.

Without state continuity, an iterative workflow is mostly theater.

## The Knowledge OS

If the harness is the execution layer, the Knowledge OS is the context layer.

I do not think a company knowledge system should be just a vector database with a chat box attached to it. Real operational knowledge is more complex than that. It contains documents, decisions, entities, relations, contradictions, history, and changing truth.

So the Knowledge OS is designed as a structured memory system rather than a search feature.

At a high level, it handles:

- document ingestion and storage
- indexing and retrieval
- entity extraction
- relation mapping
- conflict detection
- synthesis and compilation
- tool and API access for agents

That is what turns knowledge into infrastructure instead of reference material.

## Why Retrieval Alone Is Not Enough

A lot of systems stop at similarity search. That is useful, but it is not sufficient if you want a system to reason across company context.

In practice, useful retrieval tends to be layered.

You start with search, but then you often need query transformation, hybrid ranking, graph expansion, reranking, citation building, and a way to expose the final context cleanly to the execution layer.

That is the difference between retrieving text and retrieving usable context.

## Why Versioning Is a Core Feature

One thing that matters a lot in a knowledge system is time.

Documents change. Decisions change. Teams change. If the memory layer cannot represent that evolution cleanly, trust degrades fast.

That is why I consider versioning part of the core architecture, not a secondary convenience. A memory system that supports execution needs traceability, not just storage.

## How the Two Layers Connect

These two layers solve different problems.

The harness answers:

> How does work progress?

The Knowledge OS answers:

> What context should that work progress against?

Put together, they create a more useful base system:

| Layer | Purpose |
|---|---|
| Harness | Drive execution through planning, generation, evaluation, and gating |
| Knowledge OS | Supply structured, evolving, retrievable context |

That combination is the part I care about most.

Not because it looks impressive, but because it creates a much better foundation for real product work.

## What I Am Not Sharing in Detail

I am comfortable describing the architecture, the separation of roles, and the shape of the system.

What I do not want to publish in full are the internal prompts, heuristics, conventions, and operational choices that sit closer to production leverage.

That is not meant to be mysterious. It is simply the line I draw between sharing the design and open-sourcing every internal mechanism.

## Final Thought

If I reduce it to one sentence, it is this:

The harness helps the system **do**.
The Knowledge OS helps the system **know**.

Execution without structured context stays shallow.

Context without an execution system stays passive.

The combination is where things start to become genuinely useful.
      `.trim(),

      fr: `
Dans mon précédent article, j'expliquais que l'IA devient réellement utile lorsqu'elle est intégrée dans un système, et non utilisée comme un simple outil isolé.

Cet article en est la suite technique.

Je veux présenter, à un niveau volontairement élevé, les deux couches centrales sur lesquelles je m'appuie derrière la plupart des projets que je construis :

- un **harness**, qui pilote l'exécution
- un **Knowledge OS**, qui structure le contexte, la mémoire et l'information d'entreprise

Je ne vais pas publier chaque détail d'implémentation, chaque prompt ou chaque convention interne. Ce serait inutile et, dans certains cas, peu responsable. En revanche, je peux expliquer l'architecture assez clairement pour qu'un lecteur technique comprenne la logique du système.

La version courte est simple :

> Le harness est le système d'exécution.
> Le Knowledge OS est le système de mémoire.

Ensemble, ils forment la couche de base que j'utilise pour construire des produits, piloter des boucles de delivery et organiser l'information à l'échelle d'une entreprise.

## Pourquoi je sépare le problème en deux

La plupart des systèmes IA mélangent trop de responsabilités dans une seule couche.

Ils demandent à un modèle de comprendre le contexte, planifier, exécuter, s'évaluer, se souvenir de ce qui s'est passé, et rester aligné avec les règles d'entreprise, le tout dans une conversation floue. Cela fonctionne pour des démos. Cela tient mal dans la durée.

Je préfère séparer les responsabilités.

Un système est responsable de **faire avancer le travail**.

Un autre système est responsable de **rendre le bon contexte disponible**.

Cette séparation paraît simple, mais elle change profondément la suite. L'exécution peut devenir itérative et mesurable. Le contexte peut devenir persistant et structuré. Et l'ensemble devient beaucoup plus facile à raisonner.

## Le Harness : l'exécution comme boucle contrôlée

Le harness est la partie qui transforme une demande produit assez brute en workflow de delivery itératif.

Conceptuellement, ce n'est pas juste "générer du code". C'est une boucle avec des étapes distinctes et un gating explicite.

À haut niveau, le flux ressemble à ceci :

| Étape | Responsabilité |
|---|---|
| Plan | Étendre un prompt court en spécification produit structurée |
| Generate | Construire ou améliorer l'application à partir de cette spécification |
| Evaluate | Inspecter le résultat en cours d'exécution et le noter selon des critères explicites |
| Gate | Décider si le système doit s'arrêter, itérer ou escalader |

Cette structure est importante, car elle évite qu'un même agent ne corrige et valide son propre travail sans contrôle réel.

Le planner crée une spec. Le generator construit à partir de cette spec. L'evaluator vérifie l'application réellement en cours d'exécution. Puis une porte déterministe décide si la qualité est suffisante.

C'est une manière bien plus utile de penser le problème que "un agent construit une app".

## Pourquoi la couche d'évaluation compte

Le choix d'architecture le plus important dans le harness est la séparation entre génération et évaluation.

Beaucoup de systèmes IA échouent parce qu'ils optimisent la complétion plutôt que la qualité. Ils produisent quelque chose qui a l'air terminé, puis s'arrêtent. Le problème, c'est que "fini" et "bon" ne sont pas synonymes.

Dans mon setup, l'evaluator note le résultat sur plusieurs axes, notamment :

- qualité du design
- originalité
- craft
- fonctionnalité

Ce point est crucial, car la correction technique seule ne suffit pas pour un vrai travail produit. Un système peut compiler et malgré tout rester générique, fragile ou médiocre.

Le harness force ces dimensions à exister dans la boucle au lieu de les traiter comme une finition facultative.

## Une itération a besoin de règles, pas juste de retries

Autre chose que je ne fais pas confiance : la répétition aveugle.

Si un workflow se contente de réessayer jusqu'à avoir de la chance, ce n'est pas un système. C'est une dérive coûteuse.

Le harness inclut donc une logique d'arrêt explicite. Si les scores passent le seuil, la boucle s'arrête. Si le système échoue sans amélioration réelle, il détecte la stagnation. Si le generator déclare qu'il est bloqué, le workflow escalade au lieu de simuler un faux progrès.

C'est ce qui distingue une boucle gadget d'une boucle réellement exploitable.

## L'état doit survivre à la boucle

L'une des exigences pratiques de tout système itératif est la continuité de l'état.

Chaque itération doit savoir quel est l'objectif, ce qui s'est déjà passé, ce qui a échoué, et ce que l'evaluator demande de changer ensuite. Sans cela, chaque cycle repart partiellement à zéro et la qualité devient instable.

C'est pourquoi le harness transporte un état structuré entre les étapes. Cet état ne se limite pas aux artefacts produits. Il inclut aussi les signaux de qualité, les hints par étape, les contraintes et l'état courant.

Cela permet au generator de revenir dans la boucle avec une critique ciblée, au lieu de reconstruire tout depuis le début.

## Le Knowledge OS : le contexte comme système d'exploitation

Si le harness concerne l'exécution, le Knowledge OS concerne tout ce dont l'exécution dépend.

L'objectif n'est pas de créer un dossier de fichiers avec une recherche sémantique ajoutée par-dessus. L'objectif est de construire un système capable d'ingérer, organiser, retrouver, relier, compiler et maintenir la connaissance dans le temps.

Autrement dit, la connaissance doit être traitée comme une couche active, pas comme un stockage passif.

À haut niveau, le Knowledge OS combine plusieurs briques :

- gestion documentaire
- versioning
- retrieval
- extraction d'entités
- cartographie des relations
- détection de conflits
- synthèse et compilation
- accès agentique via outils et API

La partie intéressante n'est pas une fonctionnalité isolée. C'est le fait que tout cela fonctionne ensemble dans un système scoped par workspace.

## Pourquoi un RAG simple ne suffit pas

Beaucoup d'équipes s'arrêtent à la recherche vectorielle et appellent cela une couche de connaissance.

C'est utile, mais insuffisant si l'objectif est de soutenir de vraies opérations d'entreprise.

La raison est simple : la connaissance d'entreprise n'est pas seulement une collection de chunks. Elle contient des entités, des relations, des décisions, des contradictions, des responsabilités et de l'historique. Si l'on ne récupère que des fragments par similarité, on perd trop de contexte opérant.

C'est pourquoi le Knowledge OS est pensé comme un système de retrieval en plusieurs couches.

Il commence par la recherche, mais ne s'arrête pas là.

## Des documents vers une connaissance structurée

Le Knowledge OS traite les documents comme une entrée brute, pas comme une forme finale.

Une fois qu'un contenu entre dans le système, il peut être indexé, relié à des entités, parcouru via des relations, vérifié pour détecter des conflits, compilé en pages de synthèse, puis réexposé via API et outils.

Cela change complètement le rôle de la base de connaissance.

Au lieu d'être une archive que l'on interroge quand on est bloqué, elle devient un substrat sur lequel le reste du système peut raisonner.

## Le versioning compte plus qu'on ne le pense

Un choix d'architecture auquel je tiens beaucoup est le versioning.

La connaissance change. Les décisions d'entreprise évoluent. Les documents sont réécrits. Les hypothèses deviennent obsolètes.

Si un système de connaissance ne peut pas suivre proprement ces changements, il devient difficile à faire confiance. C'est pourquoi le Knowledge OS traite l'historique comme une fonctionnalité de premier plan, et non comme un détail secondaire.

## L'accès multi-agents demande des outils structurés

Autre point important : le Knowledge OS n'est pas seulement une interface pour les humains. C'est aussi une couche d'accès pour des agents.

Cela signifie que les agents ont besoin de moyens structurés pour chercher, lire, créer, mettre à jour, compiler et récupérer du contexte depuis le système. Si cet accès reste ad hoc, la qualité globale chute très vite.

C'est ainsi que le système commence à ressembler moins à un chatbot et davantage à de l'infrastructure.

## Comment les deux couches travaillent ensemble

Le harness et le Knowledge OS résolvent des problèmes différents, mais ils se renforcent mutuellement.

Le harness répond à la question :

> Comment le travail avance-t-il avec un vrai contrôle qualité ?

Le Knowledge OS répond à la question :

> Comment le système sait-il assez de choses pour faire ce travail avec contexte ?

Autrement dit :

| Couche | Rôle principal |
|---|---|
| Harness | Planifier, générer, évaluer, itérer et gate l'exécution |
| Knowledge OS | Stocker, structurer, retrouver, compiler et faire évoluer le contexte |

Quand ces deux couches sont reliées, on obtient bien plus qu'un agent avec un prompt.

On obtient un système d'exécution capable d'opérer sur un contexte persistant.

## Ce que je garde volontairement privé

Il y a une différence entre expliquer une architecture et publier chaque levier interne.

Je suis à l'aise pour partager le design général du système : séparation des étapes, itération gated, signaux de qualité, retrieval multicouche, graphes de connaissance, accès par outils, mémoire versionnée.

Ce que je n'ai pas envie de publier en détail, ce sont la pile complète de prompts, chaque heuristique d'évaluation, chaque convention interne, ou les détails opératoires qui rendent le système robuste en usage réel.

Ce n'est pas une façon d'être vague. C'est une manière de tracer une frontière raisonnable entre transparence technique utile et exposition inutile.

## Dernière idée

S'il fallait résumer l'architecture très simplement, je dirais ceci :

Le harness aide le système à **faire**.
Le Knowledge OS aide le système à **savoir**.

Une exécution sans connaissance structurée devient superficielle.

Une connaissance sans harness d'exécution reste passive.

Assemblés, ces deux systèmes forment une base beaucoup plus solide pour construire des produits, piloter des workflows internes et organiser l'intelligence d'entreprise à une échelle réellement exploitable.
      `.trim(),

      nl: `
In mijn vorige artikel stelde ik dat AI pas echt nuttig wordt wanneer het in een systeem zit, en niet wanneer het als losse tool wordt gebruikt.

Dit artikel is de technische opvolger daarvan.

Ik wil op een bewust hoog niveau de twee kernlagen beschrijven waarop ik achter de meeste projecten die ik bouw vertrouw:

- een **harness**, die uitvoering aanstuurt
- een **Knowledge OS**, die context, geheugen en bedrijfsinformatie structureert

Ik ga niet elk implementatiedetail, elke prompt of elke interne conventie publiceren. Dat zou onnodig zijn en in sommige gevallen onverstandig. Maar ik kan de architectuur wel helder genoeg uitleggen zodat technische lezers begrijpen hoe het model erachter werkt.

De korte versie is deze:

> De harness is het uitvoeringssysteem.
> De Knowledge OS is het geheugensysteem.

Samen vormen ze de basislaag die ik gebruik om producten te bouwen, delivery-loops aan te sturen en informatie op bedrijfsschaal te organiseren.

## Waarom ik het probleem in twee splits

De meeste AI-systemen stoppen te veel verantwoordelijkheden in één laag.

Ze vragen een model om context te begrijpen, werk te plannen, uit te voeren, zichzelf te evalueren, te onthouden wat er gebeurd is en tegelijk afgestemd te blijven op bedrijfsregels, allemaal binnen één losse conversatie. Dat werkt voor demo's. Het houdt minder goed stand in herhaalbare delivery.

Ik splits die verantwoordelijkheden liever op.

Eén systeem is verantwoordelijk voor **werk vooruit te duwen**.

Een ander systeem is verantwoordelijk voor **de juiste context beschikbaar te maken**.

Die scheiding klinkt eenvoudig, maar verandert alles. Uitvoering kan iteratief en meetbaar worden. Context kan persistent en gestructureerd worden. En het geheel wordt veel makkelijker om over na te denken.

## De Harness: uitvoering als gecontroleerde lus

De harness is het onderdeel dat een ruwe productvraag omzet in een iteratieve delivery-workflow.

Conceptueel is het niet gewoon "genereer code". Het is een lus met aparte fasen en expliciete gating.

Op hoog niveau ziet de flow er zo uit:

| Fase | Verantwoordelijkheid |
|---|---|
| Plan | Een korte prompt uitbreiden naar een gestructureerde productspecificatie |
| Generate | De applicatie bouwen of verbeteren vanuit die specificatie |
| Evaluate | Het draaiende resultaat inspecteren en scoren op expliciete criteria |
| Gate | Beslissen of het systeem moet stoppen, itereren of escaleren |

Die structuur is belangrijk omdat ze voorkomt dat één agent zijn eigen werk ongecontroleerd beoordeelt.

De planner maakt een spec. De generator bouwt tegen die spec. De evaluator controleert de echte draaiende applicatie. Daarna beslist een deterministische gate of de kwaliteit voldoende is.

Dat is een nuttiger mentaal model dan "een agent bouwt een app".

## Waarom de evaluatielaag telt

De belangrijkste ontwerpkeuze in de harness is de scheiding tussen generatie en evaluatie.

Veel AI-systemen falen omdat ze optimaliseren voor afronding in plaats van kwaliteit. Ze produceren iets dat af lijkt en stoppen dan. Het probleem is dat "klaar" en "goed" niet hetzelfde zijn.

In mijn setup scoort de evaluator het resultaat op meerdere assen, waaronder:

- designkwaliteit
- originaliteit
- craft
- functionaliteit

Dat is belangrijk omdat technische correctheid alleen niet volstaat voor productwerk. Een systeem kan compileren en toch generiek, fragiel of middelmatig aanvoelen.

De harness dwingt die dimensies in de lus in plaats van ze te behandelen als optionele polish.

## Iteratie heeft regels nodig, niet alleen retries

Nog iets waar ik niet op vertrouw: blinde herhaling.

Als een workflow gewoon opnieuw probeert tot het toevallig lukt, dan is dat geen systeem. Dan is het dure drift.

Daarom bevat de harness expliciete stoplogica. Als scores de drempel halen, stopt de lus. Als het systeem faalt zonder echte verbetering, detecteert het stagnatie. Als de generator meldt dat hij vastzit, escaleert de workflow in plaats van te doen alsof er vooruitgang is.

Dat is een van de belangrijkste verschillen tussen een speelgoedlus en een bruikbare.

## State moet de lus overleven

Een van de praktische vereisten van elk iteratief systeem is continuiteit van state.

Elke iteratie moet weten wat het doel is, wat er al gebeurd is, wat gefaald heeft en wat de evaluator als volgende gewijzigd wil zien. Zonder dat reset elke cyclus gedeeltelijk en wordt kwaliteit instabiel.

Daarom draagt de harness gestructureerde state tussen de fasen. Die state bevat niet alleen artefacten, maar ook quality signals, stage hints, constraints en de actuele status.

Zo kan de generator opnieuw in de lus stappen met gerichte kritiek in plaats van telkens van nul te herbeginnen.

## De Knowledge OS: context als operating system

Als de harness over uitvoering gaat, dan gaat de Knowledge OS over alles waar uitvoering van afhangt.

Het doel is niet om een map met bestanden te maken met semantische zoeklaag erbovenop. Het doel is om een systeem te bouwen dat kennis kan innemen, organiseren, ophalen, relateren, compileren en onderhouden in de tijd.

Dat betekent dat kennis een actieve laag moet worden, geen passieve opslag.

Op hoog niveau combineert de Knowledge OS verschillende bouwstenen:

- documentbeheer
- versiebeheer
- retrieval
- entity extractie
- relation mapping
- conflict detectie
- synthese en compilatie
- agenttoegang via tools en API's

Het interessante deel is niet één feature op zich. Het is het feit dat ze samenwerken binnen één workspace-scoped systeem.

## Waarom gewone RAG niet genoeg is

Veel teams stoppen bij vector search en noemen dat een kennislaag.

Dat is nuttig, maar niet genoeg als het doel is om echte bedrijfsoperaties te ondersteunen.

De reden is eenvoudig: bedrijfskennis bestaat niet alleen uit tekstchunks. Ze bevat entiteiten, relaties, beslissingen, contradicties, ownership en historiek. Als je enkel fragmenten op similariteit terughaalt, mis je te veel operationele context.

Daarom is de Knowledge OS opgezet als een gelaagd retrieval-systeem.

Het begint met zoeken, maar stopt daar niet.

## Van documenten naar gestructureerde kennis

De Knowledge OS behandelt documenten als ruwe input, niet als eindvorm.

Zodra content in het systeem komt, kan die geïndexeerd worden, gelinkt worden aan entiteiten, door relaties worden doorlopen, op conflicten worden gecontroleerd, naar synthese-pagina's worden gecompileerd en opnieuw worden blootgesteld via API's en tools.

Dat verandert de rol van de knowledge base volledig.

In plaats van een archief te zijn waarin je zoekt wanneer je vastzit, wordt het een substraat waarmee de rest van het systeem kan denken.

## Versiebeheer is belangrijker dan mensen denken

Een architectuurkeuze waar ik veel belang aan hecht is versiebeheer.

Kennis verandert. Bedrijfsbeslissingen evolueren. Documenten worden herschreven. Aannames verouderen.

Als een kennissysteem die veranderingen niet netjes kan volgen, wordt het moeilijk om het te vertrouwen. Daarom behandelt de Knowledge OS versiegeschiedenis als een first-class feature in plaats van als een detail achteraf.

## Multi-agent toegang vraagt gestructureerde tools

Nog een belangrijk punt: de Knowledge OS is niet alleen een UI voor mensen. Het is ook een toegangslaag voor agents.

Dat betekent dat agents gestructureerde manieren nodig hebben om te zoeken, lezen, creëren, updaten, compileren en context op te halen uit het systeem. Als die toegang ad hoc is, daalt de kwaliteit van het geheel snel.

Zo begint het systeem minder op een chatbot en meer op infrastructuur te lijken.

## Hoe de twee lagen samenwerken

De harness en de Knowledge OS lossen verschillende problemen op, maar versterken elkaar.

De harness beantwoordt de vraag:

> Hoe beweegt werk vooruit met echte kwaliteitscontrole?

De Knowledge OS beantwoordt de vraag:

> Hoe weet het systeem genoeg om dat werk in context te doen?

Met andere woorden:

| Laag | Primaire rol |
|---|---|
| Harness | Uitvoering plannen, genereren, evalueren, itereren en gaten |
| Knowledge OS | Context opslaan, structureren, ophalen, compileren en laten evolueren |

Wanneer die twee lagen verbonden zijn, krijg je iets dat veel nuttiger is dan een agent met een prompt.

Je krijgt een uitvoeringssysteem dat kan werken tegen persistente context.

## Wat ik bewust privé houd

Er is een verschil tussen architectuur uitleggen en elke interne hefboom publiceren.

Ik deel graag het brede systeemontwerp: fasescheiding, gated iteratie, quality signals, gelaagde retrieval, knowledge graphs, tool-based access en versioned memory.

Wat ik niet publiek wil dumpen, is de volledige prompt stack, elke evaluatieheuristiek, elke interne conventie of operationele details die het systeem in productie robuust maken.

Dat is geen vaagheid. Het is een redelijke grens tussen nuttige technische transparantie en onnodige blootstelling.

## Slotgedachte

Als ik de architectuur eenvoudig moet samenvatten, dan is het dit:

De harness helpt het systeem **doen**.
De Knowledge OS helpt het systeem **weten**.

Uitvoering zonder gestructureerde kennis blijft oppervlakkig.

Kennis zonder execution harness blijft passief.

Zet je ze samen, dan krijg je een veel sterkere basis om producten te bouwen, interne workflows aan te sturen en bedrijfsintelligentie op een schaalbare manier te organiseren.
      `.trim(),
    },
  },
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
