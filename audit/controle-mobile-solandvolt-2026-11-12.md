# solandvolt.com : contrôle mobile du 12/11/2026

Demande de David : « contrôle que tout est ok en version mobile, en Espagne beaucoup de connexions mobiles » (GA4 : 93 visites sur 122 en mobile depuis le 03/11).

## Méthode

Vrai navigateur (Playwright) en émulation téléphone, sur le site en ligne : Galaxy S9+ (320 px), iPhone SE (320 px), iPhone 13 (390 px), plus un contrôle sur ordinateur (1 280 px). Pages : accueil, boutique, catégorie Le Module, fiche River 3 Plus (?p=623), en espagnol (/es_es/) et en français. Contrôles : débordement en largeur, éléments fixes qui recouvrent un bouton, bandeau cookies, menu, changement de langue.

## Constats et corrections (faites en ligne le 12/11, CSS additionnel des styles globaux)

| # | Constat avant | Gravité | Correction | Vérifié après |
|---|---|---|---|---|
| 1 | Le drapeau de langue flottant (115 × 55 px) recouvrait le bouton « Rechazar Todo » du bandeau cookies, puis « Ver la tienda » (iPhone SE) ou « Descubrir los 4 niveles » (Galaxy) sur l'accueil | Rouge : premier écran de chaque visiteur | Sur mobile, drapeau seul (44 × 45 px) placé dans l'en-tête, entre le logo et le menu ; la liste des langues s'ouvre en dessous | 3 boutons du bandeau libres sur les 4 tailles ; aucun bouton recouvert ; passage ES vers FR et FR vers ES fonctionne |
| 2 | La bulle cookies (50 px) se posait sur la barre d'achat collante des fiches | Orange | Bulle réduite à 40 px, en bas à gauche ; sur les fiches, au-dessus de la barre d'achat | Barre d'achat libre (prix et « Añadir al carrito ») |
| 3 | Boutique et catégories débordaient à 320 px (page de 363 px de large : le menu de tri restait sur la même ligne que « Mostrando 1–16 de 49 resultados ») | Orange : le téléphone dézoome la page | Sur mobile, le tri passe sous le nombre de résultats | 320 px exactement sur boutique, Le Module (ES) et L'Autonomie (FR) |

Ordinateur inchangé (règles limitées aux écrans de 768 px ou moins, vérifié). Sauvegarde du CSS avant correction : `audit/sauvegardes-2026-11-12/css-additionnel-avant-correctif-mobile.css`. Pour revenir en arrière : supprimer le bloc entre `/* 12/11 : mobile, drapeau de langue…` et `/* ===== fin correctif mobile 12/11 ===== */`.

## Ce qui va bien

- Aucune page ne déborde en largeur (après correction 3).
- Version espagnole entièrement en espagnol sur la fiche produit (titre, délai « Envío a España peninsular: 3 a 5 días laborables », bloc de réassurance, bloc WhatsApp, caractéristiques, produits liés, pied de page).
- Menu mobile complet dans les deux langues (Inicio, Tienda, Autonomía, La Base, Piloto, Módulo, Envío, Blog).
- Bandeau cookies : consentement enregistré, il ne revient pas à la page suivante.

## Non contrôlable depuis Claude Code, à tester sur un vrai téléphone

1. **Panier et paiement.** L'environnement « assistant-fray » ajoute l'accès administrateur à chaque appel de l'API du site : le panier affiché est celui de l'administrateur, donc vide. Ce n'est pas un défaut du site. Le parcours (panier, Mollie, PayPal, virement) a été testé le 07/11. À refaire sur le téléphone de David : ajouter la River 3 Plus depuis /es_es/, ouvrir le panier, aller jusqu'à la page de paiement sans payer.
2. **Bulle de l'assistant** (widget solandvolt-assistant.netlify.app, en bas à droite) : bloquée par le réseau de test, donc absente des captures. Vérifier qu'elle ne couvre pas « Añadir al carrito » dans la barre d'achat.
3. **Formulaire Brevo** : titre interne à réduire dans Brevo (environ 22 px), toujours en attente.

## Petits points restants

**Corrigés le 12/11 (CSS, espagnol seulement, vérifié en ligne) :** espaces du bandeau cookies et « Envío con seguimiento: plazo ».

Non corrigé :

- iPhone SE, accueil : la bulle cookies de 40 px touche le coin gauche du bouton « Descubrir los 4 niveles » quand la page n'a pas défilé. Le bouton reste utilisable.
- Bandeau cookies : espaces manquants dans le texte du module CookieAdmin (« enPersonalizar », « Todopara », et en français « enPersonnaliser »). À corriger dans les réglages de CookieAdmin (texte du bandeau).
- Fiche produit espagnole : « Envío con seguimiento : plazo… », espace avant les deux-points (règle française) ; en espagnol, « seguimiento: plazo ». Texte de `functions.php` traduit dans TranslatePress.
