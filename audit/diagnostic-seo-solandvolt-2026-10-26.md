# Diagnostic SEO solandvolt.com : 26/10/2026

Lecture du site par le connecteur WordPress (site 257165426) : réglages, 5 articles, 15 pages, 48 produits publiés, 8 catégories de produits, les 100 dernières images (sur 550). Aucune modification faite sur le site.

**Limite :** solandvolt.com n'est pas joignable depuis cet environnement. Les balises title et meta description (Rank Math), le sitemap, le robots.txt, la vitesse, les données structurées et la version espagnole (TranslatePress) n'ont pas pu être lus. Voir la liste de contrôle en fin de document.

Niveaux : rouge = bloque l'indexation ou les ventes ; orange = fait perdre du trafic ; vert = amélioration.

## Synthèse

| # | Constat | Niveau |
|---|---|---|
| 1 | 26 fiches produits sur 48 publiées sont quasi vides | Rouge |
| 2 | Délais de livraison contradictoires (risque Merchant Center) | Rouge |
| 3 | Images sans texte alternatif, lourdes, nommées par code fournisseur | Orange |
| 4 | Blog : 5 articles, tous « Uncategorized », sans image | Orange |
| 5 | Pages de niveau et catégories en concurrence (8 URL pour 4 sujets) | Orange |
| 6 | Promesse du niveau Le Module différente selon la page | Orange |
| 7 | Adresses (slugs) incohérentes avec les titres | Orange |
| 8 | Nom de marque instable : Solandvolt, Sol & Volt, « — Solandvolt » | Orange |
| 9 | Descriptions de catégories sans accents | Vert |
| 10 | Réglages : slogan vide, fuseau horaire UTC | Vert |
| 11 | Catalogue : produits hors cible, catégorie « Batteries » vide de texte | Vert |

Points solides : article ?p=483 bien structuré (méthode, chiffres, FAQ) ; catégories de niveau avec description et lien vers leur page ; titres produits avec capacité et puissance ; pages légales, livraison et retours en place ; aucune mention CE relevée.

## Rouge

### 1. 26 fiches produits sur 48 sont quasi vides

- **Preuve :** 26 fiches EcoFlow publiées contiennent une phrase, un tableau de 3 lignes (marque, référence, poids d'expédition) et « Fiche technique détaillée à venir. ». Exemple ?p=800 : « Panneau solaire EcoFlow : puissance 220 W. » Environ 15 mots utiles.
- **Concernés :** 864, 850, 833, 800, 790, 776, 768, 750, 739, 705, 690, 671, 658, 646, 640, 634, 623, 614, 601, 584, 573, 563, 546, 539, 532, 525. Dont la River 3 UPS ?p=601, proposée comme alternative au kit 300 Wh.
- **Effet :** Google classe ces pages en contenu faible ; elles tirent vers le bas l'ensemble du site. Plusieurs fiches ont le même texte (Stream Pro, Stream AC Pro et Stream Ultra X : « puissance 800 W » ; Delta 3 Max et Max Plus : texte identique) : contenu dupliqué. Le texte « à venir » est visible par les clients.
- **Correction proposée :** compléter en priorité les 8 fiches les plus utiles au parcours « résidence secondaire » (601, 539, 546, 623, 739, 640, 525, 563), au format de la fiche Tornasol : usage concret, capacité en Wh, ce que ça alimente et combien de temps, recharge solaire, délai, niveau d'autonomie. Uniquement à partir des fiches techniques EcoFlow (aucune spec inventée). En attendant, retirer la phrase « Fiche technique détaillée à venir. » ou repasser en brouillon les fiches hors cible.

### 2. Délais de livraison contradictoires

- **Preuve :** page Validation de la commande (?page_id=9) : « Expédié sous 24/48h depuis nos entrepôts. » Fiches : « 12 à 18 jours ouvrés » (Tornasol ?p=114, applique ?p=341), « 3 à 5 jours ouvrés depuis l'Allemagne » (SOK ?p=480, ?p=482).
- **Effet :** Google Merchant Center sanctionne les promesses de livraison incohérentes (motif « déclarations trompeuses »). Un client qui lit « 24/48h » puis attend 18 jours demande un remboursement ou laisse un avis négatif.
- **Correction proposée :** remplacer par « Délai indiqué sur chaque fiche produit. Paiement sécurisé. » Même vérification dans le pied de page et les e-mails WooCommerce.

## Orange

### 3. Images

- **Preuve :** sur les 100 dernières images : 100 sans texte alternatif, 100 en JPEG (aucun WebP), noms de fichier en code fournisseur (ECF0082_66874-scaled.jpg), poids de 300 Ko à 2,8 Mo (ex. ?media=834 : 2 792 Ko).
- **Effet :** aucune visibilité dans Google Images ; pages produits lentes sur mobile (critère de classement).
- **Correction proposée :** texte alternatif descriptif sur l'image principale de chaque produit publié (48 images, format « EcoFlow River 3 UPS, station électrique 245 Wh, vue de face ») ; activer la conversion WebP et la compression (Jetpack ou réglage de l'hébergeur). Les 450 autres images ne sont pas vérifiées.

