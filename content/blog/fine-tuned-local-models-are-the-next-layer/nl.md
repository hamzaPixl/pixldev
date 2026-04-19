---
slug: "fine-tuned-local-models-are-the-next-layer"
date: "2026-04-08"
icon: BrainCircuit
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Fijn-afgestelde lokale modellen zijn de volgende laag"
description: "Waarom na de harness en de Knowledge OS de volgende stap een laag gespecialiseerde, fijn-afgestelde lokale modellen is voor smalle taken, sterkere alignment en betrouwbaardere uitvoering."
category: "Engineering"
tags: ["Fine-tuning", "Lokale modellen", "Betrouwbaarheid"]
readTime: "9 min"
---

Mijn laatste twee artikels gingen eerst over systemen, en daarna over de technische stack erachter.

Het eerste punt was eenvoudig: AI wordt pas echt nuttig wanneer het deel wordt van een systeem.

Het tweede punt was dat dit systeem in mijn geval rust op twee hoofdlagen:

- een **harness** voor uitvoering
- een **Knowledge OS** voor gestructureerde context

Ik blijf geloven dat die twee lagen de basis vormen.

Maar ze zijn niet het eindpunt.

Als we willen dat deze systemen vollediger, meer geïsoleerd en makkelijker inzetbaar worden in verschillende omgevingen, dan is de volgende laag voor mij duidelijk:

> gespecialiseerde, fijn-afgestelde lokale modellen

Niet één gigantisch model voor alles.
Niet één gigantische prompt die het hele systeem moet bijeenhouden.

Ik bedoel kleinere modellen die aan smallere taken worden toegewezen, getraind zijn voor specifieke rollen, rekening houden met echte hardwarebeperkingen en als betrouwbare componenten in het uitvoeringssysteem worden geïntegreerd.

## Waarom prompting alleen uiteindelijk tegen een muur botst

Prompting is krachtig. Het is de snelste manier om te verkennen, te prototypen en snel eerste waarde te bereiken.

Maar prompting heeft grenzen.

Wanneer te veel gedrag in prompts leeft, wordt het systeem duur om te onderhouden en moeilijk om te stabiliseren. Instructies worden langer. Edge cases stapelen zich op. Het model moet nog altijd te veel afleiden bij elke run.

Dat is aanvaardbaar in het begin.

Dat is veel minder aanvaardbaar wanneer het doel herhaalbare uitvoering wordt.

Als hetzelfde soort redenering, formatting, routing, classificatie, extractie of beslissingspatroon telkens terugkomt, wil ik niet telkens de volledige promptbelasting betalen. Ik wil dat een deel van dat gedrag dichter bij het model zelf komt te liggen.

Daar begint fine-tuning belangrijk te worden.

## Fine-tuning als compressie van gedrag

Mensen spreken vaak over fine-tuning alsof het vooral gaat om een model slimmer te maken.

Dat is niet het kader dat mij het meest interesseert.

Het nuttigere kader is dit:

fine-tuning is een manier om herhaald gedrag in het model te comprimeren zodat het systeem tijdens runtime minder prompt-scaffolding nodig heeft.

In plaats van dezelfde smalle taak telkens opnieuw uit te leggen, train je het model zodat dat gedrag natuurlijker wordt.

Dat vermindert:

- promptlengte
- orchestratie-overhead
- latency in smalle workflows
- variabiliteit bij repetitieve taken

En in veel gevallen verbetert dat de betrouwbaarheid meer dan gewoon nog meer promptinstructies toevoegen.

## Waarom kleinere modellen tellen

Ik denk niet dat de toekomst van operationele AI-systemen één centraal frontier-model is dat elke taak uitvoert.

Het serieuzere beeld lijkt meer op een gedistribueerde architectuur:

- frontier-modellen voor breed redeneren en moeilijke synthese
- gestructureerde systemen voor geheugen, retrieval en gating
- kleinere fijn-afgestelde modellen voor smalle en repetitieve taken

Die laatste categorie is bijzonder belangrijk.

Een kleiner model met een goed afgebakende rol kan enorm nuttig zijn wanneer zijn verantwoordelijkheid helder is. Het hoeft niet universeel briljant te zijn. Het moet betrouwbaar zijn binnen een begrensde taak.

Bijvoorbeeld:

- een model gespecialiseerd in classificatie
- een model gespecialiseerd in extractie van gestructureerde data
- een model gespecialiseerd in stijlhandhaving
- een model gespecialiseerd in tool routing
- een model gespecialiseerd in domeinspecifieke validatie

Dat is een veel serieuzere weg naar betrouwbaarheid dan één algemeen model vragen om elke laag van de stack te improviseren.

## Redeneren moet centraal blijven

Dat betekent niet dat ik redeneren wil vervangen door fragiele automatisering.

Integendeel.

Ik denk dat redeneren waardevoller wordt wanneer de rest van het systeem properder is.

