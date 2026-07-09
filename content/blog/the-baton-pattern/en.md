---
slug: "the-baton-pattern"
image: "/illustrations/blog/the-baton-pattern.jpg"
date: "2026-02-16"
icon: Workflow
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
  - name: "Sanawar Syed Azor Ali"
    linkedin: "https://www.linkedin.com/in/sanawar-syed/"
title: "The Baton Pattern"
description: "A small JSON object that carries decisions and constraints between the stages of a multi-agent AI pipeline."
category: "Engineering"
tags: ["AI Agents", "Design Patterns", "Orchestration"]
readTime: "2 min"
---

_Three agents in a pipeline need to know what the others decided. The baton is how they find out, without re-sending the work._

---

## The problem

Put three agents in a pipeline. One plans, one builds, one reviews. Each needs to know what the others did.

Not the full transcript. The gist: what is decided, what is fixed, what is still open.

Two ways this goes wrong.

→ Pass the full artifacts between stages, and you **burn tokens** on context nobody reads twice.
→ Pass nothing structured, and the next agent misses the _why_: the decisions, the constraints, the reasons behind the work.

So agents repeat work. Or worse: they contradict a decision made two stages back, and nobody notices until it ships.

## The baton

The fix is small. A JSON object, around 1,000 tokens, that travels with the work.

Each agent reads it before starting. Patches it when done. Passes it on.

It's a relay baton that took notes.

Small enough to always send. Structured enough to be worth reading. The fields:

| Field | Purpose |
|-------|---------|
| `goal` | One-sentence objective |
| `current_state` | What's true right now |
| `decision_log` | Key decisions made (append-only) |
| `constraints` | Hard rules to respect |
| `open_questions` | Unresolved issues |
| `work_scope` | Files/modules involved |
| `artifacts` | References to produced outputs |
| `acceptance` | Tests/checks that must pass |

## How it moves

**Initialize** with a goal and a starting state. Inject it into each agent's prompt as markdown before the stage runs. After the stage, the agent returns a `baton_patch`: only the fields that changed. The merged baton feeds the next stage. Repeat until the workflow ends.

That's the whole protocol. No message bus, no shared database, no framework.

## The choices that matter

`decision_log` is append-only. Earlier decisions never get erased, so a later agent can't quietly reverse them.

`current_state` is the opposite. Replaced on every patch, because it should read as true now, not as a diary.

Every patch is stamped with a stage ID and a timestamp. When the output is wrong, you can read exactly where the context bent.

At ~1,000 tokens, it always fits. The baton is the cheap part of the pipeline.

## The honest limit

The baton carries context, not proof. It tells the next agent what happened and why. It does not tell you the work was any good. That is what `acceptance` and the artifacts themselves are for.

No protocol makes a bad plan good. It just stops good context from getting lost.

Use it when steps depend on each other, budgets are tight, and decisions have to hold across a chain.

Small object. Merge-patch updates. One less way for a pipeline to lie to itself.
