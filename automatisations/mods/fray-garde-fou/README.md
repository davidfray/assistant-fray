# fray-garde-fou

Mod Claude Code qui demande la confirmation de David avant toute action irréversible ou visible par un client. Chaque appel concerné ouvre un dialogue « Confirmer / Refuser ». Sans réponse « Confirmer », l'outil ne s'exécute pas.

| Règle | Outils interceptés | Affiché |
|---|---|---|
| 1. Email | Gmail `send_message`, `reply`, `forward` (MCP et Composio `GMAIL_*SEND*`, `REPLY`, `FORWARD`) | destinataire, objet, 200 premiers caractères |
| 2. Dolibarr | tout outil `dolibarr` qui crée, modifie, valide ou supprime ; `curl` en écriture vers `api/index.php/proposals`, `invoices`, `orders` | tiers, montant HT (ou somme des lignes), taux d'IVA |
| 3. Réseaux sociaux | outils Facebook, Instagram, Buffer, Postiz qui publient, programment, partagent ou commentent | plateforme, texte, média, date |
| 4. Sites | WordPress.com en écriture (pages, articles, extensions, thème, styles, menus, DNS…) sur solandvolt.com, frayservices.com ou un site non indiqué ; `curl`, `requests` ou `wp` en écriture vers ces 2 domaines | site, élément, ce qui change |
| 5. Automatisations | Make `scenarios_activate`, `deactivate`, `delete`, `run`, `replay` ; n8n `activate`, `execute`, `run`, `delete` ; webhooks `hook.*.make.com` et n8n | identifiant, action |

Une bande au-dessus du prompt indique « garde-fou actif » et le nombre d'actions bloquées dans la session (et refusées).

Chargement après relecture : `claude --plugin-dir ~/mods/fray-garde-fou`. Tests : `claude plugin test ~/mods/fray-garde-fou`.
