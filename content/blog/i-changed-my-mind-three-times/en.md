---
slug: "i-changed-my-mind-three-times"
image: "/illustrations/blog/i-changed-my-mind-three-times.jpg"
date: "2026-07-09"
icon: Compass
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "I Changed My Mind (Three Times)"
description: "In April I published a vision series. Three months later, half of it is revised and two threads are gone. Here's the honest diff, and what survived every pivot."
category: "Vision"
tags: ["AI Systems", "Build In Public", "Retrospective"]
readTime: "3 min"
---

_In April I published a series about the next tech decade. Three months later I re-read it next to my own codebase. Half of it survived. Half of it didn't. This is the diff._

---

## Why write this

Most vision essays never get audited. You publish the big picture, the future arrives slightly different, and nobody re-reads the old post. The author least of all.

I re-read mine. Then I had my own tooling verify what my repos actually do today, and wrote the new vision against that ground truth. My thinking turned out to have three distinct eras. So let me do the uncomfortable thing and diff them in public.

## Era 1: two layers

The one I blogged about: **the harness helps the system do, the Knowledge OS helps the system know.**

An execution harness that drives agents through work with gates and reviews. A knowledge layer that structures memory and context. That framing carried a lot. It's why my knowledge engine exists, why my agent tooling exists, and still the cleanest way I know to explain why "just prompt it better" doesn't scale.

## Era 2: the unified OS

This spring, I tried to unify everything. One monorepo, one system, subsystems folded under a single roof: `pixl-os`.

It felt elegant. It was also my most expensive habit: beautiful contracts, sprints of scaffolding, then a pivot orphans it. I now have an archived platform with 1,500 tests to prove it.

## Era 3: the company factory

Where I am now. No unified OS, no monorepo. **Services over HTTP.** Small narrow services, each deployable alone, each exposing capabilities the same way, composed by a control plane that provisions companies. "Creating a company" becomes an API call, and agents operate most of it.

The April monorepo direction is dead. I'm saying it plainly because I recommended it in writing three months ago.

## What I dropped

**The harness as a product.** Abandoned, for now. This one hurts. But the harness *pattern* survived. The gate where execution pauses for a decision generalized into the job contract every service now shares: `submitted`, `working`, `input-required`, `completed`, `failed`. That `input-required` state is the harness gate, promoted from a product feature to a network protocol. The product died. The idea got a bigger job.

**The Knowledge OS as an OS.** Demoted, deliberately. Memory is now a capability like the others, consumed through the same interface as "generate a site." What replaced the pillar is a distinction I wish I'd made a year earlier. **Context** is curated, small, versioned: what the company *is*. **Memory** is accumulated, large, retrieved: what the company *knows*. Conflating them is why every RAG demo feels smart and behaves drunk.

**Robotics.** Gone from the working vision. I still think embodiment is where agentic systems get real, and this year's funding numbers agree. It's gone because nothing in my stack consumes it, and I have a rule with no exceptions: no consumer, no build.

**Local models.** Same fate. "Local" survives as a routing target in the gateway, one provider among several. But the thesis that specialized local models are *the next layer*? Not one line of my platform depends on it. The idea isn't wrong. It's just not mine to build this year.

## What survived

Three things made it through all three eras, which probably means they're the actual beliefs:

→ **Ownership boundaries.** Knowledge knows. The engine does. Services are capabilities. The shell is thin. Every era redrew the boxes. The boundaries never moved.
→ **Contract-first.** No integration without a shared contract. The envelope, the error catalog, the health check, the versioned schema. The boring paperwork is the only reason three eras of pivots didn't produce rubble.
→ **Reliability comes from structure, not bigger prompts.** The oldest claim on this blog. Better models raise the floor. Structure holds up the ceiling.

## The meta-lesson

Publishing the April series is what made this post cheap to write. The vision was versioned, in public, in my own words. Revising it is a diff, not an identity crisis.

My failure mode was never bad code. It was a beautiful new spec mid-quarter, seducing me away from the thing with paying users. Naming the eras is how I catch it: when I feel era four coming, I'll ask what it consumes, who pays for it, and which demo gates it.

Strong opinions, versioned. That's the whole method.
