---
slug: "every-image-from-one-manifest"
image: "/illustrations/blog/every-image-from-one-manifest.jpg"
date: "2026-07-09"
icon: Aperture
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Chaque image du site vient d'un seul fichier"
description: "Comment chaque illustration ici — heros de blog, panels produits, cartes OG — est générée depuis un seul manifest, et l'erreur honnête que j'ai faite au premier essai."
category: "Engineering"
tags: ["Build in Public", "Design Systems", "Génération d'images"]
readTime: "6 min"
---

Chaque site web se trahit par ses images. Soit il s'appuie sur des photos de stock que tout le monde a déjà vues, soit il cède au réflexe du moment : une bulle en dégradé lumineux, un « cerveau IA », un circuit imprimé. On scrolle sans rien retenir.

Je voulais l'inverse. Chaque image de ce site — le hero derrière chaque article, le panel de chaque page produit, la carte qui apparaît quand on partage un lien — devait avoir l'air de sortir du même studio, dans un seul style maison, dans le vert Pixl. Et je voulais pouvoir toutes les changer en éditant du texte, pas en ouvrant un outil de design.

Alors les images ici ne sont pas choisies. Elles sont générées, depuis un seul fichier.

---

## Le manifest est la source de vérité

Il existe un seul fichier, `illustrations/manifest.mjs`. Il contient une spec par image, et rien d'autre :

```js
{
  id: "the-baton-pattern",
  kind: "blog",          // blog | product
  accent: "#30CB77",     // l'unique couleur de lumière
  aspect: "16:9",
  archetype: "hands+object",
  concept:
    "Extreme close-up of two hands at the moment of a relay handoff, " +
    "passing a small glowing green baton-token between them.",
  tags: ["hands", "relay", "handoff", "token", "green"],
}
```

Au-dessus des specs, un `STYLE_BASE` partagé : le style maison ajouté à chaque prompt. Fond quasi-noir, une seule lumière d'accent avec bloom doux et flou de mouvement, grain de film, une fine grille de pixels, lumière photographique. Le `concept` change pour chaque image. La signature, jamais.

C'est toute l'astuce. Le **sujet** varie pour que le set ait de la variété ; le **traitement** reste constant pour que ça se lise comme une seule marque.

---

## Le pipeline tient en un appel

Un petit script, `generate.mjs`, parcourt le manifest et envoie chaque prompt à [OpenRouter](https://openrouter.ai) avec la modalité image activée :

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

L'image revient sous forme de data URI en base64. Le script la décode et écrit `public/illustrations/<kind>/<id>.jpg`. Un modèle de secours prend le relais si le principal ne renvoie pas d'image. C'est tout le générateur : lire une spec, demander une image, la sauvegarder.

Une commande régénère tout : `node illustrations/generate.mjs`. On ajoute des ids pour n'en faire que quelques-unes. On met `FORCE=1` pour refaire ce qui existe déjà.

---

## L'erreur du premier essai

Voici la partie honnête, parce que c'est un blog build-in-public et que la première version était ratée.

Mon `STYLE_BASE` initial finissait par une longue liste d'interdits : *abstrait et conceptuel, pas d'humains, pas de robots littéraux, pas de cerveaux, pas de clichés de circuit imprimé.* À force d'éviter les réflexes d'AI-slop, j'ai interdit tous les sujets reconnaissables en même temps.

Le résultat : seize images techniquement on-brand et totalement interchangeables. Traînées de lumière verte. Modules géométriques verts. Nœuds verts sur une grille. Chaque article ressemblait au même économiseur d'écran. On-brand, et oubliable.

La leçon a frappé quand j'ai regardé ce qui arrête vraiment les gens en 2026. Les références que j'admire, et les rapports de tendances le confirment, pointent toutes dans la même direction : loin de l'abstraction polie par l'IA, vers des sujets **humains, éditoriaux, reconnaissables**. Un visage. Une paire de mains. Un objet qu'on connaît. Mon set tout-abstrait était précisément le look homogène que les gens ont appris à ignorer.

---

## La correction : un archétype par article

J'ai supprimé l'interdit « abstract only » et reconstruit la direction autour d'un petit ensemble d'**archétypes**. Chaque article choisit celui qui colle à son idée, et y montre un sujet réel et reconnaissable, toujours sous la signature Pixl.

| Article | Archétype | Sujet |
|---|---|---|
| J'ai changé d'avis (trois fois) | portrait | un visage en trois expositions floues |
| Simuler mon groupe WhatsApp | portraits | cinq profils en pleine conversation |
| L'entreprise est un appel d'API | main + objet | un doigt sur une touche, une usine s'allume |
| Le Baton Pattern | mains + objet | deux mains passant un témoin lumineux |
| Une carte pratique de la décennie | paysage | des crêtes de lumière verte, de plus en plus vives |
| La robotique… | objet | une main robotique touchant une vraie surface |
| L'IA, c'est des systèmes | architecture | un petit cœur dans une immense salle des machines |

Même fichier. Même pipeline. J'ai seulement changé les mots du champ `concept`, levé l'interdit, et relancé la commande. Seize bulles oubliables sont devenues seize images qu'on peut réellement décrire à quelqu'un.

---

## Le câblage, une seule fois

Générer l'image, c'est la moitié du travail. L'autre moitié, c'est la faire apparaître partout sans effort manuel.

Pour un article, j'ajoute une ligne au front matter :

```yaml
image: "/illustrations/blog/every-image-from-one-manifest.jpg"
```

Ce seul chemin remplit la carte dans l'index, le hero en haut de l'article, le panel de la carte OG partageable, et le champ `image` des données structurées de l'article. Pour les produits, le même chemin lave le header de la page produit et se pose dans le bento de la page d'accueil. On écrit le chemin une fois, et chaque surface le reprend.

Dernière étape : le poids. Le modèle renvoie des fichiers d'environ 1,4 Mo. Rien sur le site n'est affiché plus large qu'environ 800 pixels, donc un second script réduit à 1600 px et recompresse. Les images tombent à environ 120–240 Ko sans perte visible.

---

## Pourquoi se donner cette peine

Parce que l'alternative, c'est acheter du stock, ou fabriquer quarante images à la main puis les refaire le jour où le vert de la marque change. Avec un manifest, le système visuel est du texte. Il est diffable, relisable, régénérable. Un nouvel article demande une spec et une commande. Un changement de palette est un chercher-remplacer.

L'image en haut de cet article est sortie du même fichier que tout le reste ici. C'est tout le propos : les images ne sont pas le produit. Le système qui les fabrique, oui.
