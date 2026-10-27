# Redirections 301 à créer dans Rank Math (solandvolt.com)

Préparé le 26/10/2026. À saisir par David : le connecteur WordPress ne donne pas accès aux redirections de Rank Math.
Destinations vérifiées le 26/10 (fiches publiées) par le connecteur.

## Mode opératoire

1. wp-admin > Rank Math SEO > Redirections > **Ajouter**.
2. **URL source** : coller le chemin, sans le domaine, type de correspondance « Exacte ». Pour un groupe, cliquer « + Ajouter une autre » et coller chaque source.
3. **URL de destination** : coller l'adresse complète.
4. **Type** : 301 Déplacé de façon permanente. **Statut** : Actif. Enregistrer.
5. Tester chaque source dans une fenêtre de navigation privée.

## 1. Pages de niveau vers les catégories (option A)

| Source | Destination |
|---|---|
| `la-veilleuse` | https://www.solandvolt.com/categorie-produit/autonomie-energetique/la-veilleuse/ |
| `le-module` | https://www.solandvolt.com/categorie-produit/autonomie-energetique/le-module/ |
| `la-base` | https://www.solandvolt.com/categorie-produit/autonomie-energetique/la-base/ |
| `l-autonomie` | https://www.solandvolt.com/categorie-produit/lautonomie/ |

Ensuite : Apparence > Menus, vérifier que les liens des niveaux pointent vers les catégories.

## 2. Anciennes fiches produits en 404

| Source(s) | Destination | Pourquoi |
|---|---|---|
| `produit/frigo-a-compression-12v-40l-conservation-autonome` et `produit/glaciere-electrique-12v-20l-frigo-portable-compression` | https://www.solandvolt.com/produit/ecoflow-glacier-3-refrigerateur-portable-35-l/ (?p=640) | Seul réfrigérateur portable publié (35 L) |
| `produit/panneau-solaire-pliable-ecoflow-nextgen-160w-160-w-solandvolt` | https://www.solandvolt.com/produit/ecoflow-panneau-solaire-160w-v3/ (?p=833) | Ancien slug du 160 W ; V3 retenue par défaut (à confirmer : V2 = ?p=690) |

Les sources `es_es/` couvrent les visites espagnoles vues dans Google Analytics. Si TranslatePress utilise `es_ES/` (majuscules), créer la même ligne avec cette forme, ou attendre le choix d'une forme unique.

## 3. Blog

| Source | Destination |
|---|---|
| `category/uncategorized` | https://www.solandvolt.com/category/guides/ |

## Non incluses

- `produit/station-electrique-portable-300wh-autonomie-48h` : c'est la fiche ?p=87, en brouillon. Elle reviendra en ligne quand David la publiera : pas de redirection.
- Rank Math > 404 Monitor : à consulter après une semaine pour repérer d'autres anciennes adresses.

## Après la saisie

- Search Console : demander l'indexation des 4 catégories de niveau.
- Retirer le lien vers l'ancienne batterie 200 Ah encore présent sur /boutique/ (Google l'y trouve).

## Contrôles du 26/10/2026

4 contrôles entre 21 h 35 et 21 h 45, depuis un serveur externe (Composio, outil bash distant) : aucune redirection active. Les pages de niveau répondent 200, les anciennes adresses 404. La réponse est générée par WordPress (en-tête no-cache), donc ce n'est pas un problème de cache. Cause à trouver dans Rank Math (module Redirections, statut des lignes). Solution de repli : cPanel o2switch > Domaines > Redirections (301). À reprendre le 27/10.


## Mise à jour du 27/10/2026

Le 27/10 entre 9 h 41 et 9 h 58 (heure du site), David a republié volontairement 6 anciens produits : ?p=52 (station 300 W + panneau 60 W), ?p=50 (station 1 800 W), ?p=54 (batterie 200 Ah), ?p=354 (panneau EcoFlow 400 W, ancien slug), ?p=350 (PW2000), ?p=86 (power bank). Leurs anciennes adresses répondent de nouveau 200 : **les 4 lignes correspondantes sont retirées de la liste** (station 300 W en FR et es_es, station 1 800 W, batterie 200 Ah en FR et es_es, panneau 400 W). Il ne faut pas les rediriger, sinon les produits deviendraient inaccessibles.

Restent à créer (8 sources) : les 4 pages de niveau, le frigo 40 L et la glacière 20 L (?p=93 et ?p=90 toujours en brouillon), l'ancien panneau NextGen 160 W (?p=352 en brouillon), la catégorie `category/uncategorized`.

Contrôle du 27/10 (10 h 19 et 11 h environ) : toujours aucune redirection active (`la-veilleuse` 200, `category/uncategorized` 404). Cause toujours à trouver dans Rank Math (module, statut des lignes) ou solution cPanel.
