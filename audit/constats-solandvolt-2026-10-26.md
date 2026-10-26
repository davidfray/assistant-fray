# Constats sur solandvolt.com : 26/10/2026

Lecture du site via le connecteur WordPress (Jetpack, site 257165426). Aucune modification faite sur le site. Chaque correction est proposée, à valider par David avant exécution.

## 1. Cannibalisation : article sur les Wh déjà publié

- Article en ligne depuis le 14/10/2026 : « Combien de Wh faut-il pour tenir une coupure dans une résidence secondaire ? » (?p=483).
- Notre brouillon de novembre « Combien de Wh pour tenir 48 heures sans courant ? » traite le même sujet, avec le même mot-clé. Publier les deux ferait concurrence sur Google.
- **Écart de chiffres entre les deux textes :**
  - Réfrigérateur : 200 à 350 Wh par jour dans l'article en ligne (« classe A, taille moyenne »), contre environ 950 Wh par jour dans notre brouillon (réfrigérateur combiné, 346 kWh/an selon Selectra). L'article en ligne recommande « 800 Wh et plus » pour un réfrigérateur ; notre brouillon conclut plus de 2 200 Wh pour 48 heures. Les deux valeurs existent selon le modèle, mais le site ne doit pas en afficher deux différentes.
  - Box internet : 10 W en continu, 240 Wh par jour (en ligne), contre 15 W pendant 4 à 10 heures (brouillon).
- **Proposition :** ne pas publier le brouillon tel quel. Options :
  - A. Enrichir l'article ?p=483 (méthode en 4 étapes, tableau, 3 exemples, section soleil) et garder une seule page. Recommandé.
  - B. Republier le brouillon sous un autre angle (par exemple « calculateur pas à pas ») avec un mot-clé distinct.
  - Dans les deux cas : harmoniser la valeur du réfrigérateur sur le site (fourchette selon le modèle, avec la règle « kWh/an ÷ 365 »).

## 2. Produit promu en ligne mais non publié

- L'article ?p=483 présente en exemple « le kit Autonomie 300 Wh, station et panneau 100 W ». Ce produit (?p=94, « Kit Autonomie 300 Wh – Station + Panneau solaire 100 W ») est en **brouillon**, comme « Station Électrique Portable 300Wh – Autonomie 48H » (?p=87). Un visiteur ne peut pas l'acheter.
- Nos brouillons (articles Wh et hiver, post du 11/12) citent un « Kit Autonomie 48H » : aucun produit publié ne porte ce nom.
- **Stations publiées proches du niveau Le Module :** EcoFlow River 3 UPS 245 Wh / 300 W (?p=601), EcoFlow Trail 200DC 192 Wh (?p=705), EcoFlow River 2 Max 512 Wh (?p=539).
- **À décider :** publier le kit ?p=94, ou remplacer l'exemple par un produit publié (par exemple River 3 UPS ?p=601 avec un panneau 110 W ?p=525).

## 3. Fiche Tornasol 800 W (?p=114)

- **Lien vers un produit en brouillon :** le bloc « Complétez votre installation » renvoie vers ?p=348 (Centrale PW1000), qui est en brouillon.
- **URL de catégorie :** la fiche renvoie vers /categorie-produit/autonomie-energetique/lautonomie/, alors que la catégorie L'Autonomie (ID 50) n'a pas de parent : son URL réelle est /categorie-produit/lautonomie/. Vérifier en ligne si l'ancienne URL redirige ou affiche une erreur.
- **Délai affiché :** 12 à 18 jours ouvrés depuis l'entrepôt fournisseur. Repris dans notre brouillon de fiche.
- **Formulation :** « nous vous accompagnons dans cette démarche » (déclaration au réseau). À confirmer : c'est un engagement de service.
- Aucune mention CE : conforme.

## 4. Catégories

| Niveau | ID | URL |
|---|---|---|
| 01 La Veilleuse | 21 | /categorie-produit/autonomie-energetique/la-veilleuse/ |
| 02 Le Module | 33 | /categorie-produit/autonomie-energetique/le-module/ |
| 03 La Base | 42 | /categorie-produit/autonomie-energetique/la-base/ |
| 04 L'Autonomie | 50 | /categorie-produit/lautonomie/ (pas sous « Autonomie énergétique ») |

- L'Autonomie est la seule des 4 catégories hors de la catégorie parente « Autonomie énergétique » (ID 20). Le skill catalogue indique /categorie-produit/autonomie-energetique/lautonomie/ : l'un des deux est à aligner.
- Une recherche des produits des catégories Le Module et La Veilleuse a renvoyé aussi des produits de climatisation (Climatiseur Mural à Compresseur ?p=339, rafraîchisseurs ?p=42, ?p=46, ?p=112). Si ces produits sont bien classés dans ces niveaux, c'est un mélange d'univers à corriger. À vérifier dans WooCommerce.

## 5. Liens insérés dans nos brouillons (français)

