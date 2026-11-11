# Connecteur Instagram (Composio)

Mis en place et testé le 11/11/2026 par Claude Code. Aucun identifiant dans ce fichier.

## Comptes connectés

| Marque | Compte | Identifiant Composio | Type | Abonnés (11/11) | Publications |
|---|---|---|---|---|---|
| Fray Services | @frayservicespalamos | `instagram_creagh-averah` (par défaut) | Business | 340 | 173 |
| Sol & Volt | @solandvolt | `instagram_izote-crepe` | Business | 11 | 105 |

Connexion « Instagram Login » (API graph.instagram.com, v21.0), créée le 05/10/2026, active.
**Toujours préciser le compte** (`account`) dans chaque appel : les deux marques ne se mélangent jamais.

## Ce qui fonctionne (testé le 11/11)

- Lecture du profil (`INSTAGRAM_GET_USER_INFO`, `ig_user_id: "me"`).
- Liste des publications (`INSTAGRAM_GET_IG_USER_MEDIA`).
- Quota de publication (`INSTAGRAM_GET_IG_USER_CONTENT_PUBLISHING_LIMIT`) : 100 publications par 24 h et par compte.

Disponible, non testé (écriture) :

- Publication en 2 étapes : `INSTAGRAM_POST_IG_USER_MEDIA` (conteneur : image JPEG par URL publique, légende), puis `INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH`.
  Carrousel : `INSTAGRAM_CREATE_CAROUSEL_CONTAINER`. Reels : `media_type: REELS` + `video_url`.
- Statistiques : `INSTAGRAM_GET_IG_MEDIA_INSIGHTS` (`metric` en liste : views, reach, likes, comments, saved, shares) et `INSTAGRAM_GET_USER_INSIGHTS`.
- Commentaires : `INSTAGRAM_GET_IG_MEDIA_COMMENTS`, `INSTAGRAM_GET_IG_COMMENT_REPLIES`.

## Règles de publication

1. **Aucune publication sans validation écrite de David** (texte final + image), pour les deux comptes.
2. Sol & Volt : appliquer `solandvolt-garde-fous` (pas de CE, photos réelles, aucune référence à Fray Services, livraison **France et Espagne** seulement, garantie 3 ans des CGV).
3. Fray Services : nouvelle charte (#0B2A5C, #F5A30B), « maître d'œuvre et bureau d'études », « réponse sous 24 h ».
4. Image : URL publique directe vers un JPEG, sans paramètres (`?…`), format 4:5 ou 1:1. Les médias de frayservices.com et solandvolt.com conviennent.
5. Après publication : vérifier avec `INSTAGRAM_GET_IG_MEDIA` et noter le lien dans `CLAUDE.md`.

## Points relevés au test du 11/11 (à corriger par David)

- @solandvolt, Reels SOK 206 Ah du 10/11 (FR et ES) : « Livraison Europe » / « Envío a toda Europa » (faux : France et Espagne seulement) ; « 10x plus que le plomb » sans source ; coches ✓ dans le texte.
  Une légende se modifie dans l'application Instagram (« Modifier »), l'API ne le permet pas.
- @solandvolt, post PW2000 du 11/11 (10 h 04 UTC) : publié hors de cette session ; contenu conforme (garantie 3 ans, délai 12 à 18 jours ouvrés).
- @frayservicespalamos, post du 02/11 (chape) : « réponse sous 48 h » au lieu de « sous 24 h ».
