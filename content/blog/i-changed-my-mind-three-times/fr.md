---
slug: "i-changed-my-mind-three-times"
date: "2026-07-09"
icon: Compass
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "J'ai changé d'avis (trois fois)"
description: "En avril, j'ai publié une série de vision. Trois mois plus tard, la moitié est révisée et deux fils ont disparu. Voici le diff honnête, et ce qui a survécu à chaque pivot."
category: "Vision"
tags: ["Systèmes IA", "Build In Public", "Rétrospective"]
readTime: "3 min"
---

_En avril, j'ai publié une série sur la prochaine décennie technologique. Trois mois plus tard, je l'ai relue à côté de ma propre codebase. La moitié a survécu. L'autre moitié, non. Voici le diff._

---

## Pourquoi écrire ça

La plupart des essais de vision ne sont jamais audités. On publie la grande image, le futur arrive un peu différent, et personne ne relit le vieil article. L'auteur encore moins que les autres.

J'ai relu le mien. Puis j'ai fait vérifier par mon propre tooling ce que mes repos font vraiment aujourd'hui, et j'ai écrit la nouvelle vision contre cette réalité de terrain. Ma pensée s'est révélée avoir trois ères distinctes. Alors faisons la chose inconfortable : le diff, en public.

## Ère 1 : deux couches

Celle du blog : **le harness aide le système à faire, le Knowledge OS l'aide à savoir.**

Un harness d'exécution qui conduit les agents à travers le travail avec des gates et des reviews. Une couche de connaissance qui structure la mémoire et le contexte. Ce cadrage a beaucoup porté. C'est pour ça que mon moteur de connaissance existe, pour ça que mon tooling d'agents existe, et c'est toujours la façon la plus propre que je connaisse d'expliquer pourquoi "prompte mieux" ne scale pas.

## Ère 2 : l'OS unifié

Ce printemps, j'ai essayé de tout unifier. Un monorepo, un système, des sous-systèmes repliés sous un seul toit : `pixl-os`.

C'était élégant. C'était aussi mon habitude la plus coûteuse : de beaux contrats, des sprints de scaffolding, puis un pivot qui rend le tout orphelin. J'ai maintenant une plateforme archivée avec 1 500 tests pour le prouver.

## Ère 3 : l'usine à entreprises

Là où je suis maintenant. Pas d'OS unifié, pas de monorepo. **Des services en HTTP.** De petits services étroits, chacun déployable seul, chacun exposant ses capabilities de la même façon, composés par un control plane qui provisionne des entreprises. "Créer une entreprise" devient un appel d'API, et des agents en opèrent l'essentiel.

La direction monorepo d'avril est morte. Je le dis sans détour, parce que je l'ai recommandée par écrit il y a trois mois.

## Ce que j'ai abandonné

**Le harness comme produit.** Abandonné, pour l'instant. Celui-là fait mal. Mais le *pattern* du harness a survécu. Le gate où l'exécution se met en pause pour une décision s'est généralisé dans le contrat de job que tous les services partagent désormais : `submitted`, `working`, `input-required`, `completed`, `failed`. Cet état `input-required`, c'est le gate du harness, promu de fonctionnalité produit à protocole réseau. Le produit est mort. L'idée a décroché un poste plus important.

**Le Knowledge OS comme OS.** Rétrogradé, délibérément. La mémoire est maintenant une capability comme les autres, consommée via la même interface que "générer un site". Ce qui a remplacé le pilier, c'est une distinction que j'aurais aimé faire un an plus tôt. Le **contexte** est curé, petit, versionné : ce que l'entreprise *est*. La **mémoire** est accumulée, volumineuse, retrouvée : ce que l'entreprise *sait*. Les confondre, c'est pourquoi chaque démo RAG a l'air intelligente et se comporte comme si elle avait bu.

**La robotique.** Disparue de la vision de travail. Je pense toujours que l'incarnation est l'endroit où les systèmes agentiques deviennent réels, et les chiffres de financement de cette année sont d'accord. Elle a disparu parce que rien dans ma stack ne la consomme, et j'ai une règle sans aucune exception : pas de consommateur, pas de build.

**Les modèles locaux.** Même sort. Le "local" survit comme cible de routing dans la gateway, un provider parmi d'autres. Mais la thèse selon laquelle les modèles locaux spécialisés sont *la couche suivante* ? Pas une ligne de ma plateforme n'en dépend. L'idée n'est pas fausse. C'est juste pas à moi de la construire cette année.

## Ce qui a survécu

Trois choses ont traversé les trois ères, ce qui signifie probablement que ce sont les vraies convictions :

→ **Les frontières de responsabilité.** La connaissance sait. Le moteur fait. Les services sont des capabilities. Le shell est fin. Chaque ère a redessiné les boîtes. Les frontières n'ont jamais bougé.
→ **Contract-first.** Pas d'intégration sans contrat partagé. L'enveloppe, le catalogue d'erreurs, le health check, le schéma versionné. Cette paperasse ennuyeuse est la seule raison pour laquelle trois ères de pivots n'ont pas produit des gravats.
→ **La fiabilité vient de la structure, pas de prompts plus gros.** La plus vieille affirmation de ce blog. De meilleurs modèles relèvent le plancher. La structure tient le plafond.

## La méta-leçon

C'est la publication de la série d'avril qui a rendu cet article peu coûteux à écrire. La vision était versionnée, en public, dans mes propres mots. La réviser est un diff, pas une crise d'identité.

Mon mode d'échec n'a jamais été le mauvais code. C'était une belle spec en plein trimestre, qui me détourne de la chose avec des utilisateurs payants. Nommer les ères, c'est comme ça que je l'attrape : quand je sentirai l'ère quatre arriver, je demanderai ce qu'elle consomme, qui la paie, et quelle démo la conditionne.

Des opinions fortes, versionnées. C'est toute la méthode.
