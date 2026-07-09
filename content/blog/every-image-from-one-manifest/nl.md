---
slug: "every-image-from-one-manifest"
image: "/illustrations/blog/every-image-from-one-manifest.jpg"
date: "2026-07-09"
icon: Aperture
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Elk beeld op deze site komt uit één bestand"
description: "Hoe elke illustratie hier — blogheroes, productpanelen, OG-kaarten — gegenereerd wordt uit één manifest, en de eerlijke fout die ik bij de eerste poging maakte."
category: "Engineering"
tags: ["Build in Public", "Design Systems", "Beeldgeneratie"]
readTime: "6 min"
---

Elke website verraadt zichzelf met haar beelden. Ze leunt op stockfoto's die iedereen al gezien heeft, of ze grijpt naar het reflex van het moment: een glanzende gradient-blob, een "AI-brein", een printplaat. Je scrolt eraan voorbij zonder iets te onthouden.

Ik wilde het omgekeerde. Elk beeld op deze site — de hero achter elk artikel, het paneel op elke productpagina, de kaart die verschijnt wanneer iemand een link deelt — moest aanvoelen alsof het uit dezelfde studio kwam, in één huisstijl, in het Pixl-groen. En ik wilde ze allemaal kunnen wijzigen door tekst aan te passen, niet door een designtool te openen.

Dus de beelden hier zijn niet gekozen. Ze worden gegenereerd, uit één bestand.

---

## Het manifest is de bron van waarheid

Er is één bestand, `illustrations/manifest.mjs`. Het bevat één spec per beeld, en niets anders:

```js
{
  id: "the-baton-pattern",
  kind: "blog",          // blog | product
  accent: "#30CB77",     // de enige lichtkleur
  aspect: "16:9",
  archetype: "hands+object",
  concept:
    "Extreme close-up of two hands at the moment of a relay handoff, " +
    "passing a small glowing green baton-token between them.",
  tags: ["hands", "relay", "handoff", "token", "green"],
}
```

Boven de specs staat één gedeelde `STYLE_BASE`: de huisstijl die aan elke prompt wordt toegevoegd. Bijna-zwarte achtergrond, één accentlicht met zachte bloom en bewegingsonscherpte, filmkorrel, een vaag pixelraster, fotografisch licht. Het `concept` verandert per beeld. De signatuur nooit.

Dat is de hele truc. Het **onderwerp** varieert zodat de set variatie heeft; de **behandeling** blijft constant zodat het als één merk leest.

---

## De pipeline is één call

Een klein script, `generate.mjs`, doorloopt het manifest en stuurt elke prompt naar [OpenRouter](https://openrouter.ai) met de beeldmodaliteit aan:

```js
const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({
    model: "google/gemini-3-pro-image",
    modalities: ["image", "text"],
    messages: [{ role: "user", content: buildPrompt(spec) }],
  }),
});
const url = data.choices[0].message.images[0].image_url.url; // data: URI
```

Het beeld komt terug als een base64 data-URI. Het script decodeert het en schrijft `public/illustrations/<kind>/<id>.jpg`. Een terugvalmodel springt in als het hoofdmodel geen beeld teruggeeft. Dat is de hele generator: lees een spec, vraag een beeld, sla het op.

Eén commando genereert alles opnieuw: `node illustrations/generate.mjs`. Voeg ids toe om er maar een paar te doen. Zet `FORCE=1` om wat al bestaat opnieuw te maken.

---

## De fout bij de eerste poging

Hier komt het eerlijke deel, want dit is een build-in-public blog en de eerste versie was fout.

Mijn eerste `STYLE_BASE` eindigde met een lange lijst verboden: *abstract en conceptueel, geen mensen, geen letterlijke robots, geen breinen, geen printplaat-clichés.* Ik was zo bezig met het vermijden van de AI-slop-standaarden dat ik meteen elk herkenbaar onderwerp mee verbood.

Het resultaat: zestien beelden die technisch on-brand en volledig inwisselbaar waren. Groene lichtsporen. Groene geometrische modules. Groene knopen op een raster. Elk artikel leek op dezelfde screensaver. On-brand, en vergeetbaar.

De les landde toen ik keek naar wat mensen in 2026 echt doet stoppen. De referentiebeelden die ik bewonder, en de trendrapporten bevestigen het, wijzen allemaal dezelfde kant op: weg van AI-gepolijste abstractie, richting **mensgerichte, redactionele, herkenbare** onderwerpen. Een gezicht. Een paar handen. Een object dat je kent. Mijn volledig abstracte set was precies de gehomogeniseerde look die mensen geleerd hebben te negeren.

---

## De oplossing: één archetype per artikel

Ik schrapte het "abstract only"-verbod en herbouwde de richting rond een kleine set **archetypes**. Elk artikel kiest degene die bij zijn idee past, en toont daarin een echt, herkenbaar onderwerp, altijd onder de Pixl-signatuur.

| Artikel | Archetype | Onderwerp |
|---|---|---|
| Ik ben drie keer van gedachten veranderd | portret | één gezicht in drie bewegingsonscherpe belichtingen |
| Mijn WhatsApp-groep simuleren | portretten | vijf profielen midden in een gesprek |
| Het bedrijf is een API-call | hand + object | een vinger op één toets, een fabriek licht op |
| Het Baton Pattern | handen + object | twee handen die een lichtgevend stokje doorgeven |
| Een praktische kaart van het decennium | landschap | bergkammen van groen licht, telkens feller |
| Robotica… | object | een robothand die een echt oppervlak raakt |
| AI gaat over systemen | architectuur | één kleine kern in een enorme machinekamer |

Zelfde bestand. Zelfde pipeline. Ik veranderde alleen de woorden in het veld `concept`, hief het verbod op, en draaide het commando opnieuw. Zestien vergeetbare blobs werden zestien beelden die je echt aan iemand kunt beschrijven.

---

## Het bedraden, één keer

Het beeld genereren is de helft van het werk. De andere helft is het overal laten verschijnen zonder handwerk.

Voor een artikel voeg ik één regel toe aan de front matter:

```yaml
image: "/illustrations/blog/every-image-from-one-manifest.jpg"
```

Dat ene pad vult de kaart in de index, de hero bovenaan het artikel, het paneel op de deelbare OG-kaart, en het `image`-veld in de gestructureerde data van het artikel. Voor producten wast hetzelfde pad de header op de productpagina en zit het in het bento-raster op de homepage. Schrijf het pad één keer, en elk oppervlak pikt het op.

De laatste stap is gewicht. Het model geeft bestanden terug van ongeveer 1,4 MB. Niets op de site wordt breder dan ongeveer 800 pixels getoond, dus een tweede script schaalt terug naar 1600 px en hercomprimeert. De beelden zakken naar zo'n 120–240 KB zonder zichtbaar verlies.

---

## Waarom de moeite

Omdat het alternatief is: stock kopen, of veertig beelden met de hand maken en ze opnieuw maken de dag dat het merkgroen verschuift. Met een manifest is het visuele systeem tekst. Het is diffbaar, reviewbaar, hergenereerbaar. Een nieuw artikel vraagt één spec en één commando. Een paletwijziging is een zoek-en-vervang.

Het beeld bovenaan dit artikel kwam uit hetzelfde bestand als al de rest hier. Dat is het hele punt: de beelden zijn niet het product. Het systeem dat ze maakt, wel.
