---
slug: "every-image-from-one-manifest"
image: "/illustrations/blog/every-image-from-one-manifest.jpg"
date: "2026-07-09"
icon: Aperture
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Chaque image du site vient d'un seul fichier"
description: "Chaque illustration ici est générée depuis un seul manifest. La spec, le pipeline, et l'erreur honnête du premier essai."
category: "Engineering"
tags: ["Build in Public", "Design Systems", "Génération d'images"]
readTime: "3 min"
---

_Chaque image de ce site est générée depuis un seul fichier. Voici le manifest, le pipeline, et l'erreur du premier essai._

---

Chaque site web se trahit par ses images. Du stock que tout le monde a déjà vu, ou le réflexe du moment : une bulle en dégradé lumineux, un « cerveau IA », un circuit imprimé. On scrolle sans rien retenir.

Je voulais l'inverse. Chaque image ici devait avoir l'air de sortir du même studio, dans un seul style maison, dans le vert Pixl. Et je voulais toutes les changer en éditant du texte, pas en ouvrant un outil de design.

Alors les images ici ne sont pas choisies. Elles sont générées, depuis un seul fichier.

## Un fichier, une signature

`illustrations/manifest.mjs`. Une spec par image, rien d'autre :

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

Au-dessus des specs, un `STYLE_BASE` partagé, ajouté à chaque prompt : fond quasi-noir, une seule lumière d'accent avec bloom doux, grain de film, une fine grille de pixels. Le `concept` change pour chaque image. La signature, jamais.

C'est toute l'astuce. Le **sujet** varie pour que le set ait de la variété. Le traitement reste constant pour que ça se lise comme une seule marque.

## Le pipeline tient en un appel

`generate.mjs` parcourt le manifest et envoie chaque prompt à [OpenRouter](https://openrouter.ai) avec la modalité image activée :

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

L'image revient en data URI base64. Le script la décode et écrit `public/illustrations/<kind>/<id>.jpg`. Un modèle de secours prend le relais si le principal ne renvoie rien. Lire une spec, demander une image, la sauvegarder.

Une commande **régénère** tout : `node illustrations/generate.mjs`.

## L'erreur

La partie honnête, parce que c'est un blog build-in-public et que la première version était ratée.

Mon `STYLE_BASE` initial finissait par un mur d'interdits : abstrait seulement, pas d'humains, pas de robots, pas de cerveaux, pas de clichés de circuit imprimé. À force d'esquiver les réflexes d'AI-slop, j'ai **interdit** tous les sujets reconnaissables avec eux.

Le résultat : seize images toutes on-brand et totalement interchangeables. Traînées de lumière verte. Modules géométriques verts. Nœuds verts sur une grille. Chaque article ressemblait au même économiseur d'écran. On-brand, et oubliable.

La leçon a frappé quand j'ai regardé ce qui arrête vraiment les gens en 2026. Pas l'abstraction polie par l'IA. Des sujets humains, éditoriaux, reconnaissables. Un visage. Une paire de mains. Un objet qu'on connaît. Mon set tout-abstrait était exactement le look homogène que les gens ont appris à dépasser au scroll.

Alors j'ai supprimé l'interdit et donné à chaque article un archétype : un portrait, une paire de mains, un objet, une pièce. Un vrai sujet, sous la même signature. Même fichier, même pipeline. J'ai changé les mots du champ `concept` et relancé la commande. Seize bulles oubliables sont devenues seize images qu'on peut décrire à quelqu'un.

## Pourquoi se donner cette peine

L'alternative, c'est acheter du stock, ou fabriquer quarante images à la main puis les refaire le jour où le vert de la marque change.

Avec un manifest, le système visuel est du **texte**. Diffable, relisable, régénérable. Un nouvel article demande une spec et une ligne dans son front matter : `image: "/illustrations/blog/…jpg"`. Ce chemin remplit la carte de l'index, le hero, la carte OG et les données structurées. Un changement de palette est un chercher-remplacer.

L'image en haut de cet article est sortie du même fichier que tout le reste ici. Ce qui veut dire que le jour où je déteste le vert Pixl, je peux tout saccager d'un coup.

C'est ça, le propos. Les images ne sont pas le produit. Le système qui les fabrique, oui.
