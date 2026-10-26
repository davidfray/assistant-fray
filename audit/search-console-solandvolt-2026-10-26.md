# Search Console solandvolt.com : 26/10/2026

Lecture par Composio (connexion Google Search Console de David, propriétaire des propriétés `sc-domain:solandvolt.com` et `https://www.solandvolt.com/`). Aucune modification faite.

## Performances, 27/07 au 24/10/2026 (3 mois)

| Clics | Impressions | CTR | Position moyenne |
|---|---|---|---|
| 12 | 267 | 4,5 % | 20,2 |

Pays : France 153 impressions (6 clics), Espagne 40 (2 clics), Belgique 5, Suisse 5.

### Pages qui reçoivent des impressions (extrait)

| Page | Impressions | Clics | Position |
|---|---|---|---|
| /la-veilleuse/ (page de niveau) | 34 | 0 | 20,6 |
| /produit/kit-solaire-balcon-600w-plug-play/ | 24 | 3 | 41,0 |
| /produit/batterie-lifepo4-12-v-200-ah-decharge-profonde-2-560-wh/ | 22 | 0 | 41,2 |
| /es_es/ | 22 | 2 | 27,8 |
| / (accueil) | 21 | 5 | 5,2 |
| /mentions-legales-2/ | 19 | 0 | 11,7 |
| /es_es/producto/kit-solaire-…-tornasol-…-800-w-60o/ | 16 | 0 | 13,6 |
| /boutique/ | 14 | 1 | 3,6 |
| /la-base/ (page de niveau) | 11 | 0 | 9,5 |
| /l-autonomie/, /le-module/ | 8 et 7 | 0 | 33,9 et 7,4 |
| /categorie-produit/autonomie-energetique/ | 4 | 0 | 5,0 |

### Requêtes (extrait)

- « veilleuse rechargeable solaire » : 24 impressions, position 23.
- « power station 300w » : 6 impressions, position 8,8.
- « climatisation résidence secondaire » : 4 impressions, position 16.
- « panneau solaire plug and play balcon » : 8 impressions, position 69 ; « kit solaire balcon » : position 64.
- « batterie 200ah », « lifepo4 200ah » : 4 à 6 impressions, position 41 à 52 (produit en brouillon, voir plus bas).
- Requêtes de marque déformées : « solid volt », « soli volt », « solivolt », « soluvolt », « solare volt srl ».

## Indexation (inspection d'URL)

| URL | État |
|---|---|
| https://www.solandvolt.com/ | Envoyée et indexée (exploration 16/10) |
| /la-veilleuse/ (page de niveau) | Envoyée et indexée |
| /categorie-produit/autonomie-energetique/la-veilleuse/ | Indexée, fil d'Ariane détecté |
| /produit/ecoflow-river-3-ups-…/ | Indexée (exploration 24/10, avant la nouvelle fiche) |
| /produit/batterie-lifepo4-12-v-200-ah-…/ | **Introuvable (404)**, encore 22 impressions, lien depuis /boutique/ |
| https://solandvolt.com/ (sans www) | Redirection vers www : correct |
| /es_es/ | Indexée |
| /es_ES/la-base/ | **Indexée elle aussi** : deux casses d'URL espagnoles coexistent |

- Sitemap : `sitemap_index.xml`, 72 URL et 264 images envoyées, 0 erreur, téléchargé le 25/10. Le compteur « indexées = 0 » de l'API n'est pas fiable (les inspections montrent des pages indexées).
- robots.txt : autorise l'exploration.
- Titre Rank Math des fiches : format « [Produit] | Sol & Volt » (vu dans les données produit).

## Constats et propositions

1. **Redirections 301 de l'option A : prioritaires.** Les pages de niveau reçoivent l'essentiel des impressions hors accueil (/la-veilleuse/ 34, /la-base/ 11, /l-autonomie/ 8, /le-module/ 7) ; les catégories presque rien. Sans redirection, ces signaux ne passent pas aux catégories.
2. **Anciennes adresses produits en 404 à rediriger (Rank Math) :**
   - /produit/batterie-lifepo4-12-v-200-ah-decharge-profonde-2-560-wh/ → /produit/sok-sk12v206h-12v-206ah/ (?p=482).
   - À vérifier dans Rank Math > 404 Monitor : /produit/frigo-a-compression-12v-40l-conservation-autonome/, /produit/glaciere-electrique-12v-20l-frigo-portable-compression/, /produit/station-electrique-portable-300wh-autonomie-48h/ (?p=87, brouillon), /produit/panneau-solaire-ecoflow-400w-400-w-solandvolt/ (ancien slug du panneau 400 W ?p=563), /produit/panneau-solaire-pliable-ecoflow-nextgen-160w-160-w-solandvolt/ (ancien slug 160 W).
   - Retirer le lien vers l'ancienne batterie 200 Ah sur /boutique/ (Google l'y trouve encore).
3. **Version espagnole en double casse :** /es_es/ et /es_ES/ sont indexées séparément (contenu dupliqué). Choisir une seule forme dans TranslatePress et rediriger l'autre. Attention : le script Brevo de l'accueil teste « /es_ES/ ». Les slugs espagnols restent en français (« kit-solaire-… »).
4. **Marque :** les requêtes « solivolt », « soli volt », « soluvolt » montrent que le nom n'est pas encore mémorisé. Les titres Google utilisent « Sol & Volt » ; le site affiche « Solandvolt ». Décision de David attendue sur une forme unique.
5. **Données produit (Google Merchant) :** avertissements sur la fiche River 3 UPS : pas de `shippingDetails`, pas de `hasMerchantReturnPolicy`, pas de GTIN. Renseigner livraison et retours dans Merchant Center ou dans le plugin de données structurées ; GTIN à demander au fournisseur.
6. **Opportunités de contenu :** « veilleuse rechargeable solaire » (position 23) pour la catégorie La Veilleuse ; « power station 300w » (position 8,8) ; « kit solaire balcon » (position 64) pour l'article kit balcon en préparation.

## Non fait

- PageSpeed : aucun outil de mesure connecté dans Composio (GTmetrix, StatusCake non connectés). À faire par David sur pagespeed.web.dev.
- Google Analytics : connecté dans Composio, non consulté.
