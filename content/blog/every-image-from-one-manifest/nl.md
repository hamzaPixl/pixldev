---
slug: "every-image-from-one-manifest"
image: "/illustrations/blog/every-image-from-one-manifest.jpg"
date: "2026-07-09"
icon: Aperture
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Elk beeld op deze site komt uit één bestand"
description: "Elke illustratie hier wordt gegenereerd uit één manifest. De spec, de pipeline, en de eerlijke fout van de eerste poging."
category: "Engineering"
tags: ["Build in Public", "Design Systems", "Beeldgeneratie"]
readTime: "3 min"
---

_Elk beeld op deze site wordt gegenereerd uit één bestand. Hier zijn het manifest, de pipeline, en de fout van de eerste poging._

---

Elke website verraadt zichzelf met haar beelden. Stock die iedereen al gezien heeft, of het reflex van het moment: een glanzende gradient-blob, een "AI-brein", een printplaat. Je scrolt eraan voorbij zonder iets te onthouden.

Ik wilde het omgekeerde. Elk beeld hier moest aanvoelen alsof het uit dezelfde studio kwam, in één huisstijl, in het Pixl-groen. En ik wilde ze allemaal kunnen wijzigen door tekst aan te passen, niet door een designtool te openen.

Dus de beelden hier zijn niet gekozen. Ze worden gegenereerd, uit één bestand.

## Eén bestand, één signatuur

`illustrations/manifest.mjs`. Eén spec per beeld, niets anders:

```js
{
  id: "the-baton-pattern",
  kind: "blog",          // blog | product
  accent: "#30CB77",     // the one light colour
  aspect: "16:9",
  archetype: "hands+object",
  concept:
    "Extreme close-up of two hands at the moment of a relay handoff, " +
    "passing a small glowing green baton-token between them.",
  tags: ["hands", "relay", "handoff", "token", "green"],
}
```

Boven de specs staat één gedeelde `STYLE_BASE`, toegevoegd aan elke prompt: bijna-zwarte achtergrond, één accentlicht met zachte bloom, filmkorrel, een vaag pixelraster. Het `concept` verandert per beeld. De signatuur nooit.

Dat is de hele truc. Het **onderwerp** varieert zodat de set variatie heeft. De behandeling blijft constant zodat het als één merk leest.

## De pipeline is één call

`generate.mjs` doorloopt het manifest en stuurt elke prompt naar [OpenRouter](https://openrouter.ai) met de beeldmodaliteit aan:

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

Het beeld komt terug als een base64 data-URI. Het script decodeert het en schrijft `public/illustrations/<kind>/<id>.jpg`. Een terugvalmodel springt in als het hoofdmodel niets teruggeeft. Lees een spec, vraag een beeld, sla het op.

Eén commando **genereert** alles opnieuw: `node illustrations/generate.mjs`.

## De fout

Het eerlijke deel, want dit is een build-in-public blog en de eerste versie was fout.

Mijn eerste `STYLE_BASE` eindigde met een muur van verboden: alleen abstract, geen mensen, geen robots, geen breinen, geen printplaat-clichés. Ik was zo bezig met het ontwijken van de AI-slop-standaarden dat ik meteen elk herkenbaar onderwerp mee **verbood**.

Het resultaat: zestien beelden die allemaal on-brand en volledig inwisselbaar waren. Groene lichtsporen. Groene geometrische modules. Groene knopen op een raster. Elk artikel leek op dezelfde screensaver. On-brand, en vergeetbaar.

De les landde toen ik keek naar wat mensen in 2026 echt doet stoppen. Niet AI-gepolijste abstractie. Mensgerichte, redactionele, herkenbare onderwerpen. Een gezicht. Een paar handen. Een object dat je kent. Mijn volledig abstracte set was precies de gehomogeniseerde look die mensen geleerd hebben voorbij te scrollen.

Dus ik schrapte het verbod en gaf elk artikel één archetype: een portret, een paar handen, een object, een kamer. Een echt onderwerp, onder dezelfde signatuur. Zelfde bestand, zelfde pipeline. Ik veranderde de woorden in het veld `concept` en draaide het commando opnieuw. Zestien vergeetbare blobs werden zestien beelden die je aan iemand kunt beschrijven.

## Waarom de moeite

Het alternatief is stock kopen, of veertig beelden met de hand maken en ze opnieuw maken de dag dat het merkgroen verschuift.

Met een manifest is het visuele systeem **tekst**. Diffbaar, reviewbaar, hergenereerbaar. Een nieuw artikel vraagt één spec en één regel in zijn front matter: `image: "/illustrations/blog/…jpg"`. Dat pad vult de indexkaart, de hero, de OG-kaart en de gestructureerde data. Een paletwijziging is een zoek-en-vervang.

Het beeld bovenaan dit artikel kwam uit hetzelfde bestand als al de rest hier. Wat betekent dat de dag dat ik het Pixl-groen beu ben, ik alles in één keer kan verpesten.

Dat is het punt. De beelden zijn niet het product. Het systeem dat ze maakt, wel.
