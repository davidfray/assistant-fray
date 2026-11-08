---
name: replica
description: "Réplica : rédige la réponse à tout message reçu par David (email, WhatsApp, commentaire, avis Google, message fournisseur, objection, relance), pour Fray Services ou Sol & Volt, en français ou en espagnol. À utiliser dès qu'il faut répondre à un message collé ou lu dans Gmail : « réponds à… », « réplica », « que je lui dis ? », « respuesta a… », « répondre à cet avis »."
---

# Réplica : répondre à un message entrant

Une réplica = une réponse prête à envoyer, en brouillon. **David valide et envoie, toujours.** Jamais d'envoi direct, même si l'outil le permet. Si David le demande, créer le brouillon dans Gmail (david@frayservices.com), sans l'envoyer.

## 1. Lire le message avant d'écrire

Extraire en 6 points, sans les afficher sauf demande :

1. **Marque** : Fray Services (rénovation, maître d'œuvre et bureau d'études) ou Sol & Volt (matériel solaire). Indice : adresse de réception, produit cité, chantier cité. En cas de doute, demander. **Ne jamais mélanger les deux marques dans une réponse** (seules exceptions voulues par David : la mention de pose sur devis préalable côté Sol & Volt, le bouton Solandvolt sur frayservices.com).
2. **Expéditeur** : client, prospect, fournisseur, sous-traitant, administration, influenceur, avis public.
3. **Langue** : répondre dans la langue du message. Client français : français. Fournisseur espagnol : espagnol formel (usted). Catalan reçu : répondre en espagnol formel sauf demande de David.
4. **Demande réelle** : ce que la personne veut obtenir, pas ce qu'elle écrit en premier.
5. **Émotion** : neutre, inquiet, pressé, mécontent. Un client inquiet reçoit d'abord un fait rassurant, puis la suite.
6. **Ce qui manque pour répondre juste** : prix, délai, stock, statut de commande, date de chantier. Le chercher (étape 2) ou le laisser en [champ à remplir].

Prospect Fray Services : ajouter en note la qualification (job réel, freins, budget, urgence, verdict chaud / tiède / froid).

## 2. Vérifier les faits

Aucun chiffre, délai ou promesse de mémoire. Sources, dans l'ordre :

- `CLAUDE.md` du dépôt assistant-fray (décisions et état du jour).
- Sol & Volt : API WooCommerce (`/wp-json/wc/v3/`) pour la commande, le prix, le stock ; délai = celui de la fiche produit.
- Fray Services : devis, rapports de chantier et emails du fil dans Gmail.
- Si l'information est introuvable : `[à confirmer par David : …]`, jamais d'invention.

## 3. Rédiger

### Règles communes

- Phrases courtes. Ton direct, rassurant, terrain. Zéro superlatif vague.
- Ponctuation française stricte : espace avant `: ! ? ;`, guillemets « ».
- Chiffres et délais concrets (« sous 24 h », « le 14/11 », « 585 € TTC »).
- Une seule action demandée, explicite, en fin de message (CTA).
- Email : objet toujours présent, précis (« Votre commande n° 1234 : expédition le 12/11 »).
- Problème reçu : reconnaître en une phrase, donner la solution, donner la date. Pas d'excuse générique sans solution. Jamais alarmiste.
- Pas de rappel de règles internes, de marges ou de fournisseurs au client.

### Fray Services

