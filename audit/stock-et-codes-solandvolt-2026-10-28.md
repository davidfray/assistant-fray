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

## 3. Synchronisation automatique (Make, créée le 28/10)

n8n n'est plus utilisé (David, 28/10). Deux scénarios créés dans Make (organisation Fray Services, équipe My Team), **inactifs** :

| Scénario | ID Make | Déclenchement | Rôle |
|---|---|---|---|
| Solandvolt - Stock Innov8 EcoFlow vers WooCommerce | 8239857 | Tous les jours à 8 h 30 | Lit le dernier email de sac@innov8iberia.com avec `Innov8Iberia-Ecoflow.csv`, met chaque produit EcoFlow du site « En stock » ou « En rupture » selon la colonne « In stock? », puis envoie un rapport à david@frayservices.com (références à 3 unités ou moins) |
| Solandvolt - Codes de suivi influenceurs (une seule fois) | 8239861 | À la demande | Crée les codes `vanroute`, `leon`, `periple` (remise panier fixe de 0 €) |

Blueprints sauvegardés : `automatisations/make/`. Le lien entre références Innov8 et fiches du site (29 produits) est écrit dans le module 3 du scénario de stock : à compléter à chaque nouveau produit EcoFlow.

**À faire par David dans Make :**
1. **Reconnecter Gmail.** La connexion « My Gmail connection » (7091749) est expirée (« Invalid refresh token ») et d'un ancien type, refusé par les modules Gmail actuels. Créer une nouvelle connexion Google (Gmail) pour david@frayservices.com, puis la choisir dans les modules 1 et 6. Le scénario existant « frayservices — Gestion quotidienne emails » utilise la connexion expirée : il est probablement en échec.
2. **Créer la connexion WooCommerce** (module 4 du scénario de stock et les 3 modules du scénario des codes) : dans WooCommerce > Réglages > Avancé > API REST > Ajouter une clé (droits lecture et écriture), puis coller la clé et le secret dans Make, pas ailleurs.
3. **Codes :** ouvrir le scénario 8239861, « Run once », vérifier les 3 codes dans WooCommerce > Marketing > Codes promo.
4. **Stock :** ouvrir le scénario 8239857, « Run once », vérifier ?p=601, 690 et 739 en rupture sur le site, puis activer le scénario.

Limite : le scénario ne contrôle pas les prix. Si Innov8 change un PVP, le rapport ne le signale pas encore.
