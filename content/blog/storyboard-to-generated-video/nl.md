---
slug: "storyboard-to-generated-video"
image: "/illustrations/blog/storyboard-to-generated-video.jpg"
date: "2026-07-09"
icon: Clapperboard
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Een video is eerst een storyboard"
description: "Hoe ik een merkvideo genereer: schrijf de shotlist, genereer elke shot in één huisstijl, en breng het tot leven. Hetzelfde systeem als bij de beelden. Met een voorbeeld."
category: "Engineering"
tags: ["Video", "Generatieve AI", "Build in Public"]
readTime: "4 min"
---

_Een video van 30 seconden is geen 30 seconden beeldmateriaal. Het zijn zo'n zes beslissingen, op volgorde._

---

Iedereen wil een video "genereren". Dus typ je een alinea in een model, krijg je vijf seconden mooi gezweef, en vraag je je af waarom het niet aanvoelt als een reclame.

Want het moeilijke aan een video waren nooit de pixels. Het is de **shotlist**. Wat er gebeurt, in welke volgorde, en waarom.

Dus ik doe hetzelfde als bij de beelden: ik schrijf eerst het systeem, en genereer er dan tegenaan.

## Schrijf het storyboard, niet de prompt

Eén regel per shot. Intentie en kadrering, meer niet.

→ Shot 1: het commando. Een vinger drukt op één toets.
→ Shot 2: de horizon vlamt op. Het merkmotief.
→ Shot 3: het bedrijf vormt zich uit licht.
→ Shot 4: het systeem, één groene kern in een donkere kamer.
→ Shot 5: het logo verschijnt uit de pixels.

Dat is de hele film, voordat er ook maar één frame bestaat. Vijf beslissingen waarover ik kan discussiëren, die ik kan herschikken of weggooien voor de prijs van een tekstbestand bewerken.

## Genereer elke shot in één huisstijl

Elke shot is een spec, precies zoals mijn beeldmanifest: een concept plus de gedeelde Pixl-signatuur. Bijna zwart, één groen licht, filmkorrel. Ik genereer het stilstaande beeld, en dat is de **keyframe** voor die shot. Omdat elke shot dezelfde signatuur erft, lezen de vijf frames als stills uit één film in plaats van vijf willekeurige clips.

Daarna gaat de keyframe in een image-to-video-model, dat er beweging aan geeft. Vervolgens monteer ik de shots aan elkaar met geluid.

## Regisseren, niet prompten

Dit is het deel dat mensen overslaan. Een videomodel, aan zichzelf overgelaten, dwaalt af: gezichten smelten, tekst wordt soep, de camera loopt weg om iets te filmen wat je niet had gevraagd.

Het storyboard is de leiband. Elke shot is zo krap afgebakend dat er weinig ruimte is om af te dwalen. Ik regisseer keyframes, ik wens niet naar een alinea.

## De eerlijke stand van zaken

Eén goede clip is nu makkelijk. Een samenhangende 30 seconden, met continuïteit tussen de shots, consistente branding en audio die precies op de snit valt, blijft echt werk. De stilstaande beelden zijn betrouwbaar. De beweging is het deel dat nog een mens nodig heeft die "nee, opnieuw" zegt.

Geen nep-demo hier. Wat hieronder staat, is wat het systeem echt heeft geproduceerd.

## Het voorbeeld

Hier is een Pixl-storyboard van vijf shots, precies zo gebouwd: één regel per shot, elke frame gegenereerd in de huisstijl. Ik draaide ook de motion-pass. Die is nog niet goed genoeg om te tonen, dus je krijgt het storyboard, geen slechte clip.

Het storyboard is de video. De rest is rendering.
