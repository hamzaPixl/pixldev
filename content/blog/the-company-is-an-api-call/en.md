---
slug: "the-company-is-an-api-call"
image: "/illustrations/blog/the-company-is-an-api-call.jpg"
date: "2026-07-09"
icon: Factory
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "The Company Is an API Call"
description: "What I'm building isn't a set of tools. It's a company factory: one command provisions identity, context, memory, an AI budget, and services, then agents run the place."
category: "Vision"
tags: ["AI-Native Company", "Agents", "Platform"]
readTime: "4 min"
---

_What I'm building isn't a set of tools. It's a company factory: one command creates a company, and agents produce its brand, its site, its SEO audit, its first campaign. Every euro accounted for._

---

## The reframe

Two years of building products: invoicing for Belgian SMEs, a compliance monitor, a company-data API, a content studio, a knowledge engine. Each one useful. Each one built from scratch. Each one re-implementing the same five things.

Somewhere around the fourth time I rebuilt "brand identity" from zero, I stopped and named the pattern.

What I'm building isn't a set of tools. It's a **company factory**. "Create a company" becomes an API call that provisions identity, context, memory, an AI budget, and a set of narrow services. The company is then run, mostly, by agents.

Every digital company needs the same five things:

→ **Identity** (who exists): the company, its people, its agents, their keys.
→ **Context** (what the company is): brand, tone, offer. Small, curated, versioned.
→ **Memory** (what it knows): history, documents, decisions. Large, retrieved.
→ **Intelligence**: model access with budgets, routing, and a real ledger.
→ **Capabilities**: services that do the work. Build a site, audit SEO, send an invoice.

The products people see (Feen, Syncco, the next one) become thin, branded surfaces over those services. Growth stops meaning "rebuild the foundations again." It means adding companies and services.

## The agent is an employee

The most AI-native decision here isn't a model choice. It's an org-chart choice.

An agent gets an identity row, like a human. It holds credentials. It has a budget. It calls the same services through the same contracts, and leaves a trail. The org chart of the next company is literally rows in a database.

Sounds philosophical until you ask a boring question: which agent spent €4, on whose campaign? In most stacks that's unanswerable. Shared key, cost buried in a dashboard, nobody attributed. In the factory, it's one query.

And the agent runs out of money like an employee, instead of quietly draining the API account at 3 a.m. Budget's gone, the gateway says no. Payroll for software.

## Capability-first, UI-on-demand

Second rule: **reduce UI, grow capability.** The agent is the primary user. Screens are for trust and intake, not for work.

Every service exposes its capabilities the same way: over HTTP for products, over MCP for agents. Define a capability once; a web app, a terminal, and an agent loop all call it the same.

I didn't whiteboard this. I found it in my own fleet. One product was quietly the reference implementation before the platform had a name. I'm generalizing, not inventing.

The metric is blunt: the percentage of features an agent can call. Today, across my fleet, about 20%. The goal is to make 100% boring.

## The honest state

It's a vision post, so here's the honest version. The services exist. The layer between them doesn't. The gateway that's supposed to meter every euro barely exists, so my budget system currently believes everything is free. A lovely thing to believe. A terrible thing to ship.

Feen and Syncco prove the model, but humans wired them, service by service. The next one shouldn't need that.

The demo I'm building toward is one line: `nuva co create testco`. Agents produce the brand, the site, the SEO audit, the first campaign. End to end. Cost-per-artifact readable from the ledger.

## The point

Feen and Syncco prove the model by hand. The next company is born on the platform from day one.

Not bigger models. Not more prompts. A factory where identity, context, memory, intelligence, and capabilities are provisioned like infrastructure, and the first employees are agents with badges and budgets.

The company is an API call. The rest is operations.
