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
| `produit/station-denergie-300-w-panneau-solaire-60-w-296-wh-80-000-mah` et `es_es/produit/station-denergie-300-w-panneau-solaire-60-w-296-wh-80-000-mah` | https://www.solandvolt.com/produit/ecoflow-river-3-plus-station-electrique-portable-600-w/ (?p=623) | 286 Wh, la station publiée la plus proche des 296 Wh |
| `produit/station-denergie-portable-1-800-w-batterie-lifepo4-haute-capacite` | https://www.solandvolt.com/produit/station-electrique-portable-ecoflow-delta-3-1024wh/ (?p=344) | LiFePO4, 1 800 W |
| `produit/batterie-lifepo4-12-v-200-ah-decharge-profonde-2-560-wh` et `es_es/produit/batterie-lifepo4-12-v-200-ah-decharge-profonde-2-560-wh` | https://www.solandvolt.com/produit/sok-sk12v206h-12v-206ah/ (?p=482) | Batterie LiFePO4 12 V 206 Ah, 2 637 Wh |
| `produit/frigo-a-compression-12v-40l-conservation-autonome` et `produit/glaciere-electrique-12v-20l-frigo-portable-compression` | https://www.solandvolt.com/produit/ecoflow-glacier-3-refrigerateur-portable-35-l/ (?p=640) | Seul réfrigérateur portable publié (35 L) |
| `produit/panneau-solaire-ecoflow-400w-400-w-solandvolt` | https://www.solandvolt.com/produit/ecoflow-panneau-solaire-400w/ (?p=563) | Ancien slug du même produit |
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