- Article kit balcon : catégories 04 et 03, fiche Tornasol ?p=114.
- Article Wh : catégories 02 et 03, article coupures ?p=229.
- Article hiver : catégories 02 et 03, article LiFePO4 ?p=231.
- Posts décembre, 2e quinzaine : catégories 01 et 02.
- Fiche Tornasol : catégorie L'Autonomie (URL réelle), délai de livraison.
- Restent à remplir : le produit « station La Base » à mettre en avant, le kit du niveau 02, les URL espagnoles (selon la configuration TranslatePress), les URL des articles une fois publiés.

## 6. Décisions de David (26/10/2026)

- Article Wh : enrichir l'article en ligne ?p=483 plutôt que publier un nouvel article. Version enrichie préparée : `blog/maj-article-483-combien-wh.html`. Le brouillon `blog/combien-wh-48h-sans-courant-2026-11.md` (et sa version espagnole) n'est plus destiné à être publié tel quel.
- Produit du niveau Le Module : publier le Kit Autonomie 300 Wh (?p=94).
  - Attention : la fiche ?p=94 renvoie vers ?p=87 (Station 300Wh « Autonomie 48H ») et ?p=88 (Panneau pliable 100W), tous deux en brouillon. Les publier aussi, ou retirer ces liens.
  - Le titre de ?p=87 (« Autonomie 48H ») annonce une durée que la fiche du kit ne promet pas (« une soirée à une demi-journée » pour l'usage type) : à harmoniser avant publication.
  - Prix, stock et classe d'expédition à vérifier dans WooCommerce (non accessibles par le connecteur).
- Ordre : publier ?p=94 d'abord, puis mettre à jour ?p=483 (qui renvoie vers ?p=94).

## 7. Corrections faites en ligne

- 26/10/2026, 18 h 03 (heure du site) : fiche Tornasol ?p=114 mise à jour, avec l'accord de David.
  - Lien de catégorie : /categorie-produit/autonomie-energetique/lautonomie/ remplacé par /categorie-produit/lautonomie/ (URL réelle de la catégorie ID 50).
  - Lien « Complétez votre installation » : PW1000 (?p=348, brouillon) remplacée par la Centrale AC70P (?p=346, publiée).
  - Reste du contenu inchangé. Aucun avertissement de WordPress à l'enregistrement.
  - Non vérifié sur le front : solandvolt.com n'est pas joignable depuis cet environnement. À contrôler dans un navigateur.

## 8. Produits de climatisation classés dans les niveaux solaires (vérifié)

| Produit | ID | Catégorie actuelle |
|---|---|---|
| Climatiseur Mural à Compresseur | 339 | Le Module |
| Rafraîchisseur d'air portable (Air Cooler) | 42 | La Veilleuse |
| Air Cooler Connecté avec Télécommande | 46 | Le Module |
| Rafraîchisseur d'air évaporatif SNOWFIELD 5 | 112 | Le Module |

- Le site n'a aucune catégorie « Climatisation » : ces produits n'ont pas d'autre place aujourd'hui.
- Effet : un visiteur qui parcourt Le Module ou La Veilleuse (niveaux d'autonomie solaire) voit des climatiseurs, ce qui mélange les deux univers de la charte.
- Proposition (à valider par David) : créer une catégorie « Climatisation » et y déplacer ces 4 produits, en retirant les catégories de niveau. Vérifier ensuite les produits climatisation en brouillon (EcoFlow Wave 3 ?p=637, batterie Wave 3 ?p=643, rafraîchisseur ?p=44) avant leur publication.

## 9. Climatisation : catégorie créée et produits déplacés (26/10/2026, 18 h 05)

- Catégorie « Climatisation » créée (ID 61, /categorie-produit/climatisation/), avec l'accord de David.
- Produits 339, 42, 46, 112 déplacés dans « Climatisation », niveaux solaires retirés.
- Comptages après modification : Climatisation 4, Le Module 12 (au lieu de 15), La Veilleuse 12 (au lieu de 13), Autonomie énergétique 40 (au lieu de 44).

### Incohérences restantes dans le contenu de ces 4 fiches

- Le bloc « Ce produit fait partie de » renvoie encore vers Le Module (339, 46, 112) ou La Veilleuse (42). À remplacer par la catégorie Climatisation.
- ?p=42 renvoie vers ?p=44 (« Rafraîchisseur d'air sans pales USB »), en brouillon.
- ?p=42 : l'extrait annonce « 3 vitesses », le tableau « 2 vitesses ».
- ?p=46 : l'extrait annonce « télécommande et Wi-Fi », la fiche ne mentionne que la télécommande.
- Menus non vérifiés : la nouvelle catégorie n'y figure pas automatiquement. L'ajouter dans Apparence > Menus si besoin.

## 10. Fiches climatisation : lien de catégorie corrigé (26/10/2026, 18 h 07 à 18 h 08)

- Sur ?p=339, ?p=42, ?p=46 et ?p=112, le bloc « Ce produit fait partie de » renvoie désormais vers « Découvrez toute la gamme Climatisation » (/categorie-produit/climatisation/). Reste du contenu inchangé.
- Non traités (David a choisi de ne corriger que le lien de catégorie) : lien de ?p=42 vers ?p=44 (brouillon), extrait de ?p=42 (« 3 vitesses » contre 2 au tableau), extrait de ?p=46 (« Wi-Fi » absent de la fiche).
