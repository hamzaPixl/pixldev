---
slug: "the-company-is-an-api-call"
date: "2026-07-09"
icon: Factory
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "L'entreprise est un appel d'API"
description: "Ce que je construis réellement n'est pas un ensemble d'outils. C'est une usine à entreprises : une plateforme où créer une entreprise provisionne l'identité, le contexte, la mémoire, un budget IA et un ensemble de services IA étroits — et où l'entreprise est ensuite opérée principalement par des agents."
category: "Vision"
tags: ["Entreprise AI-native", "Agents", "Plateforme"]
readTime: "6 min"
---

_Ce que je construis n'est pas un ensemble d'outils. C'est une usine à entreprises. La démo vers laquelle je travaille tient en une commande : créer une entreprise, et des agents produisent sa marque, son site web, son audit SEO et sa première campagne — avec chaque euro comptabilisé._

---

## Le recadrage

Depuis deux ans, je construis des produits : une plateforme de facturation pour les PME belges, un moniteur de conformité, une API de données d'entreprises belges, un studio de contenu IA, un moteur de connaissance. Chacun utile. Chacun construit presque entièrement from scratch. Chacun réimplémentant les cinq mêmes choses.

Quelque part autour de la quatrième réimplémentation de "l'identité de marque", je me suis arrêté et j'ai nommé le pattern.

Ce que je construis n'est pas un ensemble d'outils. C'est une **usine à entreprises** — une plateforme où "créer une entreprise" est un appel d'API qui provisionne l'identité, le contexte, la mémoire, un budget IA et un ensemble de services IA étroits, et où l'entreprise est ensuite *opérée* principalement par des agents.

Toute entreprise digitale a besoin des cinq mêmes choses :

1. **Identité** — qui existe : l'entreprise, ses workspaces, ses humains, ses agents, leurs clés.
2. **Contexte** — ce que l'entreprise *est* : marque, ton, offre, contraintes. Curé, petit, versionné.
3. **Mémoire** — ce que l'entreprise *sait* : historique, documents, décisions. Accumulée, volumineuse, retrouvée.
4. **Intelligence** — l'accès aux modèles avec des budgets, du routing et un vrai ledger.
5. **Capabilities** — des services étroits qui font le vrai travail : générer un site, auditer le SEO, produire du contenu, chercher une entreprise, envoyer une facture.

Les produits que les gens voient — Feen, Syncco, la prochaine venture — deviennent des surfaces fines et brandées au-dessus de ces services. Grandir ne veut plus dire "reconstruire les fondations encore une fois". Grandir = ajouter des entreprises et des services.

---

## L'agent est un employé

La décision la plus AI-native de ce modèle n'est pas un choix de modèle. C'est un choix d'organigramme.

Les agents sont des acteurs de premier rang, pas de l'automatisation anonyme. Un agent a une ligne d'identité dans la base, comme un humain. Il détient des credentials. Il a un budget. Il appelle les mêmes services via les mêmes contrats. Il laisse une trace auditable.

L'organigramme de la prochaine entreprise, ce sont littéralement des lignes dans une base de données.

Cela sonne philosophique jusqu'à ce qu'on regarde ce que ça corrige. Aujourd'hui, quand une fonctionnalité IA tourne, la question "quel agent a dépensé 4 € sur la campagne de qui ?" est sans réponse dans la plupart des stacks — la clé d'API est partagée, le coût dort dans le dashboard d'un provider, l'action n'est pas attribuée. Dans le modèle usine, cette question tient en une requête sur un correlation id.

Et les budgets cessent d'être une angoisse de tableur. L'agent *tombe à court d'argent comme un employé*, au lieu de brûler silencieusement le compte API à 3 h du matin. Quand le budget est épuisé, la gateway refuse l'appel. La paie, version logiciel.

---

## Capability-first, UI à la demande

La deuxième doctrine : **réduire l'UI, renforcer les capabilities.** L'agent est l'utilisateur principal ; les écrans existent pour la confiance et la collecte d'informations, pas pour le travail.

Chaque service expose ses capabilities de la même manière — même enveloppe, même auth, même health check, même catalogue d'erreurs — en HTTP pour les produits, en MCP pour les agents. Une capability, définie une fois comme un schéma plus un handler, appelable à l'identique par une web app, un terminal ou une boucle d'agent.

Je n'ai pas dessiné ce pattern sur un tableau blanc. Je l'ai trouvé dans ma propre flotte. Bumpi, mon studio de contenu, a été construit avec un registre de capabilities qui expose automatiquement chaque capability en HTTP, en MCP et dans une boucle d'agent — et il s'est avéré être l'implémentation de référence de toute la plateforme avant même que la plateforme ait un nom. Chaque pattern porteur de la vision tourne déjà en production quelque part. Je généralise, je n'invente pas.

La métrique de succès est brute : **le pourcentage de fonctionnalités appelables par un agent.** Aujourd'hui, sur l'ensemble de ma flotte, ce chiffre tourne autour de 20 %. L'objectif est de rendre banal de dire 100 %.

---

## L'état honnête

Ceci est un article de vision, donc voici exactement ce qui en existe au 2026-07-09 :

- **Les services existent. La couche, non.** J'ai lancé un grep : zéro appel inter-services en production. La marque est réimplémentée quatre fois. L'identité, quatre fois. Les deux douleurs qui motivent la plateforme sont des faits mesurés, pas de la théorie.
- **La gateway LLM — la pièce maîtresse — existe à peine.** Le seul vrai code de gateway dort dans un projet archivé, sous forme de librairie, avec `cost_usd=0.0` hardcodé. Mon système de budget croit actuellement que tout est gratuit.
- **Le meilleur moteur est sous-adopté.** Mon service de connaissance est la pièce la plus solide de la flotte et presque rien ne le consomme encore.
- **Deux produits prouvent le modèle manuellement.** Feen et Syncco fonctionnent — mais des humains les ont câblés, service par service.

Le plan du trimestre est strictement sériel, chaque chapitre conditionné par une démo : un kit de service standard qui transforme "une capability" en "un service déployé, protégé par clé, appelable par agent" en un après-midi ; puis l'identité et le contexte comme control plane ; puis recouler les services existants dans le moule ; puis la gateway avec un vrai ledger.

Le gate final est la démo fondatrice : `nuva co create testco` — et des agents produisent la marque, le site, l'audit SEO et la première campagne, de bout en bout, avec zéro fuite entre workspaces et un coût par artefact lisible dans le ledger.

---

## L'essentiel

Feen et Syncco prouvent le modèle manuellement. La prochaine entreprise naît sur la plateforme dès le premier jour.

C'est toute la vision. Pas de plus gros modèles, pas plus de prompts — une usine où l'identité, le contexte, la mémoire, l'intelligence et les capabilities sont provisionnés comme de l'infrastructure, et où les premiers employés sont des agents avec un badge et un budget.

L'entreprise est un appel d'API. Le reste, c'est de l'opérationnel.
