---
slug: "the-technical-stack-behind-my-ai-projects"
date: "2026-04-08"
icon: Cog
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Under the Hood: Harness + Knowledge OS"
description: "A concise technical look at the two core layers behind my AI projects: the harness that drives execution and the Knowledge OS that structures memory and context."
category: "Engineering"
tags: ["Harness", "Knowledge OS", "AI Architecture"]
readTime: "6 min"
---

My previous article was about systems at a high level. This one is the more technical follow-up.

Most of the AI projects I build sit on top of two layers:

- a **harness** that drives execution
- a **Knowledge OS** that provides structured context

That separation is deliberate. I do not want execution, memory, retrieval, evaluation, and decision-making collapsed into one long prompt. I want a system where each layer has a clear job.

The harness is there to move work forward.

The Knowledge OS is there to make sure the system knows enough to do that work properly.

## The Harness

The harness is an execution loop, not a single generation step.

In practice, it behaves more like a small workflow engine around product delivery:

| Stage | Role |
|---|---|
| Plan | Turn a short request into a usable specification |
| Generate | Build or improve against that specification |
| Evaluate | Inspect the actual result |
| Gate | Stop, iterate, or escalate |

That structure matters because it separates production from judgment. The system that builds is not the same layer that decides whether the result is good enough.

This is one of the main differences between a demo agent and a system you can actually use repeatedly.

## Why the Harness Is Useful

The real value is not that it generates. A raw model can already generate.

The value comes from the fact that execution is constrained by a loop:

- there is a specification
- there is a concrete result
- there is an evaluation step
- there is a gate with explicit outcomes

That makes the process easier to reason about and much easier to improve.

A good harness also needs to know when not to keep going. If quality scores plateau, if the same fixes repeat, or if the system gets stuck, blind iteration becomes waste. At that point, the right move is either to change approach or escalate.

That is a systems decision, not a prompt decision.

## State Matters More Than People Think

Iteration is only useful if state survives across the loop.

If each cycle partially resets, the system wastes time rediscovering the same context. So the harness carries structured state between stages: goal, current status, critique, constraints, and quality signals.

That is what allows the next pass to be targeted rather than generic.

Without state continuity, an iterative workflow is mostly theater.

## The Knowledge OS

If the harness is the execution layer, the Knowledge OS is the context layer.

I do not think a company knowledge system should be just a vector database with a chat box attached to it. Real operational knowledge is more complex than that. It contains documents, decisions, entities, relations, contradictions, history, and changing truth.

So the Knowledge OS is designed as a structured memory system rather than a search feature.

At a high level, it handles:

- document ingestion and storage
- indexing and retrieval
- entity extraction
- relation mapping
- conflict detection
- synthesis and compilation
- tool and API access for agents

That is what turns knowledge into infrastructure instead of reference material.

## Why Retrieval Alone Is Not Enough

A lot of systems stop at similarity search. That is useful, but it is not sufficient if you want a system to reason across company context.

In practice, useful retrieval tends to be layered.

You start with search, but then you often need query transformation, hybrid ranking, graph expansion, reranking, citation building, and a way to expose the final context cleanly to the execution layer.

That is the difference between retrieving text and retrieving usable context.

## Why Versioning Is a Core Feature

One thing that matters a lot in a knowledge system is time.

Documents change. Decisions change. Teams change. If the memory layer cannot represent that evolution cleanly, trust degrades fast.

That is why I consider versioning part of the core architecture, not a secondary convenience. A memory system that supports execution needs traceability, not just storage.

## How the Two Layers Connect

These two layers solve different problems.

The harness answers:

> How does work progress?

The Knowledge OS answers:

> What context should that work progress against?

Put together, they create a more useful base system:

| Layer | Purpose |
|---|---|
| Harness | Drive execution through planning, generation, evaluation, and gating |
| Knowledge OS | Supply structured, evolving, retrievable context |

That combination is the part I care about most.

Not because it looks impressive, but because it creates a much better foundation for real product work.

## What I Am Not Sharing in Detail

I am comfortable describing the architecture, the separation of roles, and the shape of the system.

What I do not want to publish in full are the internal prompts, heuristics, conventions, and operational choices that sit closer to production leverage.

That is not meant to be mysterious. It is simply the line I draw between sharing the design and open-sourcing every internal mechanism.

## Final Thought

If I reduce it to one sentence, it is this:

The harness helps the system **do**.
The Knowledge OS helps the system **know**.

Execution without structured context stays shallow.

Context without an execution system stays passive.

The combination is where things start to become genuinely useful.
