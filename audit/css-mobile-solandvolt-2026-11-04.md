# solandvolt.com : version mobile (04/11/2026)

## Constat

Le site est déjà « responsive » (thème Twenty Twenty-Five enfant, balise viewport présente, menu en burger, barre d'achat collante sur les fiches). Il n'y a donc pas de « version mobile » séparée à créer : on corrige l'affichage du site actuel sur téléphone.

Contrôle fait le 04/11 sur des captures en largeur de téléphone (360 px) : accueil et fiche River 3 Plus (?p=623).

| # | Défaut sur téléphone | Où | Gravité |
|---|---|---|---|
| 1 | Le sélecteur de langue flottant (« French ») recouvre le texte, et sur les fiches il cache le bouton « Ajouter au panier » de la barre collante | Toutes les pages, fiches produit surtout | Rouge : il gêne l'achat |
| 2 | La barre d'achat collante masque le bas de page (pied de page, derniers liens) | Fiches produit | Orange |
| 3 | Grille « Nos stations les plus demandées » : boutons « Ajouter au panier » coupés sur 2 lignes, titres serrés | Accueil, boutique, catégories | Orange |
| 4 | Formulaire newsletter Brevo : titre en double, cadre trop étroit (« meilleure / s offres » coupé), barre de défilement dans le cadre | Accueil (FR et ES) | Orange |
| 5 | Pied de page : logo puis « Solandvolt » en gros titre juste dessous (doublon) | Toutes les pages | Vert : esthétique |
| 6 | Fiche produit : SKU, catégorie et étiquettes serrés sur 3 colonnes | Fiches produit | Vert |

## Correctif : CSS à coller

**Où :** wp-admin > Apparence > Éditeur > Styles > (icône crayon ou ⋮) > CSS additionnel. **Ajouter à la fin**, sans toucher aux règles existantes (« préalable », traductions espagnoles, etc.). Enregistrer.

Le code ne s'applique qu'aux écrans de 768 px de large ou moins. L'ordinateur ne change pas.

```css
/* ===== Sol & Volt : mobile (04/11/2026) ===== */
@media (max-width: 768px) {

  /* 1. Sélecteur de langue : petit, à gauche, au-dessus de la barre d'achat */
  .trp-language-switcher.trp-floating-switcher {
    left: 12px !important;
    right: auto !important;
    bottom: 12px !important;
    width: auto !important;
    min-width: 0 !important;
    font-size: 13px !important;
    box-shadow: 0 2px 8px rgba(20, 32, 28, .15) !important;
  }
  body.single-product .trp-language-switcher.trp-floating-switcher {
    bottom: 84px !important;
  }

  /* 2. La barre d'achat collante ne cache plus le bas de page */
  body.single-product {
    padding-bottom: 76px;
  }
  .solandvolt-sticky-bar .sticky-btn {
    white-space: nowrap;
  }

  /* 3. Grilles de produits : 2 colonnes propres, bouton sur une ligne */
  ul.products {
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px 12px;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  ul.products::before,
  ul.products::after {
    display: none !important;
  }
  ul.products li.product {
    width: auto !important;
    float: none !important;
    margin: 0 !important;
    display: flex;
    flex-direction: column;
  }
  ul.products li.product .woocommerce-loop-product__title {
    font-size: 15px !important;
    line-height: 1.3;
  }
  ul.products li.product .button,
  ul.products li.product a.add_to_cart_button {
    display: block;
    width: 100%;
    box-sizing: border-box;
    padding: 10px 6px !important;
    font-size: 14px !important;
    text-align: center;
    white-space: nowrap;
  }

  /* 4. Newsletter Brevo : plus de doublon, cadre plus large et plus haut */
  #sv-brevo-fr > div,
  #sv-brevo-es > div {
    margin: 32px 0 !important;
    padding: 16px 8px !important;
    border-radius: 0 !important;
  }
  #sv-brevo-fr > div > h2,
  #sv-brevo-fr > div > p,
  #sv-brevo-es > div > h2,
  #sv-brevo-es > div > p {
    display: none;
  }
  #sv-brevo-fr iframe,
  #sv-brevo-es iframe {
    width: 100% !important;
    height: 640px !important;
  }

  /* 5. Pied de page : le logo suffit */
  footer .wp-block-site-title {
    display: none;
  }

  /* 6. Fiche produit : SKU, catégorie, étiquettes sur plusieurs lignes */
  .wp-block-woocommerce-product-meta .wp-block-group.is-nowrap {
    flex-wrap: wrap !important;
    gap: 8px 16px;
  }
}
/* ===== fin mobile ===== */
```

## Test après collage (5 minutes, sur le téléphone)

1. Ouvrir solandvolt.com en navigation privée (pour éviter le cache).
2. Accueil : le drapeau de langue est petit, en bas à gauche, et ne recouvre plus de texte. La grille « Nos stations » montre 2 produits par ligne, boutons sur une ligne.
3. Descendre à « Recevez nos meilleures offres » : un seul titre, formulaire lisible sans barre de défilement interne. Si le formulaire est coupé en bas, augmenter `640px` ; s'il reste un grand vide, le baisser.
4. Ouvrir /es_es/ : même contrôle du formulaire espagnol.
5. Fiche River 3 Plus : la barre noire du bas montre prix et « Ajouter au panier » en entier, le drapeau est au-dessus d'elle, le pied de page est visible jusqu'en bas.
6. Ajouter un produit au panier depuis la barre collante, puis vider le panier.

Si un point gêne : supprimer le bloc concerné (entre ses commentaires `/* n. ... */`) et enregistrer. Tout le bloc se retire en supprimant de `/* ===== Sol & Volt : mobile` à `fin mobile ===== */`.

## Limites

- Collage par David (ou en séance Cowork avec Claude dans Chrome) : la session Claude Code du 04/11 n'avait pas de connecteur WordPress en écriture.
- Le contenu du formulaire Brevo (titre « meilleure / s offres » coupé à l'intérieur du cadre) se règle dans Brevo : Formulaires > le formulaire > Style, taille du titre 22 px environ. Le CSS du site n'agit pas à l'intérieur du cadre.
- Le widget d'assistant (solandvolt-assistant.netlify.app) n'a pas pu être contrôlé sur capture : vérifier qu'il ne se superpose pas au drapeau de langue en bas à gauche.
- Non contrôlés : panier, commande, Mon compte. À vérifier lors de la commande test Google Ads.