### 4. Blog

- **Preuve :** 5 articles publiés (?p=95, 229, 231, 412, 483), tous dans la catégorie « Uncategorized » (adresse /category/uncategorized/, en anglais), aucune étiquette, aucune image à la une.
- **Effet :** sans image à la une, pas d'aperçu au partage (Facebook, WhatsApp) ni dans Google Discover. La catégorie en anglais sur un site français est un signal de site non entretenu.
- **Correction proposée :** renommer la catégorie en « Guides » (slug « guides ») ; ajouter une vraie photo produit en image à la une de chaque article ; dans ?p=483, ajouter les liens vers les catégories Le Module et La Base (déjà prévus dans `blog/maj-article-483-combien-wh.html`).
- **Volume :** 5 articles ne suffisent pas pour se positionner. Le calendrier en place (kit balcon, hiver) va dans le bon sens ; publier au moins 2 articles par mois.

### 5. Pages de niveau et catégories en concurrence

- **Preuve :** chaque niveau existe deux fois : une page (/la-veilleuse/, /le-module/, /la-base/, /l-autonomie/) et une catégorie produit (/categorie-produit/autonomie-energetique/la-veilleuse/ etc.), avec le même nom et le même sujet.
- **Effet :** Google ne sait pas quelle page afficher pour « kit autonomie coupure de courant » ; les deux se partagent les signaux.
- **Correction proposée (à décider) :**
  - A. La catégorie devient la page de référence (elle vend) : son texte reprend le meilleur de la page, la page redirige vers elle (301). Recommandé.
  - B. Garder les deux avec des rôles distincts : page = guide (« de quoi ai-je besoin »), catégorie = liste de produits ; titres et mots-clés différents.

### 6. Promesse du niveau Le Module

- Catégorie : « Le froid, la connexion et le confort gardés pendant deux jours sans réseau ».
- Page /le-module/ : « si la panne dure une soirée, voire une journée ».
- Article ?p=483 : 300 Wh = « une soirée à une demi-journée ».
- **Correction proposée :** aligner sur « une soirée à une journée » (cohérent avec la méthode de ?p=483), retirer « deux jours » et « le froid » de la description de catégorie.

### 7. Adresses (slugs) incohérentes

| Produit | Titre | Slug actuel |
|---|---|---|
| ?p=362 | Kit solaire Tornasol Flex 300 W | kit-solaire-auto-installable-format-entree-de-gamme-300300-w-solandvolt |
| ?p=360 | Kit solaire Tornasol Efficiency 400 W | kit-solaire-auto-installable-format-compact-60400-w-solandvolt |
| ?p=114 | Kit solaire Tornasol Efficiency 800 W | kit-solaire-auto-installable-tornasol-energy-kitplugplayeffx800x60-800-w-60o |
| ?p=112 | Rafraîchisseur SNOWFIELD 5 | climatiseur-evaporation-portable-taurus-snowfield-5-60-w-5-l |
| ?p=46 | Air Cooler Connecté | rafraichisseur-dair-evaporatif-65-w-telecommande-reservoir-25-l |

