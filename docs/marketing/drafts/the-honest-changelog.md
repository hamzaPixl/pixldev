---
slug: "the-honest-changelog"
image: "/illustrations/blog/the-honest-changelog.jpg"
date: "2026-07-09"
icon: History
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "The Honest Changelog"
description: "What I shipped, what I faked, and what broke across the fleet. A build-in-public changelog with no spin, no invented metrics, and no polished demo."
category: "Strategy"
tags: ["Build in Public", "Changelog", "Honesty"]
readTime: "4 min"
---

_Most changelogs are marketing in a lab coat. Here's the version I'd actually want to read: what I shipped, what I faked, what broke._

---

Every changelog reads the same.

"Improved performance. Squashed bugs. Polished the experience." Translation: we changed some things, and we would rather you didn't ask which.

I run a small fleet of products, mostly alone. So instead of that, here's the honest ledger. Three columns: shipped, faked, broke. No spin.

## What I shipped

Real things, wired and working today.

→ The image system: every illustration on this site generated from one manifest and one OpenRouter key.
→ The graph: this site emits structured data, serves `llms.txt`, and ships proper `hreflang` for three languages.
→ The identity model: agents get a row in a table, like people, with credentials attached.

None of that is a demo. It runs when I push. That's the bar I hold "shipped" to: it survives a deploy without me standing next to it.

## What I faked

The uncomfortable column, because this is the one everyone skips.

The **budget system currently believes everything is free.** The gateway that's supposed to meter every euro barely exists yet, so the ledger reads zero no matter how many models I burn through. A lovely thing to believe. A terrible thing to ship.

Feen and Syncco look like they were born on the platform. They weren't. I wired them by hand, service by service, then wrote the story as if the factory produced them. The vision is real. The automation behind it is mostly me with a keyboard at midnight.

And "agent-native" has a number. Across the fleet, about 20% of features are actually callable by an agent. The other 80% still need a human clicking. When I say the goal is to make 100% boring, that 80% is the part I'm quietly not showing you in the demo.

## What broke

→ My first image style banned every recognizable subject, so I generated sixteen interchangeable green blobs and called it a brand.
→ A "cost-aware" route once picked the expensive model because the cheap one timed out, and nothing told me until later.
→ More than one "finished" service turned out to be finished only on the machine it was written on.

Broke is fine. Broke is data. The problem is when broke gets renamed shipped for the changelog.

## Why I publish this

Because polished demos have trained everyone to distrust demos. Founders nod along and assume the ugly parts exist. They always do.

I would rather name the ugly parts myself. It costs me a little shine and buys back the one thing marketing can't fake: that when I say a thing is live, it's actually live.

Shipped is small. Faked is honest. Broke is Tuesday.

<!-- ILLUSTRATION CONCEPT: extreme close-up of a hand striking through a printed line item on a paper changelog with a single green pen, near-black desk, one green light, motion blur on the pen, film grain -->
