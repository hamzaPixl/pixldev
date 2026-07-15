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
description: "Een klein JSON-object dat beslissingen en beperkingen meedraagt tussen de stappen van een multi-agent AI-pipeline."
category: "Engineering"
tags: ["AI Agents", "Design Patterns", "Orchestratie"]
readTime: "2 min"
---

_Drie agents in een pipeline moeten weten wat de anderen hebben beslist. De baton is hoe ze daar achter komen, zonder het werk opnieuw door te sturen._

---

## Het probleem

Zet drie agents in een pipeline. De ene plant, de andere bouwt, een andere controleert. Elk moet weten wat de anderen deden.

Niet de volledige transcriptie. De essentie: wat beslist is, wat vastligt, wat nog open staat.

Twee manieren waarop dit misgaat.

→ Je stuurt alle artefacten tussen de stappen door, en je **verbrandt tokens** aan context die niemand een tweede keer leest.
→ Je stuurt niets gestructureerds door, en de volgende agent mist het _waarom_: de beslissingen, de beperkingen, de redenen achter het werk.

Dus herhalen agents het werk. Of erger: ze spreken een beslissing van twee stappen terug tegen, en niemand merkt het tot het live gaat.

## De baton

De oplossing is klein. Een JSON-object, zo'n 1.000 tokens, dat met het werk meereist.

Elke agent leest het voor aanvang. Werkt het bij na afloop. Geeft het door.

Het is een estafettestokje dat aantekeningen maakte.

Klein genoeg om altijd te sturen. Gestructureerd genoeg om te lezen. De velden:

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

## Hoe het beweegt

**Initialiseer** met een doel en een beginstatus. Injecteer het als markdown in de prompt van elke agent vóór de stap. Na de stap retourneert de agent een `baton_patch`: alleen de gewijzigde velden. De samengevoegde baton voedt de volgende stap. Herhaal tot de workflow eindigt.

Dat is het hele protocol. Geen message bus, geen gedeelde database, geen framework.

## De keuzes die tellen

`decision_log` is alleen-toevoegen. Eerdere beslissingen worden nooit gewist, dus een latere agent kan ze niet stiekem terugdraaien.

`current_state` is het tegenovergestelde. Bij elke patch vervangen, want het moet nu als waar lezen, niet als een dagboek.

Elke patch krijgt een stap-ID en een tijdstempel. Als de output fout is, lees je precies waar de context afboog.

Met ~1.000 tokens past het altijd. De baton is het goedkope deel van de pipeline.

## De eerlijke grens

De baton draagt context, geen bewijs. Het vertelt de volgende agent wat er gebeurde en waarom. Het vertelt je niet dat het werk goed was. Daarvoor zijn `acceptance` en de artefacten zelf.

Geen enkel protocol maakt een slecht plan goed. Het voorkomt alleen dat goede context verloren gaat.

Gebruik het wanneer stappen van elkaar afhangen, budgetten krap zijn, en beslissingen over de hele keten moeten standhouden.

Klein object. Merge-patch updates. Eén manier minder waarop een pipeline tegen zichzelf liegt.

Als deze lijn je interesseert:

→ [Agents tellen is geen strategie](/blog/counting-agents-is-not-a-strategy)
