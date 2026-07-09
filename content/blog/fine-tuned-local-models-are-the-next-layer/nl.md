---
slug: "fine-tuned-local-models-are-the-next-layer"
date: "2026-04-08"
icon: BrainCircuit
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Fijn-afgestelde lokale modellen zijn de volgende laag"
description: "De basis is een harness en een Knowledge OS. De volgende laag: gespecialiseerde, fijn-afgestelde lokale modellen voor smalle taken, minder prompt, betrouwbaardere uitvoering."
category: "Engineering"
tags: ["Fine-tuning", "Lokale modellen", "Betrouwbaarheid"]
readTime: "3 min"
---

_De harness en de Knowledge OS zijn de basis. Ze zijn niet het eindpunt._

---

Twee artikels geleden betoogde ik dat AI pas nuttig wordt binnen een systeem. Het vorige benoemde mijn twee lagen:

→ een **harness** voor uitvoering
→ een **Knowledge OS** voor gestructureerde context

Nog steeds de basis. Niet het eindpunt.

De volgende laag is voor mij duidelijk: gespecialiseerde, fijn-afgestelde lokale modellen. Niet één gigantisch model voor alles. Niet één gigantische prompt die het systeem bijeenhoudt. Kleinere modellen, smalle taken, echte hardwarebeperkingen, ingebouwd als betrouwbare componenten.

## Prompting botst tegen een muur

Prompting is de snelste manier om te prototypen en snel eerste waarde te bereiken.

Dan komt de rekening. Te veel gedrag leeft in de prompt. Instructies worden langer. Edge cases stapelen op. Het model leidt te veel af, bij elke run.

Je betaalt een frontier-model om eindeloos dezelfde instructies te herlezen. Het verveelt zich nooit. Je budget wel.

Aanvaardbaar in het begin. Veel minder wanneer het doel herhaalbare uitvoering wordt. Als dezelfde classificatie, extractie of routing telkens terugkomt, wil ik niet de volledige promptbelasting bij elke call betalen. Ik wil dat gedrag dichter bij het model.

## Fine-tuning is compressie

Men kadert fine-tuning vaak als een model slimmer maken. Dat is niet het kader dat mij interesseert.

Fine-tuning **comprimeert** herhaald gedrag in het model, zodat het systeem tijdens runtime minder scaffolding nodig heeft.

Het snijdt in promptlengte, orchestratie-overhead, latency op smalle workflows, en variabiliteit bij repetitieve taken. Vaak koopt het meer betrouwbaarheid dan nog een paragraaf instructies ooit zou doen.

## Kleine modellen, smalle rollen

De toekomst van operationele AI is niet één frontier-model dat elke taak doet. Ze is **gedistribueerd**:

→ frontier-modellen voor breed redeneren en moeilijke synthese
→ gestructureerde systemen voor geheugen, retrieval en gating
→ kleine fijn-afgestelde modellen voor smalle, repetitieve taken

Een goed afgebakend klein model hoeft niet universeel briljant te zijn. Het moet betrouwbaar zijn binnen een begrensde taak: classificatie, gestructureerde extractie, stijlhandhaving, tool routing, domeinvalidatie.

Dat is een veel serieuzere weg naar betrouwbaarheid dan één algemeen model elke laag laten improviseren.

## Redeneren blijft centraal

Dit gaat niet over redeneren vervangen door fragiele automatisering. Integendeel.

De harness houdt beslissingen, gating, escalatie en flow. De Knowledge OS houdt geheugen en context. Gespecialiseerde modellen nemen enkel de smalle taken binnen die lus. Zo besteedt het systeem duur redeneren waar het telt, niet aan taken met lage entropie die al stabiel hadden moeten zijn.

Betrouwbaarheid is geen magie. Het is ontworpen alignment tussen de taak, de trainingsdata, de evaluatielus, en waar het ding echt draait. Hardware is echt: compute, latency, privacy en kost zijn architectuur, geen bijzaken.

## De stack

| Laag | Rol |
|---|---|
| Harness | Uitvoering, iteratie, evaluatie, gating orkestreren |
| Knowledge OS | Gestructureerd geheugen, retrieval, evoluerende context |
| Fijn-afgestelde lokale modellen | Smalle, repetitieve, domeingevormde taken uitvoeren |
| Frontier-modellen | Brede synthese, ambiguïteit, complex oordeel |

Dichter bij een compleet systeem dan "één model plus één prompt".

De harness helpt het systeem **doen**. De Knowledge OS helpt het weten. Fijn-afgestelde lokale modellen helpen het stabiliseren.

De volgende stap is niet meer prompting. Het is betere specialisatie.
