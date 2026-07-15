---
slug: "no-consumer-no-build"
date: "2026-07-09"
icon: Gauge
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "Pas de consommateur, pas de build"
description: "J'ai audité ma propre flotte et trouvé la chose la plus coûteuse du logiciel : du code qui marche, avec zéro appelant. La règle qui en est sortie, et la discipline qui la fait tenir."
category: "Stratégie"
tags: ["Doctrine opérationnelle", "Solo Builder", "Focus"]
readTime: "2 min"
---

_J'ai lancé un audit vérifié par le code sur mon propre écosystème. La chose la plus coûteuse que j'ai trouvée n'était pas un bug. C'était du logiciel fonctionnel avec zéro appelant._

---

## L'audit

Ce mois-ci, j'ai pointé mon propre tooling sur ma propre flotte. Chaque repo, chaque service, chaque déploiement. Je lui ai demandé de vérifier ce qui tourne vraiment, ce qui appelle vraiment quoi, et ce qui est vraiment consommé.

La chose la plus coûteuse qu'il a trouvée n'était pas un bug. C'était du logiciel fonctionnel avec zéro appelant.

→ Mon service de données d'entreprises belges est live, quatre vraies sources intégrées, moteur d'intelligence construit et testé. **Zéro appelant.** Quatre de ses tables n'ont jamais contenu la moindre ligne.
→ Sur toute ma couche de services : zéro appel inter-services en production. La "plateforme" est un schéma. Les câbles n'existent pas.
→ L'identité de marque : réimplémentée quatre fois. L'auth aussi.
→ Un produit traîne ~5 000 lignes de clients de sources dupliqués. Le service partagé qui les remplace existe. La migration n'a jamais eu lieu.
→ Une plateforme archivée contient ma seule vraie gateway LLM : 1 500 tests, six adaptateurs de providers, un garde-fou budgétaire avec `cost_usd=0.0` hardcodé. Elle a shippé sans jamais rien facturer à personne. À elle-même comprise.

Rien de tout ça n'est cassé. Tout passe ses tests. C'est justement ce qui coûte cher. C'est de l'inventaire déguisé en actifs.

## Le mode d'échec a un nom

Mon mode d'échec n'est jamais le mauvais code. C'est **un nouvel artefact profond en plein trimestre**. Une belle spec, des sprints de scaffolding, puis un pivot qui le rend orphelin.

La sur-spécification donne une sensation de progrès pendant qu'on y est. Les contrats sont élégants. Les tests sont verts. Le README est impeccable. Puis le trimestre tourne, et l'artefact rejoint le musée des choses construites avant leur premier utilisateur.

L'écart entre "vision" et "câblé" n'est pas une impression. Il est mesurable. Zéro appel inter-services, c'est un fait avec un grep derrière.

## La règle

Alors la doctrine a une seule règle porteuse.

**Chaque pièce de plateforme ship contre un besoin d'un produit payant. Pas de consommateur, pas de build.**

Pas "pas de vision". La vision est écrite, versionnée, plus grande que jamais. La règle gouverne le séquencement : l'infrastructure se construit au moment où un vrai produit la tire vers l'existence, et pas un sprint plus tôt.

Le reste existe pour que la règle survive à mon propre enthousiasme.

→ Une limite WIP dure : trois projets actifs. Pas trois par lane. Trois.
→ Un ordre de priorité fixe. La lane cash gagne chaque conflit. La lane produit ship zéro nouvelle fonctionnalité ce trimestre, délibérément. La lane plateforme est strictement sérielle.
→ Chaque chapitre se termine par une démo, pas un document. Rien ne commence avant que le gate précédent passe.
→ Gelé veut dire gelé. La gateway reste gelée jusqu'à ce que des agents dépensent de l'argent sans supervision. Le sunk cost n'achète aucun siège.

## Ce que ça coûte

Cette doctrine a un prix, et je le paie.

Ça veut dire me dire non sur le travail le plus intéressant disponible. Ça veut dire que mon moteur le plus solide reste sous-adopté un trimestre de plus. Ça veut dire regarder du code dupliqué rester là, connu et ticketé. Ça veut dire supprimer du logiciel fonctionnel plutôt que le sauver. C'est la taxe pour l'avoir construit trop tôt.

## L'essentiel

Du code sans appelant n'est pas un actif. C'est une promesse sur le futur qui accumule des intérêts contre vous.

Le fix n'est pas une meilleure architecture. La mienne était très bien. Le fix est une règle de séquencement avec des dents : pas de consommateur, pas de build.

La croissance, c'est ajouter des entreprises et des services. Pas reconstruire les fondations. Pas bâtir des cathédrales avant d'avoir les fidèles.

Si ce fil t'intéresse :

→ [On ne lance pas une entreprise. On prouve une seule boucle.](/blog/proving-one-loop)
