---
slug: "seo-is-a-graph"
image: "/illustrations/blog/seo-is-a-graph.jpg"
date: "2026-07-09"
icon: Waypoints
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "SEO is nu een graph"
description: "Ik stopte met SEO schrijven voor een ranking en begon het te schrijven voor een lezer die geen mens is. Gestructureerde data, llms.txt, en geciteerd worden door ChatGPT en Perplexity."
category: "Engineering"
tags: ["SEO", "GEO", "Gestructureerde data"]
readTime: "4 min"
---

_De nieuwe lezer van je website is geen mens. Het is een machine die beslist of ze je citeert._

---

Jarenlang betekende SEO één ding: scoren op een pagina met blauwe links. Kies keywords, verwerk ze met smaak, wacht af.

Die lezer wordt vervangen. Steeds vaker is het eerste wat je site leest een AI-antwoordmachine. Iemand stelt ChatGPT of Perplexity een vraag, en het model beslist, in één keer, of je bedrijf deel uitmaakt van het antwoord of niet. Geen pagina twee. Geen tweede kans.

Dus ik stopte met optimaliseren voor een ranking. Ik begon te optimaliseren om **begrepen** te worden door een machine.

En machines lezen geen proza. Ze lezen een graph.

## Je site is een graph, of je het nu zegt of niet

Achter een goede pagina zit een set feiten en hoe ze samenhangen. Dit bedrijf. Zijn producten. Hun status. Zijn regio. Zijn btw-nummer. Een post, zijn auteur, zijn datum. Knopen en verbindingen.

Als je die graph uitschrijft, leest de machine hem rechtstreeks. Zo niet, dan gokt ze op basis van je paragrafen, en ze gokt verkeerd.

Het uitschrijven heeft een saaie naam: gestructureerde data. `schema.org`, JSON-LD, de tags die niemand ziet. Het is geen decoratie. Het is jij die de graph aan de machine geeft in plaats van haar er een te laten reverse-engineeren.

→ **Organization**: wie je bent, het btw-nummer, de regio die je bedient.
→ **WebSite** en **BlogPosting**: wat dit is, wie het schreef, wanneer.
→ **FAQPage**: de exacte vragen, met de exacte antwoorden, klaar om te citeren.

Het FAQ-schema is de sluwe. Antwoordmachines zijn dol op het jatten van een net vraag-en-antwoordpaar. Geef ze er een en je hoopt niet langer op een citaat. Je maakt het ze gemakkelijk.

## Zeg wie je bent, hardop

De helft van GEO is desambiguatie. "Pixl" kan honderd dingen zijn. Dus zegt de site, in duidelijke machineleesbare tekst, welke het bedoelt: het Belgische softwarebedrijf, niet de fotobewerker met een gelijkaardige naam.

Dat leeft in `llms.txt`, een bestand geschreven voor modellen zoals `robots.txt` geschreven is voor crawlers. Het benoemt het merk, de producten en hun eerlijke status, en hoe een assistent ons zou moeten beschrijven. Als een model toch over je gaat praten, kun je het net zo goed het script aanreiken.

## De eerlijke stand van zaken

Dit is een build-in-public post, dus de eerlijke versie.

De graph is echt. Deze site zendt Organization, WebSite, BlogPosting en FAQPage uit als JSON-LD, serveert een `llms.txt`, en levert correcte `hreflang` voor zijn drie talen, zodat een Franse vraag geen Engelse pagina krijgt. Dat deel is af en vandaag meetbaar.

Geciteerd worden door ChatGPT is niet iets dat je "afrondt." Het is traag, het is rommelig, en niemand overhandigt je er een dashboard voor. Ik kan de graph proper en leesbaar bouwen. Ik kan het citaat niet afdwingen.

Wat ik weiger te doen is nepbewijs. Geen verzonnen bezoekcijfers, geen "10x je ranking." Alleen een site die machines kunnen lezen zonder te gokken.

## De kern

Oude SEO schreef voor een crawler die tien links rangschikt. Nieuwe SEO schrijft voor een model dat één antwoord kiest.

Zelfde werk, veeleisender lezer. Geef hem de graph, benoem jezelf duidelijk, hou het eerlijk.

Schrijf voor de machine die leest. De mensen komen er nu ná.
