---
slug: "i-changed-my-mind-three-times"
date: "2026-07-09"
icon: Compass
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Ik ben van gedacht veranderd (drie keer)"
description: "In april publiceerde ik een visiereeks. Drie maanden later is de helft herzien en zijn twee draden verdwenen. Dit is de eerlijke diff, en wat elke pivot overleefde."
category: "Visie"
tags: ["AI-systemen", "Build in public", "Retrospectief"]
readTime: "3 min"
---

_In april publiceerde ik een reeks over het volgende technologische decennium. Drie maanden later herlas ik ze naast mijn eigen codebase. De helft overleefde. De helft niet. Dit is de diff._

---

## Waarom dit schrijven

De meeste visie-essays worden nooit geauditeerd. Je publiceert het grote plaatje, de toekomst arriveert net iets anders, en niemand herleest de oude post. De auteur nog het minst van al.

Ik herlas de mijne. Daarna liet ik mijn eigen tooling verifiëren wat mijn repos vandaag echt doen, en schreef ik de nieuwe visie tegen die ground truth. Mijn denken bleek door drie duidelijk verschillende tijdperken te zijn gegaan. Dus laat me het ongemakkelijke doen en ze publiek diffen.

## Tijdperk 1: twee lagen

Het tijdperk waarover ik blogde: **de harness helpt het systeem doen, de Knowledge OS helpt het systeem weten.**

Een uitvoeringsharness die agents met gates en reviews door het werk stuurt. Een kennislaag die geheugen en context structureert. Dat frame droeg veel. Het is waarom mijn knowledge engine bestaat, waarom mijn agent-tooling bestaat, en nog altijd de properste manier die ik ken om uit te leggen waarom "prompt het gewoon beter" niet schaalt.

## Tijdperk 2: het geünificeerde OS

Dit voorjaar probeerde ik alles te unificeren. Eén monorepo, één systeem, subsystemen samengevouwen onder één dak: `pixl-os`.

Het voelde elegant. Het was ook mijn duurste gewoonte: prachtige contracten, sprints vol scaffolding, dan een pivot die het allemaal verweesd achterlaat. Ik heb nu een gearchiveerd platform met 1.500 tests om het te bewijzen.

## Tijdperk 3: de bedrijvenfabriek

Waar ik nu sta. Geen geünificeerd OS, geen monorepo. **Services over HTTP.** Kleine smalle services, elk apart deploybaar, elk met capabilities die op dezelfde manier worden aangeboden, gecomponeerd door een control plane dat bedrijven provisioneert. "Een bedrijf aanmaken" wordt een API-call, en agents baten het grootste deel ervan uit.

De monorepo-richting van april is dood. Ik zeg het onomwonden, omdat ik ze drie maanden geleden schriftelijk heb aanbevolen.

## Wat ik heb laten vallen

**De harness als product.** Opgegeven, voorlopig. Deze doet pijn. Maar het harness-*patroon* overleefde. De gate waar uitvoering pauzeert voor een beslissing generaliseerde naar het job-contract dat elke service nu deelt: `submitted`, `working`, `input-required`, `completed`, `failed`. Die `input-required`-status is de harness-gate, gepromoveerd van productfeature naar netwerkprotocol. Het product stierf. Het idee kreeg een grotere job.

**De Knowledge OS als OS.** Gedegradeerd, bewust. Geheugen is nu een capability zoals de andere, geconsumeerd via dezelfde interface als "genereer een site". Wat de pijler verving is een onderscheid dat ik een jaar eerder had willen maken. **Context** is gecureerd, klein, geversioneerd: wat het bedrijf *is*. **Geheugen** is geaccumuleerd, groot, opgehaald: wat het bedrijf *weet*. Die twee door elkaar halen is waarom elke RAG-demo slim aanvoelt en zich zat gedraagt.

**Robotica.** Weg uit de werkvisie. Ik denk nog altijd dat belichaming de plek is waar agentische systemen echt worden, en de fundingcijfers van dit jaar geven me gelijk. Het is weg omdat niets in mijn stack het consumeert, en ik een regel heb zonder uitzonderingen: geen consumer, geen build.

**Lokale modellen.** Zelfde lot. "Lokaal" overleeft als routing-target in de gateway, één provider tussen meerdere. Maar de these dat gespecialiseerde lokale modellen *de volgende laag* zijn? Geen regel van mijn platform hangt ervan af. Het idee is niet fout. Het is gewoon niet aan mij om het dit jaar te bouwen.

## Wat overleefde

Drie dingen kwamen door alle drie de tijdperken, wat waarschijnlijk betekent dat dit de echte overtuigingen zijn:

→ **Eigendomsgrenzen.** Kennis weet. De engine doet. Services zijn capabilities. De shell is dun. Elk tijdperk hertekende de blokken. De grenzen verschoven nooit.
→ **Contract-first.** Geen integratie zonder gedeeld contract. De envelope, de error catalog, de health check, het geversioneerde schema. De saaie paperassen zijn de enige reden dat drie tijdperken van pivots geen puin opleverden.
→ **Betrouwbaarheid komt van structuur, niet van grotere prompts.** De oudste claim op deze blog. Betere modellen tillen de vloer omhoog. Structuur houdt het plafond recht.

## De metales

De aprilreeks publiceren is wat deze post goedkoop maakte om te schrijven. De visie was geversioneerd, publiek, in mijn eigen woorden. Ze herzien is een diff, geen identiteitscrisis.

Mijn faalmodus was nooit slechte code. Het was een prachtige nieuwe spec halfweg het kwartaal, die me wegverleidt van het ding met betalende gebruikers. De tijdperken benoemen is hoe ik het nu opvang: wanneer ik tijdperk vier voel aankomen, vraag ik wat het consumeert, wie ervoor betaalt en welke demo het gate.

Sterke meningen, geversioneerd. Dat is de hele methode.
