---
slug: "the-baton-pattern"
date: "2026-02-16"
icon: Workflow
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
  - name: "Sanawar Syed Azor Ali"
    linkedin: "https://www.linkedin.com/in/sanawar-syed/"
title: "The Baton Pattern"
description: "A lightweight handoff protocol for multi-agent AI pipelines. A small JSON object that carries context between workflow stages."
category: "Engineering"
tags: ["AI Agents", "Design Patterns", "Orchestration"]
readTime: "5 min"
---

## The Problem

When multiple AI agents work together in a pipeline — one plans, another builds, another reviews — they need context from each other. But:

- Passing full artifacts (code, docs) between every stage **costs too many tokens**
- Even with full artifacts, agents miss the *why* — the decisions and constraints behind the work

Without a structured handoff, agents repeat work or contradict earlier decisions.

---

## The Solution

The **baton** is a small JSON object (~1,000 tokens) that travels between stages. Each agent reads it before starting and patches it when done.

Think of it like a relay race baton — except this one carries notes.

---

## Structure

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

---

## How It Works

### 1. Initialize

The baton starts with a goal and an initial state.

### 2. Inject

Before each stage, the baton is injected into the agent's prompt as markdown.

### 3. Patch

After executing, the agent returns a `baton_patch` — only the fields that changed get updated.

### 4. Repeat

The updated baton feeds into the next stage until the workflow completes.

---

## Baton vs. Artifacts

| | Baton | Artifacts |
|---|---|---|
| **Size** | ~1,000 tokens | 1k–100k+ tokens |
| **Content** | Decisions, state, constraints | Actual code, plans, docs |
| **Included** | Always | Selectively |
| **Purpose** | *Why* and *what matters* | *What was produced* |

The baton tells the next agent **what happened and why**. Artifacts are the actual work product.

---

## Key Design Choices

**Append-only decisions.** Earlier decisions are never erased. This prevents contradictions.

**Replace semantics for state.** `current_state` is replaced each time — it reflects *current* truth, not history.

**Budget-friendly.** At ~1,000 tokens, the baton always fits in context.

**Full audit trail.** Every patch is recorded with timestamp and stage ID.

---

## When to Use This

The baton pattern works for any **multi-step AI pipeline** where:

- Agents need context from previous steps
- Token budgets are limited
- Decisions must be consistent across stages
- You need to trace how context evolved

It's intentionally simple — just a JSON object with merge-patch updates.
