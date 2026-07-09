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
description: "Un petit objet JSON qui transporte décisions et contraintes entre les étapes d'un pipeline IA multi-agents."
category: "Ingénierie"
tags: ["Agents IA", "Design Patterns", "Orchestration"]
readTime: "2 min"
---

_Trois agents dans un pipeline doivent savoir ce que les autres ont décidé. Le baton est leur façon de l'apprendre, sans se renvoyer le travail._

---

## Le problème

Mettez trois agents dans un pipeline. L'un planifie, l'autre construit, un autre vérifie. Chacun doit savoir ce que les autres ont fait.

Pas la transcription complète. L'essentiel : ce qui est décidé, ce qui est figé, ce qui reste ouvert.

Deux façons de rater ça.

→ Vous transmettez tous les artefacts entre les étapes, et vous **brûlez des tokens** sur du contexte que personne ne relit.
→ Vous ne transmettez rien de structuré, et l'agent suivant rate le _pourquoi_ : les décisions, les contraintes, les raisons derrière le travail.

Alors les agents répètent le travail. Ou pire : ils contredisent une décision prise deux étapes plus tôt, et personne ne le remarque avant la mise en prod.

## Le baton

La solution est petite. Un objet JSON, environ 1 000 tokens, qui voyage avec le travail.

Chaque agent le lit avant de commencer. Le met à jour quand il a fini. Le passe au suivant.

C'est un témoin de relais qui a pris des notes.

Assez petit pour toujours l'envoyer. Assez structuré pour valoir la lecture. Les champs :

| Champ | Objectif |
|-------|----------|
| `goal` | Objectif en une phrase |
| `current_state` | Ce qui est vrai maintenant |
| `decision_log` | Décisions prises (ajout uniquement) |
| `constraints` | Règles strictes à respecter |
| `open_questions` | Questions non résolues |
| `work_scope` | Fichiers/modules concernés |
| `artifacts` | Références aux sorties produites |
| `acceptance` | Tests/vérifications à passer |

## Comment il circule

**Initialiser** avec un objectif et un état de départ. L'injecter en markdown dans le prompt de chaque agent avant l'étape. Après l'étape, l'agent retourne un `baton_patch` : seuls les champs modifiés. Le baton fusionné alimente l'étape suivante. Répéter jusqu'à la fin du workflow.

Voilà tout le protocole. Pas de bus de messages, pas de base partagée, pas de framework.

## Les choix qui comptent

`decision_log` est en ajout uniquement. Les décisions antérieures ne sont jamais effacées, donc un agent plus tardif ne peut pas les inverser en douce.

`current_state` est l'inverse. Remplacé à chaque patch, parce qu'il doit se lire comme vrai maintenant, pas comme un journal intime.

Chaque patch est estampillé avec un identifiant d'étape et un horodatage. Quand la sortie est fausse, vous lisez exactement où le contexte a dévié.

À ~1 000 tokens, il tient toujours. Le baton est la partie bon marché du pipeline.

## La limite honnête

Le baton transporte du contexte, pas des preuves. Il dit à l'agent suivant ce qui s'est passé et pourquoi. Il ne dit pas que le travail était bon. C'est le rôle d'`acceptance` et des artefacts eux-mêmes.

Aucun protocole ne rend bon un mauvais plan. Il empêche juste un bon contexte de se perdre.

Utilisez-le quand les étapes dépendent les unes des autres, que les budgets sont serrés, et que les décisions doivent tenir sur toute la chaîne.

Petit objet. Mises à jour merge-patch. Une façon de moins pour un pipeline de se mentir à lui-même.
