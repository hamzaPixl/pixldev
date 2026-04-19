---
slug: "the-baton-pattern"
date: "2026-02-16"
icon: Workflow
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
  - name: "Sanawar Syed Azor Ali"
    linkedin: "https://www.linkedin.com/in/sanawar-syed/"
title: "Le Baton Pattern"
description: "Un protocole de transmission léger pour les pipelines IA multi-agents. Un petit objet JSON qui transporte le contexte entre les étapes."
category: "Ingénierie"
tags: ["Agents IA", "Design Patterns", "Orchestration"]
readTime: "5 min"
---

## Le Problème

Quand plusieurs agents IA travaillent ensemble dans un pipeline — l'un planifie, l'autre construit, un autre vérifie — ils ont besoin du contexte des étapes précédentes. Mais :

- Transmettre tous les artefacts (code, docs) entre chaque étape **coûte trop de tokens**
- Même avec les artefacts complets, les agents manquent le *pourquoi* — les décisions et contraintes derrière le travail

Sans un mécanisme de transmission structuré, les agents répètent le travail ou contredisent des décisions antérieures.

---

## La Solution

Le **baton** est un petit objet JSON (~1 000 tokens) qui voyage entre les étapes. Chaque agent le lit avant de commencer et le met à jour quand il a terminé.

Pensez-y comme un témoin de course de relais — sauf que celui-ci porte des notes.

---

## Structure

| Champ | Objectif |
|-------|----------|
| `goal` | Objectif en une phrase |
| `current_state` | Ce qui est vrai maintenant |
| `decision_log` | Décisions prises (ajout uniquement) |
| `constraints` | Règles à respecter |
| `open_questions` | Questions non résolues |
| `work_scope` | Fichiers/modules concernés |
| `artifacts` | Références aux sorties produites |
| `acceptance` | Tests/vérifications à passer |

---

## Comment ça marche

### 1. Initialiser

Le baton commence avec un objectif et un état initial.

### 2. Injecter

Avant chaque étape, le baton est injecté dans le prompt de l'agent en markdown.

### 3. Patcher

Après exécution, l'agent retourne un `baton_patch` — seuls les champs modifiés sont mis à jour.

### 4. Répéter

Le baton mis à jour alimente l'étape suivante jusqu'à la fin du workflow.

---

## Baton vs. Artefacts

| | Baton | Artefacts |
|---|---|---|
| **Taille** | ~1 000 tokens | 1k–100k+ tokens |
| **Contenu** | Décisions, état, contraintes | Code, plans, docs |
| **Inclus** | Toujours | Sélectivement |
| **Objectif** | *Pourquoi* et *ce qui compte* | *Ce qui a été produit* |

Le baton dit à l'agent suivant **ce qui s'est passé et pourquoi**. Les artefacts sont le produit du travail.

---

## Choix de Conception

**Décisions en ajout uniquement.** Les décisions antérieures ne sont jamais effacées. Cela évite les contradictions.

**Remplacement pour l'état.** `current_state` est remplacé à chaque fois — il reflète la vérité *actuelle*, pas l'historique.

**Économe en tokens.** À ~1 000 tokens, le baton tient toujours dans le contexte.

**Traçabilité complète.** Chaque patch est enregistré avec un horodatage et un identifiant d'étape.

---

## Quand l'utiliser

Le baton pattern fonctionne pour tout **pipeline IA multi-étapes** où :

- Les agents ont besoin du contexte des étapes précédentes
- Les budgets de tokens sont limités
- Les décisions doivent être cohérentes entre les étapes
- Vous devez tracer l'évolution du contexte

C'est volontairement simple — juste un objet JSON avec des mises à jour merge-patch.
