# Contrôle de la séance Cowork du 07/11 (08/11/2026)

Relu en ligne le 08/11 vers 18 h 45 (heure de Madrid), par l'API et les pages publiques de solandvolt.com.

## Conforme

| Contrôle | Résultat |
|---|---|
| Titres et descriptions Rank Math des catégories (2 FR, 5 ES) | 7 / 7 en ligne. Exception : La Veilleuse ES, voir plus bas |
| L'Autonomie FR (titre qui ne s'affichait pas le 07/11) | « L’Autonomie : batteries solaires pour la maison \| Sol & Volt », nouvelle description en ligne |
| 18 descriptions Google des fiches (garantie, délais) | 18 / 18 identiques aux textes de `metas-rankmath-promesses-2026-11-07.md` |
| Redirections 301 (climatisation FR et ES, anciennes pages de niveau ES) | 16 / 16 en 301 vers la bonne adresse |
| Plans du site | Plus aucune page de niveau ni produit ou catégorie de climatisation (pages 23, produits 50, articles 7, catégories 5) |
| Glacier ?p=640 | Titre Rank Math FR et ES corrigés ; nom espagnol « EcoFlow Glacier Classic – Nevera portátil 35 L » en titre de page et dans la grille de La Base ES |

## À corriger

1. **Description Google de ?p=640** : encore « EcoFlow Glacier 3 : Réfrigérateur Portable 35 L. Livraison France et Espagne, paiement sécurisé. » (FR, et en français sur /es_es/). Proposé : `EcoFlow Glacier Classic : réfrigérateur portable 35 L. Livraison en France et en Espagne, paiement sécurisé.` (faisable par l'API Rank Math, avec l'accord de David).
2. **Fiches ?p=50 et ?p=52, bloc « Voir aussi »** : lien vers ?p=640 intitulé « EcoFlow Glacier 3 – Réfrigérateur portable 35 L ». À remplacer par « EcoFlow Glacier Classic – … » (faisable par l'API WooCommerce, avec l'accord de David).
3. **La Veilleuse ES** : titre d'onglet « La Veilleuse: lámparas y cargadores solares » ; le nom espagnol retenu est « El Piloto » (menu « Piloto »). À ressaisir dans TranslatePress : `El Piloto: lámparas y cargadores solares | Sol & Volt`.

## Découverte : version anglaise /en/ créée le 06/11

16 pages publiées le 06/11 entre 11 h 05 et 17 h 42 (ids 963 à 979), absentes de `CLAUDE.md` : accueil /en/, Delivery, Returns & Refunds, Terms & Conditions of Sale, Legal notice, Privacy Policy, Shop et 6 pages de catégories (Batteries, **Portable Cooling**, The Night Light, The Module, The Base, Self-Sufficiency), 3 pages produits (AC70P, River 3 Plus, DELTA 3). Le menu affiche « EN ».

Points relevés :
- **/en/shop/cooling/ « Portable Cooling » est en ligne**, alors que la climatisation est retirée du site depuis le 07/11.
- Ce sont des pages statiques : les grilles de produits sont recopiées en HTML (prix, noms, stock figés au 06/11). Exemple : /en/shop/the-module/ affiche encore « EcoFlow Glacier 3 – 35 L Portable Refrigerator ». Elles ne suivront pas les changements de prix, de stock ni les passages en brouillon.
- Page AC70P titrée « (Bluetti, 864 Wh) » : marque et capacité à vérifier face à la fiche française ?p=346.
- **À décider par David** : origine et objectif de cette version anglaise (garder, passer en brouillon, ou refaire avec TranslatePress comme l'espagnol).
