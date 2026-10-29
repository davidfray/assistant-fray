# Avis externe sur la conversion de solandvolt.com : verdict et corrections

Date : 29/10/2026. Source : audit « regard de nouveau client » transmis par David (trafic Google Ads).
Méthode : chaque point vérifié sur le site en ligne (connecteur WordPress, curl via Composio) avant décision.
Sauvegarde des textes remplacés : `audit/sauvegardes-2026-10-29/textes-avant-correction.md`.

## Synthèse

| # | Point de l'audit | Vérifié ? | Verdict | Statut |
|---|---|---|---|---|
| 1a | La Base : « une semaine entière », « une vie entière » | Oui, dans la description de la catégorie 42 | Pertinent | **Corrigé en ligne** |
| 1b | L'Autonomie : « Autonomie : continue », « le réseau devient une option » | Oui, carte niveau 04 de l'accueil | Pertinent | **Corrigé en ligne** |
| 1c | Garantie : « 2 ans en France, 3 ans en Espagne » contre 3 ans ailleurs | Oui, bloc de réassurance de toutes les fiches | Pertinent | Texte prêt, **à coller par David** (code du thème) |
| 1d | Le Module promis « 48 heures » | Oui, catégorie La Veilleuse 21 | Pertinent (trouvé en plus) | Texte prêt, à coller par David |
| 2 | Bouton « Trouver mon niveau de besoins » surpromet | Oui | Pertinent | **Corrigé en ligne** ; questionnaire : plus tard |
| 3 | Pas de preuve sociale, « Avis (0) » | Oui | Pertinent, avec limite | Proposition (jamais d'avis fabriqués) |
| 4 | Délais de livraison génériques | Oui, et pire que décrit | Pertinent, **prioritaire** | Bloqué par le choix du transporteur |
| 5 | Navigation par type, marque, capacité | Oui | Partiellement pertinent | Proposition légère |
| 6 | Erreurs 429 | Non reproduit (8 requêtes rapides, toutes normales) | Probablement la protection anti-robots de l'hébergeur | Test mobile à faire par David |
| 7 | Google Ads : suivi des achats, pages d'atterrissage, mots-clés négatifs | Partiellement (balise AW présente, GA4 absent) | Pertinent | Plan ci-dessous, avant toute hausse de budget |

## 1. Promesses corrigées en ligne (29/10, vers 20 h 36, heure du site)

### Catégorie La Base (id 42)

- « De quoi vivre une semaine entière sans penser au réseau » remplacé par « De quoi garder le réfrigérateur en marche pendant une coupure, une journée et plus, et recharger avec le soleil ». Cohérent avec la carte de l'accueil.
- « Assez pour le réfrigérateur, le congélateur, l'éclairage et la box internet, simultanément » remplacé par un repère chiffré, repris de l'article ?p=483 : environ 800 Wh par jour pour un petit réfrigérateur récent, la box, l'éclairage et les téléphones ; 864 Wh tiennent environ une journée sans soleil, 4 096 Wh plus de quatre jours (4 096 ÷ 930 Wh, marge comprise).
- « La Base couvre une semaine. Le niveau suivant couvre une vie entière » remplacé par « Pour produire et stocker une partie de votre énergie au quotidien, c'est la collection L'Autonomie ».

**Effet secondaire à corriger par David.** Le connecteur WordPress filtre le HTML des descriptions de catégorie : les intertitres (`<h2>`) et les listes (`<ul>`) ont été retirés à l'enregistrement. J'ai remis une présentation propre (paragraphes, intertitres en gras, tirets). Pour retrouver exactement l'ancienne mise en forme, coller le HTML ci-dessous dans wp-admin > Produits > Catégories > La Base > Description (onglet Texte) :

```html
<p>Une station de forte capacité. Des panneaux solaires. De quoi garder le réfrigérateur en marche pendant une coupure, une journée et plus, et recharger avec le soleil.</p>
<p>C’est le niveau 3. La Base est conçue pour les foyers qui veulent sécuriser leur quotidien sur la durée. Pas seulement survivre à une panne, mais continuer à vivre normalement.</p>
<p>Avec une station de 768 Wh à 4 096 Wh et des panneaux de 220 à 400 W, vous alimentez le réfrigérateur, l’éclairage et la box internet. Repère : un petit réfrigérateur récent, la box, l’éclairage et les téléphones consomment environ 800 Wh par jour. Une station de 864 Wh les fait tourner environ une journée sans soleil, une station de 4 096 Wh plus de quatre jours. Les panneaux prolongent cette durée selon l’ensoleillement. Votre consommation réelle dépend de vos appareils : vérifiez leur étiquette.</p>
<h2>Ce que cette collection contient</h2>
<ul>
<li>Des stations électriques de 768 Wh (EcoFlow River 2 Pro) à 4 096 Wh (EcoFlow DELTA Pro 3), jusqu’à 4 000 W de puissance</li>
<li>Des panneaux solaires 220 W et 400 W, et un tracker solaire mono-axe</li>
<li>Des centrales électriques portables et une batterie LiFePO4 12 V 200 Ah</li>
<li>Un kit solaire balcon 600 W plug &amp; play et les câbles de connexion au micro-onduleur</li>
</ul>
<h2>Pour qui ?</h2>
<p>Pour les foyers qui ont déjà goûté à l’autonomie et veulent passer au cran supérieur. Pour les maisons isolées, les zones à risque de coupure, les professions libérales qui travaillent à domicile. Pour ceux qui ne veulent plus dépendre entièrement du réseau.</p>
<p><strong>Et avant ?</strong> Si vous commencez, ne commencez pas par La Base. Explorez d’abord <a href="/categorie-produit/autonomie-energetique/le-module/">Le Module</a>.</p>
<p><strong>Et après ?</strong> Pour produire et stocker une partie de votre énergie au quotidien, c’est la collection <a href="/categorie-produit/lautonomie/">L’Autonomie</a>.</p>
```

Pour cette raison, je n'ai **pas** modifié les catégories 21 et 50 par le connecteur (elles auraient perdu leur mise en forme). Les deux corrections sont à faire dans wp-admin, une phrase chacune :

- **La Veilleuse (21)**, dernier paragraphe : remplacer « garder votre box internet, votre PC et vos chargeurs pendant 48 heures » par « garder votre box internet, votre PC et vos chargeurs, d’une soirée à une journée ».
- **L'Autonomie (50)**, premier paragraphe : remplacer « La maison qui produit, stocke et gère sa propre énergie. Le réseau devient une option, pas une nécessité. » par « Une maison qui produit, stocke et gère une grande partie de sa propre énergie. Le réseau devient un appoint. »

### Accueil (page 99)

- Bouton « Trouver mon niveau de besoins » renommé « Découvrir les 4 niveaux d’autonomie » (même lien `#niveaux`).
- Carte niveau 04 : « La maison produit et stocke sa propre énergie. Le réseau devient une option, pas une nécessité » devient « La maison produit et stocke une partie de son énergie, chaque jour. Moins de dépendance au réseau » ; « Réseau en option » devient « Moins de réseau » ; « Autonomie : continue » devient « Autonomie : au quotidien, selon le soleil ».
- Raison : les produits réels du niveau 4 (batteries STREAM de 1,92 à 3,84 kWh, kit Tornasol 800 W) réduisent la facture et la dépendance au réseau ; ils ne rendent pas une maison autonome en continu.

Vérifié en ligne : les trois nouveaux textes s'affichent sur l'accueil.

**TranslatePress :** les textes modifiés n'ont plus de traduction espagnole. Sur /es_ES/, ils s'affichent en français tant qu'ils ne sont pas retraduits (Traduire le site > accueil et catégorie La Base). Propositions :
- « Descubrir los 4 niveles de autonomía »
- « La casa produce y almacena parte de su energía, cada día. Menos dependencia de la red. » / « Menos red » / « Autonomía: a diario, según el sol »

### Ce que je n'ai pas repris de l'audit

- L'exemple proposé par l'auditeur tutoie (« Fais fonctionner… »). Le site vouvoie : conservé.
- Les anciennes pages /la-base/, /le-module/, etc. contiennent encore « une semaine entière », mais elles redirigent en 301 vers les catégories (contrôlé le 29/10 : 301). Aucun visiteur ne les voit ; pas de correction nécessaire.

## 2. Garantie : texte à coller par David

Le bloc de réassurance des fiches (`solandvolt-product-reassurance`) est produit par le code du thème enfant `twentytwentyfive-child` (probablement `functions.php`), hors de portée des connecteurs. Il affiche :

> Support bilingue FR / ES et garantie légale de conformité (2 ans en France, 3 ans en Espagne)

Or les CGV (droit espagnol, Real Decreto Legislativo 7/2021) accordent **3 ans à tous les clients**, et c'est la référence retenue le 26/10. Donner 3 ans à un client français est plus favorable que les 2 ans du Code de la consommation : c'est permis. L'affichage « 2 ans en France » contredit donc les CGV et les fiches.

Remplacer par :

> Support bilingue FR / ES et garantie légale de conformité de 3 ans

Même correction dans les fiches qui contiennent la ligne de tableau « Garantie constructeur : 7 ans, en plus de la garantie légale de conformité (2 ans en France, 3 ans en Espagne) » (vue sur une batterie LiFePO4 100 Ah). Je peux les lister et les corriger par le connecteur si David le demande.

Où : wp-admin > Apparence > Éditeur de fichiers de thème > `functions.php` du thème enfant, chercher « 3 ans en Espagne ». Faire une copie du fichier avant.

## 3. Livraison : le point le plus urgent avant d'acheter des clics

Le bloc de réassurance affiche sur **toutes** les fiches, y compris EcoFlow :

> Livraison à partir de 3,51 € vers France / Espagne — offerte dès 60 €
> Livraison suivie : 3 à 7 jours ouvrés (stock Europe) ou 12 à 18 jours ouvrés (entrepôt international)

Problèmes :
- Les produits EcoFlow partent de chez Innov8, en Espagne. Aucun transporteur n'est choisi (voir `audit/transporteurs-solandvolt-2026-10-28.md`). Aucun des deux délais affichés ne correspond à un circuit réel.
- **Livraison offerte dès 60 €** : une River 3 Plus (6,12 kg, lithium UN3481) envoyée en France coûtera plusieurs fois 3,51 €. Sa marge est de 37,07 € HT. Une commande Google Ads livrée gratuitement peut être vendue à perte. À vérifier dans WooCommerce > Réglages > Expédition avant d'augmenter le budget.
- Les fiches EcoFlow (ex. ?p=623) n'indiquent aucun délai propre.

Proposition :
1. Dès que le transporteur est choisi : ajouter sur chaque fiche EcoFlow « Expédié depuis l'Espagne, livraison en X à Y jours ouvrés ». Je le fais par le connecteur dès que David me donne les délais.
2. Remplacer la ligne générique du bloc par « Délai de livraison indiqué sur chaque fiche produit », comme sur la page commande.
3. Revoir le seuil de livraison offerte (par classe d'expédition, ou seulement pour les petits colis).

La date estimée (« livraison entre le X et le Y ») suggérée par l'audit est une bonne cible, mais elle exige une extension et des délais transporteur fiables. Plus tard.

## 4. Preuve sociale

- Jamais d'avis fabriqués (règle Sol & Volt). Les premiers avis viendront des premières commandes.
- Proposition : masquer l'onglet « Avis (0) » tant qu'il n'y a pas d'avis (WooCommerce > Réglages > Produits > décocher « Activer les avis produits »), puis le réactiver avec un email de demande d'avis 10 jours après livraison (Brevo).
- « Qui sommes-nous » : l'article ?p=95 « Pourquoi Sol & Volt » existe. Ajouter un lien dans le pied de page suffit, sans page nouvelle. Aucune mention de Fray Services.
- Moyens de paiement près du bouton : utile, à faire quand David aura confirmé les moyens réellement actifs (carte, PayPal, Bizum ?).
- Les créateurs vanlife (plan influenceurs du 28/10) peuvent fournir les premières photos et retours d'usage réels.

## 5. Navigation

Pertinent en partie. Les 4 niveaux restent le parcours principal (décision SEO du 26/10, option A). Avec une cinquantaine de produits, pas besoin d'une deuxième arborescence complète. Proposition légère :
- page Boutique : ajouter les filtres WooCommerce (prix, marque via la taxonomie `product_brand` déjà en place) ;
- menu : un lien « Kit solaire balcon » vers les produits Tornasol (recherche Google forte, page d'atterrissage naturelle pour Google Ads).

Le questionnaire « Trouver mon niveau » (appareils, durée, budget) est une bonne idée de captation de contacts. À construire en basse saison (janvier), avec Brevo.

## 6. Erreurs 429

Non reproduit le 29/10 : 8 requêtes rapides sur une fiche, toutes normales. L'audit lui-même conclut à une protection contre les robots (fréquente chez o2switch). Test à faire par David : 3 fiches en navigation privée sur téléphone, en 4G.

## 7. Google Ads : à faire avant d'augmenter le budget

1. **Suivi des achats.** Balise Google Ads `AW-18515270298` présente (Google for WooCommerce), GA4 absent depuis le 19/10. Faire une commande test réelle (petit produit, puis remboursement), vérifier la conversion « Achat » avec montant et devise EUR dans Google Ads (24 à 48 h). Installer GA4 (guide : `audit/ga4-suivi-ecommerce-solandvolt-2026-10-26.md`).
2. **Une annonce, une page.** Recherche « station électrique pour réfrigérateur » vers la catégorie La Base ; « kit solaire balcon » vers la fiche Tornasol ?p=114 ; « station portable box internet coupure » vers Le Module. Les catégories enrichies le 26 et 27/10 sont de bonnes pages d'atterrissage.
3. **France et Espagne séparées.** Campagne Espagne seulement quand les URL /es_es/ sont stabilisées (choix TranslatePress en attente) et les textes traduits.
4. **Mots-clés négatifs** : gratuit, occasion, emploi, formation, schéma, réparation, notice, location, groupe électrogène essence, marques non vendues (Bluetti, Jackery, Anker…).
5. **Pas de code promo EcoFlow dans les annonces** (PVP minimum Innov8).
6. Merchant Center : le blocage signalé auparavant reste à régler par David avec Google avant toute campagne Shopping ou Performance Max.

## Mise en œuvre, 29/10 au soir (David : « Fais les changements »)

Fait en ligne et vérifié (20 h 42 à 20 h 50, heure du site) :

- **Catégories 21 et 50** : « 48 heures » remplacé par « d’une soirée à une journée » (La Veilleuse) ; « Le réseau devient une option, pas une nécessité » remplacé par « une grande partie de sa propre énergie. Le réseau devient un appoint » (L'Autonomie). Même présentation que La Base (intertitres en gras, tirets), puisque le connecteur retire les balises `<h2>` et `<ul>`. Le HTML de la section 1 reste utilisable si David veut retrouver les vrais intertitres.
- **Garantie dans les fiches** : ?p=480, ?p=482 et ?p=481 (brouillon) indiquent « garantie légale de conformité de 3 ans ». Aucune autre fiche ne contenait la mention.
- **« Avis (0) » masqué** sur les 50 produits publiés (avis fermés produit par produit). Contrôlé sur ?p=623 : l'onglet Avis a disparu, la description reste. Les produits republiés plus tard (601, 690, 739, 94, 87, 88) auront de nouveau l'onglet : fermer les avis dans leur fiche (Discussion) ou demander à Claude. Pour réactiver après les premières commandes : rouvrir les avis produit par produit, ou par Claude en une fois.
- **Pied de page** : liens « Pourquoi Sol & Volt » (?p=95, vérifié sans mention de Fray Services), « Retours et remboursements » (la page n'était pas liée), « Nous écrire : contact@solandvolt.com ». La mention « Twenty Twenty-Five / Conçu avec WordPress » est remplacée par « Solandvolt · Livraison France et Espagne · Service client en français et en espagnol ».

Non fait, et pourquoi :

- **Bloc de réassurance** (garantie « 2 ans / 3 ans », délais génériques, « offerte dès 60 € ») : il est dans le code PHP du thème, aucun connecteur n'y accède. Reste à David (section 2 et 3).
- **Livraison offerte dès 60 €** : réglage WooCommerce hors de portée, et décision commerciale.
- **Traductions TranslatePress, commande test, GA4** : hors de portée des connecteurs.
- **Filtres de la boutique et lien « Kit solaire balcon » dans le menu** : les kits sont répartis sur trois niveaux, il n'existe pas de page qui les regroupe ; modifier le modèle de la boutique sans contrôle visuel sur mobile est risqué. À faire en séance Cowork avec Claude dans Chrome.

## Actions de David, par ordre

1. Vérifier le réglage « livraison offerte dès 60 € » et le coût réel d'un envoi EcoFlow (avant tout budget Google Ads).
2. Bloc de réassurance dans `functions.php` : garantie « 3 ans » (section 2) et ligne de délai « Délai de livraison indiqué sur chaque fiche produit » (section 3).
3. Commande test et contrôle de la conversion Google Ads.
4. Retraduire les nouveaux textes dans TranslatePress (accueil, catégories 21, 42, 50, pied de page).
5. Facultatif : recoller le HTML des catégories pour retrouver les vrais intertitres.

## Google Ads, campagne en cours (lu le 29/10 vers 21 h, compte 3229795533)

Campagne « Solandvolt - Recherche FR-ES v2 » (Search, id 24417115657) : active, 10 € par jour, enchères « Maximiser les clics », statut « en apprentissage », 0 impression sur 30 jours au moment du contrôle. France et Espagne, langues français et espagnol, 20 mots-clés négatifs déjà en place. Conversion « Achat » (Google for WooCommerce) active et principale.

| Groupe d'annonces | Page d'arrivée avant | Après |
|---|---|---|
| EcoFlow ES | /produit/…ecoflow-delta-3-1024wh/ (page française) | **/es_es/producto/…ecoflow-delta-3-1024wh/** (corrigé, 200) |
| SOK ES | /produit/sok-sk12v206h-12v-206ah/ (page française) | **/es_es/producto/sok-sk12v206h-12v-206ah/** (corrigé, 200) |
| SOK FR | /produit/sok-sk12v206h-12v-206ah/ | inchangé |
| EcoFlow FR | page d'accueil | inchangé (mots-clés génériques « station électrique portable », l'accueil montre River 3 Plus, DELTA 3, AC70P) |

Les 2 annonces modifiées repassent en examen Google (quelques heures en général).

**Livraison, vérifiée par un panier de test (sans commande) :** la batterie SOK 206 Ah (25 kg, 639,90 €) part en « Livraison offerte (dès 60 €) » vers la France et vers l'Espagne. Même règle pour la DELTA 3 (799 €). Or aucun transporteur n'est choisi pour EcoFlow (Innov8 ne livre pas le client final). Une vente EcoFlow issue de la campagne serait aujourd'hui à expédier sans solution de transport, à frais offerts.

Proposition soumise à David : mettre en pause les groupes « EcoFlow FR » et « EcoFlow ES » jusqu'au choix du transporteur, garder les groupes SOK (expédiés par le fournisseur depuis l'Allemagne, à confirmer : le prix d'achat SOK inclut-il le transport ?). Autres points : l'annonce EcoFlow ES cite « EcoFlow Stream Ultra » mais arrive sur la DELTA 3 ; « Maximiser les clics » avec beaucoup de requêtes larges en EcoFlow FR, à surveiller dans le rapport des termes de recherche après les premiers clics.
