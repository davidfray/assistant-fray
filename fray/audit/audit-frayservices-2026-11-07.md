# Audit de frayservices.com : version refaite (07/11/2026)

Audit en lecture seule après la refonte faite en séance Cowork (nouvelle charte bleu marine #0B2A5C et orange #F5A30B, Oswald et Lato, validée par David le 07/11 ; bouton « Solandvolt » conservé dans le menu, décision de David). Pages relues : les 53 pages de contenu du plan du site (FR, ES, CA, EN), captures bureau et téléphone de l'accueil et de Contact, formulaire, pied de page, métadonnées.

**Note : 7/10** (5/10 le 04/11), **7,5/10 après les corrections du 07/11** (voir en fin de fichier). Le fichier `fray/site/corrections-frayservices-2026-11-04.md` est **dépassé** : ne plus l'appliquer.

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

## Corrections faites le 07/11 (à la demande de David, connecteur WordPress.com, tout vérifié en ligne)

| Point | Fait |
|---|---|
| 1 | **3 captures supprimées définitivement** (Gmail id 101, ChatGPT id 104 et 105) : fichiers et pages en 404. Aucune page ne les utilisait. Reste : désactiver les pages de pièce jointe (réglage non accessible au connecteur, à faire en séance Cowork ou dans wp-admin). |
| 2 | Pages Contact FR (13), CA (426), EN (580) : image IA remplacée par la vraie photo `sdb_apres_web` (id 410), textes alternatifs dans chaque langue, image de partage corrigée. **Formulaire : indicatif par défaut « US » remplacé par FR** (CA : ES ; EN : GB inchangé). |
| 3 | En-tête commun : « Maître d'ouvrage sur la Costa Brava » → « Direction de travaux sur la Costa Brava » ; **drapeaux espagnol et anglais ajoutés** (seuls FR et CA y figuraient). À propos (10) : titre « Votre interlocuteur francophone pour vos travaux sur la Costa Brava », titre Google « À propos \| Direction de travaux à Palamós, Costa Brava \| Fray Services ». Services FR : « Maîtrise d'ouvrage déléguée ». |
| 5 | Modèle des articles : titre en H1 (vérifié). Slogan du site (utilisé comme description des pages de blog) remplacé : « Direction de travaux et rénovation sur la Costa Brava, en français : un interlocuteur unique à Palamós pour votre résidence principale ou secondaire. » Les descriptions par langue saisies sur les pages de blog ne sont pas prises en compte par le site (pages d'articles), le slogan s'affiche dans les 4 langues. |
| 7 | Emojis retirés des pages Services FR (165), ES (508), EN (573). |

Points de l'audit **sans correction nécessaire** après vérification : l'image « sans texte alternatif » de l'accueil est le fond décoratif du bandeau (texte vide correct) ; les délais sont cohérents (accueil « devis sous 48 h », FAQ « réponse sous 24 h, devis sous 48 h »).

Restent pour David : liens Facebook et Instagram, page « Aviso legal », photo et parcours de David, avis Google, fiches projet, version espagnole complète et balises hreflang, pages de pièce jointe. Remarque : la page Services espagnole renvoie vers les pages de ville et le Contact en français (pas d'équivalents espagnols).

## Suite du 07/11

- **Liens sociaux corrigés** dans le pied de page, d'après les comptes connectés à Composio : page Facebook « Fray Services » `https://www.facebook.com/659509903912871` (au lieu d'un lien de partage) ; Instagram professionnel `@frayservicespalamos` (172 publications, au lieu de `davif_fray`).
- **Page « Aviso legal / Mentions légales » créée** (id 638, `/aviso-legal/`, bilingue ES puis FR) : identité reprise mot pour mot de la politique de confidentialité (David Fray, autónomo, NIE Y3669404K, Carrer Notaries 15, 17230 Palamós), hébergeur Automattic (WordPress.com), conditions d'utilisation, propriété intellectuelle, droit applicable. Lien ajouté dans le pied de page ; lien direct vers `/es/politica-de-privacidad/`. **À relire par David** (domicile fiscal différent ? la déclaration d'activité indique Calle Josep Fàbrega i Pou 7-9 ; adapter si le domicile légal doit être celui-là).

## À faire en séance Cowork (wp-admin, extension multilingue)

1. Version espagnole : créer Contacto (avec formulaire, indicatif ES par défaut), Preguntes/Preguntas frecuentes, Método, Proyectos et les pages de ville en espagnol, en leur attribuant la langue espagnole dans l'extension multilingue (le connecteur ne voit pas ce réglage : une page créée par lui serait rangée en français). Puis faire pointer les liens de `/es/servicios/` vers ces pages.
2. Langue espagnole déclarée en **« es-EC » (Équateur)** et `og:locale` en `es_LA` : régler sur espagnol d'Espagne (es_ES).
3. Balises hreflang entre FR, ES, CA et EN (réglage de l'extension multilingue).
4. Désactiver les pages de pièce jointe (environ 75 dans le plan du site).
5. Pages de blog : leurs titres et descriptions par langue ne sont pas pris en compte ; à régler dans l'extension SEO ou multilingue si possible.
