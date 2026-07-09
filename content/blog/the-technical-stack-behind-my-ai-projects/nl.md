---
slug: "the-technical-stack-behind-my-ai-projects"
date: "2026-04-08"
icon: Cog
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Onder de motorkap: harness + Knowledge OS"
description: "Twee lagen onder bijna alles wat ik bouw: een harness die uitvoering stuurt en een Knowledge OS die context structureert. De vorm en de redenering, niet de blauwdruk."
category: "Engineering"
tags: ["Harness", "Knowledge OS", "AI-architectuur"]
readTime: "3 min"
---

_Mijn vorige post stelde dat AI pas rendeert binnen een systeem. Dit is de technische opvolger: twee lagen onder bijna alles wat ik bouw. Openhartig, maar bewaakt._

---

Bijna alles wat ik uitlever, rust op twee lagen.

→ een **harness** die uitvoering stuurt
→ een Knowledge OS die context levert

Ik houd ze bewust apart. Ik wil niet dat planning, geheugen, retrieval en oordeel samenklappen in één lange prompt. Elke laag krijgt één taak.

De harness duwt werk vooruit. De Knowledge OS zorgt dat het systeem genoeg weet om dat goed te doen.

## De harness

De harness is een lus, geen losse generatiestap.

Vier fasen, in volgorde:

→ Plan: de vraag omzetten in een echte spec.
→ Generate: bouwen tegen die spec.
→ Evaluate: het echte resultaat inspecteren.
→ Gate: stoppen, itereren of escaleren.

De kern is de **scheiding tussen bouwen en beoordelen.** De laag die produceert, is niet de laag die beslist of het goed genoeg is. Die kloof is het grootste verschil tussen een demo-agent en iets dat je twee keer kunt draaien.

Het moet ook weten wanneer te stoppen. Als scores plateauen, als dezelfde fix blijft terugkomen, als de generator zegt dat hij vastzit, dan is nog meer itereren gewoon duur. Verander van aanpak of escaleer. Dat is een systeembeslissing, geen prompt.

En state moet de lus overleven. Doel, status, kritiek, constraints, allemaal meegedragen tussen de fasen. Zonder die continuiteit herontdekt elke passage dezelfde context, en wordt iteratie theater met een voortgangsbalk.

## De Knowledge OS

Als de harness uitvoering is, dan is de Knowledge OS context.

De kennis van een bedrijf is geen map met een chatvenster erop geschroefd. Het zijn documenten, entiteiten, relaties, beslissingen, contradicties, en een waarheid die blijft veranderen.

Dus **behandel ik het als structuur, niet als zoeken.** Op hoog niveau: ingestion, retrieval, entity-extractie, relation mapping, conflictdetectie, synthese, en nette toegang voor agents.

Documenten zijn ruwe input, geen eindvorm. Zodra content binnenkomt, wordt die geïndexeerd, gelinkt aan entiteiten, doorlopen via relaties, gecheckt op conflicten, gecompileerd tot synthesepagina's, en opnieuw blootgesteld via tools. De knowledge base stopt een archief te zijn waarin je zoekt als je vastzit en wordt een substraat waarop de rest van het systeem kan redeneren.

Zoeken op similariteit alleen brengt je er niet. Nuttige retrieval is gelaagd: query-transformatie, hybride ranking, graafexpansie, reranking, echte citaties. Dat is het verschil tussen tekst ophalen en bruikbare context ophalen.

En versiebeheer is kern, geen luxe. Documenten veranderen, beslissingen veranderen, teams veranderen. Een geheugenlaag die die evolutie niet kan tonen, verliest snel vertrouwen.

## Waar ik stop

Ik beschrijf de vorm: de twee lagen, de rollen, de redenering.

Ik publiceer niet de prompts, de heuristieken, de conventies die het dichtst bij de productiehefboom zitten.

Niet om mysterieus te doen. Het is de grens tussen het ontwerp delen en de machine weggeven.

## Eén zin

De harness helpt het systeem **doen**. De Knowledge OS helpt het **weten**.

Uitvoering zonder gestructureerde context blijft oppervlakkig. Context zonder uitvoering blijft passief.

Samen worden ze iets om op te bouwen.
