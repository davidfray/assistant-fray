# solandvolt.com : codes de suivi influenceurs et stock EcoFlow

Date : 28/10/2026. Demande de David : créer les 3 codes et synchroniser le stock.

**Pourquoi Claude ne l'a pas fait en ligne :** le connecteur WordPress ne modifie ni les codes promo ni le stock WooCommerce (« WooCommerce product pricing and stock live outside this surface »), et Composio n'a pas d'outil WooCommerce. Trois solutions : David le fait dans wp-admin (environ 10 minutes, étapes ci-dessous) ; une session Cowork avec Claude dans Chrome ; ou le scénario n8n de la partie 3 pour l'automatiser.

## 1. Les 3 codes de suivi (WooCommerce > Marketing > Codes promo > Ajouter un code promo)

Aucune remise : sur EcoFlow, vente interdite sous le prix conseillé (Innov8 Iberia, 20/10). Le code sert seulement à savoir quel créateur a apporté la vente.

| Code | Description (interne) |
|---|---|
| `VANROUTE` | Suivi influenceur Un van sur la route, commission 10 % du HT |
| `LEON` | Suivi influenceur Léon Le Daron, commission 10 % du HT |
| `PERIPLE` | Suivi influenceur Péripléties, commission 10 % du HT |

Réglages pour chaque code :
- Onglet Général : type de remise « Remise panier fixe », montant `0`. Livraison gratuite : non. Date d'expiration : vide.
- Onglet Restrictions d'usage : rien.
- Onglet Limites d'usage : rien (usage illimité).
- Publier.

Test : ajouter la River 3 Plus (?p=623) au panier, saisir `VANROUTE`. Le code doit être accepté et le total doit rester 299,00 €. Si WooCommerce refuse un montant de 0, me le dire : l'alternative est une extension de suivi d'affiliation.

Lecture des ventes : WooCommerce > Marketing > Codes promo affiche le nombre d'utilisations ; WooCommerce > Commandes, filtrer par code. Commission = 10 % du montant HT de la commande (prix TTC / 1,21).

## 2. Stock, correction immédiate (Produits > modifier > Données produit > Inventaire)

Fichier Innov8 Iberia du 28/10 : ces produits sont à 0 chez le fournisseur mais affichés « En stock » sur le site.

| Produit | ID | Référence | À régler |
|---|---|---|---|
| EcoFlow River 3 UPS | 601 | ECF0039 | État du stock : « En rupture de stock » |
| EcoFlow Panneau Solaire 160W V2 | 690 | ECF0061 | « En rupture de stock » |
| EcoFlow DELTA 3 Max | 739 | ECF0068 | « En rupture de stock » |

Stock faible chez Innov8 (à surveiller, laisser en stock) : ECF0015 ?p=563 (1), ECF0030 ?p=573 (3), ECF0046 ?p=640 (2), ECF0050 ?p=658 (3), ECF0070 ?p=750 (3), ECF0071 ?p=768 (2), ECF0072 ?p=776 (2).

Ne pas choisir « En réapprovisionnement » : le site accepterait la commande sans date de livraison connue.

## 3. Synchronisation automatique (n8n)

Innov8 envoie chaque matin vers 7 h 30 le fichier `Innov8Iberia-Ecoflow.csv` à david@frayservices.com (colonnes : SKU, EAN, nom, « In stock? », Stock, poids, PVP HT, images). Le SKU du site est le même précédé de `SV-` (ECF0039 devient SV-ECF0039).

Scénario proposé :
1. **Déclencheur Gmail** : nouveau message de sac@innov8iberia.com avec la pièce jointe `Innov8Iberia-Ecoflow.csv`.
2. **Extraire le fichier** : lecture du CSV (séparateur virgule, texte entre guillemets).
3. **Pour chaque ligne** : chercher le produit WooCommerce par SKU `SV-` + SKU.
4. **Mettre à jour** : si Stock = 0, état « En rupture de stock » ; sinon « En stock ». Option : activer la gestion du stock et recopier la quantité.
5. **Contrôle du prix** : si le prix du site TTC est inférieur à PVP HT × 1,21, ne rien modifier et l'ajouter au rapport (risque de vente sous le PVP).
6. **Rapport par email** à David : produits passés en rupture ou revenus en stock, prix à vérifier.

Prérequis côté David : une clé API WooCommerce en lecture et écriture (WooCommerce > Réglages > Avancé > API REST > Ajouter une clé), enregistrée directement dans les identifiants n8n. La clé ne doit être ni envoyée par email, ni écrite dans ce dépôt.

Je peux écrire le scénario n8n complet (fichier JSON à importer) dès que David valide le principe.
