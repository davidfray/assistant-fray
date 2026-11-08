# Séance Cowork (Claude dans Chrome) : CSS climatisation et CE du thème enfant (08/11/2026)

Texte à coller dans Cowork. Durée : environ 10 minutes. Pas besoin de « Fetch / Pull » : la synchro automatique s'en charge.

---

Lis `CLAUDE.md`, puis ce fichier. Travaille dans mon Chrome, sur wp-admin de solandvolt.com. **Demande-moi avant chaque enregistrement.**

## Contexte

Le site affiche dans `<style id="global-styles-inline-css">` un bloc « === Solandvolt — Charte graphique v1 === » qui ne se trouve ni dans le CSS additionnel des styles globaux (id 98), ni dans Code Snippets. Il est imprimé **avant** le CSS additionnel : il vient donc très probablement du fichier `theme.json` du thème enfant **Twenty Twenty-Five Child** (`twentytwentyfive-child`, clé `styles.css`). L'API REST ne peut pas modifier ce fichier.

Ce bloc contient 3 restes à retirer, sans effet visible aujourd'hui (vérifié le 08/11 : aucune page n'utilise ces classes, et aucune autre règle n'utilise les variables `--sv-clim-*`) :
- la climatisation, retirée du site le 07/11 (décision de David) ;
- un badge « conformité CE », contraire à la règle Sol & Volt « aucune mention CE » ;
- l'option « Garantie prolongée », abandonnée (garantie de 3 ans des CGV, sans extension, décision du 26/10 ; le snippet n° 8 qui l'affichait est désactivé).

## 1. Trouver le fichier

1. Apparence > Éditeur de fichiers du thème. En haut à droite, choisir **Twenty Twenty-Five Child**. Ouvrir `theme.json`.
2. Chercher `Charte graphique v1` (Ctrl+F). Le CSS est sur une seule ligne, dans `"css": "…"`, avec des `\n` à la place des retours à la ligne.
3. Si le texte n'y est pas : regarder `style.css` du thème enfant, puis Apparence > Personnaliser > CSS additionnel (`/wp-admin/customize.php`). Me dire où il se trouve avant de modifier.
4. Si l'éditeur de fichiers est désactivé (message « La modification de fichiers est désactivée ») : passer par le cPanel o2switch, Gestionnaire de fichiers, `public_html/wp-content/themes/twentytwentyfive-child/`. Me demander avant.

**Avant toute modification** : copier tout le contenu du fichier dans `audit/sauvegardes-2026-11-08/theme-enfant-<nom du fichier>-avant.txt` du dépôt.

## 2. Retirer exactement ces passages (rien d'autre)

**a. Dans `:root{ … }`, les 3 variables climatisation** (garder les 6 autres : encre, papier, ligne, solaire-fond, solaire-accent, solaire-clair) :
```
  --sv-clim-fond:#0E3A3A;
  --sv-clim-accent:#1D9E75;
  --sv-clim-clair:#E1F5EE;
```

**b. La section « Univers Climatisation »**, du commentaire jusqu'à la règle `:hover` incluse :
```
/* Univers Climatisation : boutons produits de cette categorie (futur catalogue) */
.product_cat-climatisation .add_to_cart_button,
.product_cat-climatisation .wp-block-woocommerce-product-button a,
.product_cat-climatisation .wp-element-button {
  background-color: var(--sv-clim-accent) !important;
  color: #FFFFFF !important;
}
.product_cat-climatisation .add_to_cart_button:hover { background-color: #178A63 !important; }
```

**c. La section « Badge conformite CE »** :
```
/* Badge conformite CE (a appliquer manuellement : classe "sv-badge-ce") */
.sv-badge-ce {
  display: inline-block;
  background-color: var(--sv-clim-clair);
  color: var(--sv-clim-accent);
  border-radius: 999px;
  padding: 2px 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
}
```

**d. La section « Monetisation : Garantie prolongee »** :
```
/* === Monetisation : Garantie prolongee === */
.solandvolt-warranty-option {
  margin: 12px 0;
  padding: 10px 12px;
  background: #FAEEDA;
  border: 1px solid #DEDACB;
  border-radius: 6px;
  font-size: 0.85rem;
  color: #14201C;
}
.solandvolt-warranty-option label { display:flex; align-items:center; gap:8px; cursor:pointer; }
```

**Ne pas toucher** aux autres sections : typographie, prix, fond, boutons (accent solaire), étiquette « Nouveau », grille 4 niveaux, grille d'usages, sticky add to cart mobile, badge réassurance checkout, pack accessoires, titre Accueil, « Nos stations les plus demandées ».

Dans `theme.json`, faire attention à la syntaxe JSON : le CSS est une seule chaîne entre guillemets. Retirer aussi les `\n` des lignes supprimées, ne supprimer aucun guillemet ni aucune virgule en dehors de la chaîne.

## 3. Contrôle (après mon accord et l'enregistrement)

1. En navigation privée, ouvrir `/`, `/boutique/`, `/es_es/` et la fiche `/?p=623` : la page s'affiche normalement (couleurs, boutons dorés, grille des 4 niveaux).
2. Code source de la page d'accueil (Ctrl+U), chercher : `sv-clim`, `sv-badge-ce`, `warranty`, `product_cat-climatisation` : **0 résultat attendu**. Chercher `Charte graphique v1` : toujours présent.
3. Si une page s'affiche sans style ou en erreur : remettre immédiatement le contenu sauvegardé et me prévenir.

## 4. Fin de séance

- Noter dans `CLAUDE.md`, section « Fait en ligne (08/11/2026) » : fichier modifié, passages retirés, résultat du contrôle ; et retirer la mention « Reste dans le thème enfant » de l'état du 07/11.
- Ajouter une ligne au journal des sessions (Cowork).
- Une session Claude Code peut ensuite refaire le contrôle par l'API (« vérifie le thème enfant »).