- Également : suffixe « -solandvolt » sur ?p=339, 341, 346, 358 ; pages légales en « -2 » (mentions-legales-2, conditions-generales-de-vente-2, politique-de-confidentialite-2).
- **Correction proposée :** ne changer que les 3 kits Tornasol (mot-clé « kit solaire balcon » absent du slug), avec redirection 301 automatique (Rank Math). Avant : vérifier dans Search Console que ces URL n'ont pas de clics. Ne pas toucher les autres : le gain ne vaut pas le risque.

### 8. Nom de marque

- Réglage WordPress et produits : « Solandvolt ». Article ?p=95 : « Pourquoi Sol & Volt existe ». Deux produits avec « — Solandvolt » dans le titre (?p=83, ?p=85), qui sera répété dans l'onglet si Rank Math ajoute déjà le nom du site.
- **Effet :** Google associe moins bien les mentions de la marque entre elles (fiche marque, avis, réseaux).
- **Correction proposée :** choisir une forme unique pour le texte (David décide), retirer « — Solandvolt » des titres de ?p=83 et ?p=85.

## Vert

### 9. Descriptions de catégories sans accents

« electriques », « energetique », « reseau », « gere », « serieux », « soiree », « gardes » dans les catégories 20, 21, 33, 42, 50. Ces textes peuvent servir de meta description : à corriger.

### 10. Réglages du site

- Slogan (description du site) vide : il apparaît dans certains titres et dans le partage.
- Fuseau horaire UTC au lieu de Europe/Madrid : dates des articles et du sitemap décalées de 1 à 2 heures.

### 11. Catalogue

- Catégorie « Batteries » (2 produits) sans description et hors des 4 niveaux.
- ?p=864, panneau pour toit de Tesla Model 3 : hors du sujet du site (résidence secondaire, coupures), dilue la thématique.
- ?p=42 et ?p=46 : extraits contradictoires (3 vitesses, Wi-Fi), déjà signalés le 26/10.

## Corrections faites en ligne (26/10/2026, 20 h 35 à 20 h 37, heure du site)

Avec l'accord de David (« corrige les 3 textes, option A »). Textes d'origine sauvegardés dans `audit/sauvegardes-2026-10-26/`.

- **Point 2, délais :** page Validation de la commande (?page_id=9), bandeau remplacé par « **Paiement sécurisé** — Délai de livraison indiqué sur chaque fiche produit. » (« 100% » retiré : affirmation sans preuve).
- **Points 6 et 9, accents et promesse du Module :** descriptions des catégories 20, 21, 33, 42 et 50 réécrites, accents rétablis. Le Module : « d'une soirée à une journée » (station de 245 à 512 Wh, environ 450 Wh par jour), « deux jours » et « le froid » retirés. La Base : « visez 800 Wh et plus pour tenir une journée » (chiffres de ?p=483), « une semaine entière » retiré.
- **Point 5, option A (catégorie = page de référence) :** le contenu utile des pages de niveau est repris dans les descriptions de catégorie, avec des liens entre niveaux et vers le guide ?p=483. Les liens « En savoir plus » vers les pages ont été retirés.
- **Accueil (?page_id=99), section « niveaux » :** les 4 boutons « Découvrir » pointent vers les catégories ; carte Le Module : « 48 heures avec frigo, PC et chauffage appoint » remplacé par « La box, la lumière et les téléphones, d'une soirée à une journée ».
- WordPress retire les balises de liste des descriptions de catégorie : les listes ont été réécrites en phrases.

### Reste à faire pour terminer l'option A (David, 5 minutes)

Le connecteur ne donne pas accès aux redirections. Dans Rank Math > Redirections > Ajouter, type 301 :

