# Audit de frayservices.com : version refaite (07/11/2026)

Audit en lecture seule après la refonte faite en séance Cowork (nouvelle charte bleu marine #0B2A5C et orange #F5A30B, Oswald et Lato, validée par David le 07/11 ; bouton « Solandvolt » conservé dans le menu, décision de David). Pages relues : les 53 pages de contenu du plan du site (FR, ES, CA, EN), captures bureau et téléphone de l'accueil et de Contact, formulaire, pied de page, métadonnées.

**Note : 7/10** (5/10 le 04/11). Le fichier `fray/site/corrections-frayservices-2026-11-04.md` est **dépassé** : ne plus l'appliquer.

## Ce qui est réglé depuis le 04/11

- Formulaire de devis sur Contact (nom, email, téléphone, commune, type de travaux, projet, source), horaires affichés.
- Téléphone France et Espagne, WhatsApp et email cliquables ; barre fixe « Appeler · WhatsApp · Devis » sur téléphone.
- Charte cohérente sur tout le site, logo visible sur mobile, en-tête clair.
- Pages par ville (Palamós, Begur, Palafrugell et Calella, Platja d'Aro, Calonge), méthode en 6 étapes, FAQ, 3 articles de blog en 4 langues.
- Accueil : vraie photo de salle de bain rénovée en image de partage (sdb_apres_web).
- Article TVA : les 3 conditions du taux de 10 % sont justes (logement de plus de 2 ans, particulier, matériaux sous 40 % du HT, art. 91.Uno.2.10º LIVA).

## Points à corriger, par priorité

### 🔴 1. Captures d'écran privées publiées et pages d'images indexées
- Le plan du site envoyé à Google liste **environ 75 « pages de pièce jointe »** (une page par image téléversée), dont `screenshot_20260203_193446_gmail` (capture de la boîte Gmail, contenu non lisible par Claude) et 2 captures `…_chatgpt` (maquette d'un label « CERTI-REFORMAS QUALITAT », « Vos rénovations certifiées par un label »), plus `pub-renov-fray-services` et l'illustration IA de salle de bain.
- Risques : données personnelles visibles (Gmail), et un label de certification qui n'existe pas, donc une allégation trompeuse si quelqu'un tombe dessus.
- À faire : supprimer définitivement ces 3 captures (Médias), puis désactiver les pages de pièce jointe (Réglages > Médias, ou réglage SEO de WordPress.com) pour qu'elles sortent du plan du site.

### 🔴 2. Image générée par IA sur les pages Contact (FR, CA, EN)
- La salle de bain IA (`…69cd4810c3dbb.png`) est l'image principale de Contact et l'image de partage (Facebook, WhatsApp). Son texte alternatif est **le prompt de génération en anglais** (« … Photographic realism, eye-level frontal composition … »).
- À faire : la remplacer par une vraie photo (`sdb_apres_web.jpg`, déjà utilisée sur l'accueil, ou une photo de David ou du bureau), texte alternatif « Salle de bain rénovée par Fray Services à Palamós ».

### 🟠 3. « Maître d'ouvrage » : terme inexact
- Bandeau du haut de toutes les pages : « Maître d'ouvrage sur la Costa Brava » ; page À propos : titre « Votre maître d'ouvrage francophone » et titre d'onglet « À propos | Maître d'ouvrage francophone ».
- Le maître d'ouvrage est le propriétaire. Fray Services est **maître d'ouvrage délégué** (ce que dit déjà le texte de la page) ou « direction de travaux » (bandeau de l'accueil). Proposition : « Direction de travaux sur la Costa Brava » (bandeau) et « Votre interlocuteur francophone sur la Costa Brava » (À propos).

### 🟠 4. Versions espagnole et multilingue
- **Aucune balise hreflang** entre les versions FR, ES, CA et EN : Google ne sait pas qu'elles sont des traductions l'une de l'autre.
- Version espagnole incomplète : accueil de 207 mots (867 en français), seules Services et Calonge existent (pas de Contact, FAQ, Méthode, Projets ni autres villes en espagnol dans le plan du site). Le catalan et l'anglais sont complets.

### 🟠 5. Blog
- Les 12 articles n'ont **pas de titre H1** dans la page (titre seulement dans l'onglet) : à corriger dans le modèle d'article.
- Les 4 pages de blog ont la même description Google, ancienne et en français : « … dépannage express … clientèle française, européenne… ».

### 🟠 6. Preuves
- 0 avis Google affiché ; témoignages sans nom ; aucune photo ni parcours de David sur À propos (277 mots).
- Projets : 131 mots pour 12 photos, pas de fiche projet (lieu, travaux, durée, avant / après).

### 🟢 7. Détails
- Délais : l'accueil dit « Devis gratuit en 48 h » ; la FAQ et Contact disent « réponse sous 24 h, devis sous 48 h ». Harmoniser : « Réponse sous 24 h, devis détaillé sous 48 h après la visite ».
- Page Services (FR, ES, EN) : 5 emojis (🏠 🚿 ❄ 🏗 📋) ; la charte en prévoit 1 ou 2.
- Pied de page : Facebook pointe vers un lien de partage (`facebook.com/share/1CQBog34aN/`) et non vers la page ; Instagram `davif_fray` à vérifier (faute de frappe ?).
- Pas de page « Aviso legal » (LSSI-CE, art. 10) : l'identité figure dans la politique de confidentialité, mais une page dédiée est la norme en Espagne.
- Accueil (FR, CA, EN) : 1 image sans texte alternatif ; formulaire : le sélecteur d'indicatif du téléphone apparaît vide sur la capture mobile, à tester sur un vrai téléphone.

## Ce que Claude peut faire directement (connecteur WordPress.com, site 253853971)

Points 2, 3, 5 (descriptions des pages de blog), 7 (délais, emojis, texte alternatif) : sur accord de David. Point 1 : la suppression des 3 captures est définitive, donc à confirmer par David ; le réglage des pages de pièce jointe est à vérifier dans le connecteur. Points 4 et 6 : contenu ou décisions de David (photos, avis, traductions espagnoles complètes).
