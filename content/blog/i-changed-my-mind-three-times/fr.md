---
slug: "i-changed-my-mind-three-times"
date: "2026-07-09"
icon: Compass
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "J'ai changé d'avis (trois fois)"
description: "En avril, j'ai publié une série de vision sur les harness, le Knowledge OS, les modèles locaux et la robotique. Trois mois plus tard, la moitié est révisée et deux fils ont disparu. Voici le diff honnête — et ce qui a survécu à chaque pivot."
category: "Vision"
tags: ["Systèmes IA", "Build In Public", "Rétrospective"]
readTime: "6 min"
---

_En avril, j'ai publié une série sur la prochaine décennie technologique. Trois mois plus tard, je l'ai relue à côté de ma propre codebase. La moitié a survécu. L'autre moitié, non. Voici le diff._

---

## Pourquoi écrire ça, au fond

La plupart des essais de vision ne sont jamais audités. On publie la grande image, le futur arrive légèrement différent, et personne ne relit l'ancien article — l'auteur moins que quiconque.

J'ai relu le mien. Puis j'ai fait vérifier par mon propre tooling ce que mes repos font réellement aujourd'hui, et j'ai écrit la nouvelle vision contre cette réalité de terrain. Il s'avère que ma pensée a traversé trois ères distinctes, et les documents les plus récents les nomment explicitement. Alors faisons la chose inconfortable : le diff, en public.

---

## Ère 1 : la thèse des deux couches

La première ère est celle du blog : **le harness aide le système à faire, le Knowledge OS l'aide à savoir.**

Deux couches. Un harness d'exécution qui conduit les agents à travers le travail avec des gates et des reviews, et une couche de connaissance qui structure la mémoire et le contexte. Ce cadrage a porté beaucoup : c'est pour ça que mon moteur de connaissance existe, c'est pour ça que mon tooling d'agents existe, et c'est toujours la façon la plus propre que je connaisse d'expliquer pourquoi "prompte mieux" ne scale pas.

## Ère 2 : l'OS unifié

La deuxième ère — ce printemps — a essayé de tout unifier. Un monorepo, un système, des sous-systèmes repliés dans une seule couche opérante. L'architecture d'avril mettait toutes les pièces sous un même toit : `pixl-os` avec les sous-systèmes à l'intérieur.

C'était élégant. C'était aussi l'ère qui a produit mon habitude la plus coûteuse : de beaux contrats, des sprints de scaffolding — puis un pivot qui rend le tout orphelin. J'ai maintenant une plateforme archivée avec 1 500 tests pour le prouver.

## Ère 3 : l'usine à entreprises

La troisième ère est celle où je suis maintenant : pas d'OS unifié, pas de monorepo. **Des services en HTTP.** De petits services étroits, chacun déployable seul, chacun exposant ses capabilities de la même façon, composés par un control plane qui provisionne des entreprises. L'article de vision à ce sujet est un essai à part ; la version courte, c'est que "créer une entreprise" devient un appel d'API et que des agents en opèrent l'essentiel.

La direction monorepo d'avril est morte. Je le dis sans détour parce que je l'ai recommandée par écrit il y a trois mois.

---

## Ce que j'ai abandonné

**Le harness comme produit.** Abandonné, pour l'instant. Celui-là fait mal — c'était la star de l'ère des deux couches. Mais le *pattern* du harness a survécu : son idée centrale, le gate où l'exécution se met en pause pour une décision, s'est généralisée dans le contrat de job que tous les services partagent désormais. Un job peut être `submitted`, `working`, `input-required`, `completed`, `failed`. Cet état `input-required` — un service qui se met en pause pour demander une décision à un humain ou à un agent — c'est le gate du harness, promu de fonctionnalité produit à protocole réseau. Le produit est mort ; l'idée a décroché un poste plus important.

**Le Knowledge OS comme OS.** Rétrogradé, délibérément. En avril, la connaissance était le second pilier de tout. Dans le nouveau modèle, la mémoire est *une capability comme les autres* — consommée via la même interface que "générer un site" ou "chercher une entreprise". Ce qui a remplacé le pilier, c'est une distinction plus tranchante que j'aurais aimé faire un an plus tôt : le **contexte** est curé, petit, versionné — ce que l'entreprise *est*. La **mémoire** est accumulée, volumineuse, retrouvée — ce que l'entreprise *sait*. Les confondre, c'est la raison pour laquelle chaque démo RAG a l'air intelligente et se comporte comme si elle avait bu.

**La robotique.** Disparue de la vision de travail. Pas parce que j'ai cessé de croire à l'essai d'avril — je pense toujours que l'incarnation est l'endroit où les systèmes agentiques deviennent réels, et les chiffres de financement de cette année sont d'accord. Elle a disparu parce que rien dans ma stack actuelle ne la consomme, et que j'ai adopté une règle sans aucune exception : pas de consommateur, pas de build.

**Les modèles locaux et fine-tunés.** Même sort, avec une nuance honnête : le "local" survit comme cible de routing dans le design de la gateway, un provider parmi d'autres. Mais la thèse selon laquelle les modèles locaux spécialisés sont *la couche suivante* ? Pas une ligne de ma plateforme actuelle n'en dépend. L'idée n'est pas fausse. C'est juste pas à moi de la construire cette année.

---

## Ce qui a survécu à chaque pivot

Trois choses ont traversé les trois ères intactes, ce qui signifie probablement que ce sont les vraies convictions :

1. **Les frontières de responsabilité.** La connaissance sait. Le moteur fait. Les services sont des capabilities. Le shell est fin. Chaque ère a redessiné les boîtes ; les frontières entre elles n'ont jamais bougé.
2. **Contract-first.** Pas d'intégration sans contrat partagé. L'enveloppe, le catalogue d'erreurs, le health check, le schéma versionné — cette paperasse ennuyeuse est la seule raison pour laquelle trois ères de pivots n'ont pas produit des gravats.
3. **La fiabilité vient de la structure du système, pas de prompts plus gros.** La plus vieille affirmation de ce blog, et celle que chaque nouvelle sortie de modèle re-confirme. De meilleurs modèles relèvent le plancher. La structure tient le plafond.

---

## La méta-leçon

C'est la publication de la série d'avril qui a rendu cet article peu coûteux à écrire. La vision était versionnée, en public, dans mes propres mots — la réviser est donc un diff, pas une crise d'identité.

Mon mode d'échec n'a jamais été le mauvais code. C'était un nouvel artefact profond en plein trimestre — une belle spec qui me détourne de la chose avec des utilisateurs payants. Nommer les ères, c'est comme ça que je l'attrape maintenant : quand je sentirai l'ère quatre arriver, je demanderai ce qu'elle consomme, qui la paie, et quelle démo la conditionne.

Des opinions fortes, versionnées. C'est toute la méthode.
