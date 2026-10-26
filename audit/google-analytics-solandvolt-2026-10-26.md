# Google Analytics solandvolt.com : 26/10/2026

Lecture par Composio, propriété GA4 « Solandvolt - GA4 » (properties/551064081, compte « Compte Google Ads »). Période : 28/07 au 26/10/2026 (90 jours). Aucune modification faite.

## Chiffres clés

| Utilisateurs | Nouveaux | Sessions | Sessions engagées | Pages vues | Durée moyenne | Ventes |
|---|---|---|---|---|---|---|
| 59 | 30 | 104 | 37 (36 %) | 256 | 5 min 11 s | 0 (aucun événement d'achat remonté) |

### Par canal

| Canal | Sessions | Utilisateurs | Engagement |
|---|---|---|---|
| Direct | 44 | 14 | 64 % |
| Non attribué (Unassigned) | 28 | 28 | 0 % |
| Publicité sociale (Meta, source « fb ») | 23 | 19 | 30 % |
| Recherche naturelle (Google) | 8 | 1 | 25 % |
| Réseaux sociaux naturels | 1 | 1 | 0 % |

### Par pays

Espagne 59 sessions (28 utilisateurs), France 25 (20), puis Singapour, Taïwan, Belgique (1 à 5).

### Par appareil

Mobile 58 sessions (engagement 21 %), ordinateur 44 (57 %), tablette 2.

### Par semaine

Pic la semaine du 7 au 13 septembre 2026 (64 sessions, 48 utilisateurs), puis 1 à 10 sessions par semaine. Semaine du 19 octobre : 1 session.

## Constats

1. **Rouge : la publicité Meta envoie vers des pages en erreur 404.** Pages d'arrivée des sessions « fb » :
   - /produit/station-denergie-300-w-panneau-solaire-60-w-296-wh-80-000-mah/ (5 + 1 en espagnol) : **404** (Search Console, exploré le 26/10).
   - /produit/station-denergie-portable-1-800-w-batterie-lifepo4-haute-capacite/ (4) : **404** (exploré le 26/10).
   - /produit/batterie-lifepo4-12-v-200-ah-decharge-profonde-2-560-wh/ (1 + 1 en espagnol) : **404**.
   - /produit/frigo-a-compression-12v-40l-conservation-autonome/ (2) : probablement 404 (produit absent du catalogue publié).
   - Seules /produit/kit-solaire-balcon-600w-plug-play/ et /produit/chargeur-solaire-pliable-8-w-…/ sont encore en ligne.
   Si des publicités tournent encore sur ces produits, le budget part vers des pages vides. Les mêmes URL reçoivent aussi des visites « non attribuées » (probablement des clics publicitaires sans paramètres).
2. **Rouge : aucun suivi e-commerce.** Seuls page_view, session_start, first_visit, user_engagement et scroll remontent. Pas de view_item, add_to_cart, begin_checkout ni purchase. Impossible de mesurer les ventes, le panier ou la rentabilité des publicités.
3. **Orange : réglages de la propriété.** Devise USD et fuseau UTC : à passer en EUR et Europe/Madrid (Admin > Paramètres de la propriété).
4. **Orange : trafic interne compté.** L'Espagne pèse 59 sessions sur 104 et le « Direct » a un engagement de 64 % avec 14 utilisateurs : il s'agit très probablement des visites de David et des tests. À exclure par un filtre de trafic interne (adresse IP du bureau).
5. **Orange : mobile.** 56 % des sessions, mais 21 % d'engagement contre 57 % sur ordinateur. Cohérent avec des images lourdes (300 Ko à 2,8 Mo) : compression et WebP à activer.
6. **Information : la recherche naturelle reste marginale** (8 sessions, 1 utilisateur), cohérent avec Search Console (12 clics en 3 mois).

## Actions proposées

| Priorité | Action | Qui |
|---|---|---|
| 1 | ~~Vérifier dans Meta Ads si des publicités actives pointent vers les URL ci-dessus~~ Fait le 26/10 : aucune publicité active concernée | David |
| 1 | Redirections 301 dans Rank Math : station 300 W → River 3 Plus ?p=623 (286 Wh, la plus proche) ; station 1 800 W LiFePO4 → DELTA 3 ?p=344 (1 800 W) ; batterie 200 Ah → SOK 206 Ah ?p=482 ; frigo 40 L et glacière 20 L → réfrigérateur EcoFlow ?p=640 ; idem pour les versions /es_es/ | David (Claude peut proposer la liste complète) |
| 2 | Activer le suivi e-commerce GA4 (extension Google pour WooCommerce, ou Site Kit, ou GTM4WP) et vérifier l'événement purchase sur une commande test | David |
| 2 | Devise EUR et fuseau Europe/Madrid dans GA4 ; filtre de trafic interne | David |
| 3 | Compression et WebP des images (engagement mobile) | David |

## Contrôle des publicités Meta (26/10/2026, 21 h 30)

Tentative de lecture des publicités par Composio : échec. La connexion Facebook (« Fray Services Facebook ») liste les portefeuilles Business, mais Meta refuse l'accès aux publicités du compte 1029984932981254 (erreur 403, permission `ads_read` non accordée). Aucune publicité n'a été lue ni modifiée.

Deux options :
- David vérifie lui-même dans le Gestionnaire de publicités (filtre « Actives », colonne « URL de destination ») ;
- ou David connecte la boîte à outils « metaads » dans Composio (lecture seule suffit), puis Claude refait le contrôle.

Les redirections 301 proposées plus haut protègent les clics dans les deux cas.

**Résultat (26/10/2026) :** David a vérifié dans le Gestionnaire de publicités. Aucune publicité active ne pointe vers les pages 404. Les sessions « fb » vers ces URL viennent donc d'anciennes publicités ou de liens partagés. Niveau ramené de rouge à orange : les redirections 301 restent utiles pour récupérer ces visites et les impressions Google.
