---
slug: "the-technical-stack-behind-my-ai-projects"
date: "2026-04-08"
icon: Cog
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "La stack technique derrière mes projets IA : Harness + Knowledge OS"
description: "Un regard technique sur les deux couches centrales de mon système IA : le harness qui pilote l'exécution et le Knowledge OS qui structure la mémoire et le contexte d'entreprise."
category: "Ingénierie"
tags: ["Harness", "Knowledge OS", "Architecture IA"]
readTime: "8 min"
---

Dans mon précédent article, j'expliquais que l'IA devient réellement utile lorsqu'elle est intégrée dans un système, et non utilisée comme un simple outil isolé.

Cet article en est la suite technique.

Je veux présenter, à un niveau volontairement élevé, les deux couches centrales sur lesquelles je m'appuie derrière la plupart des projets que je construis :

- un **harness**, qui pilote l'exécution
- un **Knowledge OS**, qui structure le contexte, la mémoire et l'information d'entreprise

Je ne vais pas publier chaque détail d'implémentation, chaque prompt ou chaque convention interne. Ce serait inutile et, dans certains cas, peu responsable. En revanche, je peux expliquer l'architecture assez clairement pour qu'un lecteur technique comprenne la logique du système.

La version courte est simple :

> Le harness est le système d'exécution.
> Le Knowledge OS est le système de mémoire.

Ensemble, ils forment la couche de base que j'utilise pour construire des produits, piloter des boucles de delivery et organiser l'information à l'échelle d'une entreprise.

## Pourquoi je sépare le problème en deux

La plupart des systèmes IA mélangent trop de responsabilités dans une seule couche.

Ils demandent à un modèle de comprendre le contexte, planifier, exécuter, s'évaluer, se souvenir de ce qui s'est passé, et rester aligné avec les règles d'entreprise, le tout dans une conversation floue. Cela fonctionne pour des démos. Cela tient mal dans la durée.

Je préfère séparer les responsabilités.

Un système est responsable de **faire avancer le travail**.

Un autre système est responsable de **rendre le bon contexte disponible**.

Cette séparation paraît simple, mais elle change profondément la suite. L'exécution peut devenir itérative et mesurable. Le contexte peut devenir persistant et structuré. Et l'ensemble devient beaucoup plus facile à raisonner.

## Le Harness : l'exécution comme boucle contrôlée

Le harness est la partie qui transforme une demande produit assez brute en workflow de delivery itératif.

Conceptuellement, ce n'est pas juste "générer du code". C'est une boucle avec des étapes distinctes et un gating explicite.

À haut niveau, le flux ressemble à ceci :

| Étape | Responsabilité |
|---|---|
| Plan | Étendre un prompt court en spécification produit structurée |
| Generate | Construire ou améliorer l'application à partir de cette spécification |
| Evaluate | Inspecter le résultat en cours d'exécution et le noter selon des critères explicites |
| Gate | Décider si le système doit s'arrêter, itérer ou escalader |

Cette structure est importante, car elle évite qu'un même agent ne corrige et valide son propre travail sans contrôle réel.

Le planner crée une spec. Le generator construit à partir de cette spec. L'evaluator vérifie l'application réellement en cours d'exécution. Puis une porte déterministe décide si la qualité est suffisante.

C'est une manière bien plus utile de penser le problème que "un agent construit une app".

## Pourquoi la couche d'évaluation compte

Le choix d'architecture le plus important dans le harness est la séparation entre génération et évaluation.

Beaucoup de systèmes IA échouent parce qu'ils optimisent la complétion plutôt que la qualité. Ils produisent quelque chose qui a l'air terminé, puis s'arrêtent. Le problème, c'est que "fini" et "bon" ne sont pas synonymes.

Dans mon setup, l'evaluator note le résultat sur plusieurs axes, notamment :

- qualité du design
- originalité
- craft
- fonctionnalité

Ce point est crucial, car la correction technique seule ne suffit pas pour un vrai travail produit. Un système peut compiler et malgré tout rester générique, fragile ou médiocre.

Le harness force ces dimensions à exister dans la boucle au lieu de les traiter comme une finition facultative.

## Une itération a besoin de règles, pas juste de retries

Autre chose que je ne fais pas confiance : la répétition aveugle.

Si un workflow se contente de réessayer jusqu'à avoir de la chance, ce n'est pas un système. C'est une dérive coûteuse.

Le harness inclut donc une logique d'arrêt explicite. Si les scores passent le seuil, la boucle s'arrête. Si le système échoue sans amélioration réelle, il détecte la stagnation. Si le generator déclare qu'il est bloqué, le workflow escalade au lieu de simuler un faux progrès.

C'est ce qui distingue une boucle gadget d'une boucle réellement exploitable.

## L'état doit survivre à la boucle

L'une des exigences pratiques de tout système itératif est la continuité de l'état.

Chaque itération doit savoir quel est l'objectif, ce qui s'est déjà passé, ce qui a échoué, et ce que l'evaluator demande de changer ensuite. Sans cela, chaque cycle repart partiellement à zéro et la qualité devient instable.

