---
slug: "agents-and-money"
image: "/illustrations/blog/agents-and-money.jpg"
date: "2026-07-09"
icon: Wallet
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Why I Don't Let Agents Touch Money (Yet)"
description: "Agents can already spend. The problem is nobody metering it. The budget, ledger, and gateway gap I hit, and the fix that treats an agent like an employee."
category: "Engineering"
tags: ["Agents", "LLM Gateway", "Budgets"]
readTime: "4 min"
---

_An agent that can call a model can already spend your money. The scary part is that almost nothing is watching how much._

---

Everyone demos agents doing work.

Nobody demos agents doing accounting. There's a reason.

The moment an agent can call a model, it can spend real money. Not hypothetically. Every request has a cost, and a loop that decides to "try again a few more times" is a loop deciding to spend a bit more, on its own, at 3 a.m.

So the honest reason I don't let my agents touch money yet is simple: I can't answer the boring question.

## The boring question

Which agent spent four euros, on whose campaign, running what?

In most stacks that's unanswerable. Here's why.

→ One shared API key does everything, so every cost lands in the same anonymous pile.
→ The spend shows up buried in a provider dashboard, a day late, attributed to nobody.
→ There's no budget, so there's no "no." The account just drains until a card declines.

That's not an agent problem. It's a plumbing problem. The agent is behaving. The system around it has no idea who's paying.

## What "touching money" actually needs

Before an agent gets a wallet, three things have to exist. None of them are a model.

**Identity**, so every call carries a name. Not the shared key. The agent's own row, its own credential, its own trail. When the cost lands, it lands attributed.

**A ledger**, so spend is a fact I can query, not a screenshot I hunt for. Cost per artifact, per agent, per company, read from one place.

**A gateway**, so the budget can say no. Every model call routes through one door that checks the balance first. Out of budget, out of luck.

Put those together and an agent stops being a faucet and starts being an employee.

## Runs out like an employee

This is the line I keep coming back to.

A human employee has a budget. When it's gone, they stop, or they come ask. They don't quietly wire the company account into a model provider overnight because a retry loop felt ambitious.

I want the same for software. Give the agent a monthly allowance. Meter every call against it. When it's spent, the gateway declines, and the agent stops the way a person would. Payroll for code.

## The honest state

Here's where I have to be straight, because half of that is aspiration.

The identity rows exist. The ledger is partial. **The gateway is the piece that barely exists,** which is exactly why my budget system currently believes everything is free. That's a fine belief for a prototype and a career-ending one for production.

So agents in my fleet do the work. They don't hold the card. Not because they'd abuse it, but because I can't yet prove what they spent, and unprovable spend is just a slower way of losing money.

Give an agent a job before you give it a wallet. Mine are still on the first one.

<!-- ILLUSTRATION CONCEPT: close-up of a robotic hand reaching for a single credit card on a dark table, a human hand pinning the card down, near-black scene, one green light, motion blur, film grain -->
