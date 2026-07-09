---
slug: "every-image-from-one-manifest"
image: "/illustrations/blog/every-image-from-one-manifest.jpg"
date: "2026-07-09"
icon: Aperture
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Every Image on This Site Comes From One File"
description: "How every illustration here — blog heroes, product panels, OG cards — is generated from a single manifest, and the honest mistake I made on the first pass."
category: "Engineering"
tags: ["Build in Public", "Design Systems", "Image Generation"]
readTime: "6 min"
---

Every website gives itself away with its images. Either it leans on stock photos everyone has already seen, or it reaches for the current default: a glowing gradient blob, an "AI brain", a circuit board. You scroll past all of it without registering a thing.

I wanted the opposite. Every image on this site — the hero behind each blog post, the panel on each product page, the card that shows up when someone shares a link — should feel like it came from the same studio, in one house style, in the Pixl green. And I wanted to be able to change all of them by editing text, not by opening a design tool.

So the images here are not picked. They are generated, from one file.

---

## The manifest is the source of truth

There is a single file, `illustrations/manifest.mjs`. It holds one spec per image and nothing else:

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

Above the specs sits one shared `STYLE_BASE`: the house style appended to every prompt. Near-black background, one accent light with soft bloom and motion blur, film grain, a faint pixel grid, photographic light. The `concept` changes per image. The signature never does.

That is the whole trick. The **subject** varies so the set has range; the **treatment** is constant so it reads as one brand.

---

## The pipeline is one call

A small script, `generate.mjs`, walks the manifest and sends each prompt to [OpenRouter](https://openrouter.ai) with the image modality turned on:

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

The image comes back as a base64 data URI. The script decodes it and writes `public/illustrations/<kind>/<id>.jpg`. A fallback model kicks in if the primary returns no image. That is the entire generator: read a spec, ask for an image, save it.

One command regenerates everything: `node illustrations/generate.mjs`. Add ids to do just a few. Set `FORCE=1` to redo what already exists.

---

## The mistake on the first pass

Here is the honest part, because this is a build-in-public blog and the first version was wrong.

My initial `STYLE_BASE` ended with a long list of bans: *abstract and conceptual, no humans, no literal robots, no brains, no circuit-board clichés.* I was so busy avoiding the AI-slop defaults that I banned every recognizable subject along with them.

The result: sixteen images that were all technically on-brand and completely interchangeable. Green light trails. Green geometric modules. Green nodes on a grid. Every post looked like the same screensaver. On-brand, and forgettable.

The lesson landed when I looked at what actually stops people in 2026. The reference imagery I admire, and the trend reports agree, all point the same way: away from AI-polished abstraction, toward **human-centred, editorial, recognizable** subjects. A face. A pair of hands. An object you know. My all-abstract set was precisely the homogenized look people have learned to ignore.

---

## The fix: one archetype per post

I deleted the "abstract only" ban and rebuilt the direction around a small set of **archetypes**. Each post picks the one that fits its idea, and depicts a real, recognizable subject in it, always under the Pixl signature.

| Post | Archetype | Subject |
|---|---|---|
| I Changed My Mind (Three Times) | portrait | one face in three motion-blur exposures |
| Simulating My WhatsApp Group | portraits | five profiles mid-conversation |
| The Company Is an API Call | hand + object | a finger pressing one key, a factory lighting up |
| The Baton Pattern | hands + object | two hands passing a glowing baton |
| A Practical Map of the Decade | landscape | ridgelines of green light, each brighter |
| Robotics… | object | a robotic hand touching a real surface |
| AI Is About Systems | architecture | one small core in a vast engine room |

Same file. Same pipeline. I only changed the words in the `concept` field, lifted the ban, and ran the command again. Sixteen forgettable blobs became sixteen images you can actually describe to someone.

---

## Wiring it in, once

Generating the image is half the job. The other half is making it show up everywhere without manual work.

For a blog post, I add one line to the front matter:

```yaml
image: "/illustrations/blog/every-image-from-one-manifest.jpg"
```

That single path fills the card in the index, the hero at the top of the post, the panel on the shareable OG card, and the `image` field in the post's structured data. For products, the same path washes the header on the product page and sits in the bento grid on the home page. Write the path once, and every surface picks it up.

The last step is weight. The model returns files around 1.4 MB. Nothing on the site is shown wider than about 800 pixels, so a second script downscales to 1600 px and recompresses. The images drop to roughly 120–240 KB with no visible loss.

---

## Why bother

Because the alternative is buying stock, or hand-making forty images and hand-making them again the day the brand green shifts. With a manifest, the visual system is text. It is diffable, reviewable, and regenerable. A new post needs one spec and one command. A palette change is a find-and-replace.

The image at the top of this post came out of the same file as everything else here. That is the whole point: the images are not the product. The system that makes them is.
