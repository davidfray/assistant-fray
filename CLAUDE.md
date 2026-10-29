# Mémoire des projets : Fray Services Palamós et Sol & Volt

Fichier chargé automatiquement à chaque session. Mis à jour le 28/10/2026.
Branche de travail : `ccr-1a772cc3-mb90wj`. Tous les livrables sont des brouillons en Markdown dans ce dépôt, sauf mention « en ligne ».

## Deux marques, jamais mélangées

| | Sol & Volt (solandvolt.com) | Fray Services (frayservices.com) |
|---|---|---|
| Activité | E-commerce matériel solaire, 4 niveaux d'autonomie | Rénovation multi-corps d'état, maître d'ouvrage délégué |
| Charte | Solaire : #3D2E0A / #C89B3C / #FAEEDA, police système, sans emoji | #F5F0E8 / #C4822A / #2C2C2C, Oswald + Lato, 1 à 2 emojis max |
| Skills | solandvolt-garde-fous (lire en premier), -niveaux-autonomie, -seo-blog, -social-instagram, -catalogue-ops, -service-client | social-media-fray, devis-fray, rapport-chantier |
| Accès site | Connecteur WordPress, site 257165426 (Jetpack) | Connecteur WordPress, site 253853971 (Atomic) |

Règles Sol & Volt absolues : aucune mention CE, « gestionnaire de réseau local » jamais Enedis seul, photos réelles uniquement, aucune référence à Fray Services, publication Instagram uniquement après validation de David (n8n n'est plus utilisé depuis le 28/10 ; automatisations dans Make, organisation Fray Services).

## Où trouver quoi

| Dossier | Contenu |
|---|---|
| `DOSSIER-KIT-BALCON.md` | Suivi Sol & Volt : livrables, statuts, ordre de publication |
| `audit/constats-solandvolt-2026-10-26.md` | Audit solandvolt.com, corrections faites en ligne, décisions |
| `audit/diagnostic-seo-solandvolt-2026-10-26.md` | Diagnostic SEO solandvolt.com, plan d'action sur 4 semaines |
| `audit/search-console-solandvolt-2026-10-26.md` | Search Console solandvolt.com (performances, indexation, sitemap, 404) |
| `audit/redirections-301-rank-math-2026-10-26.md` | Les 8 redirections 301 (pages de niveau, anciennes fiches en 404, catégorie de blog), créées dans Rank Math le 27/10 et testées |
| `audit/ga4-suivi-ecommerce-solandvolt-2026-10-26.md` | Guide d'activation du suivi e-commerce GA4 (extension, réglages, test) |
| `audit/transporteurs-solandvolt-2026-10-28.md` | Comparatif GLS, SEUR, Packlink PRO pour les produits EcoFlow (lithium UN3481, poids, enlèvement chez Innov8), email de demande d'offre |
| `audit/stock-et-codes-solandvolt-2026-10-28.md` | Codes de suivi influenceurs (0 %), produits en rupture, scénarios Make de synchronisation du stock et de création des codes |
| `audit/avis-externe-conversion-solandvolt-2026-10-29.md` | Avis externe (conversion, Google Ads) : verdict point par point, corrections faites, textes à coller par David |
| `automatisations/make/` | Blueprints des scénarios Make créés par Claude (sans identifiants) |
| `audit/google-analytics-solandvolt-2026-10-26.md` | Google Analytics solandvolt.com (90 jours, canaux, publicité Meta vers pages 404, suivi e-commerce absent) |
| `fray/audit/constats-frayservices-2026-10-26.md` | Audit frayservices.com, faits utilisables dans les posts |
| `blog/` | Articles Sol & Volt FR et ES, mise à jour proposée de l'article ?p=483 |
| `catalogue/` | Fiche Tornasol 800 W (FR, ES) |
| `social/` | Posts Sol & Volt (kit balcon, Wh, décembre), calendrier de décembre, plan influenceurs Instagram (`influenceurs-solandvolt-2026-10-28.md`) |
| `emails/` | Modèle email syndic, demande fiche technique Tornasol (envoyée), demande d'informations au fournisseur EcoFlow (brouillon) |
| `service-client/` | Réponses types FR/ES (kit balcon, Wh) |
| `fray/social/` | Calendrier et posts Fray Services de novembre |

## Identifiants utiles solandvolt.com

- Catégories : La Veilleuse 21, Le Module 33, La Base 42, L'Autonomie 50 (`/categorie-produit/lautonomie/`, hors parent), Autonomie énergétique 20, Climatisation 61 (créée le 26/10).
- Produits : Tornasol 800 W ?p=114 (livraison 12 à 18 jours ouvrés), Kit Autonomie 300 Wh ?p=94 (brouillon), Station 300 Wh ?p=87 (brouillon), Panneau 100 W ?p=88 (brouillon), Centrale AC70P ?p=346, DELTA 3 ?p=344, River 3 UPS 245 Wh ?p=601.
- Articles en ligne : Wh résidence secondaire ?p=483, coupures Espagne ?p=229, LiFePO4 ou plomb ?p=231, climatisation ?p=412, Pourquoi Sol & Volt ?p=95.

## Décisions prises par David (26/10/2026)

- Meta Ads : contrôle fait par David dans le Gestionnaire de publicités (26/10), aucune publicité active vers les pages 404.

- Posts : version A retenue partout (kit balcon, Wh, décembre 1re et 2e quinzaines, Fray novembre). Post Sol & Volt du 25/12 validé, lancement en 2026 confirmé ; bilan du 29/12 en version 2 (récapitulatif des 4 niveaux).
- Article Wh : enrichir ?p=483 plutôt que publier le brouillon de novembre (proposition prête : `blog/maj-article-483-combien-wh.html`).
- Produit niveau Le Module : publier le Kit Autonomie 300 Wh ?p=94 (David le publie lui-même).
- Fray Services : délai de réponse retenu « réponse sous 24 h ».
- Sol & Volt : pas d'extension de garantie proposée ; la référence est la garantie légale de 3 ans des CGV.
- Sol & Volt : les batteries de stockage STREAM sont classées au niveau L'Autonomie.
- Sol & Volt, Innov8 Iberia (écrits des 20, 23, 27 et 28/10) : prix d'achat EcoFlow = PVP conseillé HT moins 15 % ; vente interdite sous le PVP conseillé (au-dessus autorisé) : aucun code de remise sur EcoFlow ; pas d'envoi au client final par Innov8, Sol & Volt choisit son transporteur (enlèvement chez Innov8, bon neutre) ; fichier produits et stock reçu chaque jour vers 7 h 30 sur david@frayservices.com.
- Sol & Volt, SEO : option A, les catégories de produits deviennent les pages de référence des 4 niveaux ; les pages /la-veilleuse/, /le-module/, /la-base/, /l-autonomie/ redirigent en 301 vers elles.
- Sol & Volt, influenceurs (28/10) : River 3 Plus ?p=623 comme produit de test (la River 3 ?p=601 est en rupture chez Innov8), 3 stations offertes au maximum, commission de 10 % sur les ventes suivies par code, sans remise client (PVP minimum EcoFlow).
- Fray Services, photos : post du 02/11 = chauffe-eau au gaz (`fray/medias/2026-11-02-chauffe-eau-gaz.jpg`, recadrer les étiquettes du fabricant) ; post du 04/11 = « Rénovation salle de bain », média n° 150 de frayservices.com.

## Fait en ligne (26/10/2026)

- solandvolt.com, SEO (20 h 35) : bandeau de la page commande (« Délai de livraison indiqué sur chaque fiche produit »), descriptions des catégories 20, 21, 33, 42, 50 (accents, promesse Le Module « une soirée à une journée », contenu des pages de niveau repris), boutons des niveaux de l'accueil vers les catégories ; accueil : bloc « Nos stations les plus demandées » (601, 344, 346 au lieu des brouillons 54, 50, 52) et carte La Base (« une journée et plus »). Sauvegardes : `audit/sauvegardes-2026-10-26/`.
- solandvolt.com (20 h 43) : 7 fiches EcoFlow complétées (?p=601, 623, 539, 546, 739, 525, 563), voir `catalogue/fiches-ecoflow-2026-10-26.md`.
- solandvolt.com (20 h 51) : 14 autres fiches EcoFlow complétées et 6 titres corrigés (850, 584, 750, 658, 671, 864), voir `catalogue/fiches-ecoflow-lot2-2026-10-26.md`. Batteries STREAM 750, 658, 671 déplacées dans L'Autonomie (21 h 00).
- solandvolt.com (21 h 05) : textes alternatifs des images principales des 48 produits (29 ajoutés, 5 corrigés), voir `catalogue/textes-alternatifs-images-2026-10-26.md`.
- solandvolt.com (21 h 06) : catégorie d'articles « Uncategorized » renommée « Guides » (/category/guides/) ; images à la une sur les 5 articles (photos produits) ; articles ?p=231, 229, 412, 95 corrigés (21 h 10, sauvegardes dans `audit/sauvegardes-2026-10-26/articles/`) ; ?p=229 : extension de garantie retirée, garantie légale 3 ans comme les CGV (21 h 12) ; ?p=231 : garantie 3 ans (21 h 13) ; fiche AC70P ?p=346 : garantie 3 ans, liens vers brouillons remplacés par ?p=546 et ?p=344 (21 h 14) ; ?p=95 : « livré depuis l'Europe » remplacé par « livré en France et en Espagne » (21 h 15).

- solandvolt.com : fiche Tornasol ?p=114 (lien catégorie corrigé, PW1000 remplacée par AC70P) ; catégorie Climatisation créée, produits 339, 42, 46, 112 déplacés, lien de catégorie corrigé sur leurs fiches.
- Email de demande de fiche technique envoyé à somos@tornasol.energy depuis david@frayservices.com (réponse attendue avant le 05/11).

## Fait en ligne (28/10/2026)

- solandvolt.com (19 h 02, heure du site), avec l'accord de David : fiches ?p=601 (River 3 UPS), ?p=690 (panneau 160 W V2) et ?p=739 (DELTA 3 Max) passées en **brouillon**, car elles sont en rupture chez Innov8 et le changement d'état du stock fait par David ne s'était pas enregistré. Vérifié : elles ne sont plus en vente (API de la boutique). À republier quand Innov8 aura du stock. Corrections (19 h 04 à 19 h 05) : accueil, bloc « Nos stations les plus demandées » en `[products ids="623,344,346"]` (River 3 Plus à la place de la River 3) ; liens vers ?p=601 remplacés par ?p=623 sur les fiches 525, 790, 705 (mention « River 3 UPS » remplacée par « River 3 Plus ») ; liens vers ?p=739 remplacés par ?p=850 sur 776, 563, 546 et retirés de 850. Plus aucun lien publié vers 601 ou 739 (vérifié). En republiant 601 ou 739, rétablir ces liens si utile.
- solandvolt.com (19 h 13) : « livraison sur devis » (extrait et section dédiée, contact@solandvolt.com) sur ?p=750 STREAM Ultra X (poids d'expédition corrigé 43,50 en 44,00 kg) et ?p=584 DELTA Pro 3. ?p=563 : poids d'expédition laissé à 19,30 kg (le fichier Innov8 indique 12,30 kg, impossible pour un panneau de 16 kg).

## Fait en ligne (29/10/2026)

- solandvolt.com (20 h 36, heure du site), suite à l'avis externe sur la conversion (`audit/avis-externe-conversion-solandvolt-2026-10-29.md`) : catégorie La Base (42), promesses « une semaine entière », « une vie entière » et « congélateur simultanément » remplacées par « une journée et plus » et un repère chiffré (800 Wh par jour, repris de ?p=483) ; accueil, bouton « Découvrir les 4 niveaux d’autonomie », carte niveau 04 « au quotidien, selon le soleil », « Moins de dépendance au réseau ». Vérifié en ligne. Sauvegarde : `audit/sauvegardes-2026-10-29/`. **Attention :** le connecteur WordPress retire `<h2>`, `<ul>`, `<li>` et `<p>` des descriptions de catégorie ; ne plus les modifier par le connecteur (passer par wp-admin).

## Fait en ligne (27/10/2026)

- solandvolt.com, redirections 301 (Claude dans Chrome, validation de David à chaque étape) : le module Redirections de Rank Math était activé et les 6 règles déjà saisies fonctionnaient ; la seule en échec était `es_ES/2026/07/21/pourquoi-sol-volt-existe/`, interceptée par la regex générale `^es_ES/(.*)$`, corrigée en `^es_ES/(?![0-9]{4}/)(.*)$`. Dans les regex Rank Math, ne jamais mettre d'antislash (`\d` devenait `20dd`). Règle `?p=344` mise en corbeille (WordPress redirige déjà), règle `^es_es/producto/(.*)$` supprimée. Les 8 sources de l'audit créées (301, exact) et testées en 200 : 4 pages de niveau vers leurs catégories, frigo 40 L et glacière 20 L vers ?p=640, panneau NextGen 160 W vers ?p=833, `category/uncategorized` vers /category/guides/. cPanel o2switch non nécessaire. Rank Math compte 14 règles actives.
- solandvolt.com, catégories de niveau : descriptions des 4 catégories (21, 33, 42, 50) réécrites d'après le catalogue réel (retrait de « dropshipping », « frigo 40 L », « appareils médicaux », couverture chauffante déplacée au bon niveau ; L'Autonomie contient déjà 5 produits STREAM/Tornasol 800 W) avec lien vers l'article ?p=483 ; sauvegardes des anciennes descriptions dans le localStorage de wp-admin. Modèle WooCommerce `archive-product` modifié pour afficher la description sous la grille de produits (original réinitialisable via Apparence > Éditeur). Menu d'en-tête (bloc Navigation id 167) : les liens Autonomie, La Base, Veilleuse, Module pointent directement vers les catégories.
- Search Console de `sc-domain:solandvolt.com` lue dans le Chrome de David avec le compte Google `/u/1` (le compte par défaut n'y a pas accès). Du 06/09 au 25/10 : 12 clics, 285 impressions ; les 4 anciennes URLs de niveau : 0 clic, 62 impressions. À relire fin novembre en filtrant `/categorie-produit/`.

- solandvolt.com (27/10, 10 h 07 à 10 h 10) : 6 produits republiés par David le matin (?p=50, 52, 54, 86, 350, 354) corrigés : garantie 3 ans (CGV), liens vers brouillons remplacés, titres nettoyés, promesse « 48h » retirée de ?p=52, lien Climatisation retiré de ?p=86. Détail : `audit/relecture-6-produits-republies-2026-10-27.md`.
- Redirections 301 : liste ramenée à 8 sources le 27/10 (les anciennes adresses de ?p=50, 52, 54 et 354 répondent de nouveau, ne pas les rediriger). Toujours inactives au contrôle du 27/10.

## En attente

### De David
- Sol & Volt, avis externe du 29/10 (`audit/avis-externe-conversion-solandvolt-2026-10-29.md`, section « Actions de David ») : vérifier « livraison offerte dès 60 € » face au coût réel d'un envoi EcoFlow avant tout budget Google Ads ; corriger la garantie « 2 ans en France, 3 ans en Espagne » en « 3 ans » dans le bloc de réassurance (`functions.php` du thème enfant) ; phrases des catégories 21 (« 48 heures ») et 50 dans wp-admin, et recoller le HTML de la 42 ; commande test pour la conversion Google Ads ; retraduire les nouveaux textes dans TranslatePress ; décider pour « Avis (0) », lien ?p=95 dans le pied de page, filtres de la boutique.
- Sol & Volt : publier ?p=94, ?p=87, ?p=88 (vérifier prix, stock, expédition ; corriger le titre « Autonomie 48H » de ?p=87), puis feu vert pour mettre à jour ?p=483 (vérifier le prix AC70P 539,90 €).
- Sol & Volt : prix TTC et délais (kit Tornasol, kit 300 Wh), délais réels pour la date limite avant Noël, vraies photos, URL espagnoles TranslatePress, relecture de la question écrite n° 6574 (Assemblée nationale).
- Fray Services (posts du 02/11 et du 04/11 prêts, reste le recadrage Canva) : chantier avant/après (06/11), chantier en cours (16/11), artisan pour portrait (20/11), créneaux d'hiver restants (30/11), accord de Roger Boullier pour son témoignage (25/11), vraies photos ; confirmer la coordination sur une ligne à part du devis, le code couleur vert/orange/rouge, l'accompagnement des démarches en mairie (23/11), les règles de Palamós.

- Sol & Volt, fournisseur EcoFlow Innov8 Iberia SL (email envoyé le 27/10 à Juan Carlos Pinar ; réponse du 27/10 : le service client sac@innov8iberia.com rassemble les données ; fiches techniques sur https://productsheet.innov8iberia.com/products/{référence}) : modèle exact du « Glacier 3 » ?p=640 (réf. ECF0046), différence entre panneaux 160 W V2 (?p=690) et V3 (?p=833), compatibilité du câble ?p=573 (River ou DELTA seulement) et du support ?p=768 (panneau 400 ou 450 W), délai de livraison.
- Sol & Volt, SEO : les redirections 301 sont faites (voir « Fait en ligne » du 27/10) ; l'ancienne batterie 200 Ah, la station 300 W, la station 1 800 W et le panneau 400 W sont republiés (?p=54, 52, 50, 354) et ne doivent pas être redirigés. Reste à choisir /es_es/ ou /es_ES/ dans TranslatePress (la règle Rank Math redirige déjà es_ES vers es_es) ; contrôles restants : bannière Rank Math « URL du site modifiée » et PageSpeed ; forme unique du nom de marque ; relire la Search Console fin novembre ; vérifier que les chiffres des descriptions de catégories (300 Wh, 100 W, 768 Wh, 4 096 Wh) restent justes.

- Sol & Volt, SEO : le problème des redirections du 26/10 est résolu le 27/10. En réalité aucune des 8 sources de l'audit n'était saisie dans Rank Math, et une règle regex en interceptait une autre. Résumé dans « Fait en ligne (27/10/2026) ». David a vérifié le 26/10 qu'aucune publicité Meta active ne pointe vers les pages en 404 ; les visites « fb » viennent d'anciennes publicités ou de liens partagés.
- Sol & Volt, GA4 : aucune balise GA4 (`G-X1JG6B971W`) sur le site au 26/10 (seulement Google Ads `AW-18515270298` via Google for WooCommerce) ; dernière session GA4 le 19/10. Installer « Google Analytics for WooCommerce », puis devise EUR et fuseau Europe/Madrid, puis tester. Guide : `audit/ga4-suivi-ecommerce-solandvolt-2026-10-26.md`. Claude vérifie ensuite par l'API GA4 (temps réel).

- Sol & Volt, 6 produits republiés : capacité en Wh de ?p=50 et ?p=350, doublon ?p=354 / ?p=563 (recommandé : garder ?p=563 une fois les redirections actives), photo de ?p=86, prix, stock et classe d'expédition.
- Sol & Volt, influenceurs : vérifier les abonnés dans l'application Instagram, retenir 10 comptes, fixer le budget de publicité de test (proposé : 5 à 10 € par jour, 7 jours). Plan : `social/influenceurs-solandvolt-2026-10-28.md`. Pas d'extraction d'abonnés ni de messages en masse (conditions Instagram, RGPD). Pour vérifier les abonnés et chercher par hashtag : Supermetrics « Instagram Public Data » (IGPD2) refuse : essai gratuit de l'équipe « Team frayservices » expiré le 17/06/2026, abonnement payant nécessaire. Alternative gratuite : reconnecter Facebook dans Composio avec les permissions Instagram (instagram_basic) pour utiliser business_discovery, ou vérifier dans l'application. River 3 Plus ?p=623 retenue (299 € TTC, achat 210,04 € HT, marge 37,07 € HT, 53 en stock chez Innov8 au 28/10). Reste : relire et envoyer les 3 messages, créer les 3 codes de suivi à 0 % (guide : `audit/stock-et-codes-solandvolt-2026-10-28.md`), choisir un transporteur pour les envois. 7 créateurs vanlife identifiés (section 9 du plan), priorité 1 : Un van sur la route, Léon Le Daron, Péripléties.
- Remote Control : David ajoutera le dossier `assistant-fray` dans Claude Desktop > Réglages > Claude Code > Remote Control (Mac ou Linux), pour que les sessions cloud puissent travailler dans ses fichiers.

### Rappels programmés
- 27/10/2026 : rappel du matin sur les redirections 301 traité, plus rien à faire.
- Fin novembre 2026 : relire la Search Console de solandvolt.com (filtre `/categorie-produit/`) pour mesurer l'effet des catégories enrichies.
- 05/11/2026 : vérifier la réponse de Tornasol, mettre à jour les fiches ou proposer une relance.
- 06/11/2026, 9 h (heure de Madrid) : vérifier la réponse du fournisseur EcoFlow ; sans réponse, préparer une relance en espagnol (nouvelle échéance au 13/11) et la soumettre à David avant envoi. Vérifier aussi les réponses aux deux emails du 28/10 (poids ECF0015 et réapprovisionnement ; transporteurs qui enlèvent chez Innov8).
- 24/12/2026 : préparer la publication du post Sol & Volt du 25/12 et demander le feu vert final.

### Points ouverts sur les sites (non corrigés, à proposer)
- solandvolt.com, SEO (voir le diagnostic) : 5 fiches EcoFlow encore quasi vides (21 complétées le 26/10) (« Fiche technique détaillée à venir ») ; images de galerie sans texte alternatif et images lourdes (JPEG, pas de WebP) ;  slugs des kits Tornasol.
- solandvolt.com : ?p=42 renvoie vers ?p=44 (brouillon) ; extraits contradictoires sur ?p=42 (vitesses) et ?p=46 (Wi-Fi) ; catégorie Climatisation à ajouter au menu.
- solandvolt.com, stock : le site affiche « En stock » pour des références à 0 chez Innov8 au 28/10 (ECF0039 River 3 ?p=601, ECF0061 ?p=690, ECF0068 ?p=739). Demandé par David le 28/10 : non faisable par les connecteurs (codes et stock WooCommerce hors de portée). Scénarios Make créés le 28/10, inactifs : 8239857 (stock quotidien à 8 h 30) et 8239861 (3 codes de suivi). Connexions Make WooCommerce et Gmail toujours absentes au 28/10 au soir (3 vérifications, demande d'accès Make 78bf0ab7 restée « pending ») : David envoie une capture. Les 3 fiches en rupture sont passées en brouillon le 28/10 (voir « Fait en ligne »). Codes vanroute, leon, periple : **reportés** (28/10). Test du panier le 28/10 : « n'existe pas » malgré la création annoncée par David ; à créer dès qu'un créateur accepte, de préférence en séance Cowork avec Claude dans Chrome (qui réglera aussi les connexions Make). Les 3 messages aux créateurs (section 10 du plan) peuvent partir sans attendre. Détail : `audit/stock-et-codes-solandvolt-2026-10-28.md`.
- Sol & Volt, transport : aucun transporteur choisi pour les produits EcoFlow (Innov8 ne livre pas le client final). Comparatif du 28/10 (`audit/transporteurs-solandvolt-2026-10-28.md`) : recommandé, Packlink PRO plan gratuit pour démarrer (enlèvement chez Innov8, extension WooCommerce, UPS exclu car il refuse le lithium), et demande d'offre GLS et SEUR (texte espagnol prêt, à coller dans leurs formulaires « empresas », pas d'email commercial public). Email envoyé le 28/10 à sac@innov8iberia.com (copie Juan Carlos Pinar), avec l'accord de David : transporteurs qui enlèvent déjà de l'EcoFlow chez eux, lithium vers la France, étiquetage, horaires. Produits de plus de 40 kg (?p=750, ?p=584) : « livraison sur devis » en ligne le 28/10. Email envoyé le 28/10 à Juan Carlos Pinar, avec l'accord de David (fil « Authorised retailer request ») : poids ECF0015, date de réapprovisionnement d'ECF0039, ECF0061, ECF0068, rappel du poids d'ECF0057.
- Make : la connexion « My Gmail connection » est expirée (28/10), donc le scénario « frayservices — Gestion quotidienne emails » est probablement en échec. Le scénario CJ 7785225 contient la clé API CJ en clair dans un module HTTP : la déplacer dans une connexion ou une variable.
- frayservices.com : « réponse sous 24h » (Projets) et « devis gratuit en 48h » (accueil) à confirmer comme compatibles ; balise google-site-verification dans le contenu de l'accueil ; emojis et affirmations sans preuve sur la page Services.

## Accès via Composio

Composio donne accès en lecture à Google Search Console (propriétés `sc-domain:solandvolt.com`, `https://www.solandvolt.com/`, frayservices.com), Google Analytics (propriété « Solandvolt - GA4 », properties/551064081), Gmail (compte david@frayservices.com), Google Drive, Sheets, Brevo, Facebook, Instagram. Pas d'outil PageSpeed connecté, pas d'outil de modification d'une propriété GA4. L'outil bash distant de Composio (`curl`) atteint solandvolt.com : utile pour tester redirections et balises (certaines commandes sont bloquées par son pare-feu : rester simple). Meta Ads : non lisible (26/10), deux tentatives de connexion « metaads » restées en attente ; Motion Creative Analytics connecté mais sans espace de travail. La connexion Facebook voit les 6 portefeuilles Business (dont « Solandvolt » 1687379002526386) mais pas la permission `ads_read` : le compte publicitaire 1029984932981254 renvoie une erreur 403. Pour lire les publicités, David doit connecter la boîte à outils « metaads » dans Composio, ou ajouter `ads_read` à la connexion Facebook.

## Travail partagé entre Cowork et Claude Code

David travaille sur les mêmes sujets dans Cowork (dossier local, synchronisé avec GitHub Desktop) et dans Claude Code (cloud, branche dédiée puis pull request). Règles à appliquer à chaque session, quel que soit l'outil :

1. **Début de session :** lire ce fichier, puis résumer à David où en est le sujet demandé avant de modifier quoi que ce soit. Dans Cowork, rappeler à David de faire « Fetch origin » puis « Pull » dans GitHub Desktop s'il ne l'a pas fait.
2. **Un sujet, un outil à la fois :** ne pas modifier un fichier qu'une autre session est en train de traiter. En cas de doute (fichier modifié récemment, statut « en cours »), demander à David.
3. **Fin de session :** mettre à jour ce fichier (sections « Décisions », « Fait en ligne », « En attente », et le journal ci-dessous).
   - Dans Cowork : rappeler à David de faire « Commit to main » puis « Push origin » dans GitHub Desktop.
   - Dans Claude Code : pousser sur la branche de session, ouvrir la pull request, et la fusionner seulement si David le demande. Tant qu'elle n'est pas fusionnée, Cowork ne voit pas le travail : le signaler à David.
4. **Conflit de versions :** ne jamais choisir seul entre deux versions d'un même fichier. Montrer la différence à David et le laisser trancher.

## Journal des sessions

| Date | Outil | Sujets traités |
|---|---|---|
| 26/10/2026 | Claude Code | Agent Reach, veille kits balcon, articles kit balcon (FR/ES), Wh, hiver, fiche Tornasol, emails syndic et Tornasol, réponses types, calendriers et posts Sol & Volt (nov.-déc.) et Fray (nov.), audits et corrections des deux sites, mémoire des projets, règles Cowork / Claude Code, photos des posts Fray du 02/11 et du 04/11 |
| 26/10/2026 | Claude Code | Diagnostic SEO solandvolt.com (via connecteur WordPress, front non joignable) ; corrections en ligne : page commande, catégories de niveau, accueil (option A), 21 fiches EcoFlow, textes alternatifs des 48 images principales, catégorie Guides, images à la une et correction de 4 articles du blog |
| 27/10/2026 | Claude dans Chrome (Cowork) puis Claude Code | Redirections 301 Rank Math (diagnostic, correction de la regex es_ES, 8 règles créées et testées), descriptions des 4 catégories de niveau, modèle d'archive produit, menu d'en-tête, lecture de la Search Console, fusion de la branche `ccr-1a772cc3-mb90wj` dans `main` |
| 27/10/2026 | Claude Code | Contrôle des redirections 301 (inactives), liste ramenée à 8 sources, relecture et correction de 6 produits republiés, liste des redirections pour Cowork |
| 29/10/2026 | Claude Code | Avis externe sur la conversion de solandvolt.com : vérification point par point, promesses corrigées en ligne (catégorie La Base, accueil), garantie, livraison offerte et Google Ads documentés pour David |
| 28/10/2026 | Claude Code | Recherche d'influenceurs Instagram solaires (FR/ES), plan d'acquisition sur 8 semaines, 7 créateurs vanlife, 3 messages personnalisés ; prix d'achat et stock EcoFlow (Gmail, fichier Innov8), règle du PVP minimum, marge River 3 ; scénarios Make (stock, codes) ; 3 fiches en rupture passées en brouillon, accueil et 7 fiches corrigés ; comparatif transporteurs, livraison sur devis au-delà de 40 kg ; email à Innov8 envoyé (poids ECF0015, réapprovisionnement) |

## Mise à jour de ce fichier

À la fin de chaque session : mettre à jour « Décisions », « Fait en ligne », « En attente » et ajouter une ligne au journal des sessions.
