---
slug: "no-consumer-no-build"
date: "2026-07-09"
icon: Gauge
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Geen consumer, geen build"
description: "Ik auditeerde mijn eigen ecosysteem en vond de duurste toestand in software: gebouwd, getest, gedeployed — en nul callers. De operationele regel die eruit voortkwam, en de discipline die ze doet standhouden."
category: "Strategie"
tags: ["Operationele doctrine", "Solo builder", "Focus"]
readTime: "5 min"
---

_Ik draaide een code-geverifieerde audit van mijn eigen ecosysteem. Het duurste dat ik vond was geen bug. Het was werkende software met nul callers._

---

## De audit

Deze maand richtte ik mijn eigen tooling op mijn eigen vloot — elke repo, elke service, elke deployment — en vroeg ik ze te verifiëren wat er echt draait, wat echt wat aanroept, en wat echt geconsumeerd wordt.

Een selectie uit de bevindingen:

- Mijn Belgische bedrijfsdata-service is live, met vier echte databronnen geïntegreerd. Zijn intelligence engine — vergelijken, historiek, tijdlijn — is gebouwd en getest. **Hij heeft nul callers.** Vier van zijn tabellen hebben nog nooit één rij bevat.
- Over mijn hele serviceslaag: **nul cross-service calls in productie.** Het "platform" is een diagram; de draden bestaan niet.
- Brand identity is **vier keer** geherimplementeerd. Auth ook.
- Eén product sleept ~5.000 regels gedupliceerde databron-clients mee die een gedeelde service had moeten vervangen. De gedeelde service bestaat. De migratie is er nooit gekomen.
- Een gearchiveerd platform bevat mijn enige echte LLM-gateway — 1.500 tests, zes provider-adapters en een budget guard met `cost_usd=0.0` hardcoded. Hij shipte zonder ooit iemand iets aan te rekenen, zichzelf incluis.

Niets hiervan is kapotte code. Alles slaagt voor zijn tests. Dat is net wat het duur maakt: het is inventaris die eruitziet als activa.

---

## De faalmodus heeft een naam

Toen ik de audit las, was het patroon gênant consistent. Mijn faalmodus is nooit slechte code. Het is **een nieuw diep artefact halfweg het kwartaal** — een prachtige spec, sprints vol scaffolding, en dan laat een pivot het verweesd achter.

Spec-overreach voelt als vooruitgang terwijl je ermee bezig bent. De contracten zijn elegant. De tests zijn groen. De README is onberispelijk. En dan kantelt het kwartaal, verschuiven de prioriteiten, en belandt het artefact in het museum van dingen die vóór hun eerste gebruiker gebouwd werden.

De audit gaf me het cijfer dat ik nodig had om te stoppen met discussiëren met mezelf: de kloof tussen "visie" en "bedraad" is geen gevoel, ze is meetbaar. Nul cross-service calls is geen strategisch meningsverschil. Het is een feit met een grep erachter.

---

## De regel

Dus de nieuwe operationele doctrine heeft één dragende regel:

**Elk platformstuk shipt tegen een behoefte van een betalend product. Geen consumer, geen build.**

Niet "geen visie" — de visie staat op papier, geversioneerd, en is groter dan ooit. De regel gaat over *volgorde*: infrastructuur wordt gebouwd op het moment dat een echt product ze in bestaan trekt, en geen sprint vroeger.

De rest van de discipline bestaat om de regel het contact met mijn eigen enthousiasme te laten overleven:

- **Een harde WIP-limiet: drie actieve projecten. Punt.** Niet drie per lane. Drie.
- **Lanes met een vaste pikorde.** De cash lane — klantenwerk met een factuur eraan vast — wint elk conflict. De product lane draait op automatische piloot: mijn hoofdproduct shipt dit kwartaal nul nieuwe features, bewust. De platform lane is strikt serieel.
- **Elk hoofdstuk eindigt in een demo, en geen hoofdstuk start voor de vorige gate gepasseerd is.** Geen document — een demo. Een service kit is klaar wanneer een nieuwe capability in één namiddag van idee naar gedeployde, key-gated, agent-aanroepbare service gaat. De identiteitslaag is klaar wanneer een agent die workspace X leest een propere 403 krijgt op workspace Y, met dezelfde correlation id in beide logs.
- **Bevroren is bevroren, met een neergeschreven her-instapvoorwaarde.** De LLM-gateway blijft bevroren tot agents onbewaakt geld beginnen uit te geven — het is een veiligheidsmechanisme, geen dashboard, en veiligheidsmechanismen bouw je wanneer het gevaar bestaat. Mijn oude agent engine staat geparkeerd, en de formulering in mijn eigen planningsdoc is de formulering die ik op een poster nodig heb: **sunk cost koopt geen zetel.**

---

## Wat dit kost

Eerlijkheidssectie: deze doctrine heeft een prijs, en ik betaal ze.

Ze betekent "nee" zeggen tegen mezelf over het interessantste werk dat er ligt. De gateway is het intellectueel meest aantrekkelijke stuk van het hele platform, en hij is expliciet bevroren. Ze betekent dat mijn sterkste engine nog een kwartaal onderbenut blijft, omdat adoptie het seriële plan volgt, niet mijn trots. Ze betekent toekijken hoe gedupliceerde code daar blijft staan, gekend en geticket, omdat de migratie ingepland staat achter een demo-gate.

En ze betekent aanvaarden dat sommige gebouwde dingen hun consumer nooit zullen krijgen, en gedelete zullen worden in plaats van gered. Werkende software deleten is de taks die je betaalt omdat je ze te vroeg hebt gebouwd.

---

## Het punt

De audit vond de duurste toestand in software: gebouwd, maar niet bedraad. Code zonder callers is geen actief — het is een claim op de toekomst die rente opstapelt in jouw nadeel.

De oplossing is geen betere architectuur. De mijne was al goed. De oplossing is een volgorde-regel met tanden: geen consumer, geen build; elk hoofdstuk gegated door een demo; sunk cost koopt geen zetel.

Groei is bedrijven en services toevoegen — niet fundamenten herbouwen, en geen kathedralen bouwen voor de parochie er is.
