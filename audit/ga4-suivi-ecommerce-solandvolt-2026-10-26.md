# GA4 : activer le suivi e-commerce de solandvolt.com

Préparé le 26/10/2026. Réglage à faire par David : le connecteur WordPress n'accède pas aux extensions de ce site, et Composio n'a pas d'outil pour modifier une propriété GA4.

## Ce que j'ai constaté (26/10, 21 h 45)

- Propriété GA4 « Solandvolt - GA4 » (properties/551064081), flux Web `G-X1JG6B971W`.
- **Aucune balise GA4 sur le site.** Le code source de l'accueil et d'une fiche produit ne contient pas `G-X1JG6B971W`. La seule balise Google est celle de Google Ads (`AW-18515270298`), posée par l'extension « Google for WooCommerce ». Elle envoie déjà `view_item` et `add_to_cart`, mais seulement à Google Ads (groupe « GLA »).
- **GA4 ne reçoit presque plus rien.** La dernière session date du 19/10 ; avant, 1 à 5 sessions par jour. Soit la balise GA4 a été retirée vers cette date, soit GA4 ne recevait que ce que la balise Google Ads lui transmettait.
- Autres outils présents : CookieAdmin (bandeau cookies, mode consentement Google), Facebook for WooCommerce (pixel Meta), TranslatePress, Mollie.

## Étapes (environ 15 minutes)

### 1. Installer l'extension officielle (wp-admin)

1. Extensions > Ajouter > chercher **« Google Analytics for WooCommerce »** (éditeur : WooCommerce). Installer, activer.
2. WooCommerce > Réglages > **Intégration** > Google Analytics.
3. Identifiant : `G-X1JG6B971W`.
4. Cocher les événements : achat (`purchase`), ajout au panier, retrait du panier, vue de liste produits, clic produit, vue produit, début de commande.
5. Laisser le mode consentement activé (CookieAdmin le gère déjà).
6. Enregistrer.

Ne pas ajouter une deuxième balise GA4 ailleurs (Site Kit, en-tête du thème, Code Snippets) : chaque visite serait comptée deux fois.

### 2. Régler la propriété GA4 (analytics.google.com)

Administration > Paramètres de la propriété > **Détails de la propriété** :
- Devise : **Euro (EUR)** (actuellement USD) ;
- Fuseau horaire : **Espagne, heure de Madrid** (actuellement UTC).

Administration > Flux de données > Website > **Mesure améliorée** : laisser activée.

### 3. Tester

1. Ouvrir solandvolt.com dans une fenêtre normale (pas privée), accepter les cookies.
2. Voir une fiche produit, ajouter au panier, aller jusqu'à la page de paiement (pas besoin de payer).
3. GA4 > Rapports > **Temps réel** : les événements `view_item`, `add_to_cart` et `begin_checkout` doivent apparaître en 1 à 2 minutes.
4. Prévenir Claude : contrôle par l'API GA4 (rapport temps réel et événements).

L'événement `purchase` ne se vérifie qu'avec une vraie commande, ou une commande test si Mollie est en mode test.

## Après activation

- Marquer `purchase` comme événement clé s'il ne l'est pas déjà (Administration > Événements clés).
- Filtre de trafic interne : Administration > Flux de données > Website > Configurer les paramètres de balise > Définir le trafic interne (adresse IP du bureau), puis activer le filtre dans Administration > Filtres de données.
