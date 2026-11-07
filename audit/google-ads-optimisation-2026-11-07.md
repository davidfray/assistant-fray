# Google Ads solandvolt.com : analyse et optimisation du 07/11/2026

Compte 3229795533, campagne « Solandvolt - Recherche FR-ES v2 » (Réseau de Recherche, Maximiser les clics, 10 €/jour). Données lues par l'API le 07/11 à 8 h 40 (heure de Madrid).

## 1. Bilan du 29/10 au 06/11 (9 jours)

| Groupe | Impressions | Clics | Coût | CTR | CPC moyen |
|---|---|---|---|---|---|
| EcoFlow ES | 4 029 | 139 | 57,73 € | 3,4 % | 0,42 € |
| EcoFlow FR | 3 519 | 78 | 23,50 € | 2,2 % | 0,30 € |
| SOK ES | 175 | 10 | 5,56 € | 5,7 % | 0,56 € |
| SOK FR | 150 | 5 | 2,06 € | 3,3 % | 0,41 € |
| **Total** | **7 873** | **232** | **88,85 €** | 2,9 % | 0,38 € |

- **0 achat.** La balise `AW-18515270298` est bien présente sur les pages (vérifié le 07/11). L'action « Google for WooCommerce purchase » n'a jamais rien enregistré : la commande test n'a jamais été comptée.
- **Mobile : 93 % des clics** (216 sur 232). Le CSS mobile (`audit/css-mobile-solandvolt-2026-11-04.md`) n'est toujours pas collé.
- Part d'impressions 10 % : 37 % perdus faute de budget, 60 % perdus à cause du classement.
- Dépense régulière : 8,50 à 10,67 € par jour.

## 2. Corrections faites en ligne (07/11, par l'API)

### Promesses fausses retirées des annonces
Les annonces affichaient « Garantie 2 ans » et « Livraison rapide 48-72h ». Or la garantie est de 3 ans (CGV) et aucun envoi EcoFlow n'est possible en 48-72 h (enlèvement chez Innov8, transporteur au cas par cas, pas de transporteur connu vers la France).

| Avant | Après |
|---|---|
| Garantie 2 ans | Garantie légale 3 ans |
| Livraison rapide 48-72h | Livraison suivie |
| Garantía de 2 años | Garantía legal de 3 años |
| Envío rápido 48-72h | Envío con seguimiento |
| « Livraison rapide 48-72h, garantie 2 ans et paiement sécurisé… » | « Livraison suivie, garantie légale 3 ans et paiement sécurisé. Commandez en ligne. » |

Appliqué aux annonces EcoFlow FR, EcoFlow ES et SOK ES, et aux accroches (callouts) des 4 groupes : 4 nouvelles accroches créées (assets 437052450746, 437160446263, 437160449431, 437160449434), les 4 anciennes détachées (non supprimées).

### Page d'arrivée EcoFlow FR
L'annonce EcoFlow FR menait à l'**accueil**, alors que le premier terme payant est « ecoflow delta 3 » (20 clics, 9,12 €). Elle mène désormais à la fiche DELTA 3 française `/produit/station-electrique-portable-ecoflow-delta-3-1024wh/`. Annonce en cours de révision par Google au 07/11.

### 10 mots-clés négatifs ajoutés (56 au total après correction)
diesel, silencieux, silent, panels, system, decathlon, renouvelable, مولد (arabe), « delta 2 » (expression). **« river 2 » ajouté puis retiré le jour même** : la River 2 Pro (La Base) et la River 2 Max (Le Module) sont en vente. 56 négatifs au total. Termes repérés : « silent diesel generators », « solar panels », « 7000 watt solar system », « ecoflow decathlon », « energie renouvelable particulier » (3 clics), recherches en arabe, anciens modèles DELTA 2 et River 2 non vendus.

## 2 bis. Ajouts du 07/11, à la demande de David

### Titres SOK FR
3 titres ajoutés (10 au total) : « Batterie camping-car 206 Ah », « LiFePO4 2 637 Wh », « Garantie légale 3 ans ».

