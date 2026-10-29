# Procédure : traiter une commande EcoFlow (Sol & Volt)

Créée le 29/10/2026, pendant la campagne Google Ads « Solandvolt - Recherche FR-ES v2 ». À suivre dès qu'une commande contient un produit EcoFlow (référence fournisseur ECF…).
Les produits SOK ne sont pas concernés : le fournisseur les expédie directement.

## Ce qu'on sait d'Innov8 (écrits du 16 au 28/10)

- Pas de minimum de commande. **Paiement d'avance par virement.**
- Prix d'achat = PVP conseillé HT moins 15 %. Ne jamais vendre sous le PVP conseillé.
- « La gestion du transport est à votre charge : c'est vous qui engagez le transporteur » (Carlos Crespo, 20/10). Bon de livraison neutre possible (27/10).
- Entrepôt : **Innov8 Iberia SL, Les Planes 2-4, 08970 Sant Joan Despí (Barcelona)**, standard +34 93 474 95 80. Adresse tirée des exemples de l'API d'Innov8 ; la confirmer comme point d'enlèvement.
- Contacts : sac@innov8iberia.com (service client, commandes) ; Juan Carlos Pinar (informatique, API) ; Carlos Crespo (commercial).
- **API de commande** (accès ouvert le 21/10, identifiants dans le mail de Juan Carlos Pinar du 21/10 : ne jamais les copier dans ce dépôt). Elle permet de créer une commande avec une adresse de livraison, de la confirmer, et de consulter son suivi (`orders/shipping/{id}`). Mettre `testMode=true` pour tout essai.
- **Point à éclaircir (question en brouillon dans Gmail, à envoyer par David)** : avec l'API, Innov8 expédie-t-il lui-même au client, en facturant le transport ? Si oui, Packlink devient inutile pour EcoFlow.

## À préparer une fois, avant la première commande (David, 20 minutes)

1. **Compte Packlink PRO gratuit** (packlink.es, rubrique PRO). Données de Solandvolt.
2. **Adresse d'enlèvement** : l'entrepôt Innov8 ci-dessus.
3. **Simuler 4 envois** et noter le prix, le délai et le transporteur (en excluant UPS, qui refuse le lithium) :

| Colis | Poids | Vers Paris (75) | Vers Madrid (28) |
|---|---|---|---|
| River 3 Plus | 6,12 kg | … € | … € |
| DELTA 3 / DELTA 3 Plus | 14,7 kg | … € | … € |

4. Renvoyer ces prix à Claude : on calcule la marge réelle par produit et on corrige la règle « livraison offerte dès 60 € » si nécessaire.

## Le jour où une commande EcoFlow arrive

| Étape | Qui | Délai |
|---|---|---|
| 1. Contrôler la commande WooCommerce : produit, adresse complète, **téléphone du client** (exigé par les transporteurs) | David | jour J |
| 2. Vérifier le stock dans le fichier Innov8 du jour (vers 7 h 30, david@frayservices.com) | David ou Claude | jour J |
| 3. Commander chez Innov8 (email ci-dessous, ou API) et payer la proforma par virement | David | jour J |
| 4. Attendre « listo para recoger » avec le nombre de colis, le poids et les dimensions réels | Innov8 | J+1 |
| 5. Packlink : créer l'envoi. Expéditeur : entrepôt Innov8. Destinataire : client. Contenu : « Estación de energía portátil con batería de litio (UN3481) ». Transporteur acceptant le lithium. Payer, télécharger l'étiquette PDF | David | J+1 |
| 6. Envoyer l'étiquette à sac@innov8iberia.com avec la date d'enlèvement | David | J+1 |
| 7. Passer la commande WooCommerce en « Terminée » et envoyer le suivi au client (email ci-dessous) | David ou Claude | jour de l'enlèvement |
| 8. Noter le coût réel du transport dans le suivi des marges | Claude | après l'envoi |

Si le client n'est pas joignable ou si le stock manque : prévenir le client le jour même (email 3), proposer d'attendre ou un remboursement complet.

### Repères de marge (prix de vente au 29/10, avant transport)

| Produit | Vente TTC | Vente HT | Achat HT | Marge HT avant transport |
|---|---|---|---|---|
| River 3 Plus ?p=623 | 299,00 € | 247,11 € | 210,04 € | 37,07 € |
| DELTA 3 ?p=344 (ECF0040, PVP HT 660,33 €) | 799,00 € | 660,33 € | 561,28 € | 99,05 € |

Avec la livraison offerte, le transport sort de cette marge.

## Email 1 : commande à Innov8 (espagnol, David envoie)

**Asunto:** Pedido Solandvolt n.º [n.º WooCommerce]: recogida por nuestro transportista

Buenos días:

Les enviamos un nuevo pedido:

- Referencia: [ECF00xx], [nombre del producto]
- Cantidad: [1]
- Pedido Solandvolt n.º: [n.º]

Nuestro transportista recogerá el pedido en su almacén de Sant Joan Despí. Les agradeceríamos:

1. La factura proforma para hacer la transferencia hoy mismo.
2. Confirmación cuando esté listo para recoger, con número de bultos, peso y medidas.
3. Albarán neutro, sin documentación de Innov8, como acordamos.

Les enviaremos la etiqueta del transportista en cuanto tengamos la confirmación.

Un cordial saludo,

David Fray
Solandvolt
david@frayservices.com · +34 608 85 22 84

## Email 2 : suivi au client (français)

**Objet :** Votre commande Sol & Volt n° [n°] est en route

Bonjour [Prénom],

Votre [produit] a quitté notre entrepôt aujourd'hui.

- Transporteur : [nom]
- Numéro de suivi : [numéro], [lien de suivi]
- Livraison prévue : [date indiquée par le transporteur]

Le colis contient une batterie lithium : le transporteur peut demander une signature à la livraison. Pensez à être présent ou à désigner quelqu'un.

Une question ? Répondez à cet email ou écrivez à contact@solandvolt.com.

L'équipe Sol & Volt

## Email 3 : retard ou rupture (français)

**Objet :** Votre commande Sol & Volt n° [n°] : délai à confirmer

Bonjour [Prénom],

Votre [produit] n'est pas disponible immédiatement chez notre fournisseur. Nouvelle date d'expédition prévue : [date].

Deux choix :

1. Vous patientez : nous vous envoyons le suivi dès l'expédition.
2. Vous annulez : nous vous remboursons la totalité sous 48 h.

Répondez simplement « 1 » ou « 2 » à cet email.

L'équipe Sol & Volt
