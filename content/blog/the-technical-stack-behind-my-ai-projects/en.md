---
slug: "the-technical-stack-behind-my-ai-projects"
image: "/illustrations/blog/the-technical-stack-behind-my-ai-projects.jpg"
date: "2026-04-08"
icon: Cog
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Under the Hood: Harness + Knowledge OS"
description: "Two layers sit under almost everything I build: a harness that drives execution and a Knowledge OS that structures context. The shape, not the blueprint."
category: "Engineering"
tags: ["Harness", "Knowledge OS", "AI Architecture"]
readTime: "3 min"
---

_My last post argued AI only pays off inside a system. This is the technical follow-up: two layers under almost everything I build. Guarded, but honest._

---

Almost everything I ship sits on two layers.

→ a **harness** that drives execution
→ a Knowledge OS that supplies context

I keep them apart on purpose. I do not want planning, memory, retrieval, and judgment collapsed into one long prompt. Each layer gets one job.

The harness moves work forward. The Knowledge OS makes sure the system knows enough to do it well.

## The harness

The harness is a loop, not a single generation step.

Four stages, in order:

→ Plan the request into a real spec.
→ Generate against that spec.
→ Evaluate the actual result.
→ Gate: stop, iterate, or escalate.

The point is the **split between building and judging.** The layer that produces is not the layer that decides it is good enough. That gap is most of the distance between a demo agent and something you can run twice.

It also has to know when to stop. If scores plateau, if the same fix keeps repeating, if the generator says it is stuck, more iteration is just expensive. Change approach or escalate. That is a systems call, not a prompt.

And state has to survive the loop. Goal, status, critique, constraints, all carried between stages. Without that continuity, each pass rediscovers the same context, and iteration becomes theater with a progress bar.

## The Knowledge OS

If the harness is execution, the Knowledge OS is context.

A company's knowledge is not a folder with a chat box bolted on. It is documents, entities, relations, decisions, contradictions, and a truth that keeps changing.

So I **treat it as structure, not search.** At a high level it handles ingestion, retrieval, entity extraction, relation mapping, conflict detection, synthesis, and clean access for agents.

Documents are raw input, not the final form. Once content lands, it gets indexed, linked to entities, walked through relations, checked for conflicts, compiled into synthesis pages, then exposed again through tools. The knowledge base stops being an archive you query when stuck and becomes a substrate the rest of the system can reason on.

Similarity search alone does not get you there. Useful retrieval is layered: query transformation, hybrid ranking, graph expansion, reranking, real citations. That is the difference between retrieving text and retrieving usable context.

And versioning is core, not a convenience. Documents change, decisions change, teams change. A memory layer that cannot show that evolution loses trust fast.

## Where I stop

I will describe the shape: the two layers, the roles, the reasoning.

I will not publish the prompts, the heuristics, the conventions that sit closest to production leverage.

Not to be mysterious. It is the line between sharing the design and handing over the machine.

## One sentence

The harness helps the system **do**. The Knowledge OS helps it **know**.

Execution without structured context stays shallow. Context without execution stays passive.

Put together, they start to be worth building on.
