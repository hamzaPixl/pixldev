---
slug: "every-image-from-one-manifest"
image: "/illustrations/blog/every-image-from-one-manifest.jpg"
date: "2026-07-09"
icon: Aperture
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Every Image on This Site Comes From One File"
description: "Every illustration here is generated from one manifest. The spec, the pipeline, and the honest mistake I made on the first pass."
category: "Engineering"
tags: ["Build in Public", "Design Systems", "Image Generation"]
readTime: "3 min"
---

_Every image on this site is generated from one file. Here's the manifest, the pipeline, and the mistake I made on the first pass._

---

Every website gives itself away with its images. Stock everyone has already seen, or the current default: a glowing gradient blob, an "AI brain", a circuit board. You scroll past without registering a thing.

I wanted the opposite. Every image here should look like it came from one studio, in one house style, in the Pixl green. And I wanted to change all of them by editing text, not by opening a design tool.

So the images here are not picked. They are generated, from one file.

## One file, one signature

`illustrations/manifest.mjs`. One spec per image, nothing else:

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

Above the specs sits one shared `STYLE_BASE`, appended to every prompt: near-black background, one accent light with soft bloom, film grain, a faint pixel grid. The `concept` changes per image. The signature never does.

That is the whole trick. The **subject** varies so the set has range. The treatment stays constant so it reads as one brand.

## The pipeline is one call

`generate.mjs` walks the manifest and sends each prompt to [OpenRouter](https://openrouter.ai) with the image modality on:

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

The image comes back as a base64 data URI. The script decodes it and writes `public/illustrations/<kind>/<id>.jpg`. A fallback model kicks in if the primary returns nothing. Read a spec, ask for an image, save it.

One command **regenerates** everything: `node illustrations/generate.mjs`.

## The mistake

The honest part, because this is build-in-public and the first version was wrong.

My initial `STYLE_BASE` ended with a wall of bans: abstract only, no humans, no robots, no brains, no circuit-board clichés. I was so busy dodging the AI-slop defaults that I **banned** every recognizable subject along with them.

The result: sixteen images that were all on-brand and completely interchangeable. Green light trails. Green geometric modules. Green nodes on a grid. Every post looked like the same screensaver. On-brand, and forgettable.

The lesson landed when I looked at what actually stops people in 2026. Not AI-polished abstraction. Human, editorial, recognizable subjects. A face. A pair of hands. An object you know. My all-abstract set was exactly the homogenized look people have learned to scroll past.

So I deleted the ban and gave each post one archetype: a portrait, a pair of hands, an object, a room. A real subject, under the same signature. Same file, same pipeline. I changed the words in the `concept` field and ran the command again. Sixteen forgettable blobs became sixteen images you can describe to someone.

## Why bother

The alternative is buying stock, or hand-making forty images and hand-making them again the day the brand green shifts.

With a manifest, the visual system is **text**. Diffable, reviewable, regenerable. A new post needs one spec and one line in its front matter: `image: "/illustrations/blog/…jpg"`. That path fills the index card, the hero, the OG card, and the structured data. A palette change is a find-and-replace.

The image at the top of this post came out of the same file as everything else here. Which means the day I hate the Pixl green, I get to ruin all of it at once.

That is the point. The images are not the product. The system that makes them is.