### Nouveau groupe « EcoFlow ES genérico » (id 208684355744)
- Page d'arrivée : catégorie La Base espagnole `/es_es/categoria-producto/la-base/` (DELTA 3, DELTA 3 Plus, DELTA 3 Max Plus, DELTA 3 Pro, River 2 Pro, AC70P).
- Mots-clés déplacés depuis EcoFlow ES (mis en pause là-bas) : « central eléctrica portátil », « generador solar portátil », « batería de respaldo casa » (expression), [estación de energía portátil] (exact).
- EcoFlow ES garde les recherches de modèle : ecoflow delta 3, ecoflow delta 3 plus, ecoflow stream ultra (vers la fiche DELTA 3).
- Annonce : 11 titres (Estaciones de energía portátil, Generador solar portátil, Batería de respaldo para casa, EcoFlow DELTA 3 y River 2 Pro, Energía para cortes de luz, Elige según tu autonomía, Garantía legal de 3 años, Envío con seguimiento, Pago 100% seguro, Tienda de energía solar, Compra online en Solandvolt) et 4 descriptions ; chemin affiché /estaciones/portatiles.
- Liens annexes et accroches espagnols rattachés (4 + 4).
- À surveiller : le titre d'onglet de la page La Base espagnole est encore en français (« La Base : centrale électrique et kits balcon »), à traduire dans TranslatePress.

### EcoFlow FR : requête large remplacée par l'expression exacte (07/11)
Les 25 mots-clés en requête large du groupe attiraient des recherches hors sujet : « silent diesel generators », « 5000 watt solar generator price », « kit solaire 3000w … 10kw », recherches en arabe, « ecoflow decathlon ». Ils sont **en pause** ; 23 versions en expression exacte (« ») créées, 2 existaient déjà (réactivées si besoin). Le groupe compte 28 mots-clés en expression et 3 exacts. Sans conversion enregistrée, la requête large n'a pas de signal pour se corriger.

## 3. Ce que je n'ai pas modifié (décision de David)

