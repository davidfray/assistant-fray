# Séance Cowork (Claude dans Chrome) : titre de L'Autonomie et catégories espagnoles (07/11/2026)

Texte à coller dans Cowork, après « Fetch origin » puis « Pull » dans GitHub Desktop.

---

Lis `CLAUDE.md`, puis `audit/titres-categories-es-2026-11-07.md`. Travaille dans mon Chrome, sur wp-admin de solandvolt.com. Demande-moi avant chaque enregistrement.

**1. Comprendre pourquoi le titre de L'Autonomie ne change pas.**
Le 07/11, j'ai enregistré 2 fois dans Rank Math (Produits > Catégories > L'Autonomie, id 50, « Modifier l'extrait ») :
- titre `L’Autonomie : batteries solaires pour la maison | Sol & Volt`
- description `Batteries solaires domestiques EcoFlow STREAM et kit solaire Tornasol 800 W pour produire et stocker l’électricité chez soi. Livraison en France et en Espagne.`

Pourtant, la page `/categorie-produit/lautonomie/` affiche toujours l'ancien titre « L’Autonomie : kit solaire Tornasol 800 W | Sol & Volt » et l'ancienne description (vérifié 3 fois par Claude Code entre 8 h 50 et 9 h). Ce que Claude Code a déjà écarté :
- pas de cache de page : le serveur o2switch PowerBoost génère la page à chaque visite ;
- une seule catégorie « L'Autonomie » ;
- la balise de titre vient bien de Rank Math.

À contrôler dans l'ordre :
1. Rouvrir la catégorie, puis « Modifier l'extrait » : le nouveau titre y est-il après rechargement ? Regarder s'il y a un message d'erreur après « Mettre à jour ».
2. Rank Math > Titres et méta > Catégories de produits : un modèle global qui écraserait le titre de la catégorie ?
3. Extensions actives : extension de cache ou de cache d'objets (Redis Object Cache, LiteSpeed, WP Rocket, W3 Total Cache, etc.). Si oui, vider le cache.
4. cPanel o2switch : Redis ou Memcached actif ? Si oui, vider.
5. Thème enfant (Apparence > Éditeur de fichiers du thème, `functions.php`) : un filtre `rank_math/frontend/title`, `rank_math/frontend/description` ou `pre_get_document_title`. Le lire seulement, sans le modifier.

Après chaque action, ouvrir `/categorie-produit/lautonomie/` en navigation privée et lire le titre de l'onglet.

**2. Une fois le titre français en ligne**, saisir dans TranslatePress les titres et descriptions espagnols des 5 catégories (Climatisation retirée) (tableau de `audit/titres-categories-es-2026-11-07.md`). Ouvrir chaque page `/es_es/categoria-producto/...` dans l'éditeur visuel, menu déroulant en haut de la barre latérale.

**3. Climatisation retirée du site (décision de David du 07/11).**
Les 4 produits et l'article sont en brouillon depuis le 07/11 ; leurs adresses répondent 404. Dans Rank Math > Redirections, créer des 301 (correspondance exacte) :
- `produit/climatiseur-mural-a-compresseur-solandvolt/`, `produit/rafraichisseur-dair-portable-usb-brumisation-glace-et-huiles-essentielles/`, `produit/rafraichisseur-dair-evaporatif-65-w-telecommande-reservoir-25-l/`, `produit/climatiseur-evaporation-portable-taurus-snowfield-5-60-w-5-l/`, `categorie-produit/climatisation/` → `/boutique/`
- `climatiser-residence-secondaire-sans-travaux/` → `/blog/`
- mêmes adresses en `/es_es/producto/...`, `/es_es/categoria-producto/climatisation/` et `/es_es/climatiser-residence-secondaire-sans-travaux/` → `/es_es/` (vérifier qu'aucune regex existante ne les intercepte ; jamais d'antislash dans les regex Rank Math)
Puis Rank Math de la catégorie Le Module : titre `Le Module : stations, kits et panneaux solaires | Sol & Volt`, description `Stations d’énergie portables, panneaux solaires et kits prêts à l’emploi pour garder la box, la lumière et les téléphones pendant une coupure. Livraison en France et en Espagne.`

**Aussi (07/11), redirections espagnoles des anciennes pages de niveau** (pages 74, 76, 78, 80 passées en brouillon par Claude ; leurs adresses /es_es/ répondent 404) : dans Rank Math > Redirections, 301 exactes `es_es/le-module/` → `/es_es/categoria-producto/autonomie-energetique/le-module/`, `es_es/la-base/` → `/es_es/categoria-producto/autonomie-energetique/la-base/`, `es_es/la-veilleuse/` → `/es_es/categoria-producto/autonomie-energetique/la-veilleuse/`, `es_es/l-autonomie/` → `/es_es/categoria-producto/lautonomie/` (vérifier qu'aucune regex existante ne les intercepte). Puis Rank Math > Plan du site : vider le cache ou réenregistrer, et vérifier que `page-sitemap.xml` ne liste plus /le-module/, /la-base/, /la-veilleuse/, /l-autonomie/, ni les produits de climatisation dans `product-sitemap.xml`.

**Aussi (07/11) :** titre Rank Math de ?p=640 à mettre à jour (« EcoFlow Glacier 3 : Réfrigérateur Portable 35 L » → `EcoFlow Glacier Classic : réfrigérateur portable 35 L | Sol & Volt`) ; dans TranslatePress, traduire le titre du produit 640 (`EcoFlow Glacier Classic – Nevera portátil 35 L`), visible en français dans le fil d'Ariane et les grilles de /es_es/.

**4. Fin de séance.**
- Noter la cause trouvée et ce qui a été fait dans `CLAUDE.md` (« Fait en ligne (07/11/2026) » et journal).
- Me rappeler de faire « Commit to main » puis « Push origin ».
