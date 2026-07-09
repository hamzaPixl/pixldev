---
slug: "simulating-my-whatsapp-group-with-llm-personas"
date: "2026-04-19"
icon: Users
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "J'ai simulé mon groupe WhatsApp pendant 16 runs"
description: "Cinq personas LLM, un modèle différent chacun. Goal : devenir millionnaires ensemble. Budget 10 $. Les vrais chiffres."
category: "Expériences"
tags: ["LLM", "Multi-Agent", "Personas"]
readTime: "4 min"
---

_Cinq personas LLM, un modèle différent chacun. Goal : "devenir millionnaires ensemble". Budget : 10 $. Outputs : un pitch deck drafté, des chiffres business tenables, une fracture sociale instructive._

---

## Le setup

5 amis, un groupe WhatsApp boot-camp tech. 9000 messages, plein d'idées de SaaS, zéro shippé. Je les ai reconstitués en personas LLM, chacun sur un modèle OpenRouter différent, grounded dans leurs vrais messages.

**Goal injecté** : devenir millionnaires ensemble en 2 ans. **Contrainte** : 6 livrables structurés (vision, PRD, business plan, exec plan, MVP scope, pricing).

```
Hamza     mistralai/mistral-nemo        $0.15/M
Bouba     openai/gpt-4o-mini            $0.15/M
Tarek     deepseek/deepseek-chat        $0.27/M
Yacine    meta-llama/llama-3.3-70b      $0.12/M
Sanou     google/gemini-2.5-flash       $0.10/M
```

Chaque persona a un **goal privé** (je pousse à shipper, Tarek owner du business plan) et des signature expressions extraites de leurs vrais messages ("wsh", "tkt", "akhi") qui ancrent la voix.

---

## La boucle, chaque tour

1. **Inbox check** : drain des directives user
2. **News scout** : fetch de l'actu (web plugin)
3. **Élection** : 5 LLM calls parallèles, willingness ajustée par un handicap anti-domination
4. **Filtres** : anti-répétition, anti-domination
5. **Le winner parle** : 1 message dans le chat
6. **Tous les 8 tours** : observer + facts + filler (parallèle)
7. **Tous les 20 tours** : judge + directive publique

Quatre couches de mémoire injectées dans chaque prompt : 20 derniers messages + 25 facts structurés + `project_state.md` + 10 dernières pensées privées.

---

## Les chiffres bruts (16 runs)

| Métrique | Valeur |
|---|---|
| Runs | **16** |
| Appels LLM | **269** |
| Décisions extraites | 12 |
| Facts structurés | 35 |
| Patches livrables | 43 |
| **Coût total** | **$0.277** |

### Distribution de parole : équilibre parfait

| Persona | Part |
|---|---|
| Bouba | 20.4% |
| Hamza | 20.4% |
| Yacine | 20.4% |
| Sanou | 20.4% |
| Tarek | 18.4% |

Sans le handicap anti-domination (`-0.08 × recent_speak`), je gagnais 4 tours sur 5. Avec, zéro domination.

---

## Ce qui a marché

- **Facts structurés** (`cash.available=8k€`, `mvp.deadline=vendredi`) battent l'historique bavard. Les actors arrêtent de re-demander "c'est quoi le pricing ?" parce que la réponse est là, attribuée, timestampée.
- **Templates de livrables** = forcing function. Montrer "MVP scope : 70%" avec des sections nommées fait que les actors poussent du contenu au lieu de débattre dans le vide.
- **Le judge qui parle dans le chat** reshape les 20 tours suivants. Un score privé est juste un log.

Après 16 runs :
- Vision lockée : outil IA pour PME/TPE FR, 10-50 salariés
- MVP : scrape LinkedIn + scoring + export PDF, 2 semaines
- Pricing : 49€/mois solo, CAC 50€, LTV 600€
- Cash : 8k€ en funding (livrable **auto-créé** par le filler, pas dans les templates baseline)

---

## Ce qui a cassé (run V1, honnête)

Au tour 206, j'ai **"éjecté" Bouba du groupe** après un clash sécurité contre vitesse :

```
turn 40 : alignment 0.62 · complete 5/6 · ready 0.71
turn 60 : alignment 0.42 · complete 6/6 · ready 0.61
```

**Le groupe a fini les 6 livrables en excluant le dissident.** Un humain qui lit le chat peut rater ça. Le judge l'a chopé en une phrase : _"L'équipe est fracturée : Bouba exclu."_

**Cause** : la persona Bouba sur-pondérait ses moments sceptiques. Fix : un overlay YAML qui booste ses drives positifs. Dans les runs suivants, Bouba parle 10 fois sur 49, exactement comme moi.

---

## Économique

| | Boot-camp humain | Simulation |
|---|---|---|
| Coût | 5 × 10h × 50€/h = **2500€** | **$0.28** |
| Temps | plusieurs semaines | ~3h wall clock |
| Output | souvent pas fini | 6 livrables draftés, audit trail, dashboard |

**Ratio : ~10 000 ×**. Pas la même chose. Les vraies décisions demandent des humains. Mais comme premier tour de "voici à quoi converge ce groupe sur ce sujet", c'est un outil qui n'existait pas.

---

## Le point clé

Un groupe LLM est le **focus group le moins cher au monde** pour une idée business concrète. Goal, contraintes, voix distinctes, livrables structurés. En 30 min pour $2, tu vois ce que 40h de meetings humains produiraient.

Le pitch deck est surtout du bruit. Parfois, un vrai chiffre tombe.

---

_Open source, offline, no WhatsApp integration. Audit trail dans `world/state/*.jsonl`._
