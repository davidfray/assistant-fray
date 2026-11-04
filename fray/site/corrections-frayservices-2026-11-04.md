# Corrections de frayservices.com prêtes à appliquer : 04/11/2026

Suite de l'audit `fray/audit/audit-attractivite-frayservices-2026-11-04.md`. Claude n'a pas d'accès en écriture à frayservices.com dans les sessions Claude Code : tout est prêt à coller par David, ou à faire en séance Cowork avec Claude dans Chrome.

Le CSS est écrit d'après le code réel du site (thème Assembler, GTranslate, sections `is-style-section-2`), relevé le 04/11.

**Avant de commencer :** Apparence > Éditeur > (icône d'horloge) **Révisions** permet de revenir en arrière sur les styles. Pour les pages, l'historique se trouve dans Réglages > Révisions.

**Ordre conseillé :** étapes 1 à 4 cette semaine (environ 1 h 30) ; étapes 5 à 8 en novembre et décembre.

---

## Étape 1 : formulaire sur la page Contact (20 min)

**Où :** Pages > Contact > Modifier.

1. Garder l'image et le titre en haut (l'image change à l'étape 3).
2. Remplacer « Rénovation Palamós » par **Parlons de votre projet** et la phrase dessous par :
   > Décrivez vos travaux en 2 minutes. Nous vous répondons sous 24 h et vous remettons un devis détaillé sous 48 h après la visite.
3. Sous ce bloc : menu à 3 points en haut à droite > **Éditeur de code**, puis coller à la fin :

```html
<!-- wp:jetpack/contact-form {"to":"david@frayservices.com","subject":"Demande de devis : frayservices.com","customThankyou":"message","customThankyouHeading":"Merci, votre demande est bien arrivée.","customThankyouMessage":"David Fray vous répond sous 24 h, du lundi au vendredi. Pour aller plus vite, envoyez vos photos sur WhatsApp au +34 608 85 22 84."} -->
<div class="wp-block-jetpack-contact-form">
<!-- wp:jetpack/field-name {"label":"Nom et prénom","required":true} /-->
<!-- wp:jetpack/field-email {"label":"Email","required":true} /-->
<!-- wp:jetpack/field-telephone {"label":"Téléphone (WhatsApp si possible)","required":true} /-->
<!-- wp:jetpack/field-select {"label":"Ville du bien","required":true,"options":["Palamós","Calonge et Sant Antoni","Platja d'Aro","Palafrugell","Calella de Palafrugell","Begur","La Bisbal d'Empordà","Autre ville de la Costa Brava"]} /-->
<!-- wp:jetpack/field-select {"label":"Type de travaux","required":true,"options":["Rénovation complète","Salle de bain","Cuisine","Climatisation, chauffe-eau, VMC","Façade, terrasse, extérieurs","Autre"]} /-->
<!-- wp:jetpack/field-radio {"label":"Budget indicatif","options":["Moins de 10 000 €","10 000 à 30 000 €","30 000 à 60 000 €","Plus de 60 000 €","Je ne sais pas encore"]} /-->
<!-- wp:jetpack/field-select {"label":"Quand souhaitez-vous les travaux ?","options":["Dès que possible","Dans les 3 mois","Dans 3 à 6 mois","Plus tard, je me renseigne"]} /-->
<!-- wp:jetpack/field-textarea {"label":"Votre projet en quelques lignes"} /-->
<!-- wp:jetpack/button {"element":"button","text":"Envoyer ma demande"} /-->
</div>
<!-- /wp:jetpack/contact-form -->

<!-- wp:paragraph -->
<p>Vous préférez appeler ? <a href="tel:+34608852284">+34 608 85 22 84</a>, du lundi au vendredi, 9 h à 18 h. Ou écrivez-nous sur <a href="https://wa.me/34608852284">WhatsApp</a>.</p>
<!-- /wp:paragraph -->
```

4. Revenir à l'**Éditeur visuel** : le formulaire doit apparaître avec ses 9 champs. Si Jetpack affiche « Ce bloc contient du contenu inattendu », cliquer sur **Tenter une récupération**. En dernier recours : bouton + > « Formulaire » > « Formulaire de contact », puis ajouter les champs à la main (même liste).
5. **Mettre à jour**, puis envoyer une demande test depuis un téléphone. Vérifier la réception dans david@frayservices.com (et dans Jetpack > Réponses aux formulaires).

Les champs ville, type, budget et délai donnent directement la qualification (job réel, budget, urgence) avant le premier appel.

---

## Étape 2 : téléphone, email et WhatsApp cliquables, partout (15 min)

**Où :** Apparence > Éditeur > Compositions > Parties de modèle > **Pied de page**.

Remplacer la ligne « +34 608 85 22 84 / david@frayservices.com » par ce paragraphe (Éditeur de code du bloc, ou retaper et ajouter les liens) :

```html
<!-- wp:paragraph {"align":"center"} -->
<p class="has-text-align-center"><a href="tel:+34608852284">+34 608 85 22 84</a> · <a href="https://wa.me/34608852284">WhatsApp</a> · <a href="mailto:david@frayservices.com">david@frayservices.com</a></p>
<!-- /wp:paragraph -->
```

Puis ajouter, **à la fin du pied de page**, un bloc « HTML personnalisé » avec ce contenu (barre d'action fixe, visible seulement sur téléphone, réglée à l'étape 4) :

```html
<div class="fray-cta-mobile">
  <a class="fray-cta-wa" href="https://wa.me/34608852284?text=Bonjour%2C%20j%27ai%20un%20projet%20de%20travaux%20sur%20la%20Costa%20Brava.">WhatsApp</a>
  <a class="fray-cta-devis" href="/contact/">Devis gratuit</a>
</div>
```

Enregistrer. Le pied de page étant commun, la correction vaut pour toutes les pages.

---

## Étape 3 : remplacer les 2 images générées par IA (20 min)

| Page | Image actuelle | Remplacer par | Texte alternatif |
|---|---|---|---|
| Accueil, en haut | Cuisine IA (« Kitchen renovated by Fray Services ») | Média n° 150 « Rénovation salle de bain » (vraie photo), ou la meilleure photo de chantier fini disponible | Salle de bain rénovée par Fray Services à Palamós |
| Contact | Salle de bain IA | Photo de David sur un chantier, ou du bureau Carrer Notaries 15 | David Fray, Fray Services Palamós |

Ensuite, Médias > Bibliothèque : ouvrir les 2 images IA (`fray-services-palamos-e28093-renovation-amp-mod-69cd481117b5b.png` et `…69cd4810c3dbb.png`) et **supprimer définitivement**. Sinon elles restent dans les aperçus de partage Facebook et WhatsApp (balises og:image de l'accueil et de Contact).

Ne plus utiliser d'image générée présentée comme une réalisation, nulle part (site, posts).

---

## Étape 4 : charte Fray, mobile et menu (30 min)

### 4.1 Polices

Apparence > Éditeur > Styles > Typographie > **Gérer les polices** > Google Fonts : installer **Oswald** (500, 600) et **Lato** (400, 700). Puis Typographie > Texte : Lato ; Titres : Oswald.

### 4.2 CSS additionnel

Apparence > Éditeur > Styles > (3 points) > **CSS additionnel**, coller à la fin :

```css
/* Fray Services : charte (04/11/2026) */
body {
  background: #F5F0E8;
  color: #2C2C2C;
  font-family: "Lato", "Helvetica Neue", Arial, sans-serif;
}
h1, h2, h3, h4, .wp-block-heading {
  font-family: "Oswald", "Arial Narrow", sans-serif;
  letter-spacing: 0.01em;
  color: #2C2C2C;
}
.is-style-section-2 { background: #EFE6D6 !important; }

/* Boutons : accent cuivre */
.wp-element-button,
.wp-block-button__link {
  background: #C4822A !important;
  color: #FFFFFF !important;
  border-radius: 6px;
}
.wp-element-button:hover,
.wp-block-button__link:hover { background: #A86D20 !important; }

/* Liens de contact */
a[href^="tel:"], a[href^="mailto:"], a[href^="https://wa.me"] {
  color: #C4822A;
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* GTranslate : liste déroulante seule, sans drapeaux */
.gtranslate_wrapper a.glink { display: none !important; }

/* Mobile : logo visible, en-tête compact */
@media (max-width: 781px) {
  .wp-block-site-logo,
  .wp-block-site-logo img { width: 64px !important; min-width: 64px; }
  .gt_selector { max-width: 110px; font-size: 14px; }
}

/* Barre d'action mobile (bloc HTML du pied de page) */
.fray-cta-mobile { display: none; }
@media (max-width: 781px) {
  .fray-cta-mobile {
    display: flex; gap: 8px;
    position: fixed; left: 0; right: 0; bottom: 0; z-index: 999;
    padding: 10px 16px calc(10px + env(safe-area-inset-bottom));
    background: #F5F0E8;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.12);
  }
  .fray-cta-mobile a {
    flex: 1; text-align: center; padding: 12px 0;
    border-radius: 6px; font-weight: 700; text-decoration: none;
    font-family: "Lato", Arial, sans-serif;
  }
  .fray-cta-wa { background: #25D366; color: #FFFFFF !important; }
  .fray-cta-devis { background: #C4822A; color: #FFFFFF !important; }
  body { padding-bottom: 72px; }
}
```

### 4.3 Menu

Apparence > Éditeur > Navigation > menu « En-tête » :
- renommer « A propos » en **Services** (le lien va déjà vers /services/) ;
- **retirer « Solandvolt »** (si David tient au lien : un petit lien « Notre boutique solaire » dans le pied de page) ;
- ordre conseillé : Services · Projets · Notre méthode · **Devis gratuit** (vers /contact/, en bouton si le thème le permet).

### 4.4 Réglages divers

- GTranslate (Réglages > GTranslate) : retirer le **russe** ; garder français, espagnol, catalan, anglais.
- Réglages > Général > Titre du site : **Fray Services Palamós** (sans « – Obras »).
- Pied de page : supprimer « Designed with WordPress ».
- Instagram du pied de page : vérifier l'adresse `instagram.com/davif_fray` (faute de frappe ?) ; Facebook : remplacer le lien de partage `facebook.com/share/1CQBog34aN/` par l'adresse de la page.

### 4.5 Contrôle

Ouvrir l'accueil sur téléphone : le logo est visible, les drapeaux ont disparu, la barre WhatsApp / Devis gratuit est fixée en bas, les boutons sont cuivre. Sur ordinateur : pas de barre en bas, fond crème.

---

## Étape 5 : textes de l'accueil (15 min)

**Où :** Pages > Accueil > Modifier (texte remplacé dans les blocs existants).

| Bloc | Actuel | Nouveau |
|---|---|---|
| Titre principal | Votre maître d'ouvrage à Palamós, Begur, Palafrugell & Calella de Palafrugell | **Vos travaux à Palamós, gérés pendant que vous êtes en France** |
| Paragraphe 1 | Fray Services Palamós est une entreprise de coordination… | Un seul interlocuteur francophone, sur place, à Palamós. Nous coordonnons les artisans, contrôlons chaque étape et vous envoyons un rapport photo chaque semaine. Vous validez, nous gérons. |
| Paragraphe 2 | Notre force : gérer chaque corps de métier… | Plomberie, carrelage, électricité, climatisation, peinture, façade : un réseau d'une vingtaine d'artisans locaux vérifiés et assurés. Interventions à Palamós, Begur, Palafrugell, Calella, Platja d'Aro et Calonge. |
| Bouton | Devis gratuit en 48h → | **Demander mon devis gratuit** |

Ajouter à côté du bouton un 2e bouton (bloc Boutons > +) : **Écrire sur WhatsApp**, lien `https://wa.me/34608852284`.

Délais à harmoniser sur toutes les pages : **réponse sous 24 h, devis détaillé sous 48 h après la visite** (accueil, Projets, Contact disent aujourd'hui « 48h » ou « 24h » selon la page).

---

## Étape 6 : bloc « Votre interlocuteur » sur l'accueil (15 min, photo de David nécessaire)

À insérer entre « Bureau d'études intégré » et « Expériences clients » (Éditeur de code, à l'endroit voulu) :

```html
<!-- wp:media-text {"mediaPosition":"left","mediaWidth":35,"verticalAlignment":"center"} -->
<div class="wp-block-media-text is-stacked-on-mobile is-vertically-aligned-center" style="grid-template-columns:35% auto"><figure class="wp-block-media-text__media"></figure><div class="wp-block-media-text__content">
<!-- wp:heading -->
<h2 class="wp-block-heading">Votre interlocuteur : David Fray</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>[À compléter par David : parcours en 1 phrase, années sur la Costa Brava, langues parlées : français, espagnol…]</p>
<!-- /wp:paragraph -->
<!-- wp:paragraph -->
<p>Basé à Palamós, Carrer Notaries 15. Je passe sur vos chantiers et je vous rends compte en français, chaque semaine.</p>
<!-- /wp:paragraph -->
<!-- wp:buttons -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="https://wa.me/34608852284">Me poser une question sur WhatsApp</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons -->
</div></div>
<!-- /wp:media-text -->
```

Puis cliquer sur la zone image vide à gauche et choisir la photo de David (sur un chantier de préférence).

---

## Étape 7 : 2 avis Google (10 min)

Prérequis : la fiche Google Business Profile de Fray Services. Dans Google (recherche « Fray Services Palamós » connecté au compte qui gère la fiche) > **Demander des avis** > copier le lien.

Message à envoyer par WhatsApp ou email à Roger Boullier et Alain P. :

> **Objet : Un avis Google sur votre chantier ?**
>
> Bonjour [Prénom],
>
> Merci encore pour votre confiance sur [la rénovation de votre appartement / votre salle de bain puis votre cuisine].
>
> D'autres propriétaires en France cherchent quelqu'un de fiable pour leurs travaux à distance. Votre avis les aiderait à franchir le pas.
>
> Cela prend 1 minute : [lien Google]
>
> Merci beaucoup !
> David Fray, Fray Services Palamós
> +34 608 85 22 84

Dès 3 avis : afficher la note et le lien « Voir nos avis Google » sous les témoignages de l'accueil.

---

## Étape 8 : page Projets avec avant / après (décembre, basse saison)

Pour chaque projet (3 au départ, dont la cuisine d'Alain P. une fois finie), une section sur ce modèle :

```html
<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">Salle de bain complète, Palamós, 2025</h3>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p><strong>Travaux :</strong> dépose complète, plomberie, receveur extra-plat, carrelage, meuble suspendu. <strong>Durée :</strong> X semaines. <strong>Propriétaires :</strong> à Lyon pendant tout le chantier, rapport photo chaque semaine.</p>
<!-- /wp:paragraph -->
<!-- wp:gallery {"columns":2,"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-2 is-cropped"></figure>
<!-- /wp:gallery -->
<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>« Citation du client. »</p><cite>Prénom N., Palamós</cite></blockquote>
<!-- /wp:quote -->
```

(Les valeurs « X semaines », « Lyon » et la citation sont des exemples à remplacer par les vrais.) Dans la galerie : photo « avant » à gauche, « après » à droite, légendes « Avant » et « Après ».

Garder 3 ou 4 photos de chantier en cours sous un titre **« Le suivi, semaine après semaine »** : elles prouvent le suivi, mais ne doivent plus être les seules photos de la page. Retirer la grande photo du mur percé en bas de page.

---

## Récapitulatif

| # | Étape | Temps | Besoin de David |
|---|---|---|---|
| 1 | Formulaire Contact | 20 min | Test de réception |
| 2 | Liens cliquables, WhatsApp, barre mobile | 15 min | — |
| 3 | Images IA remplacées et supprimées | 20 min | Photo de David ou du bureau |
| 4 | Charte, mobile, menu, réglages | 30 min | Vérifier le lien Instagram |
| 5 | Textes de l'accueil | 15 min | — |
| 6 | Bloc « Votre interlocuteur » | 15 min | Photo et 2 lignes de parcours |
| 7 | Avis Google | 10 min | Lien d'avis de la fiche Google |
| 8 | Projets avant / après | 2 h | Photos avant / après, accord des clients |

Une fois les étapes 1 à 4 faites, prévenir Claude : contrôle en ligne (bureau et mobile) et mise à jour de l'audit.
