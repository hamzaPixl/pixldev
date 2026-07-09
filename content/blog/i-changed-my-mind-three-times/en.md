---
slug: "i-changed-my-mind-three-times"
image: "/illustrations/blog/i-changed-my-mind-three-times.jpg"
date: "2026-07-09"
icon: Compass
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "I Changed My Mind (Three Times)"
description: "In April I published a vision series about harnesses, Knowledge OS, local models, and robotics. Three months later, half of it is revised and two threads are gone. Here's the honest diff — and what survived every pivot."
category: "Vision"
tags: ["AI Systems", "Build In Public", "Retrospective"]
readTime: "6 min"
---

_In April I published a series about the next tech decade. Three months later I re-read it next to my own codebase. Half of it survived. Half of it didn't. This is the diff._

---

## Why write this at all

Most vision essays never get audited. You publish the big picture, the future arrives slightly different, and nobody re-reads the old post — least of all the author.

I re-read mine. Then I had my own tooling verify what my repos actually do today, and I wrote the new vision against that ground truth. It turns out my thinking has gone through three distinct eras, and the newest documents name them explicitly. So let me do the uncomfortable thing and diff them in public.

---

## Era 1: the two-layer thesis

The first era was the one I blogged about: **the harness helps the system do, the Knowledge OS helps the system know.**

Two layers. An execution harness that drives agents through work with gates and reviews, and a knowledge layer that structures memory and context. That framing carried a lot: it's why my knowledge engine exists, it's why my agent tooling exists, and it's still the cleanest way I know to explain why "just prompt it better" doesn't scale.

## Era 2: the unified OS

The second era — this spring — tried to unify everything. One monorepo, one system, subsystems folded into a single operating layer. The April architecture put the pieces under one roof: `pixl-os` with subsystems inside.

It felt elegant. It was also the era that produced my most expensive habit: beautiful contracts, sprints of scaffolding — and then a pivot orphans it. I now have an archived platform with 1,500 tests to prove it.

## Era 3: the company factory

The third era is where I am now: no unified OS, no monorepo. **Services over HTTP.** Small narrow services, each deployable alone, each exposing capabilities the same way, composed by a control plane that provisions companies. The vision post about it is its own essay; the short version is that "creating a company" becomes an API call and agents operate most of it.

The April monorepo direction is dead. I'm saying it plainly because I recommended it in writing three months ago.

---

## What I dropped

**The harness as a product.** Abandoned, for now. This one hurts — it was the star of the two-layer era. But the harness *pattern* survived: its core idea, the gate where execution pauses for a decision, generalized into the job contract every service now shares. A job can be `submitted`, `working`, `input-required`, `completed`, `failed`. That `input-required` state — a service pausing to ask a human or an agent for a decision — is the harness gate, promoted from a product feature to a network protocol. The product died; the idea got a bigger job.

**The Knowledge OS as an OS.** Demoted, deliberately. In April, knowledge was the second pillar of everything. In the new model, memory is *a capability like the others* — consumed through the same interface as "generate a site" or "look up a company." What replaced the pillar is a sharper distinction I wish I'd made a year earlier: **context** is curated, small, versioned — what the company *is*. **Memory** is accumulated, large, retrieved — what the company *knows*. Conflating them is why every RAG demo feels smart and behaves drunk.

**Robotics.** Gone from the working vision. Not because I stopped believing the April essay — I still think embodiment is where agentic systems get real, and the funding numbers this year agree. It's gone because nothing in my current stack consumes it, and I've adopted a rule that has no exceptions: no consumer, no build.

**Local and fine-tuned models.** Same fate, with one honest nuance: "local" survives as a routing target in the gateway design, one provider among several. But the thesis that specialized local models are *the next layer*? Not one line of my current platform depends on it. The idea isn't wrong. It's just not mine to build this year.

---

## What survived every pivot

Three things made it through all three eras intact, which probably means they're the actual beliefs:

1. **The ownership boundaries.** Knowledge knows. The engine does. Services are capabilities. The shell is thin. Every era redrew the boxes; the boundaries between them never moved.
2. **Contract-first.** No integration without a shared contract. The envelope, the error catalog, the health check, the versioned schema — the boring paperwork is the only reason three eras of pivots didn't produce rubble.
3. **Reliability comes from system structure, not bigger prompts.** The oldest claim on this blog, and the one every new model release re-confirms. Better models raise the floor. Structure holds up the ceiling.

---

## The meta-lesson

Publishing the April series is what made this post cheap to write. The vision was versioned, in public, in my own words — so revising it is a diff, not an identity crisis.

My failure mode was never bad code. It was a new deep artifact mid-quarter — a beautiful spec seducing me away from the thing with paying users. Naming the eras is how I catch it now: when I feel era four coming, I'll ask what it consumes, who pays for it, and which demo gates it.

Strong opinions, versioned. That's the whole method.
