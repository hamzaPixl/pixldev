---
slug: "no-consumer-no-build"
date: "2026-07-09"
icon: Gauge
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Geen consumer, geen build"
description: "Ik auditeerde mijn eigen vloot en vond het duurste in software: werkende code met nul callers. De ene regel die eruit voortkwam, en de discipline die ze doet standhouden."
category: "Strategie"
tags: ["Operationele doctrine", "Solo builder", "Focus"]
readTime: "2 min"
---

_Ik draaide een code-geverifieerde audit van mijn eigen ecosysteem. Het duurste dat ik vond was geen bug. Het was werkende software met nul callers._

---

## De audit

Deze maand richtte ik mijn eigen tooling op mijn eigen vloot. Elke repo, elke service, elke deployment. Ik vroeg ze te verifiëren wat er echt draait, wat echt wat aanroept, en wat echt geconsumeerd wordt.

Het duurste dat ze vond was geen bug. Het was werkende software met nul callers.

→ Mijn Belgische bedrijfsdata-service is live, vier echte bronnen geïntegreerd, intelligence engine gebouwd en getest. **Nul callers.** Vier van zijn tabellen hebben nog nooit één rij bevat.
→ Over mijn hele serviceslaag: nul cross-service calls in productie. Het "platform" is een diagram. De draden bestaan niet.
→ Brand identity: vier keer geherimplementeerd. Auth ook.
→ Eén product sleept ~5.000 regels gedupliceerde databron-clients mee. De gedeelde service die ze vervangt bestaat. De migratie is er nooit gekomen.
→ Een gearchiveerd platform bevat mijn enige echte LLM-gateway: 1.500 tests, zes provider-adapters, een budget guard met `cost_usd=0.0` hardcoded. Hij shipte zonder ooit iemand iets aan te rekenen. Zichzelf incluis.

Niets hiervan is kapot. Alles slaagt voor zijn tests. Dat is net wat het duur maakt. Het is inventaris vermomd als activa.

## De faalmodus heeft een naam

Mijn faalmodus is nooit slechte code. Het is **een nieuw diep artefact halfweg het kwartaal**. Een prachtige spec, sprints vol scaffolding, en dan laat een pivot het verweesd achter.

Spec-overreach voelt als vooruitgang terwijl je ermee bezig bent. De contracten zijn elegant. De tests zijn groen. De README is onberispelijk. Dan kantelt het kwartaal, en belandt het artefact in het museum van dingen die vóór hun eerste gebruiker gebouwd werden.

De kloof tussen "visie" en "bedraad" is geen gevoel. Ze is meetbaar. Nul cross-service calls is een feit met een grep erachter.

## De regel

Dus de doctrine heeft één dragende regel.

**Elk platformstuk shipt tegen een behoefte van een betalend product. Geen consumer, geen build.**

Niet "geen visie". De visie staat op papier, geversioneerd, groter dan ooit. De regel gaat over volgorde: infrastructuur wordt gebouwd op het moment dat een echt product ze in bestaan trekt, en geen sprint vroeger.

De rest bestaat om de regel het contact met mijn eigen enthousiasme te laten overleven.

→ Een harde WIP-limiet: drie actieve projecten. Niet drie per lane. Drie.
→ Een vaste pikorde. De cash lane wint elk conflict. De product lane shipt dit kwartaal nul nieuwe features, bewust. De platform lane is strikt serieel.
→ Elk hoofdstuk eindigt in een demo, geen document. Niets start voor de vorige gate gepasseerd is.
→ Bevroren is bevroren. De gateway blijft bevroren tot agents onbewaakt geld uitgeven. Sunk cost koopt geen zetel.

## Wat het kost

Deze doctrine heeft een prijs, en ik betaal ze.

Ze betekent "nee" zeggen tegen mezelf over het interessantste werk dat er ligt. Ze betekent dat mijn sterkste engine nog een kwartaal onderbenut blijft. Ze betekent toekijken hoe gedupliceerde code daar blijft staan, gekend en geticket. Ze betekent werkende software deleten in plaats van redden. Dat is de taks omdat je ze te vroeg hebt gebouwd.

## Het punt

Code zonder callers is geen actief. Het is een claim op de toekomst die rente opstapelt in jouw nadeel.

De oplossing is geen betere architectuur. De mijne was prima. De oplossing is een volgorde-regel met tanden: geen consumer, geen build.

Groei is bedrijven en services toevoegen. Geen fundamenten herbouwen. Geen kathedralen bouwen voor de parochie er is.
