---
slug: "the-company-is-an-api-call"
image: "/illustrations/blog/the-company-is-an-api-call.jpg"
date: "2026-07-09"
icon: Factory
authors:
  - name: "Hamza Mounir"
    linkedin: "https://www.linkedin.com/in/hamza-mounir-0a7bb6139/"
title: "L'entreprise est un appel d'API"
description: "Ce que je construis, ce n'est pas une boîte à outils. C'est une usine à entreprises : une commande provisionne l'identité, le contexte, la mémoire, un budget IA et des services, puis des agents font tourner la boutique."
category: "Vision"
tags: ["Entreprise AI-native", "Agents", "Plateforme"]
readTime: "4 min"
---

_Ce que je construis, ce n'est pas une boîte à outils. C'est une usine à entreprises : une commande crée une entreprise, et des agents produisent sa marque, son site, son audit SEO, sa première campagne. Chaque euro tracé._

---

## Le recadrage

Deux ans à construire des produits : de la facturation pour PME belges, un moniteur de conformité, une API de données d'entreprise, un studio de contenu, un moteur de connaissance. Chacun utile. Chacun reparti de zéro. Chacun réimplémentant les cinq mêmes choses.

Vers la quatrième fois où j'ai reconstruit « l'identité de marque » à partir de rien, je me suis arrêté et j'ai nommé le motif.

Ce que je construis, ce n'est pas une boîte à outils. C'est une **usine à entreprises**. « Créer une entreprise » devient un appel d'API qui provisionne l'identité, le contexte, la mémoire, un budget IA et un ensemble de services étroits. L'entreprise est ensuite dirigée, en grande partie, par des agents.

Toute entreprise digitale a besoin des cinq mêmes choses :

→ **L'identité** (qui existe) : l'entreprise, ses gens, ses agents, leurs clés.
→ **Le contexte** (ce qu'est l'entreprise) : marque, ton, offre. Petit, soigné, versionné.
→ **La mémoire** (ce qu'elle sait) : historique, documents, décisions. Vaste, retrouvée à la demande.
→ **L'intelligence** : l'accès aux modèles avec budgets, routage et un vrai grand livre.
→ **Les capacités** : les services qui font le travail. Construire un site, auditer le SEO, envoyer une facture.

Les produits que les gens voient (Feen, Syncco, le prochain) deviennent de fines surfaces de marque posées sur ces services. Grandir ne veut plus dire « reconstruire les fondations encore une fois ». Ça veut dire ajouter des entreprises et des services.

## L'agent est un employé

La décision la plus AI-native ici, ce n'est pas un choix de modèle. C'est un choix d'organigramme.

Un agent reçoit une ligne d'identité, comme un humain. Il détient des identifiants. Il a un budget. Il appelle les mêmes services via les mêmes contrats, et laisse une trace. L'organigramme de la prochaine entreprise, ce sont littéralement des lignes dans une base de données.

Ça sonne philosophique jusqu'à ce qu'on pose une question banale : quel agent a dépensé 4 €, sur la campagne de qui ? Dans la plupart des stacks, c'est sans réponse. Clé partagée, coût noyé dans un tableau de bord, personne d'attribué. Dans l'usine, c'est une seule requête.

Et l'agent tombe à court d'argent comme un employé, au lieu de vider discrètement le compte API à 3 h du matin. Budget épuisé, la passerelle dit non. La paie, mais pour du logiciel.

## Capacité d'abord, UI à la demande

Deuxième règle : **réduire l'UI, faire grandir la capacité.** L'agent est l'utilisateur principal. Les écrans servent à la confiance et à la saisie, pas au travail.

Chaque service expose ses capacités de la même façon : en HTTP pour les produits, en MCP pour les agents. On définit une capacité une fois ; une app web, un terminal et une boucle d'agent l'appellent tous pareil.

Je n'ai pas dessiné ça sur un tableau blanc. Je l'ai trouvé dans ma propre flotte. Un produit était déjà, en silence, l'implémentation de référence avant que la plateforme ait un nom. Je généralise, je n'invente pas.

La métrique est brute : le pourcentage de fonctionnalités qu'un agent peut appeler. Aujourd'hui, sur toute ma flotte, environ 20 %. L'objectif, c'est de rendre les 100 % ennuyeux.

## L'état honnête

C'est un billet de vision, alors voici la version honnête. Les services existent. La couche entre eux, non. La passerelle censée compter chaque euro existe à peine, donc mon système de budget croit actuellement que tout est gratuit. Une belle chose à croire. Une terrible chose à mettre en prod.

Feen et Syncco prouvent le modèle, mais ce sont des humains qui les ont câblés, service par service. Le prochain ne devrait pas en avoir besoin.

La démo vers laquelle je construis tient en une ligne : `nuva co create testco`. Les agents produisent la marque, le site, l'audit SEO, la première campagne. De bout en bout. Le coût par artefact lisible depuis le grand livre.

## Le point

Feen et Syncco prouvent le modèle à la main. La prochaine entreprise naît sur la plateforme dès le premier jour.

Pas de plus gros modèles. Pas plus de prompts. Une usine où l'identité, le contexte, la mémoire, l'intelligence et les capacités sont provisionnés comme de l'infrastructure, et où les premiers employés sont des agents avec badges et budgets.

L'entreprise est un appel d'API. Le reste, c'est de l'opérationnel.
