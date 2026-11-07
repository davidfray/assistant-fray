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

1. **EcoFlow FR perd de l'argent à chaque vente.** Transport vers la France : environ 100 € par envoi (TNT, Innov8 03/11), supérieur à la marge d'une River 3 Plus (37 € HT) ou d'une DELTA 3. Le groupe a coûté 23,50 € en 9 jours. Options : le remettre en pause jusqu'à un transporteur France rentable, ou le garder pour la notoriété en acceptant la perte.
2. **Budget : ne pas l'augmenter maintenant.** 37 % d'impressions perdues faute de budget, mais 0 achat. Priorité : CSS mobile et commande test d'abord.
3. **Commande test** pour vérifier la conversion (0 conversion depuis l'ouverture). Sans conversion, impossible de passer en enchères « Maximiser les conversions ».
4. **FAIT le 07/11 (voir section 2 bis).** EcoFlow ES, mots-clés génériques (« central eléctrica portátil » 20,34 €, « generador solar portátil » 12,85 €) qui arrivent tous sur la DELTA 3. Proposition : un groupe ES « genérico » vers la catégorie La Base espagnole, et garder la fiche DELTA 3 pour les recherches « ecoflow delta 3 ».
5. **FAIT le 07/11 (voir section 2 bis).** SOK FR, efficacité de l'annonce « Médiocre »** (7 titres seulement). Titres à ajouter : « Batterie camping-car 206 Ah », « LiFePO4 2 637 Wh », « Garantie légale 3 ans ».

## 4. Prochain contrôle

Le 14/11 : effet des négatifs et de la nouvelle page d'arrivée EcoFlow FR (CTR, CPC, taux de rebond GA4 si installé).
