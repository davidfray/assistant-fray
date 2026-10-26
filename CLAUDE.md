# Mémoire des projets : Fray Services Palamós et Sol & Volt

Fichier chargé automatiquement à chaque session. Mis à jour le 26/10/2026.
Branche de travail : `ccr-1a772cc3-mb90wj`. Tous les livrables sont des brouillons en Markdown dans ce dépôt, sauf mention « en ligne ».

## Deux marques, jamais mélangées

| | Sol & Volt (solandvolt.com) | Fray Services (frayservices.com) |
|---|---|---|
| Activité | E-commerce matériel solaire, 4 niveaux d'autonomie | Rénovation multi-corps d'état, maître d'ouvrage délégué |
| Charte | Solaire : #3D2E0A / #C89B3C / #FAEEDA, police système, sans emoji | #F5F0E8 / #C4822A / #2C2C2C, Oswald + Lato, 1 à 2 emojis max |
| Skills | solandvolt-garde-fous (lire en premier), -niveaux-autonomie, -seo-blog, -social-instagram, -catalogue-ops, -service-client | social-media-fray, devis-fray, rapport-chantier |
| Accès site | Connecteur WordPress, site 257165426 (Jetpack) | Connecteur WordPress, site 253853971 (Atomic) |

Règles Sol & Volt absolues : aucune mention CE, « gestionnaire de réseau local » jamais Enedis seul, photos réelles uniquement, aucune référence à Fray Services, publication Instagram (webhook n8n) uniquement après validation de David.

## Où trouver quoi

| Dossier | Contenu |
|---|---|
| `DOSSIER-KIT-BALCON.md` | Suivi Sol & Volt : livrables, statuts, ordre de publication |
| `audit/constats-solandvolt-2026-10-26.md` | Audit solandvolt.com, corrections faites en ligne, décisions |
| `audit/diagnostic-seo-solandvolt-2026-10-26.md` | Diagnostic SEO solandvolt.com, plan d'action sur 4 semaines |
| `fray/audit/constats-frayservices-2026-10-26.md` | Audit frayservices.com, faits utilisables dans les posts |
| `blog/` | Articles Sol & Volt FR et ES, mise à jour proposée de l'article ?p=483 |
| `catalogue/` | Fiche Tornasol 800 W (FR, ES) |
| `social/` | Posts Sol & Volt (kit balcon, Wh, décembre) et calendrier de décembre |
| `emails/` | Modèle email syndic, demande fiche technique Tornasol (envoyée), demande d'informations au fournisseur EcoFlow (brouillon) |
| `service-client/` | Réponses types FR/ES (kit balcon, Wh) |
| `fray/social/` | Calendrier et posts Fray Services de novembre |

## Identifiants utiles solandvolt.com

- Catégories : La Veilleuse 21, Le Module 33, La Base 42, L'Autonomie 50 (`/categorie-produit/lautonomie/`, hors parent), Autonomie énergétique 20, Climatisation 61 (créée le 26/10).
- Produits : Tornasol 800 W ?p=114 (livraison 12 à 18 jours ouvrés), Kit Autonomie 300 Wh ?p=94 (brouillon), Station 300 Wh ?p=87 (brouillon), Panneau 100 W ?p=88 (brouillon), Centrale AC70P ?p=346, DELTA 3 ?p=344, River 3 UPS 245 Wh ?p=601.
- Articles en ligne : Wh résidence secondaire ?p=483, coupures Espagne ?p=229, LiFePO4 ou plomb ?p=231, climatisation ?p=412, Pourquoi Sol & Volt ?p=95.

## Décisions prises par David (26/10/2026)

- Posts : version A retenue partout (kit balcon, Wh, décembre 1re et 2e quinzaines, Fray novembre). Post Sol & Volt du 25/12 validé, lancement en 2026 confirmé ; bilan du 29/12 en version 2 (récapitulatif des 4 niveaux).
- Article Wh : enrichir ?p=483 plutôt que publier le brouillon de novembre (proposition prête : `blog/maj-article-483-combien-wh.html`).
- Produit niveau Le Module : publier le Kit Autonomie 300 Wh ?p=94 (David le publie lui-même).
- Fray Services : délai de réponse retenu « réponse sous 24 h ».
- Sol & Volt : pas d'extension de garantie proposée ; la référence est la garantie légale de 3 ans des CGV.
- Sol & Volt : les batteries de stockage STREAM sont classées au niveau L'Autonomie.
- Sol & Volt, SEO : option A, les catégories de produits deviennent les pages de référence des 4 niveaux ; les pages /la-veilleuse/, /le-module/, /la-base/, /l-autonomie/ redirigent en 301 vers elles.
- Fray Services, photos : post du 02/11 = chauffe-eau au gaz (`fray/medias/2026-11-02-chauffe-eau-gaz.jpg`, recadrer les étiquettes du fabricant) ; post du 04/11 = « Rénovation salle de bain », média n° 150 de frayservices.com.

## Fait en ligne (26/10/2026)

