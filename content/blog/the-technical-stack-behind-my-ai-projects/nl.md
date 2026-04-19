---
slug: "the-technical-stack-behind-my-ai-projects"
date: "2026-04-08"
icon: Cog
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "De technische stack achter mijn AI-projecten: Harness + Knowledge OS"
description: "Een technische blik op de twee kernlagen achter mijn AI-systeem: de harness die uitvoering stuurt en de Knowledge OS die geheugen en bedrijfscontext structureert."
category: "Engineering"
tags: ["Harness", "Knowledge OS", "AI-architectuur"]
readTime: "8 min"
---

In mijn vorige artikel stelde ik dat AI pas echt nuttig wordt wanneer het in een systeem zit, en niet wanneer het als losse tool wordt gebruikt.

Dit artikel is de technische opvolger daarvan.

Ik wil op een bewust hoog niveau de twee kernlagen beschrijven waarop ik achter de meeste projecten die ik bouw vertrouw:

- een **harness**, die uitvoering aanstuurt
- een **Knowledge OS**, die context, geheugen en bedrijfsinformatie structureert

Ik ga niet elk implementatiedetail, elke prompt of elke interne conventie publiceren. Dat zou onnodig zijn en in sommige gevallen onverstandig. Maar ik kan de architectuur wel helder genoeg uitleggen zodat technische lezers begrijpen hoe het model erachter werkt.

De korte versie is deze:

> De harness is het uitvoeringssysteem.
> De Knowledge OS is het geheugensysteem.

Samen vormen ze de basislaag die ik gebruik om producten te bouwen, delivery-loops aan te sturen en informatie op bedrijfsschaal te organiseren.

## Waarom ik het probleem in twee splits

De meeste AI-systemen stoppen te veel verantwoordelijkheden in één laag.

Ze vragen een model om context te begrijpen, werk te plannen, uit te voeren, zichzelf te evalueren, te onthouden wat er gebeurd is en tegelijk afgestemd te blijven op bedrijfsregels, allemaal binnen één losse conversatie. Dat werkt voor demo's. Het houdt minder goed stand in herhaalbare delivery.

Ik splits die verantwoordelijkheden liever op.

Eén systeem is verantwoordelijk voor **werk vooruit te duwen**.

Een ander systeem is verantwoordelijk voor **de juiste context beschikbaar te maken**.

Die scheiding klinkt eenvoudig, maar verandert alles. Uitvoering kan iteratief en meetbaar worden. Context kan persistent en gestructureerd worden. En het geheel wordt veel makkelijker om over na te denken.

## De Harness: uitvoering als gecontroleerde lus

De harness is het onderdeel dat een ruwe productvraag omzet in een iteratieve delivery-workflow.

Conceptueel is het niet gewoon "genereer code". Het is een lus met aparte fasen en expliciete gating.

Op hoog niveau ziet de flow er zo uit:

| Fase | Verantwoordelijkheid |
|---|---|
| Plan | Een korte prompt uitbreiden naar een gestructureerde productspecificatie |
| Generate | De applicatie bouwen of verbeteren vanuit die specificatie |
| Evaluate | Het draaiende resultaat inspecteren en scoren op expliciete criteria |
| Gate | Beslissen of het systeem moet stoppen, itereren of escaleren |

Die structuur is belangrijk omdat ze voorkomt dat één agent zijn eigen werk ongecontroleerd beoordeelt.

De planner maakt een spec. De generator bouwt tegen die spec. De evaluator controleert de echte draaiende applicatie. Daarna beslist een deterministische gate of de kwaliteit voldoende is.

Dat is een nuttiger mentaal model dan "een agent bouwt een app".

## Waarom de evaluatielaag telt

De belangrijkste ontwerpkeuze in de harness is de scheiding tussen generatie en evaluatie.

Veel AI-systemen falen omdat ze optimaliseren voor afronding in plaats van kwaliteit. Ze produceren iets dat af lijkt en stoppen dan. Het probleem is dat "klaar" en "goed" niet hetzelfde zijn.

In mijn setup scoort de evaluator het resultaat op meerdere assen, waaronder:

- designkwaliteit
- originaliteit
- craft
- functionaliteit

Dat is belangrijk omdat technische correctheid alleen niet volstaat voor productwerk. Een systeem kan compileren en toch generiek, fragiel of middelmatig aanvoelen.

De harness dwingt die dimensies in de lus in plaats van ze te behandelen als optionele polish.

## Iteratie heeft regels nodig, niet alleen retries

Nog iets waar ik niet op vertrouw: blinde herhaling.

Als een workflow gewoon opnieuw probeert tot het toevallig lukt, dan is dat geen systeem. Dan is het dure drift.

Daarom bevat de harness expliciete stoplogica. Als scores de drempel halen, stopt de lus. Als het systeem faalt zonder echte verbetering, detecteert het stagnatie. Als de generator meldt dat hij vastzit, escaleert de workflow in plaats van te doen alsof er vooruitgang is.

Dat is een van de belangrijkste verschillen tussen een speelgoedlus en een bruikbare.

## State moet de lus overleven

Een van de praktische vereisten van elk iteratief systeem is continuiteit van state.

Elke iteratie moet weten wat het doel is, wat er al gebeurd is, wat gefaald heeft en wat de evaluator als volgende gewijzigd wil zien. Zonder dat reset elke cyclus gedeeltelijk en wordt kwaliteit instabiel.

