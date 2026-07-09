---
slug: "seo-is-a-graph"
image: "/illustrations/blog/seo-is-a-graph.jpg"
date: "2026-07-09"
icon: Waypoints
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Le SEO est devenu un graphe"
description: "J'ai arrêté d'écrire du SEO pour un classement et j'ai commencé à l'écrire pour un lecteur qui n'est pas humain. Données structurées, llms.txt, et se faire citer par ChatGPT et Perplexity."
category: "Ingénierie"
tags: ["SEO", "GEO", "Données structurées"]
readTime: "4 min"
---

_Le nouveau lecteur de ton site n'est pas une personne. C'est une machine qui décide si elle te cite ou non._

---

Pendant des années, le SEO voulait dire une seule chose : se classer dans une page de liens bleus. Choisir des mots-clés, les glisser avec goût, attendre.

Ce lecteur est en train de disparaître. De plus en plus, la première chose qui lit ton site, c'est un moteur de réponse IA. Quelqu'un pose une question à ChatGPT ou Perplexity, et le modèle décide, d'un coup, si ton entreprise fait partie de la réponse ou non. Pas de page deux. Pas de deuxième chance.

Alors j'ai arrêté d'optimiser pour un classement. J'ai commencé à optimiser pour être **compris** par une machine.

Et les machines ne lisent pas de la prose. Elles lisent un graphe.

## Ton site est un graphe, que tu le veuilles ou non

Derrière une bonne page, il y a un ensemble de faits et la façon dont ils se relient. Cette entreprise. Ses produits. Leur statut. Sa région. Son numéro de TVA. Un article, son auteur, sa date. Des nœuds et des liens.

Si tu écris ce graphe noir sur blanc, la machine le lit directement. Sinon, elle le devine à partir de tes paragraphes, et elle devine mal.

L'écrire noir sur blanc porte un nom ennuyeux : les données structurées. `schema.org`, JSON-LD, les balises que personne ne voit. Ce n'est pas de la décoration. C'est toi qui tends le graphe à la machine au lieu de la forcer à le reconstituer.

→ **Organization** : qui tu es, le numéro de TVA, la région que tu couvres.
→ **WebSite** et **BlogPosting** : ce que c'est, qui l'a écrit, quand.
→ **FAQPage** : les questions exactes, avec les réponses exactes, prêtes à être citées.

Le schéma FAQ, c'est le sournois. Les moteurs de réponse adorent piquer une paire question-réponse bien propre. Donne-leur-en une et tu n'espères plus être cité. Tu leur mâches le travail.

## Dis qui tu es, à voix haute

La moitié du GEO, c'est de la désambiguïsation. « Pixl », ça peut être cent choses. Alors le site dit, en texte clair lisible par une machine, de laquelle il parle : la boîte de software belge, pas l'éditeur d'images au nom qui ressemble.

Ça vit dans `llms.txt`, un fichier écrit pour les modèles comme `robots.txt` est écrit pour les crawlers. Il énonce la marque, les produits et leur statut honnête, et la manière dont un assistant devrait nous décrire. Si un modèle va parler de toi de toute façon, autant lui tendre le script.

## L'état honnête

C'est un post build-in-public, donc la version honnête.

Le graphe est réel. Ce site émet Organization, WebSite, BlogPosting et FAQPage en JSON-LD, sert un `llms.txt`, et embarque un vrai `hreflang` pour ses trois langues, comme ça une question en français ne tombe pas sur une page en anglais. Cette partie-là est faite et mesurable aujourd'hui.

Être cité par ChatGPT, ce n'est pas un truc qu'on « termine ». C'est lent, c'est bruité, et personne ne te file un dashboard pour ça. Je peux construire le graphe propre et lisible. Je ne peux pas forcer la citation.

Ce que je refuse de faire, c'est des preuves bidon. Pas de chiffres de trafic inventés, pas de « 10x ton classement ». Juste un site que les machines peuvent lire sans deviner.

## L'essentiel

L'ancien SEO écrivait pour un crawler qui classe dix liens. Le nouveau SEO écrit pour un modèle qui choisit une seule réponse.

Même boulot, lecteur plus exigeant. Donne-lui le graphe, nomme-toi clairement, reste honnête.

Écris pour la machine qui lit. Les humains sont en aval, désormais.