C'est pourquoi le harness transporte un état structuré entre les étapes. Cet état ne se limite pas aux artefacts produits. Il inclut aussi les signaux de qualité, les hints par étape, les contraintes et l'état courant.

Cela permet au generator de revenir dans la boucle avec une critique ciblée, au lieu de reconstruire tout depuis le début.

## Le Knowledge OS : le contexte comme système d'exploitation

Si le harness concerne l'exécution, le Knowledge OS concerne tout ce dont l'exécution dépend.

L'objectif n'est pas de créer un dossier de fichiers avec une recherche sémantique ajoutée par-dessus. L'objectif est de construire un système capable d'ingérer, organiser, retrouver, relier, compiler et maintenir la connaissance dans le temps.

Autrement dit, la connaissance doit être traitée comme une couche active, pas comme un stockage passif.

À haut niveau, le Knowledge OS combine plusieurs briques :

- gestion documentaire
- versioning
- retrieval
- extraction d'entités
- cartographie des relations
- détection de conflits
- synthèse et compilation
- accès agentique via outils et API

La partie intéressante n'est pas une fonctionnalité isolée. C'est le fait que tout cela fonctionne ensemble dans un système scoped par workspace.

## Pourquoi un RAG simple ne suffit pas

Beaucoup d'équipes s'arrêtent à la recherche vectorielle et appellent cela une couche de connaissance.

C'est utile, mais insuffisant si l'objectif est de soutenir de vraies opérations d'entreprise.

La raison est simple : la connaissance d'entreprise n'est pas seulement une collection de chunks. Elle contient des entités, des relations, des décisions, des contradictions, des responsabilités et de l'historique. Si l'on ne récupère que des fragments par similarité, on perd trop de contexte opérant.

C'est pourquoi le Knowledge OS est pensé comme un système de retrieval en plusieurs couches.

Il commence par la recherche, mais ne s'arrête pas là.

## Des documents vers une connaissance structurée

Le Knowledge OS traite les documents comme une entrée brute, pas comme une forme finale.

Une fois qu'un contenu entre dans le système, il peut être indexé, relié à des entités, parcouru via des relations, vérifié pour détecter des conflits, compilé en pages de synthèse, puis réexposé via API et outils.

Cela change complètement le rôle de la base de connaissance.

Au lieu d'être une archive que l'on interroge quand on est bloqué, elle devient un substrat sur lequel le reste du système peut raisonner.

## Le versioning compte plus qu'on ne le pense

Un choix d'architecture auquel je tiens beaucoup est le versioning.

La connaissance change. Les décisions d'entreprise évoluent. Les documents sont réécrits. Les hypothèses deviennent obsolètes.

Si un système de connaissance ne peut pas suivre proprement ces changements, il devient difficile à faire confiance. C'est pourquoi le Knowledge OS traite l'historique comme une fonctionnalité de premier plan, et non comme un détail secondaire.

## L'accès multi-agents demande des outils structurés

Autre point important : le Knowledge OS n'est pas seulement une interface pour les humains. C'est aussi une couche d'accès pour des agents.

Cela signifie que les agents ont besoin de moyens structurés pour chercher, lire, créer, mettre à jour, compiler et récupérer du contexte depuis le système. Si cet accès reste ad hoc, la qualité globale chute très vite.

C'est ainsi que le système commence à ressembler moins à un chatbot et davantage à de l'infrastructure.

## Comment les deux couches travaillent ensemble

Le harness et le Knowledge OS résolvent des problèmes différents, mais ils se renforcent mutuellement.

Le harness répond à la question :

> Comment le travail avance-t-il avec un vrai contrôle qualité ?

Le Knowledge OS répond à la question :

> Comment le système sait-il assez de choses pour faire ce travail avec contexte ?

Autrement dit :

| Couche | Rôle principal |
|---|---|
| Harness | Planifier, générer, évaluer, itérer et gate l'exécution |
| Knowledge OS | Stocker, structurer, retrouver, compiler et faire évoluer le contexte |

Quand ces deux couches sont reliées, on obtient bien plus qu'un agent avec un prompt.

On obtient un système d'exécution capable d'opérer sur un contexte persistant.

## Ce que je garde volontairement privé

Il y a une différence entre expliquer une architecture et publier chaque levier interne.

Je suis à l'aise pour partager le design général du système : séparation des étapes, itération gated, signaux de qualité, retrieval multicouche, graphes de connaissance, accès par outils, mémoire versionnée.

Ce que je n'ai pas envie de publier en détail, ce sont la pile complète de prompts, chaque heuristique d'évaluation, chaque convention interne, ou les détails opératoires qui rendent le système robuste en usage réel.

Ce n'est pas une façon d'être vague. C'est une manière de tracer une frontière raisonnable entre transparence technique utile et exposition inutile.

## Dernière idée

S'il fallait résumer l'architecture très simplement, je dirais ceci :

Le harness aide le système à **faire**.
Le Knowledge OS aide le système à **savoir**.

Une exécution sans connaissance structurée devient superficielle.

Une connaissance sans harness d'exécution reste passive.

Assemblés, ces deux systèmes forment une base beaucoup plus solide pour construire des produits, piloter des workflows internes et organiser l'intelligence d'entreprise à une échelle réellement exploitable.
