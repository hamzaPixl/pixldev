---
slug: "the-company-is-an-api-call"
date: "2026-07-09"
icon: Factory
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "The Company Is an API Call"
description: "What I'm actually building is not a set of tools. It's a company factory: a platform where creating a company provisions identity, context, memory, an AI budget, and a set of narrow AI services — and where the company is then operated mostly by agents."
category: "Vision"
tags: ["AI-Native Company", "Agents", "Platform"]
readTime: "6 min"
---

_What I'm building is not a set of tools. It's a company factory. The demo I'm working toward is one command: create a company, and agents produce its brand, its website, its SEO audit, and its first campaign — with every euro accounted for._

---

## The reframe

For two years I've been building products: an invoicing platform for Belgian SMEs, a compliance monitor, a Belgian company-data API, an AI content studio, a knowledge engine. Each one useful. Each one built mostly from scratch. Each one re-implementing the same five things.

Somewhere around the fourth re-implementation of "brand identity" I stopped and named the pattern.

What I'm building is not a set of tools. It is a **company factory** — a platform where "creating a company" is an API call that provisions identity, context, memory, an AI budget, and a set of narrow AI services, and where the company is then *operated* mostly by agents.

Every digital company needs the same five things:

1. **Identity** — who exists: the company, its workspaces, its humans, its agents, their keys.
2. **Context** — what the company *is*: brand, tone, offer, constraints. Curated, small, versioned.
3. **Memory** — what the company *knows*: history, documents, decisions. Accumulated, large, retrieved.
4. **Intelligence** — model access with budgets, routing, and a real ledger.
5. **Capabilities** — narrow services that do actual work: generate a site, audit SEO, produce content, look up a company, send an invoice.

The products people see — Feen, Syncco, the next venture — become thin, branded surfaces over those services. Growth stops meaning "rebuild the foundations again." Growth = adding companies and services.

---

## The agent is an employee

The most AI-native decision in this model is not a model choice. It's an org-chart choice.

Agents are first-class actors, not anonymous automation. An agent has an identity row like a human does. It holds credentials. It has a budget. It calls the same services through the same contracts. It leaves an auditable trail.

The org chart of the next company is literally rows in a database.

This sounds philosophical until you look at what it fixes. Today, when an AI feature runs, the question "which agent spent €4 on whose campaign?" is unanswerable in most stacks — the API key is shared, the cost sits in a provider dashboard, the action isn't attributed. In the factory model, that question is one query on one correlation id.

And budgets stop being a spreadsheet fear. The agent *runs out of money like an employee*, instead of silently burning the API account at 3 a.m. When the budget is exhausted, the gateway refuses the call. Payroll for software.

---

## Capability-first, UI-on-demand

The second doctrine: **reduce UI, enhance capabilities.** The agent is the primary user; screens exist for trust and intake, not for work.

Every service exposes its capabilities the same way — same envelope, same auth, same health check, same error catalog — over HTTP for products, over MCP for agents. One capability, defined once as a schema plus a handler, callable identically by a web app, a terminal, or an agent loop.

I didn't design this pattern on a whiteboard. I found it in my own fleet. Bumpi, my content studio, was built with a capability registry that auto-exposes every capability over HTTP, MCP, and an agent loop — and it turned out to be the reference implementation of the whole platform before the platform had a name. Every load-bearing pattern in the vision already runs in production somewhere. I'm generalizing, not inventing.

The success metric is blunt: **percentage of features that are agent-callable.** Today, across my fleet, that number is about 20%. The goal is to make it boring to say 100%.

---

## The honest state

This is a vision post, so here is exactly how much of it exists on 2026-07-09:

- **The services exist. The layer doesn't.** I grepped: zero cross-service calls in production. Brand is re-implemented four times. Identity four times. The two pains motivating the platform are measured facts, not theory.
- **The LLM gateway — the linchpin — barely exists.** The only real gateway code sits in an archived project, as a library, with `cost_usd=0.0` hardcoded. My budget system currently believes everything is free.
- **The best engine is under-adopted.** My knowledge service is the strongest piece of the fleet and almost nothing consumes it yet.
- **Two products prove the model manually.** Feen and Syncco work — but humans wired them, service by service.

The plan for the quarter is strictly serial, each chapter gated by a demo: a standard service kit that turns "a capability" into "a deployed, key-gated, agent-callable service" in an afternoon; then identity and context as a control plane; then re-pouring the existing services into the mold; then the gateway with a real ledger.

The final gate is the founding demo: `nuva co create testco` — and agents produce the brand, the site, the SEO audit, and the first campaign, end to end, with zero cross-workspace leaks and a cost-per-artifact readable from the ledger.

---

## The point

Feen and Syncco prove the model manually. The next company is born on the platform from day one.

That's the whole vision. Not bigger models, not more prompts — a factory where identity, context, memory, intelligence, and capabilities are provisioned like infrastructure, and where the first employees are agents with badges and budgets.

The company is an API call. The rest is operations.