- solandvolt.com, SEO (20 h 35) : bandeau de la page commande (« Délai de livraison indiqué sur chaque fiche produit »), descriptions des catégories 20, 21, 33, 42, 50 (accents, promesse Le Module « une soirée à une journée », contenu des pages de niveau repris), boutons des niveaux de l'accueil vers les catégories ; accueil : bloc « Nos stations les plus demandées » (601, 344, 346 au lieu des brouillons 54, 50, 52) et carte La Base (« une journée et plus »). Sauvegardes : `audit/sauvegardes-2026-10-26/`.
- solandvolt.com (20 h 43) : 7 fiches EcoFlow complétées (?p=601, 623, 539, 546, 739, 525, 563), voir `catalogue/fiches-ecoflow-2026-10-26.md`.
- solandvolt.com (20 h 51) : 14 autres fiches EcoFlow complétées et 6 titres corrigés (850, 584, 750, 658, 671, 864), voir `catalogue/fiches-ecoflow-lot2-2026-10-26.md`. Batteries STREAM 750, 658, 671 déplacées dans L'Autonomie (21 h 00).
- solandvolt.com (21 h 05) : textes alternatifs des images principales des 48 produits (29 ajoutés, 5 corrigés), voir `catalogue/textes-alternatifs-images-2026-10-26.md`.
- solandvolt.com (21 h 06) : catégorie d'articles « Uncategorized » renommée « Guides » (/category/guides/) ; images à la une sur les 5 articles (photos produits) ; articles ?p=231, 229, 412, 95 corrigés (21 h 10, sauvegardes dans `audit/sauvegardes-2026-10-26/articles/`) ; ?p=229 : extension de garantie retirée, garantie légale 3 ans comme les CGV (21 h 12) ; ?p=231 : garantie 3 ans (21 h 13) ; fiche AC70P ?p=346 : garantie 3 ans, liens vers brouillons remplacés par ?p=546 et ?p=344 (21 h 14) ; ?p=95 : « livré depuis l'Europe » remplacé par « livré en France et en Espagne » (21 h 15).

- solandvolt.com : fiche Tornasol ?p=114 (lien catégorie corrigé, PW1000 remplacée par AC70P) ; catégorie Climatisation créée, produits 339, 42, 46, 112 déplacés, lien de catégorie corrigé sur leurs fiches.
- Email de demande de fiche technique envoyé à somos@tornasol.energy depuis david@frayservices.com (réponse attendue avant le 05/11).

## En attente

### De David
- Sol & Volt : publier ?p=94, ?p=87, ?p=88 (vérifier prix, stock, expédition ; corriger le titre « Autonomie 48H » de ?p=87), puis feu vert pour mettre à jour ?p=483 (vérifier le prix AC70P 539,90 €).
- Sol & Volt : prix TTC et délais (kit Tornasol, kit 300 Wh), délais réels pour la date limite avant Noël, vraies photos, URL espagnoles TranslatePress, relecture de la question écrite n° 6574 (Assemblée nationale).
- Fray Services (posts du 02/11 et du 04/11 prêts, reste le recadrage Canva) : chantier avant/après (06/11), chantier en cours (16/11), artisan pour portrait (20/11), créneaux d'hiver restants (30/11), accord de Roger Boullier pour son témoignage (25/11), vraies photos ; confirmer la coordination sur une ligne à part du devis, le code couleur vert/orange/rouge, l'accompagnement des démarches en mairie (23/11), les règles de Palamós.

- Sol & Volt, fournisseur EcoFlow (brouillon d'email prêt : `emails/email-fournisseur-ecoflow-infos-fiches.md`, destinataire à compléter) : modèle exact du « Glacier 3 » ?p=640 (réf. ECF0046), différence entre panneaux 160 W V2 (?p=690) et V3 (?p=833), compatibilité du câble ?p=573 (River ou DELTA seulement) et du support ?p=768 (panneau 400 ou 450 W), délai de livraison.
- Sol & Volt, SEO : créer les 4 redirections 301 dans Rank Math (tableau dans le diagnostic) ; 6 contrôles navigateur (Search Console, Rank Math, sitemap, PageSpeed, version /es/) ; forme unique du nom de marque.

### Rappels programmés
- 05/11/2026 : vérifier la réponse de Tornasol, mettre à jour les fiches ou proposer une relance.
- 24/12/2026 : préparer la publication du post Sol & Volt du 25/12 et demander le feu vert final.

### Points ouverts sur les sites (non corrigés, à proposer)
- solandvolt.com, SEO (voir le diagnostic) : 5 fiches EcoFlow encore quasi vides (21 complétées le 26/10) (« Fiche technique détaillée à venir ») ; images de galerie sans texte alternatif et images lourdes (JPEG, pas de WebP) ;  slugs des kits Tornasol.
- solandvolt.com : ?p=42 renvoie vers ?p=44 (brouillon) ; extraits contradictoires sur ?p=42 (vitesses) et ?p=46 (Wi-Fi) ; catégorie Climatisation à ajouter au menu.
- frayservices.com : « réponse sous 24h » (Projets) et « devis gratuit en 48h » (accueil) à confirmer comme compatibles ; balise google-site-verification dans le contenu de l'accueil ; emojis et affirmations sans preuve sur la page Services.

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

## Mise à jour de ce fichier

À la fin de chaque session : mettre à jour « Décisions », « Fait en ligne », « En attente » et ajouter une ligne au journal des sessions.
