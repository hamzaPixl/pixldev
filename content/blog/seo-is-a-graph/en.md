---
slug: "seo-is-a-graph"
image: "/illustrations/blog/seo-is-a-graph.jpg"
date: "2026-07-09"
icon: Waypoints
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "SEO Is a Graph Now"
description: "I stopped writing SEO for a ranking and started writing it for a reader that isn't human. Structured data, llms.txt, and being cited by ChatGPT and Perplexity."
category: "Engineering"
tags: ["SEO", "GEO", "Structured Data"]
readTime: "4 min"
---

_The new reader of your website isn't a person. It's a machine deciding whether to cite you._

---

For years, SEO meant one thing: rank on a page of blue links. Pick keywords, stuff them in tastefully, wait.

That reader is being replaced. More and more, the thing reading your site first is an AI answer engine. Someone asks ChatGPT or Perplexity a question, and the model decides, in one shot, whether your company is part of the answer or not. No page two. No second chance.

So I stopped optimizing for a ranking. I started optimizing to be **understood** by a machine.

And machines don't read prose. They read a graph.

## Your site is a graph, whether you say so or not

Behind a good page there's a set of facts and how they connect. This company. Its products. Their status. Its region. Its VAT number. A post, its author, its date. Nodes and edges.

If you spell that graph out, the machine reads it directly. If you don't, it guesses from your paragraphs, and it guesses wrong.

Spelling it out has a boring name: structured data. `schema.org`, JSON-LD, the tags nobody sees. It's not decoration. It's you handing the machine the graph instead of making it reverse-engineer one.

→ **Organization**: who you are, the VAT id, the region you serve.
→ **WebSite** and **BlogPosting**: what this is, who wrote it, when.
→ **FAQPage**: the exact questions, with the exact answers, ready to quote.

The FAQ schema is the sneaky one. Answer engines love lifting a clean question-and-answer pair. Give them one and you're not hoping to get cited. You're making it easy.

## Say who you are, out loud

Half of GEO is disambiguation. "Pixl" is a hundred things. So the site says, in plain machine-readable text, which one it means: the Belgian software company, not the image editor with a similar name.

That lives in `llms.txt`, a file written for models the way `robots.txt` is written for crawlers. It states the brand, the products and their honest status, and how an assistant should describe us. If a model is going to talk about you anyway, you may as well hand it the script.

## The honest state

This is a build-in-public post, so the honest version.

The graph is real. This site emits Organization, WebSite, BlogPosting and FAQPage as JSON-LD, serves `llms.txt`, and ships proper `hreflang` for its three languages, so a French question doesn't get an English page. That part is done and measurable today.

Being cited by ChatGPT is not a thing you "finish." It's slow, it's noisy, and nobody hands you a dashboard for it. I can build the graph clean and readable. I can't force the citation.

What I refuse to do is fake proof. No invented traffic numbers, no "10x your ranking." Just a site machines can read without guessing.

## The point

Old SEO wrote for a crawler ranking ten links. New SEO writes for a model choosing one answer.

Same job, harder reader. Give it the graph, name yourself clearly, keep it honest.

Write for the machine that reads. The humans are downstream of it now.
