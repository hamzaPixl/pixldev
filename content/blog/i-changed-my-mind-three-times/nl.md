---
slug: "i-changed-my-mind-three-times"
date: "2026-07-09"
icon: Compass
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Ik ben van gedacht veranderd (drie keer)"
description: "In april publiceerde ik een visiereeks over harnesses, Knowledge OS, lokale modellen en robotica. Drie maanden later is de helft herzien en zijn twee draden verdwenen. Dit is de eerlijke diff — en wat elke pivot overleefde."
category: "Visie"
tags: ["AI-systemen", "Build in public", "Retrospectief"]
readTime: "6 min"
---

_In april publiceerde ik een reeks over het volgende technologische decennium. Drie maanden later herlas ik ze naast mijn eigen codebase. De helft overleefde. De helft niet. Dit is de diff._

---

## Waarom dit überhaupt schrijven

De meeste visie-essays worden nooit geauditeerd. Je publiceert het grote plaatje, de toekomst arriveert net iets anders, en niemand herleest de oude post — de auteur nog het minst van al.

Ik herlas de mijne. Daarna liet ik mijn eigen tooling verifiëren wat mijn repos vandaag echt doen, en schreef ik de nieuwe visie tegen die ground truth. Blijkt dat mijn denken door drie duidelijk verschillende tijdperken is gegaan, en de nieuwste documenten benoemen ze expliciet. Dus laat me het ongemakkelijke doen en ze publiek diffen.

---

## Tijdperk 1: de tweelagenthese

Het eerste tijdperk was het tijdperk waarover ik blogde: **de harness helpt het systeem doen, de Knowledge OS helpt het systeem weten.**

Twee lagen. Een uitvoeringsharness die agents met gates en reviews door het werk stuurt, en een kennislaag die geheugen en context structureert. Dat frame droeg veel: het is waarom mijn knowledge engine bestaat, het is waarom mijn agent-tooling bestaat, en het is nog altijd de properste manier die ik ken om uit te leggen waarom "prompt het gewoon beter" niet schaalt.

## Tijdperk 2: het geünificeerde OS

Het tweede tijdperk — dit voorjaar — probeerde alles te unificeren. Eén monorepo, één systeem, subsystemen samengevouwen in één operationele laag. De april-architectuur zette de stukken onder één dak: `pixl-os` met subsystemen erin.

Het voelde elegant. Het was ook het tijdperk dat mijn duurste gewoonte produceerde: prachtige contracten, sprints vol scaffolding — en dan laat een pivot het allemaal verweesd achter. Ik heb nu een gearchiveerd platform met 1.500 tests om het te bewijzen.

## Tijdperk 3: de bedrijvenfabriek

Het derde tijdperk is waar ik nu sta: geen geünificeerd OS, geen monorepo. **Services over HTTP.** Kleine smalle services, elk apart deploybaar, elk met capabilities die op dezelfde manier worden aangeboden, gecomponeerd door een control plane dat bedrijven provisioneert. De visiepost daarover is een essay op zich; de korte versie is dat "een bedrijf aanmaken" een API-call wordt en agents het grootste deel ervan uitbaten.

De monorepo-richting van april is dood. Ik zeg het onomwonden, omdat ik ze drie maanden geleden schriftelijk heb aanbevolen.

---

## Wat ik heb laten vallen

**De harness als product.** Opgegeven, voorlopig. Deze doet pijn — het was de ster van het tweelagen-tijdperk. Maar het harness-*patroon* overleefde: het kernidee, de gate waar uitvoering pauzeert voor een beslissing, generaliseerde naar het job-contract dat elke service nu deelt. Een job kan `submitted`, `working`, `input-required`, `completed`, `failed` zijn. Die `input-required`-status — een service die pauzeert om een mens of een agent om een beslissing te vragen — is de harness-gate, gepromoveerd van productfeature naar netwerkprotocol. Het product stierf; het idee kreeg een grotere job.

**De Knowledge OS als OS.** Gedegradeerd, bewust. In april was kennis de tweede pijler van alles. In het nieuwe model is geheugen *een capability zoals de andere* — geconsumeerd via dezelfde interface als "genereer een site" of "zoek een bedrijf op". Wat de pijler verving is een scherper onderscheid dat ik een jaar eerder had willen maken: **context** is gecureerd, klein, geversioneerd — wat het bedrijf *is*. **Geheugen** is geaccumuleerd, groot, opgehaald — wat het bedrijf *weet*. Die twee door elkaar halen is waarom elke RAG-demo slim aanvoelt en zich zat gedraagt.

**Robotica.** Weg uit de werkvisie. Niet omdat ik het april-essay niet meer geloof — ik denk nog altijd dat belichaming de plek is waar agentische systemen echt worden, en de fundingcijfers van dit jaar geven me gelijk. Het is weg omdat niets in mijn huidige stack het consumeert, en ik een regel heb aangenomen die geen uitzonderingen kent: geen consumer, geen build.

**Lokale en fijn-afgestelde modellen.** Zelfde lot, met één eerlijke nuance: "lokaal" overleeft als routing-target in het gateway-ontwerp, één provider tussen meerdere. Maar de these dat gespecialiseerde lokale modellen *de volgende laag* zijn? Geen regel van mijn huidige platform hangt ervan af. Het idee is niet fout. Het is gewoon niet aan mij om het dit jaar te bouwen.

---

## Wat elke pivot overleefde

Drie dingen kwamen intact door alle drie de tijdperken, wat waarschijnlijk betekent dat dit de echte overtuigingen zijn:

1. **De eigendomsgrenzen.** Kennis weet. De engine doet. Services zijn capabilities. De shell is dun. Elk tijdperk hertekende de blokken; de grenzen ertussen verschoven nooit.
2. **Contract-first.** Geen integratie zonder gedeeld contract. De envelope, de error catalog, de health check, het geversioneerde schema — de saaie paperassen zijn de enige reden dat drie tijdperken van pivots geen puin hebben opgeleverd.
3. **Betrouwbaarheid komt van systeemstructuur, niet van grotere prompts.** De oudste claim op deze blog, en degene die elke nieuwe modelrelease opnieuw bevestigt. Betere modellen tillen de vloer omhoog. Structuur houdt het plafond recht.

---

## De metales

De aprilreeks publiceren is wat deze post goedkoop maakte om te schrijven. De visie was geversioneerd, publiek, in mijn eigen woorden — dus ze herzien is een diff, geen identiteitscrisis.

Mijn faalmodus was nooit slechte code. Het was een nieuw diep artefact halfweg het kwartaal — een prachtige spec die me wegverleidt van het ding met betalende gebruikers. De tijdperken benoemen is hoe ik het nu opvang: wanneer ik tijdperk vier voel aankomen, vraag ik wat het consumeert, wie ervoor betaalt en welke demo het gate.

Sterke meningen, geversioneerd. Dat is de hele methode.
