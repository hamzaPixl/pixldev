---
slug: "no-consumer-no-build"
date: "2026-07-09"
icon: Gauge
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Pas de consommateur, pas de build"
description: "J'ai audité mon propre écosystème et trouvé l'état le plus coûteux du logiciel : construit, testé, déployé — et zéro appelant. La règle opérationnelle qui en est sortie, et la discipline qui la fait tenir."
category: "Stratégie"
tags: ["Doctrine opérationnelle", "Solo Builder", "Focus"]
readTime: "5 min"
---

_J'ai lancé un audit vérifié par le code sur mon propre écosystème. La chose la plus coûteuse que j'ai trouvée n'était pas un bug. C'était du logiciel fonctionnel avec zéro appelant._

---

## L'audit

Ce mois-ci, j'ai pointé mon propre tooling sur ma propre flotte — chaque repo, chaque service, chaque déploiement — et je lui ai demandé de vérifier ce qui tourne réellement, ce qui appelle réellement quoi, et ce qui est réellement consommé.

Morceaux choisis :

- Mon service de données d'entreprises belges est live, avec quatre vraies sources de données intégrées. Son moteur d'intelligence — comparaison, historique, timeline — est construit et testé. **Il a zéro appelant.** Quatre de ses tables n'ont jamais contenu la moindre ligne.
- Sur toute ma couche de services : **zéro appel inter-services en production.** La "plateforme" est un schéma ; les câbles n'existent pas.
- L'identité de marque est réimplémentée **quatre fois**. L'auth aussi.
- Un produit traîne ~5 000 lignes de clients de sources de données dupliqués qu'un service partagé était censé remplacer. Le service partagé existe. La migration n'a jamais eu lieu.
- Une plateforme archivée contient ma seule vraie gateway LLM — 1 500 tests, six adaptateurs de providers, et un garde-fou budgétaire avec `cost_usd=0.0` hardcodé. Elle a shippé sans jamais rien facturer à qui que ce soit, y compris à elle-même.

Rien de tout ça n'est du code cassé. Tout passe ses tests. C'est justement ce qui coûte cher : c'est de l'inventaire qui ressemble à des actifs.

---

## Le mode d'échec a un nom

En lisant l'audit, le pattern était d'une constance embarrassante. Mon mode d'échec n'est jamais le mauvais code. C'est **un nouvel artefact profond en plein trimestre** — une belle spec, des sprints de scaffolding, puis un pivot qui rend le tout orphelin.

La sur-spécification donne une sensation de progrès pendant qu'on y est. Les contrats sont élégants. Les tests sont verts. Le README est impeccable. Et puis le trimestre tourne, les priorités bougent, et l'artefact rejoint le musée des choses construites avant leur premier utilisateur.

L'audit m'a donné le chiffre dont j'avais besoin pour arrêter de négocier avec moi-même : l'écart entre "vision" et "câblé" n'est pas une impression, il est mesurable. Zéro appel inter-services, ce n'est pas un désaccord stratégique. C'est un fait avec un grep derrière.

---

## La règle

La nouvelle doctrine opérationnelle a donc une règle porteuse :

**Chaque pièce de plateforme ship contre un besoin d'un produit payant. Pas de consommateur, pas de build.**

Pas "pas de vision" — la vision est écrite, versionnée, et plus grande que jamais. La règle gouverne le *séquencement* : l'infrastructure se construit au moment où un vrai produit la tire vers l'existence, et pas un sprint plus tôt.

Le reste de la discipline existe pour que la règle survive au contact de mon propre enthousiasme :

- **Une limite WIP dure : trois projets actifs. Point.** Pas trois par lane. Trois.
- **Des lanes avec un ordre de priorité fixe.** La lane cash — le travail client avec une facture attachée — gagne chaque conflit. La lane produit tourne en pilote automatique : mon produit principal ne ship aucune nouvelle fonctionnalité ce trimestre, délibérément. La lane plateforme est strictement sérielle.
- **Chaque chapitre se termine par une démo, et aucun chapitre ne commence avant que le gate précédent passe.** Pas un document — une démo. Un kit de service est terminé quand une nouvelle capability passe de l'idée à un service déployé, protégé par clé, appelable par agent, en un après-midi. La couche d'identité est terminée quand un agent qui lit le workspace X reçoit un 403 propre sur le workspace Y, avec le même correlation id dans les deux logs.
- **Gelé veut dire gelé, avec une condition de réentrée écrite.** La gateway LLM est gelée jusqu'à ce que des agents commencent à dépenser de l'argent sans supervision — c'est un mécanisme de sécurité, pas un dashboard, et les mécanismes de sécurité se construisent quand le danger existe. Mon vieux moteur d'agents est au garage, et la formulation de mon propre doc de planning est celle qu'il me faudrait sur une affiche : **le sunk cost n'achète aucun siège.**

---

## Ce que ça coûte

Section honnêteté : cette doctrine a un prix, et je le paie.

Ça veut dire me dire "non" sur le travail le plus intéressant disponible. La gateway est la pièce intellectuellement la plus séduisante de toute la plateforme, et elle est explicitement gelée. Ça veut dire que mon moteur le plus solide reste sous-adopté un trimestre de plus, parce que l'adoption suit le plan sériel, pas ma fierté. Ça veut dire regarder du code dupliqué rester là, connu et ticketé, parce que la migration est planifiée derrière un gate de démo.

Et ça veut dire accepter que certaines choses construites n'auront jamais leur consommateur, et seront supprimées plutôt que sauvées. Supprimer du logiciel fonctionnel, c'est la taxe pour l'avoir construit trop tôt.

---

## L'essentiel

L'audit a trouvé l'état le plus coûteux du logiciel : construit, mais pas câblé. Du code sans appelant n'est pas un actif — c'est une promesse sur le futur qui accumule des intérêts contre vous.

Le fix n'est pas une meilleure architecture. La mienne était déjà bien. Le fix est une règle de séquencement avec des dents : pas de consommateur, pas de build ; chaque chapitre conditionné par une démo ; le sunk cost n'achète aucun siège.

La croissance, c'est ajouter des entreprises et des services — pas reconstruire les fondations, et pas bâtir des cathédrales avant d'avoir les fidèles.