De harness blijft beslissingen, gating, iteratie, escalatie en uitvoeringsflow beheren.
De Knowledge OS blijft geheugen, context, structuur en retrieval beheren.
Maar gespecialiseerde modellen kunnen nu smallere taken opnemen binnen die grotere lus.

Dat betekent dat het hogere systeem redeneren kan inzetten waar het echt nodig is, in plaats van dure algemene intelligentie te verspillen aan taken met lage entropie die al gestabiliseerd hadden moeten zijn.

De verschuiving is dus niet van redeneren naar training.

Ze gaat van alles prompten naar redeneren waar nodig en trainen waar herhaling al bestaat.

## Betrouwbaarheid komt uit alignment met echt werk

Wanneer mensen het woord alignment horen, springen ze vaak meteen naar abstracte veiligheidsdiscussies.

Dat is niet wat ik hier bedoel.

Ik bedoel operationele alignment.

Gedraagt het model zich op een manier die echt overeenkomt met de taak, het domein, de regels en de hardware-omgeving waarin het draait?

Voor productiesystemen is dat belangrijker dan elegante demo's.

Een smal lokaal model dat op de juiste voorbeelden is getraind, op de juiste failure modes is geëvalueerd en door de juiste harness wordt begrensd, kan veel waardevoller zijn dan een groter model dat enkel losjes via prompts wordt gestuurd.

Betrouwbaarheid is geen magie. Het is ontworpen alignment tussen:

- de taak
- de trainingsdata
- de evaluatielus
- de uitvoeringsomgeving

## Zelfverbetering heeft een systeem nodig, geen mythe

Ik denk wel degelijk dat zelfverbetering de volgende deur is.

Maar ik bedoel niet een vage fantasie waarin een model zichzelf eindeloos in het donker herschrijft.

Ik bedoel een gestructureerd proces waarin het systeem leert van uitvoering:

- wat faalde
- wat zich herhaalde
- wat te veel prompting vereiste
- welke patronen stabiel genoeg werden om te encoderen

Van daaruit kun je beslissen wat in prompts moet blijven, wat naar regels moet verhuizen, wat trainingsdata moet worden en wat aan een kleiner gespecialiseerd model moet worden toegewezen.

Dat is een veel gegrondere vorm van zelfverbetering.

Het systeem wordt niet beter omdat het in abstracte zin "reflecteert".

Het wordt beter omdat uitvoering bewijs oplevert, en dat bewijs wordt omgezet in betere modellen, betere routes en betere beperkingen.

## Hardware maakt deel uit van het ontwerp

Nog een reden waarom ik om kleine lokale modellen geef, is simpel: hardware is echt.

Als een systeem in verschillende omgevingen inzetbaar moet zijn, dan zijn compute, geheugen, latency, privacy en kost architectuurkeuzes, geen bijzaken.

Een compleet AI-systeem zou de juiste taak aan de juiste laag moeten kunnen toewijzen:

- sommige taken verdienen redenering door grote modellen
- sommige taken moeten lokaal blijven voor snelheid of privacy
- sommige taken moeten op gespecialiseerde kleine modellen draaien omdat dat de efficiëntste optie is

Dat is een van de belangrijkste redenen waarom ik fijn-afgestelde lokale modellen zie als onderdeel van een serieuze operating architecture, niet als een optimalisatietrick.

Ze maken het systeem draagbaarder, beter controleerbaar en in veel gevallen economisch haalbaarder.

## Hoe de volledige stack eruit begint te zien

Op hoog niveau wordt de architectuur eenvoudiger te beschrijven:

| Laag | Rol |
|---|---|
| Harness | Uitvoering, iteratie, evaluatie en gating orkestreren |
| Knowledge OS | Gestructureerd geheugen, retrieval en evoluerende context leveren |
| Fijn-afgestelde lokale modellen | Smalle, repetitieve en domeingevormde taken betrouwbaar uitvoeren |
| Frontier-redeneermodellen | Brede synthese, ambiguïteit en complex oordeel behandelen |

Dat staat veel dichter bij een compleet systeem dan "één model plus één prompt".

Het staat ook veel dichter bij iets dat geïsoleerd, gedeployed en aangepast kan worden aan verschillende systemen en hardware-opstellingen.

## Slotgedachte

Als de harness het systeem helpt **doen**, en de Knowledge OS het systeem helpt **weten**, dan helpen fijn-afgestelde lokale modellen het systeem **stabiliseren**.

Ze verminderen promptafhankelijkheid.
Ze zetten herhaald gedrag om in herbruikbare capaciteit.
Ze bouwen een betere brug tussen uitvoering, redenering, hardware en alignment.

Voor mij is dat de volgende serieuze stap.

Niet meer prompting.

Maar betere specialisatie, betere training en beter systeemontwerp rond de plaatsen waar redeneren echt thuishoort.
