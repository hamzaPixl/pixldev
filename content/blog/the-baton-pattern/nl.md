---
slug: "the-baton-pattern"
date: "2026-02-16"
icon: Workflow
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
  - name: "Sanawar Syed Azor Ali"
    linkedin: "https://www.linkedin.com/in/sanawar-syed/"
title: "Het Baton Pattern"
description: "Een lichtgewicht overdrachtsprotocol voor multi-agent AI-pipelines. Een klein JSON-object dat context meedraagt tussen workflowstappen."
category: "Engineering"
tags: ["AI Agents", "Design Patterns", "Orchestratie"]
readTime: "5 min"
---

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
| `goal` | Doelstelling in één zin |
| `current_state` | Wat nu waar is |
| `decision_log` | Genomen beslissingen (alleen toevoegen) |
| `constraints` | Harde regels om te respecteren |
| `open_questions` | Onopgeloste vragen |
| `work_scope` | Betrokken bestanden/modules |
| `artifacts` | Verwijzingen naar geproduceerde outputs |
| `acceptance` | Tests/controles die moeten slagen |

---

## Hoe het werkt

### 1. Initialiseren

De baton begint met een doel en een beginstatus.

### 2. Injecteren

Voor elke stap wordt de baton als markdown in de prompt van de agent geïnjecteerd.

### 3. Patchen

Na uitvoering retourneert de agent een `baton_patch` — alleen de gewijzigde velden worden bijgewerkt.

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

**Vervangen voor status.** `current_state` wordt elke keer vervangen — het weerspiegelt de *huidige* waarheid, niet de geschiedenis.

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
