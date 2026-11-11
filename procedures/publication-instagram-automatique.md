# Publication Instagram automatique (Fray Services et Sol & Volt)

Mise en place le 11/11/2026. Tâche programmée « Publication Instagram (file d'attente) », tous les jours à 18 h 31 (heure de Madrid).

## Fonctionnement

1. Les posts à venir sont dans `social/instagram/file-publication.json` : compte, date, heure, format (REELS ou IMAGE), adresse du média, légende, statut.
2. Statuts : `a_valider` (préparé par Claude), `valide` (accord de David dans la conversation), `publie`, `reporte`, `echec`.
3. Chaque jour à 18 h 31, la tâche publie les posts du jour au statut `valide`, après les contrôles ci-dessous. Elle met à jour le fichier (identifiant du média, lien), pousse sur la branche et fait un compte rendu.
4. Vidéos : générées par `automatisations/videos/reels.py` à partir de photos réelles, déposées dans `social/instagram/videos/`. Instagram les lit à leur adresse publique GitHub (dépôt public). Test du 11/11 : conteneur créé et prêt (FINISHED), non publié.

## Préparation chaque lundi

Tâche « Bilan Instagram et posts de la semaine suivante » (lundi 9 h 17, heure de Madrid) : bilan des 2 comptes, puis 2 Reels Fray et 3 posts Sol & Volt ajoutés à la file pour la semaine suivante, au statut `a_valider`. David valide dans la conversation. Elle remplace la tâche « Reel hebdo Solandvolt » (mise en pause le 11/11, publiait sans validation). La tâche « Reel Flow Solandvolt (jeudi) » est aussi en pause (vidéos IA).

## Contrôles bloquants avant chaque publication

- Statut `valide` et date du jour.
- Aucun autre Reel publié le même jour sur le même compte (la tâche « Reel hebdo Solandvolt » du lundi publie aussi sur @solandvolt) : sinon report au lendemain.
- Sol & Volt : prix de la légende identique au prix de la boutique ce jour-là (API publique, champ `controle_prix`) et produit en stock ; sinon pas de publication.
- Mots interdits : « CE », « certifié », « Europe » pour la livraison, « 48 h » pour Fray, emoji dans les légendes Sol & Volt.
- Quota Instagram non atteint.

## Vidéos de fournisseurs (relevé du 11/11)

- EcoFlow, Zendure, SOK : les fiches de leurs sites ne contiennent pas de vidéo exploitable (EcoFlow : une boucle de 2 s en paysage). Fiches Innov8 : photos et PDF seulement.
- LensunSolar : 4 vidéos reçues par WhatsApp le 10/11 (Drive, dossier Lensun). **Non utilisables tant que Lensun n'est pas un fournisseur actif** : ses produits ne sont pas en vente sur solandvolt.com.
- Pour obtenir des vidéos officielles : les demander à Innov8 (EcoFlow), à Zendure (visite du 23/11) et à SOK, avec l'autorisation écrite de les publier.

## Ajouter un post

Ajouter une entrée au fichier JSON (statut `a_valider`), la faire valider par David, passer le statut à `valide`, pousser.
