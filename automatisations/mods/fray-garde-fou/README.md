# fray-garde-fou

Mod Claude Code qui bloque toute action irréversible ou visible par un client tant que David ne l'a pas confirmée **dans la conversation**.

Fonctionnement (identique sur ordinateur, téléphone et session cloud, sans dialogue) :
1. L'action est bloquée ; Claude reçoit le résumé (destinataire, objet, montant, texte du post…) et doit le montrer à David.
2. David répond « confirme » (ou « je confirme », « ok confirme ») en début de **son propre message**. Un texte qui ne vient pas de David (autre session, tâche programmée, mod, message système) n'autorise rien.
3. Claude relance exactement le même appel : il passe **une seule fois**. Un appel différent (autre destinataire, autre texte…) est de nouveau bloqué.
4. Toute autre réponse de David abandonne l'action en attente.

| Règle | Outils interceptés | Affiché |
|---|---|---|
| 1. Email | Gmail `send_message`, `reply`, `forward` (MCP et Composio `GMAIL_*SEND*`, `REPLY`, `FORWARD`) | destinataire, objet, 200 premiers caractères ; pour l'envoi d'un brouillon existant (seul son identifiant est dans l'appel), consigne à Claude de lire le brouillon et d'afficher ces 3 éléments avant le « confirme » |
| 2. Dolibarr | tout outil `dolibarr` qui crée, modifie, valide ou supprime ; `curl` en écriture vers `api/index.php/proposals`, `invoices`, `orders` | tiers, montant HT (ou somme des lignes), taux d'IVA |
| 3. Réseaux sociaux | outils Facebook, Instagram, Buffer, Postiz qui publient, programment, partagent ou commentent | plateforme, page ou compte (Fray Services ou Sol & Volt), statut (publié tout de suite, non publié, programmé), texte, média. Instagram : la création du conteneur (invisible) passe, seule la publication est bloquée, avec consigne à Claude d'afficher la légende et la photo du conteneur avant le « confirme » |
| 4. Sites | WordPress.com en écriture (pages, articles, extensions, thème, styles, menus, DNS…) sur solandvolt.com, frayservices.com ou un site non indiqué ; `curl`, `requests` ou `wp` en écriture vers ces 2 domaines | site, élément, ce qui change |
| 5. Automatisations | Make `scenarios_activate`, `delete`, `run`, `replay` ; n8n `activate`, `execute`, `run`, `delete` (la désactivation n'est pas bloquée) ; webhooks `hook.*.make.com` et n8n | identifiant, action |

Une bande au-dessus du prompt indique « garde-fou actif », le nombre d'actions bloquées dans la session et l'action en attente (elle peut ne pas s'afficher sur l'application mobile).

Accès demandés : aucun fichier, aucun réseau, aucun sous-processus, aucun dialogue ; seulement `$.state` (session) et `$.ui.resolve` (bande).

Chargement après relecture : `claude --plugin-dir ~/mods/fray-garde-fou`. Tests : `claude plugin test ~/mods/fray-garde-fou`.
