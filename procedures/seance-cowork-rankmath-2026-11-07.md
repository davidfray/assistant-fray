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

**2. Une fois le titre français en ligne**, saisir dans TranslatePress les titres et descriptions espagnols des 6 catégories (tableau de `audit/titres-categories-es-2026-11-07.md`). Ouvrir chaque page `/es_es/categoria-producto/...` dans l'éditeur visuel, menu déroulant en haut de la barre latérale.

**4. Descriptions Google de 2 fiches Climatisation (Rank Math, même cause probable que le point 1).**
- ?p=42 (Rafraîchisseur d'air portable) : remplacer « Livraison rapide. » par « Livraison en 12 à 18 jours. »
- ?p=46 (Air Cooler) : `Rafraîchisseur évaporatif 65 W avec télécommande et minuterie 2 à 8 h, sans unité extérieure. Livraison en 12 à 18 jours.`

**3. Fin de séance.**
- Noter la cause trouvée et ce qui a été fait dans `CLAUDE.md` (« Fait en ligne (07/11/2026) » et journal).
- Me rappeler de faire « Commit to main » puis « Push origin ».
