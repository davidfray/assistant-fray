# fray-garde-fou-cowork

Extension Cowork qui demande l'accord de David avant toute action irréversible ou visible par un client. C'est la version Cowork du mod Claude Code `fray-garde-fou` : mêmes 5 règles, mais sous forme d'un hook `PreToolUse` (un petit script Python) qui répond « demander à l'utilisateur ».

| Règle | Actions qui demandent l'accord | Résumé affiché |
|---|---|---|
| 1. Email | Gmail : envoi, réponse, transfert, envoi d'un brouillon | destinataire, objet, 200 premiers caractères |
| 2. Dolibarr | devis, factures, commandes, fiches de tiers, contacts : création, modification, validation, suppression, changement de statut (par outil Dolibarr ou par `curl` sur l'API) | tiers, montant HT, taux d'IVA |
| 3. Publications | Facebook, Instagram (la publication, pas la création du conteneur), Buffer | page ou compte, statut, texte |
| 4. Sites | écritures sur frayservices.com et solandvolt.com : connecteur WordPress, `curl`, `wp`, code qui écrit (pages, produits, prix, CSS, snippets, redirections, menus, DNS) | type, champs, CSS, prix, avertissement si code PHP |
| 5. Automatisations | Make et n8n : activation, suppression, lancement, webhooks (la désactivation est libre) | identifiant et données |

Les lectures, recherches et brouillons ne sont pas ralentis. Un texte seulement cité (`echo`, `grep`, message de commit, fichier écrit par heredoc) ne déclenche rien.

## Exception : la publication Instagram automatique

La publication Instagram est libre **uniquement** si `social/instagram/file-publication.json` contient un post au statut `valide`, daté d'aujourd'hui (heure de Madrid), pour le compte utilisé (`fray` ou `solandvolt`). Le fichier est cherché depuis le dossier de travail de la session et ses parents ; s'il est introuvable, l'accord est demandé. Tout le reste demande l'accord, y compris dans les tâches programmées.

## Installation

1. Accepter le fichier `fray-garde-fou-cowork.plugin` dans Cowork (bouton d'installation sur la carte du fichier).
2. Python 3 doit être disponible dans l'environnement de Cowork (bibliothèque standard seule : aucun réseau, aucun fichier écrit).

## Test sans risque (2 minutes, à faire une fois)

Dans une conversation Cowork, demander à Claude de lancer cette commande (l'adresse n'existe pas, rien ne peut être créé) :

```
curl -s --max-time 5 -X POST "https://dolibarr.invalid/api/index.php/proposals" --data '{"socid":42,"lines":[{"subprice":2000,"qty":1,"tva_tx":10}]}'
```

Résultat attendu : une demande d'accord « règle 2 » avec « création : devis, tiers n° 42, 2 000,00 € HT, IVA 10 % ». Si la commande part sans rien demander, les hooks ne sont pas pris en compte par Cowork : le signaler à Claude avec une capture.

## Limites connues

- **Non testé dans Cowork** au moment de l'écriture (session cloud sans accès à Cowork) : le format de la réponse suit la documentation des extensions Cowork (`decision: ask_user`) et le format Claude Code (`permissionDecision: ask`), les deux sont envoyés.
- Si Python est absent ou si le script plante, le hook échoue sans bloquer : l'action passe. Seule une entrée illisible qui contient un mot sensible (gmail, dolibarr, solandvolt…) déclenche une demande par prudence.
- Les noms des outils des connecteurs Cowork peuvent différer de ceux de Claude Code ; les règles reconnaissent le nom (gmail, dolibarr, facebook, instagram, wordpress, make) ou la forme de l'appel. Un connecteur reconnu à tort ou pas du tout se corrige dans `hooks/scripts/garde_fou.py`.
- Il ne juge pas le fond (texte, prix, IVA) : c'est David qui décide.
- Tests : `python3 -m unittest discover -s tests -v`.
