---
slug: "one-file-image-video-voice"
image: "/illustrations/blog/one-file-image-video-voice.jpg"
date: "2026-07-09"
icon: Layers
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "One File, Three Modalities"
description: "The generation system as it grows: images, then video, then voice, all from one manifest and one key. The shape of it, and the part that isn't done."
category: "Engineering"
tags: ["Generative AI", "Manifest", "Build in Public"]
readTime: "4 min"
---

_Images came from one file. Then video. Now voice is climbing into the same file. One manifest, one key, three modalities._

---

I already wrote about the images.

Every illustration on this site is generated from one manifest: a spec per image, a shared house style appended to every prompt, one command to regenerate the set. The subject varies. The signature never does.

Then I did the same for video. A storyboard is just a manifest with shots instead of images. Each shot inherits the same near-black, one-green-light signature, so five clips read as one film instead of five strangers.

At some point I stopped seeing three projects and saw one system growing a third arm.

## The shape

The whole thing is one idea repeated.

→ A spec describes the thing: a concept, an aspect, an accent, a few tags.
→ A shared style base is glued onto every spec, so the whole set carries one signature.
→ One walker reads the specs and sends each to a model through one OpenRouter key.

Images were the first modality to run through that loop. Video was the second, using the image as the keyframe. Voice is the third, and it's the newest, so I'll be honest about how far it goes below.

The point is that none of these are separate pipelines. They're the same pipeline pointed at a different modality. Add a `kind`, add a route, keep the signature.

## Why one key matters

People fixate on which model. I fixate on the door they all go through.

One OpenRouter key in front of images, video, and voice means I swap `google/gemini-3-pro-image` for something else by editing a string. It means a fallback kicks in when the primary returns nothing. It means, eventually, that every generated euro passes one meter instead of scattering across three provider dashboards I'd have to reconcile by hand.

The model is a rented commodity. **The manifest is the thing I own.** That's the whole bet.

## Voice, the honest version

Here's the part I won't dress up.

Images are reliable. Run the command, get the set. Video is real but needs a human saying "no, again" on the motion. Voice is the youngest layer: I can generate a line in a consistent read, but a full branded voice, wired into the same manifest with the same one-command regeneration as the images, is where I'm building toward, not where I'm standing.

So treat this post as a map with one road still under construction. Images: paved. Video: paved, bumpy. Voice: I can see it from here.

The temptation is to demo all three as if they're equal. They aren't yet, and pretending otherwise would make this the one file that lies.

## Why bother

Because the alternative is three tools, three styles, three subscriptions, and a brand that drifts every time I open a new one.

With one file, the visual and audio system is text. Diffable, reviewable, regenerable. The day I hate the green, I get to ruin the images, the video, and the voice in a single find-and-replace.

One file in. Three modalities out. The system is the product, again.

<!-- ILLUSTRATION CONCEPT: a single sheet of paper on a dark desk with three faint light-trails rising from it forming an eye, a film frame, and a sound wave, near-black, one green light, motion blur, film grain -->