1. **FAIT le 07/11 : groupe EcoFlow FR en pause (décision de David).** À réactiver quand un transporteur France rentable sera trouvé, puis surveiller les mots-clés en expression exacte. Constat initial : EcoFlow FR perd de l'argent à chaque vente. Transport vers la France : environ 100 € par envoi (TNT, Innov8 03/11), supérieur à la marge d'une River 3 Plus (37 € HT) ou d'une DELTA 3. Le groupe a coûté 23,50 € en 9 jours. Options : le remettre en pause jusqu'à un transporteur France rentable, ou le garder pour la notoriété en acceptant la perte.
2. **Budget : ne pas l'augmenter maintenant.** 37 % d'impressions perdues faute de budget, mais 0 achat. Priorité : CSS mobile et commande test d'abord.
3. **Commande test** pour vérifier la conversion (0 conversion depuis l'ouverture). Sans conversion, impossible de passer en enchères « Maximiser les conversions ».
4. **FAIT le 07/11 (voir section 2 bis).** EcoFlow ES, mots-clés génériques (« central eléctrica portátil » 20,34 €, « generador solar portátil » 12,85 €) qui arrivent tous sur la DELTA 3. Proposition : un groupe ES « genérico » vers la catégorie La Base espagnole, et garder la fiche DELTA 3 pour les recherches « ecoflow delta 3 ».
5. **FAIT le 07/11 (voir section 2 bis).** SOK FR, efficacité de l'annonce « Médiocre »** (7 titres seulement). Titres à ajouter : « Batterie camping-car 206 Ah », « LiFePO4 2 637 Wh », « Garantie légale 3 ans ».

## 4. Prochain contrôle

Le 14/11 : effet des négatifs et de la nouvelle page d'arrivée EcoFlow FR (CTR, CPC, taux de rebond GA4 si installé).

## 5. Recalibrage du 07/11 (après-midi), à la demande de David

### Le constat corrigé
- **Aucune commande WooCommerce depuis le 06/10** (lu par l'API : 3 commandes au total, 2 annulées en août et octobre, 1 remboursée en septembre ; aucune en attente ni échouée). Le « 0 achat » de Google Ads est donc **réel**, ce n'est pas un défaut de suivi. La commande test n'a jamais été passée.
- **GA4 collecte depuis le 03/11** par Site Kit (balise `GT-NMC3NTFB`, mesure `G-X1JG6B971W`, suivi des conversions de Site Kit activé). Du 03 au 07/11 : 62 sessions, dont 36 en Recherche payante (34 sur mobile, 68 % de sessions engagées, 1 min 52 en moyenne) ; **0 ajout au panier, 0 paiement commencé**. GA4 compte moins de visites que Google Ads de clics (bandeau de cookies CookieAdmin : les refus ne sont pas comptés).
- **Parcours d'achat testé le 07/11** (iPhone, FR et ES, depuis une machine neutre) : ajout au panier, panier et page de paiement fonctionnent ; Mollie propose carte, PayPal et virement. Le paiement lui-même reste à tester par une vraie commande.
- Conclusion : les visiteurs regardent la fiche puis repartent sans ajouter au panier. **Le frein est l'offre (prix, délai), pas la technique.**

### Comparaison des prix (07/11)
| Produit | Sol & Volt | Concurrence |
|---|---|---|
| EcoFlow DELTA 3 (1 024 Wh) | 799 € | EcoFlow ES 799 à 849 € ; MediaMarkt 705,49 € (vendeur tiers) ; Idealo annonçait « dès 641,99 € » (aucune offre affichée au contrôle) |
| EcoFlow River 3 Plus | 299 € | EcoFlow ES 299 €, DSP Camper 299 €, MediaMarkt 299 à 348 € |
| SOK 12 V 206 Ah chauffante (SK12V206H) | **639,90 €** | **Boutique officielle SOK Europe : 585 €**, livraison offerte dans l'UE, entrepôt en Allemagne |
| SOK 12 V 100 Ah chauffante (SK12V100H) | **269 €** | **SOK Europe : 259 €** |

- EcoFlow : Sol & Volt est au PVP (obligation Innov8), donc au même prix que la marque, avec un délai plus long. Seuls le conseil (4 niveaux d'autonomie) et le service local peuvent faire la différence.
- **SOK : Sol & Volt est plus cher que le fabricant lui-même** (55 € sur la 206 Ah). Un visiteur qui compare achète chez SOK. À décider par David : aligner le prix (si le prix d'achat le permet, à vérifier) ou arrêter les groupes SOK de Google Ads.

### Fait le 07/11
- **Budget de la campagne passé de 10 à 5 € par jour** (accord de David), jusqu'à la première vente. Groupes actifs : EcoFlow ES, EcoFlow ES genérico, SOK FR, SOK ES. EcoFlow FR reste en pause.
- Contrôle des annonces (12 h 46) : toutes approuvées, le groupe genérico diffuse.

### Reste à faire par David
1. **Commande test réelle sur téléphone**, version espagnole, avec un produit bon marché (par exemple une lampe), puis remboursement : valide le paiement et la conversion Google Ads.
2. **SOK** : vérifier le prix d'achat et décider (aligner à 585 € et 259 €, ou couper les groupes SOK).
3. **GA4** (Admin > Paramètres de la propriété) : devise **EUR** et fuseau **Europe/Madrid** (aujourd'hui USD et UTC). Aucun outil connecté ne permet de modifier la propriété.

### Suite du 07/11 (« fais les travaux »)
- **Prix SOK alignés sur SOK Europe** (décision de David, par l'API) : SK12V206H ?p=482 **585 €** (au lieu de 639,90 €), SK12V100H ?p=480 **259 €** (au lieu de 269 €). Prix d'achat SOK (mail d'Eve du 15/10, HT, livraison France et Espagne comprise) : 439 € et 187 €. Marge HT : **44,47 €** (10,1 % du coût) et **27,05 €** (14,5 %), avant frais Mollie. La 206 Ah passe sous la règle des 12 % : exception voulue, le prix du marché est prioritaire. Paliers SOK : 206 Ah à 410 € dès 10 unités par mois (3 modèles cumulés pendant les 3 premiers mois). SOK n'impose pas de prix minimum. Vérifié en ligne (FR et ES).
- **GA4 devise et fuseau** : faits par David à 13 h 08 (EUR, Europe/Madrid), vérifiés par l'API. La connexion Composio ne peut que lire GA4.
- **Commande test : abandonnée (décision de David, pas de fonds pour des tests).** La première vente réelle servira de contrôle. Note d'origine : non faisable par Claude (paiement réel par carte depuis un vrai téléphone, et le navigateur de la session ne transmet pas les balises Google). À faire par David ; Claude rembourse ensuite par l'API WooCommerce (remboursement Mollie).
