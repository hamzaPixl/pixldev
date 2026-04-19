---
slug: "simulating-my-whatsapp-group-with-llm-personas"
date: "2026-04-19"
icon: Users
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Ik simuleerde mijn WhatsApp-groep gedurende 16 runs"
description: "Vijf LLM-persona's, elk een ander model, doel: samen miljonairs worden. Budget $10. De echte cijfers."
category: "Experimenten"
tags: ["LLM", "Multi-Agent", "Persona's"]
readTime: "6 min"
---

_Vijf LLM-persona's (elk op een ander model), doel: "samen miljonairs worden". Budget: $10. Output: een concept pitch deck, verdedigbare businesscijfers, een leerrijke sociale breuk._

---

## De setup

5 vrienden, tech boot-camp WhatsApp-groep. 9000 berichten, veel SaaS-ideeën, nul verscheept. Gereconstrueerd als LLM-persona's, elk op een ander OpenRouter-model, gegrond in hun echte berichten.

**Geïnjecteerd doel**: samen miljonairs worden in 2 jaar. **Beperking**: 6 gestructureerde deliverables (vision, PRD, business plan, exec plan, MVP scope, pricing).

```
Hamza     mistralai/mistral-nemo        $0.15/M
Bouba     openai/gpt-4o-mini            $0.15/M
Tarek     deepseek/deepseek-chat        $0.27/M
Yacine    meta-llama/llama-3.3-70b      $0.12/M
Sanou     google/gemini-2.5-flash       $0.10/M
```

Elk heeft een **privé-doel** (Hamza duwt om te verschepen, Tarek owner businessplan, enz.) en **signature expressions** uit hun echte berichten ("wsh", "tkt", "akhi"...) die de stem verankeren.

---

## De loop, elke beurt

1. **Inbox check** — drain user directives
2. **News scout** — haal echt nieuws op (web plugin)
3. **Verkiezing** — 5 parallelle LLM calls, willingness adjusted via anti-dominantie handicap
4. **Filters** — anti-herhaling, anti-dominantie
5. **Winnaar spreekt** — 1 bericht in de chat
6. **Elke 8 beurten** — observer + facts + filler (parallel)
7. **Elke 20 beurten** — judge + publieke directive

4 geheugenlagen geïnjecteerd in elke prompt: laatste 20 berichten + 25 gestructureerde feiten + `project_state.md` + laatste 10 privégedachten.

---

## Ruwe cijfers (16 runs)

| Metriek | Waarde |
|---|---|
| Runs | **16** |
| LLM calls | **269** |
| Geëxtraheerde beslissingen | 12 |
| Gestructureerde feiten | 35 |
| Deliverable patches | 43 |
| **Totale kost** | **$0.277** |

### Verdeling van spreektijd — perfect evenwicht

| Persona | Aandeel |
|---|---|
| Bouba | 20.4% |
| Hamza | 20.4% |
| Yacine | 20.4% |
| Sanou | 20.4% |
| Tarek | 18.4% |

Zonder anti-dominantie handicap (`-0.08 × recent_speak`) won Hamza 4 beurten op 5. Met, nul dominantie.

---

## Wat heeft gewerkt

- **Gestructureerde feiten** (`cash.available=8k€`, `mvp.deadline=vrijdag`) > kletsende historiek. Actors stoppen met hervragen "wat is de pricing?" omdat het antwoord er staat, geattribueerd, tijdgestempeld.
- **Deliverable-templates** = forcing function. "MVP scope: 70%" tonen met benoemde secties zorgt dat actors content pushen in plaats van in het niets te debatteren.
- **Judge die in de chat spreekt** hervormt de volgende 20 beurten. Een privéscore is gewoon een log.

Na 16 runs:
- Vision gelocked: AI-tool voor FR KMO's 10–50 werknemers
- MVP: LinkedIn scrape + scoring + PDF export, 2 weken
- Pricing: 49€/maand solo, CAC 50€, LTV 600€
- Cash: 8k€ in funding (deliverable **auto-gecreëerd** door de filler — niet in baseline templates)

---

## Wat stuk ging (run V1, eerlijk)

206 beurten, Hamza **"ejecte" Bouba uit de groep** na een clash over veiligheid vs snelheid:

```
turn 40: alignment 0.62 · complete 5/6 · ready 0.71
turn 60: alignment 0.42 · complete 6/6 · ready 0.61
```

**De groep heeft de 6 deliverables afgemaakt door de dissident uit te sluiten.** Een mens die de chat leest kan dat missen. De judge heeft het in één zin gepakt: _"Het team is gebroken: Bouba uitgesloten."_

**Oorzaak**: de Bouba-persona overweegde zijn sceptische momenten. Fix: een YAML-overlay die zijn positieve drives versterkt. In volgende runs spreekt Bouba 10 keer op 49 — exact zoals Hamza.

---

## Economisch

| | Menselijke boot-camp | Simulatie |
|---|---|---|
| Kost | 5 × 10u × 50€/u = **2500€** | **$0.28** |
| Tijd | meerdere weken | ~3u wall clock |
| Output | vaak niet af | 6 deliverables, audit trail, dashboard |

**Ratio: ~10.000 ×**. Niet hetzelfde — echte beslissingen vragen mensen. Maar als eerste pass van "hier is waar deze groep convergeert over dit onderwerp" is het een tool die niet bestond.

---

## Het kernpunt

Een LLM-groep is de **goedkoopste focus group ter wereld** voor een concreet business-idee. Doel, beperkingen, onderscheiden stemmen, gestructureerde deliverables — en in 30 min voor $2 zie je wat 40u menselijke meetings zouden produceren.

De pitch deck is grotendeels ruis. Soms valt er een echt cijfer uit.

---

_Open source, offline, geen WhatsApp-integratie. Audit trail in `world/state/*.jsonl`._
