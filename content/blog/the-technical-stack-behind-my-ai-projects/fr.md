---
slug: "the-technical-stack-behind-my-ai-projects"
date: "2026-04-08"
icon: Cog
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Sous le capot : harness + Knowledge OS"
description: "Deux couches sous presque tout ce que je construis : un harness qui pilote l'exécution et un Knowledge OS qui structure le contexte. La forme et le raisonnement, pas le plan détaillé."
category: "Ingénierie"
tags: ["Harness", "Knowledge OS", "Architecture IA"]
readTime: "3 min"
---

_Mon précédent article défendait une idée : l'IA ne paie que dans un système. Voici la suite technique. Deux couches sous presque tout ce que je construis. Franc, mais gardé._

---

Presque tout ce que je livre repose sur deux couches.

→ un **harness** qui pilote l'exécution
→ un Knowledge OS qui fournit le contexte

Je les sépare volontairement. Je ne veux pas que planification, mémoire, retrieval et jugement s'écrasent dans un seul long prompt. Chaque couche a un seul rôle.

Le harness fait avancer le travail. Le Knowledge OS s'assure que le système en sait assez pour bien le faire.

## Le harness

Le harness est une boucle, pas une simple étape de génération.

Quatre étapes, dans l'ordre :

→ Plan : transformer la demande en vraie spec.
→ Generate : construire à partir de cette spec.
→ Evaluate : inspecter le résultat réel.
→ Gate : arrêter, itérer ou escalader.

Tout est dans la **séparation entre construire et juger.** La couche qui produit n'est pas celle qui décide que c'est assez bon. Cet écart, c'est l'essentiel de la distance entre un agent de démo et quelque chose qui tient deux fois.

Il doit aussi savoir s'arrêter. Si les scores plafonnent, si le même correctif revient, si le generator se déclare bloqué, itérer encore ne fait que coûter. Changer d'approche ou escalader. C'est une décision système, pas un prompt.

Et l'état doit survivre à la boucle. Objectif, statut, critique, contraintes, tout se transporte entre les étapes. Sans cette continuité, chaque passe redécouvre le même contexte, et l'itération devient du théâtre avec une barre de progression.

## Le Knowledge OS

Si le harness est l'exécution, le Knowledge OS est le contexte.

La connaissance d'une entreprise n'est pas un dossier avec un chat greffé dessus. Ce sont des documents, des entités, des relations, des décisions, des contradictions, et une vérité qui change.

Alors je le **traite comme une structure, pas une recherche.** À haut niveau : ingestion, retrieval, extraction d'entités, cartographie des relations, détection de conflits, synthèse, et accès propre pour les agents.

Les documents sont une entrée brute, pas une forme finale. Une fois qu'un contenu entre, il est indexé, relié à des entités, parcouru via des relations, vérifié pour les conflits, compilé en pages de synthèse, puis réexposé via des outils. La base de connaissance cesse d'être une archive qu'on interroge quand on est bloqué et devient un substrat sur lequel le reste du système peut raisonner.

La recherche par similarité seule ne suffit pas. Un retrieval utile est en couches : transformation de requête, ranking hybride, expansion par graphe, reranking, vraies citations. C'est la différence entre récupérer du texte et récupérer du contexte exploitable.

Et le versioning est central, pas un confort. Les documents changent, les décisions changent, les équipes changent. Une mémoire incapable de montrer cette évolution perd vite la confiance.

## Où je m'arrête

Je décris la forme : les deux couches, les rôles, le raisonnement.

Je ne publie pas les prompts, les heuristiques, les conventions au plus près du levier de production.

Pas pour faire mystère. C'est la frontière entre partager le design et livrer la machine.

## Une phrase

Le harness aide le système à **faire**. Le Knowledge OS l'aide à **savoir**.

Une exécution sans contexte structuré reste superficielle. Un contexte sans exécution reste passif.

Assemblés, ils commencent à valoir la peine qu'on construise dessus.