- Se présenter comme **maître d'œuvre et bureau d'études** ; le client est le maître d'ouvrage. Espagnol : « dirección de obra / oficina técnica ».
- Clients = propriétaires français souvent absents : rassurer sur le suivi à distance (photos, compte rendu, prochaine étape datée).
- Délai de réponse annoncé : « réponse sous 24 h ».
- Devis : TVA espagnole (IVA) 10 % seulement si logement de plus de 2 ans, particulier, matériaux sous 40 % HT, sinon 21 % (art. 91.Uno.2.10º LIVA). Ne jamais donner un montant de devis non calculé : renvoyer vers devis-fray.
- Point de chantier : reprendre la structure de rapport-chantier (avancement, prochaines étapes, points d'attention, action client), niveau vert / orange / rouge.
- 1 à 2 emojis maximum, seulement en message court (WhatsApp, commentaire). Aucun dans un email.
- Signature : David Fray, Fray Services Palamós, maître d'œuvre et bureau d'études.

### Sol & Volt

- Lire `solandvolt-garde-fous` avant. Rappels : aucune mention CE, « gestionnaire de réseau local » (jamais Enedis seul), aucune référence à Fray Services, aucun emoji.
- Garantie : celle des CGV (garantie légale de 3 ans) ; aucune extension proposée.
- EcoFlow : aucun code de remise, aucun prix sous le PVP conseillé.
- Livraison : délai de la fiche produit uniquement. EcoFlow vers la France : vérifier le transport avant de promettre un envoi.
- Litige, remboursement chiffré, geste commercial : proposer le texte, la décision revient à David.
- Signature : L'équipe Sol & Volt, contact@solandvolt.com.

## 4. Gabarits par canal

**Email client ou prospect**
```
Objet : [sujet précis + fait clé]

Bonjour [Prénom / Monsieur, Madame Nom],

[1 phrase : je reconnais la demande ou la situation.]
[2 à 4 phrases : la réponse, avec chiffre ou date.]
[1 phrase : ce que je vous demande / la prochaine étape, avec date.]

[Signature]
```

**Email fournisseur ou sous-traitant (espagnol formel)**
```
Asunto: [referencia + objeto]

Estimado/a [Sr./Sra. Apellido]:

[Contexto en 1 frase, con referencia de pedido u obra.]
[Petición concreta, numerada si hay varias.]
[Plazo de respuesta deseado.]

Quedo a la espera de su respuesta.
Atentamente,
[Firma]
```

**Commentaire public (Instagram, Facebook)** : 2 à 3 phrases, aucune donnée personnelle ni détail de commande ; inviter en message privé si la question porte sur une commande ou un chantier.

**Avis Google**
- Positif : remercier en citant un détail réel du chantier ou de la commande, 2 à 3 phrases, sans formule toute faite.
- Négatif : remercier pour le retour, reconnaître le point factuel, donner ce qui a été fait ou sera fait (avec date), proposer d'en parler en direct (téléphone ou email). Ne jamais contester publiquement, ne jamais citer de donnée privée. Toujours soumettre à David.

**WhatsApp** : 1 à 4 lignes, pas d'objet, une seule question ou action.

**Objection prix (Fray Services)** : ne pas baisser le prix dans la réponse. Détailler ce que couvre le montant (postes, coordination 8 à 12 % HT, suivi à distance), proposer une option ou un phasage, laisser la décision à David pour toute remise.

**Relance sans réponse** : rappeler le dernier échange en une phrase, une question fermée (« Je réserve le créneau du 18/11 ? »), une date limite réaliste.

## 5. Format de sortie

1. **Réplica** prête à copier (objet compris si email).
2. **Variante** plus courte ou d'un autre ton (A/B), seulement si utile.
3. **À vérifier** : liste des [champs] et des faits non confirmés.
4. **Note interne** (si prospect Fray) : qualification et verdict chaud / tiède / froid.

Pas de texte d'introduction ni de commentaire sur la réponse elle-même.

## 6. Auto-contrôle avant de rendre

- Bonne marque, aucune référence croisée non voulue ?
- Langue et registre du destinataire ?
- Chaque chiffre et délai vient d'une source vérifiée ou est entre crochets ?
- Objet présent (email) et un seul CTA clair ?
- Ponctuation française (espaces insécables avant `: ! ? ;`) ?
- Aucune promesse que David n'a pas validée (remise, date de chantier, remboursement) ?
