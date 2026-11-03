# Textes encore en français sur la version espagnole (relevé du 03/11/2026)

> **Mise à jour du 03/11, 22 h 45 : tout ce relevé est traité.** Les 76 pages de /es_es/ (accueil, pages, articles, 6 catégories, fiches produits) ne montrent plus de français à l'écran. Sections 1 à 4 et 11 bis : CSS des styles globaux. Sections 5 à 10 : modèles de catégorie bilingues `taxonomy-product_cat-…` (shortcode `[trp_language]`), plus la catégorie Climatisation (« Aires acondicionados y enfriadores de aire para mantenerse fresco sin obras. »). Fil d'Ariane « El Módulo » : CSS. Article ?p=412 : paragraphe bilingue. Titre des commentaires des articles (il reprenait le titre français) : « Comentarios » en CSS.
>
> **Reste, invisible dans la page** : titres d'onglet et méta-descriptions Rank Math en français sur /es_es/ (visibles dans l'onglet du navigateur et les résultats Google) et libellés « … cantidad » des lecteurs d'écran (section 11). À traduire dans l'éditeur TranslatePress ou en séance Cowork avec Claude dans Chrome.
>
> Limite connue : un texte ajouté en CSS n'est pas lu par Google. Les modèles bilingues, eux, produisent du vrai texte espagnol.

