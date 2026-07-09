---
slug: "the-company-is-an-api-call"
date: "2026-07-09"
icon: Factory
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Het bedrijf is een API-call"
description: "Wat ik echt aan het bouwen ben is geen verzameling tools. Het is een bedrijvenfabriek: een platform waar het aanmaken van een bedrijf identiteit, context, geheugen, een AI-budget en een set smalle AI-services provisioneert — en waar het bedrijf daarna grotendeels door agents wordt uitgebaat."
category: "Visie"
tags: ["AI-native bedrijf", "Agents", "Platform"]
readTime: "6 min"
---

_Wat ik bouw is geen verzameling tools. Het is een bedrijvenfabriek. De demo waar ik naartoe werk is één commando: maak een bedrijf aan, en agents produceren het merk, de website, de SEO-audit en de eerste campagne — met elke euro verantwoord._

---

## De reframe

Twee jaar lang bouw ik al producten: een facturatieplatform voor Belgische kmo's, een compliance-monitor, een API voor Belgische bedrijfsdata, een AI-contentstudio, een knowledge engine. Elk nuttig. Elk grotendeels from scratch gebouwd. Elk implementeert dezelfde vijf dingen opnieuw.

Ergens rond de vierde herimplementatie van "brand identity" ben ik gestopt en heb ik het patroon een naam gegeven.

Wat ik bouw is geen verzameling tools. Het is een **bedrijvenfabriek** — een platform waar "een bedrijf aanmaken" een API-call is die identiteit, context, geheugen, een AI-budget en een set smalle AI-services provisioneert, en waar het bedrijf daarna grotendeels door agents wordt *uitgebaat*.

Elk digitaal bedrijf heeft dezelfde vijf dingen nodig:

1. **Identiteit** — wie bestaat: het bedrijf, zijn workspaces, zijn mensen, zijn agents, hun keys.
2. **Context** — wat het bedrijf *is*: merk, tone of voice, aanbod, beperkingen. Gecureerd, klein, geversioneerd.
3. **Geheugen** — wat het bedrijf *weet*: geschiedenis, documenten, beslissingen. Geaccumuleerd, groot, opgehaald.
4. **Intelligentie** — modeltoegang met budgetten, routing en een echte ledger.
5. **Capabilities** — smalle services die echt werk doen: een site genereren, SEO auditen, content produceren, een bedrijf opzoeken, een factuur versturen.

De producten die mensen zien — Feen, Syncco, de volgende venture — worden dunne, gebrande oppervlakken bovenop die services. Groeien betekent niet langer "de fundamenten opnieuw bouwen". Groei = bedrijven en services toevoegen.

---

## De agent is een werknemer

De meest AI-native beslissing in dit model is geen modelkeuze. Het is een keuze in het organogram.

Agents zijn first-class actoren, geen anonieme automatisering. Een agent heeft een identity row zoals een mens die heeft. Hij houdt credentials bij. Hij heeft een budget. Hij roept dezelfde services aan via dezelfde contracten. Hij laat een auditeerbaar spoor achter.

Het organogram van het volgende bedrijf is letterlijk rijen in een database.

Dat klinkt filosofisch tot je kijkt naar wat het oplost. Vandaag, wanneer een AI-feature draait, is de vraag "welke agent gaf €4 uit aan wiens campagne?" in de meeste stacks onbeantwoordbaar — de API-key wordt gedeeld, de kost zit in een providerdashboard, de actie wordt niet geattribueerd. In het fabrieksmodel is die vraag één query op één correlation id.

En budgetten zijn niet langer een spreadsheet-angst. De agent *raakt door zijn geld heen zoals een werknemer*, in plaats van om 3 uur 's nachts stilletjes de API-account op te branden. Is het budget op, dan weigert de gateway de call. Payroll voor software.

---

## Capability-first, UI-on-demand

De tweede doctrine: **reduceer UI, versterk capabilities.** De agent is de primaire gebruiker; schermen bestaan voor vertrouwen en intake, niet om te werken.

Elke service stelt zijn capabilities op dezelfde manier beschikbaar — zelfde envelope, zelfde auth, zelfde health check, zelfde error catalog — over HTTP voor producten, over MCP voor agents. Eén capability, één keer gedefinieerd als een schema plus een handler, identiek aanroepbaar door een webapp, een terminal of een agent loop.

Ik heb dit patroon niet op een whiteboard ontworpen. Ik vond het in mijn eigen vloot. Bumpi, mijn contentstudio, werd gebouwd met een capability registry die elke capability automatisch beschikbaar stelt over HTTP, MCP en een agent loop — en dat bleek de referentie-implementatie van het hele platform te zijn nog voor het platform een naam had. Elk dragend patroon in de visie draait vandaag al ergens in productie. Ik ben aan het generaliseren, niet aan het uitvinden.

De succesmetriek is bot: **het percentage features dat agent-aanroepbaar is.** Vandaag ligt dat cijfer over mijn hele vloot rond de 20%. Het doel is dat 100% zeggen saai wordt.

---

## De eerlijke stand van zaken

Dit is een visiepost, dus hier is exact hoeveel ervan bestaat op 2026-07-09:

- **De services bestaan. De laag niet.** Ik heb gegrept: nul cross-service calls in productie. Brand is vier keer geherimplementeerd. Identiteit vier keer. De twee pijnen die het platform motiveren zijn gemeten feiten, geen theorie.
- **De LLM-gateway — de spil — bestaat amper.** De enige echte gateway-code zit in een gearchiveerd project, als library, met `cost_usd=0.0` hardcoded. Mijn budgetsysteem gelooft momenteel dat alles gratis is.
- **De beste engine wordt onderbenut.** Mijn knowledge service is het sterkste stuk van de vloot en er is bijna niets dat hem al consumeert.
- **Twee producten bewijzen het model manueel.** Feen en Syncco werken — maar mensen hebben ze bedraad, service per service.

Het plan voor het kwartaal is strikt serieel, elk hoofdstuk gegated door een demo: een standaard service kit die "een capability" in één namiddag omzet in "een gedeployde, key-gated, agent-aanroepbare service"; dan identiteit en context als control plane; dan de bestaande services opnieuw in de mal gieten; dan de gateway met een echte ledger.

De finale gate is de founding demo: `nuva co create testco` — en agents produceren het merk, de site, de SEO-audit en de eerste campagne, end-to-end, met nul cross-workspace leaks en een kost per artefact die afleesbaar is uit de ledger.

---

## Het punt

Feen en Syncco bewijzen het model manueel. Het volgende bedrijf wordt vanaf dag één op het platform geboren.

Dat is de hele visie. Geen grotere modellen, geen extra prompts — een fabriek waar identiteit, context, geheugen, intelligentie en capabilities geprovisioneerd worden zoals infrastructuur, en waar de eerste werknemers agents zijn met badges en budgetten.

Het bedrijf is een API-call. De rest is operations.