| Source | Destination |
|---|---|
| /la-veilleuse/ | /categorie-produit/autonomie-energetique/la-veilleuse/ |
| /le-module/ | /categorie-produit/autonomie-energetique/le-module/ |
| /la-base/ | /categorie-produit/autonomie-energetique/la-base/ |
| /l-autonomie/ | /categorie-produit/lautonomie/ |

Ensuite : vérifier dans Apparence > Menus que les liens des niveaux pointent vers les catégories ; laisser les 4 pages publiées (la redirection prend le dessus) ou les passer en brouillon après une semaine.

### Accueil : deux corrections complémentaires (20 h 38, accord de David)

- Bloc « Nos stations les plus demandées » : il affichait les produits 54, 50 et 52, tous en brouillon (bloc vide). Remplacés par River 3 UPS ?p=601, DELTA 3 ?p=344 et AC70P ?p=346 (publiés).
- Carte La Base : « De quoi vivre une semaine normale sans réseau » et « Autonomie : une semaine » remplacés par « Station de forte capacité et panneaux solaires. Le réfrigérateur en marche, une journée et plus avec le soleil. » et « Autonomie : une journée et plus ».

### Fiches EcoFlow complétées (20 h 43 à 20 h 44, accord de David)

- 7 fiches réécrites en ligne : ?p=601, 623, 539, 546, 739, 525, 563 (usage pendant une coupure, caractéristiques recoupées, niveau, liens vers produits complémentaires, catégorie et guide ?p=483). Détail et sources : `catalogue/fiches-ecoflow-2026-10-26.md`.
- ?p=640 (« Glacier 3 ») non traitée : modèle à identifier auprès du fournisseur.
- Restent 19 fiches avec « Fiche technique détaillée à venir » (au lieu de 26).

### Fiches EcoFlow, lot 2 (20 h 51 à 20 h 57, accord de David)

- 14 fiches réécrites : ?p=850, 584, 750, 658, 671, 705, 800, 790, 532, 646, 614, 634, 776, 864 ; 6 titres corrigés (puissance ou nom de modèle faux). Détail : `catalogue/fiches-ecoflow-lot2-2026-10-26.md`.
- Restent 5 fiches « à venir » : 640, 690, 833, 573, 768 (informations à obtenir du fournisseur).

## Plan d'action proposé (4 semaines)

| Semaine | Action | Qui |
|---|---|---|
| 1 | ~~Corriger « 24/48h », accents, promesse Le Module, option A côté contenu~~ Fait le 26/10 | Claude |
| 1 | 4 redirections 301, contrôles Search Console et Rank Math ci-dessous | David |
| 2 | ~~Compléter 8 fiches EcoFlow prioritaires~~ 7 faites le 26/10, ?p=640 en attente | Claude |
| 2 | Textes alternatifs des 48 images principales (point 3) | Claude, après accord |
| 3 | Catégorie blog « Guides », images à la une, mise à jour ?p=483 (point 4) | Claude, après publication de ?p=94 |
| 4 | Slugs Tornasol avec 301 (point 7), 18 fiches EcoFlow restantes | Claude, après accord |

## Contrôles à faire par David (10 minutes, dans un navigateur)

1. Search Console > Pages : nombre de pages indexées, motifs « Explorée, actuellement non indexée ».
2. Search Console > Performances, 3 derniers mois : clics, impressions, 10 premières requêtes.
3. Rank Math > tableau de bord : bannière « l'URL du site a changé » ou non.
4. Ouvrir https://www.solandvolt.com/sitemap_index.xml et https://www.solandvolt.com/robots.txt : les deux s'affichent-ils ?
5. PageSpeed Insights (pagespeed.web.dev) sur la page d'accueil et sur ?p=114, version mobile : noter les scores.
6. Version espagnole : une page /es/ existe-t-elle, et Google l'indexe-t-il ?

Me transmettre ces résultats permet de compléter le diagnostic (titres, vitesse, indexation, espagnol).