Méthode : 66 pages espagnoles lues le 03/11 vers 22 h (accueil, boutique, 5 catégories, 6 pages légales et d'information, 53 fiches produits). Chaque texte affiché a été comparé aux mots courants du français et de l'espagnol. Les textes déjà traduits (accueil, pied de page, intertitres des catégories) ne figurent pas ici.

Saisie : wp-admin > « Traduire la page » > Spanish, cliquer sur le texte français, coller l'espagnol, enregistrer. Une ligne = un texte à cliquer. Les textes communs à toutes les fiches se traduisent une seule fois et s'appliquent partout.

## 1. Bloc commun sous le bouton d'achat (50 à 53 fiches) : **fait le 03/11 par Claude en CSS** (styles globaux, version espagnole), vérifié en capture d'écran

Les deux lignes françaises du bloc sont masquées sur /es_es/ et remplacées par leur traduction en CSS. Limite : un texte ajouté en CSS n'est pas lu par Google (sans effet sur le référencement). Si ces textes sont un jour traduits dans TranslatePress ou modifiés dans `functions.php`, adapter ou retirer la règle (Apparence > Éditeur > Styles > CSS additionnel).

| Français | Espagnol |
|---|---|
| Livraison offerte de 60 € à 350 € | Envío gratuito de 60 € a 350 € |
| vers France / Espagne — transport au poids au-delà | a Francia y España; por encima, transporte según el peso |
| Pose possible sur devis | Instalación posible con presupuesto previo |
| par notre équipe à Palamós et sur la Costa Brava — | por nuestro equipo en Palamós y en la Costa Brava — |
| demander un devis | pedir presupuesto |

La mention de pose est voulue ; « préalable » est ajouté sur la version française par une règle CSS des styles globaux (03/11) ; le texte source reste « Pose possible sur devis », d'où la traduction « …con presupuesto previo » : la pose est assurée avec les partenaires de frayservices.com (décision de David du 03/11).

## 2. Fiches Zendure (912, 913, 914)

| Français | Espagnol |
|---|---|
| en Espagne péninsulaire uniquement pour le moment | solo en España peninsular por ahora |
| -20 °C à 55 °C | -20 °C a 55 °C |

## 3. Descriptions courtes modifiées le 03/11

| Fiche | Français | Espagnol |
|---|---|---|
| ?p=341 Applique solaire | Applique solaire étanche pour l’extérieur. Elle se recharge au soleil le jour et s’allume la nuit, sans câblage. Livraison en 12 à 18 jours ouvrés. | Aplique solar estanco para exterior. Se carga con el sol durante el día y se enciende por la noche, sin cableado. Entrega en 12 a 18 días laborables. |
| ?p=339 Climatiseur mural | Climatiseur mural à compresseur pour une pièce de résidence secondaire ou de logement occupé toute l’année. Installation murale classique. Livraison en 12 à 18 jours. | Aire acondicionado de pared con compresor para una habitación de una segunda residencia o de una vivienda habitada todo el año. Instalación mural clásica. Entrega en 12 a 18 días. |

## 4. Valeurs techniques avec « à »

| Fiche | Français | Espagnol |
|---|---|---|
| ?p=776 Tracker | De 10 à 85° | De 10 a 85° |
| ?p=46 Air cooler | 36 à 45 dB | 36 a 45 dB |
| ?p=46 Air cooler | 1,0 à 2,5 L | 1,0 a 2,5 L |

## 5. Noms des catégories (fil d'Ariane)

| Français | Espagnol |
|---|---|
| La Veilleuse | El Piloto |
| Le Module | El Módulo |
| Autonomie énergétique | Autonomía energética |

## 6. Catégorie La Veilleuse / El Piloto (21)

Traductions prêtes dans `audit/traductions-es-translatepress-2026-10-29.md`, section 3 (les paragraphes et les 4 tirets de la liste sont encore en français).

## 7. Catégorie La Base (42)

Traductions prêtes dans `audit/traductions-es-translatepress-2026-10-29.md`, section 4 (paragraphes et tirets encore en français ; les intertitres sont déjà traduits).

## 8. Catégorie L'Autonomie (50)

Traductions prêtes dans `audit/traductions-es-translatepress-2026-10-29.md`, section 5.

## 9. Catégorie Le Module / El Módulo (33), absente du premier relevé

| Français | Espagnol |
|---|---|
| C’est le niveau 2. Le Module est la première vraie brique d’indépendance. Il répond à la question : que se passe-t-il si la panne dure une soirée, voire une journée ? | Es el nivel 2. El Módulo es el primer paso real hacia la independencia. Responde a la pregunta: ¿qué pasa si el corte dura una noche, o incluso un día? |
| Avec une station électrique de 250 à 500 Wh et un panneau solaire de 100 W, vous alimentez votre box internet, l’éclairage LED, vos téléphones ou un ordinateur portable, soit de l’ordre de 450 Wh par jour. Quand le soleil brille, vous rechargez (de l’ordre de 300 à 400 Wh par jour selon la saison). Pour un réfrigérateur domestique, il faut une capacité supérieure, comme la centrale AC70P de 864 Wh. Pour calculer votre besoin, lisez notre guide | Con una estación de energía de 250 a 500 Wh y un panel solar de 100 W, alimentas el router, la iluminación LED, los móviles o un portátil, unos 450 Wh al día. Cuando hace sol, recargas (unos 300 a 400 Wh al día según la estación). Para una nevera doméstica hace falta más capacidad, como la central AC70P de 864 Wh. Para calcular lo que necesitas, lee nuestra guía |
| Combien de Wh faut-il pour tenir une coupure dans une résidence secondaire | Cuántos Wh hacen falta para aguantar un corte en una segunda residencia |
| Silencieux. Sans essence. Sans odeur. C’est l’autonomie qui se fond dans votre quotidien, que vous soyez en appartement, en maison, ou en van. | Silenciosa. Sin gasolina. Sin olor. Es la autonomía que se integra en tu día a día, vivas en un piso, en una casa o en una furgoneta. |
| Des stations électriques portables EcoFlow River, de 245 Wh à 512 Wh, et la River 3 Plus 600 W | Estaciones de energía portátiles EcoFlow River, de 245 Wh a 512 Wh, y la River 3 Plus de 600 W |
| Des panneaux solaires de 60 à 160 W (rigides, légers ou flexibles) et leurs supports | Paneles solares de 60 a 160 W (rígidos, ligeros o flexibles) y sus soportes |
| Le réfrigérateur portable EcoFlow Glacier 3 de 35 L | La nevera portátil EcoFlow Glacier 3 de 35 L |
| Des kits solaires prêts à l’emploi : station 300 W avec panneau 60 W, kits balcon Tornasol | Kits solares listos para usar: estación de 300 W con panel de 60 W, kits de balcón Tornasol |
| Pour les foyers qui veulent un plan B pour l’essentiel. Pour les télétravailleurs qui doivent rester connectés pendant une coupure. Pour les propriétaires de résidence secondaire qui veulent garder la box et la lumière. Pour les vanlifers et les campeurs. | Para los hogares que quieren un plan B para lo esencial. Para quienes teletrabajan y deben seguir conectados durante un corte. Para los propietarios de una segunda residencia que quieren mantener el router y la luz. Para quienes viajan en furgoneta y los campistas. |
| Si vous n’avez pas encore le niveau 1, jetez un œil à la collection | Si todavía no tienes el nivel 1, echa un vistazo a la colección |
| Quand 500 Wh ne suffisent plus, quand vous voulez alimenter un réfrigérateur domestique ou tenir plusieurs jours, c’est la collection | Cuando 500 Wh ya no bastan, cuando quieres alimentar una nevera doméstica o aguantar varios días, es la colección |

## 10. Catégorie parente Autonomie énergétique (20)

| Français | Espagnol |
|---|---|
| Kits solaires, batteries et stations électriques portables pour traverser une coupure de courant, sans travaux. Quatre niveaux, du plus simple au plus complet : | Kits solares, baterías y estaciones de energía portátiles para pasar un corte de luz, sin obras. Cuatro niveles, del más sencillo al más completo: |
| : lampes, chargeurs et petites batteries pour une soirée sans courant. | : lámparas, cargadores y pequeñas baterías para una noche sin luz. |
| : station portable et panneau solaire pour garder la box, la lumière et les téléphones, d’une soirée à une journée. | : estación portátil y panel solar para mantener el router, la luz y los móviles, de una noche a un día. |
| : stations de forte capacité et panneaux solaires pour garder aussi le réfrigérateur en marche. | : estaciones de gran capacidad y paneles solares para mantener también la nevera funcionando. |
| : stockage domestique et kits solaires branchés sur une prise de la maison. | : almacenamiento doméstico y kits solares conectados a un enchufe de casa. |
| Pour choisir la capacité, lisez notre guide | Para elegir la capacidad, lee nuestra guía |
| Combien de Wh pour une résidence secondaire | Cuántos Wh para una segunda residencia |

## 11. Libellés invisibles (lecteurs d'écran), priorité basse

TranslatePress affiche le titre français suivi de « cantidad » dans le libellé du champ quantité de 8 fiches (EcoFlow DELTA 3 Max Plus, River 3 Plus, DELTA 3 Plus, STREAM AC Pro, Tracker, Support, HeatGuard, Zendure AB3000L, Air Cooler connecté). Invisible à l'écran : à traiter en dernier.

## Pourquoi Claude ne peut pas saisir ces traductions

TranslatePress range ses traductions dans ses propres tables ; le connecteur WordPress n'y a pas accès, et la gestion des extensions par Jetpack est désactivée. Saisie possible par David (environ 20 minutes) ou par Claude dans Chrome en séance Cowork.