Daarom draagt de harness gestructureerde state tussen de fasen. Die state bevat niet alleen artefacten, maar ook quality signals, stage hints, constraints en de actuele status.

Zo kan de generator opnieuw in de lus stappen met gerichte kritiek in plaats van telkens van nul te herbeginnen.

## De Knowledge OS: context als operating system

Als de harness over uitvoering gaat, dan gaat de Knowledge OS over alles waar uitvoering van afhangt.

Het doel is niet om een map met bestanden te maken met semantische zoeklaag erbovenop. Het doel is om een systeem te bouwen dat kennis kan innemen, organiseren, ophalen, relateren, compileren en onderhouden in de tijd.

Dat betekent dat kennis een actieve laag moet worden, geen passieve opslag.

Op hoog niveau combineert de Knowledge OS verschillende bouwstenen:

- documentbeheer
- versiebeheer
- retrieval
- entity extractie
- relation mapping
- conflict detectie
- synthese en compilatie
- agenttoegang via tools en API's

Het interessante deel is niet één feature op zich. Het is het feit dat ze samenwerken binnen één workspace-scoped systeem.

## Waarom gewone RAG niet genoeg is

Veel teams stoppen bij vector search en noemen dat een kennislaag.

Dat is nuttig, maar niet genoeg als het doel is om echte bedrijfsoperaties te ondersteunen.

De reden is eenvoudig: bedrijfskennis bestaat niet alleen uit tekstchunks. Ze bevat entiteiten, relaties, beslissingen, contradicties, ownership en historiek. Als je enkel fragmenten op similariteit terughaalt, mis je te veel operationele context.

Daarom is de Knowledge OS opgezet als een gelaagd retrieval-systeem.

Het begint met zoeken, maar stopt daar niet.

## Van documenten naar gestructureerde kennis

De Knowledge OS behandelt documenten als ruwe input, niet als eindvorm.

Zodra content in het systeem komt, kan die geïndexeerd worden, gelinkt worden aan entiteiten, door relaties worden doorlopen, op conflicten worden gecontroleerd, naar synthese-pagina's worden gecompileerd en opnieuw worden blootgesteld via API's en tools.

Dat verandert de rol van de knowledge base volledig.

In plaats van een archief te zijn waarin je zoekt wanneer je vastzit, wordt het een substraat waarmee de rest van het systeem kan denken.

## Versiebeheer is belangrijker dan mensen denken

Een architectuurkeuze waar ik veel belang aan hecht is versiebeheer.

Kennis verandert. Bedrijfsbeslissingen evolueren. Documenten worden herschreven. Aannames verouderen.

Als een kennissysteem die veranderingen niet netjes kan volgen, wordt het moeilijk om het te vertrouwen. Daarom behandelt de Knowledge OS versiegeschiedenis als een first-class feature in plaats van als een detail achteraf.

## Multi-agent toegang vraagt gestructureerde tools

Nog een belangrijk punt: de Knowledge OS is niet alleen een UI voor mensen. Het is ook een toegangslaag voor agents.

Dat betekent dat agents gestructureerde manieren nodig hebben om te zoeken, lezen, creëren, updaten, compileren en context op te halen uit het systeem. Als die toegang ad hoc is, daalt de kwaliteit van het geheel snel.

Zo begint het systeem minder op een chatbot en meer op infrastructuur te lijken.

## Hoe de twee lagen samenwerken

De harness en de Knowledge OS lossen verschillende problemen op, maar versterken elkaar.

De harness beantwoordt de vraag:

> Hoe beweegt werk vooruit met echte kwaliteitscontrole?

De Knowledge OS beantwoordt de vraag:

> Hoe weet het systeem genoeg om dat werk in context te doen?

Met andere woorden:

| Laag | Primaire rol |
|---|---|
| Harness | Uitvoering plannen, genereren, evalueren, itereren en gaten |
| Knowledge OS | Context opslaan, structureren, ophalen, compileren en laten evolueren |

Wanneer die twee lagen verbonden zijn, krijg je iets dat veel nuttiger is dan een agent met een prompt.

Je krijgt een uitvoeringssysteem dat kan werken tegen persistente context.

## Wat ik bewust privé houd

Er is een verschil tussen architectuur uitleggen en elke interne hefboom publiceren.

Ik deel graag het brede systeemontwerp: fasescheiding, gated iteratie, quality signals, gelaagde retrieval, knowledge graphs, tool-based access en versioned memory.

Wat ik niet publiek wil dumpen, is de volledige prompt stack, elke evaluatieheuristiek, elke interne conventie of operationele details die het systeem in productie robuust maken.

Dat is geen vaagheid. Het is een redelijke grens tussen nuttige technische transparantie en onnodige blootstelling.

## Slotgedachte

Als ik de architectuur eenvoudig moet samenvatten, dan is het dit:

De harness helpt het systeem **doen**.
De Knowledge OS helpt het systeem **weten**.

Uitvoering zonder gestructureerde kennis blijft oppervlakkig.

Kennis zonder execution harness blijft passief.

Zet je ze samen, dan krijg je een veel sterkere basis om producten te bouwen, interne workflows aan te sturen en bedrijfsintelligentie op een schaalbare manier te organiseren.
