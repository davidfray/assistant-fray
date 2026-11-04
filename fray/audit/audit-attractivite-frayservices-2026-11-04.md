# Audit d'attractivité de frayservices.com : 04/11/2026

Lecture du site en ligne le 04/11 (navigateur réglé en français, captures bureau 1 280 px et mobile 360 px). Pages lues : Accueil, Services (« A propos »), Projets, Notre méthode, Contact. Aucune modification faite sur le site.

Question posée : le site donne-t-il envie à un propriétaire français absent de confier ses travaux ?

## Verdict

**Note : 5/10.** Le discours est bon, la conversion est cassée.

- **Ce qui marche** : le message vise juste (propriétaire de résidence secondaire, interlocuteur francophone, compte rendu chaque semaine). Les 6 étapes de la méthode, la FAQ, l'IVA 10 % / 21 % annoncée, 2 témoignages datés, une adresse physique à Palamós. Le site sort en 1re position sur « rénovation Palamós entreprise française coordination travaux ».
- **Ce qui bloque** : un visiteur convaincu ne peut pas demander son devis en un clic. Les photos ne montrent aucun résultat fini réel. L'aspect visuel est neutre, sans la charte Fray.

## Les 10 points, du plus urgent au moins urgent

| # | Niveau | Constat | Effet sur le client | Correction |
|---|---|---|---|---|
| 1 | 🔴 | **Page Contact sans formulaire.** Les 5 boutons du site (« Devis gratuit en 48h », « Discuter de votre projet », « Demander un devis gratuit »…) mènent à une photo et une phrase. | Le client motivé arrive sur une impasse. C'est la perte de demandes la plus directe. | Ajouter un formulaire (bloc Jetpack « Formulaire ») : nom, email, téléphone, ville du bien, type de travaux, budget indicatif, période souhaitée, photos. Texte prêt plus bas. |
| 2 | 🔴 | **Téléphone et email non cliquables** (pied de page, aucune balise `tel:` ni `mailto:`), **aucun bouton WhatsApp**. | Sur téléphone, il faut recopier le numéro à la main. Les clients français à distance utilisent surtout WhatsApp. | Liens `tel:+34608852284` et `mailto:david@frayservices.com`, plus un bouton « Écrire sur WhatsApp » (`https://wa.me/34608852284`). |
| 3 | 🔴 | **Image d'accueil et image de Contact générées par IA** : leur texte alternatif est la consigne de génération (« Photographic realism, shot from a slightly elevated corner angle… »), et elles sont présentées comme « Kitchen renovated by Fray Services » / « Salle de bain rénovée par Fray Services ». | Un client qui compare avec la page Projets voit l'écart. Risque de perte de confiance, et de reproche si quelqu'un le remarque. | Remplacer par une vraie photo de chantier fini (salle de bain du post du 04/11, média n° 150, ou cuisine d'Alain P. une fois finie). |
| 4 | 🟠 | **Page Projets : uniquement des photos de chantier en cours** (murs démolis, gaines, saignées), sans légende ni avant/après. La dernière photo, en très grand, montre un mur avec un trou. | Le propriétaire veut voir un résultat. Ici il voit des travaux, sans savoir ce qui a été fait ni où. | 3 fiches projet : avant / après, ville, durée, travaux réalisés, citation du client. Garder 2 ou 3 photos « en cours » comme preuve du suivi. |
| 5 | 🟠 | **Aucun visage, aucune présentation de David.** Le menu « A propos » renvoie vers la page Services ; il n'existe pas de page « Qui sommes-nous ». | Confier un chantier à distance, c'est confier ses clés à une personne. Le client veut savoir à qui. | Un bloc « Votre interlocuteur : David Fray » sur l'accueil (photo, 3 lignes de parcours, langues parlées), et le menu renommé « Services ». |
| 6 | 🟠 | **0 avis Google** (annuaire reformesgirona.com : « Fray Services ☆ 0,0 »). | Premier réflexe d'un client prudent : vérifier les avis. | Demander un avis Google à Roger Boullier et Alain P. ; afficher la note sur le site dès 3 avis. |
| 7 | 🟠 | **Charte Fray absente** : boutons noirs, bandeaux gris, police de remplacement à empattements. Aucun #F5F0E8, #C4822A, Oswald ni Lato. | Le site paraît froid et générique, et ne ressemble pas aux posts Facebook et Instagram. | Apparence > Éditeur > Styles : fond #F5F0E8, boutons #C4822A, titres Oswald, texte Lato. Environ 30 min. |
| 8 | 🟠 | **Mobile** : le logo n'apparaît pas dans l'en-tête ; 5 drapeaux plus une liste de langues prennent la place ; le bouton de devis n'est pas visible sur le premier écran. | Plus de la moitié des visites se font sur téléphone. Le visiteur ne voit ni la marque ni l'action à faire. | Garder la liste de langues seule (sans drapeaux), afficher le logo, mettre un bouton « Devis gratuit » ou « WhatsApp » fixe en bas d'écran. |
| 9 | 🟢 | **« Solandvolt » dans le menu principal.** | Un client rénovation est envoyé vers une boutique solaire. Le message se dilue et les deux marques se mélangent. | Retirer du menu. Si David veut garder le lien, le mettre en petit dans le pied de page. |
| 10 | 🟢 | **Traduction automatique (GTranslate)** : « Votre maître d'ouvrage » devient « Your client » en anglais ; l'aperçu de l'accueil dans les résultats de recherche est en anglais. Le russe est proposé. | Un client anglais ou néerlandais lit une phrase fausse dès le titre. | Titre reformulé (proposition plus bas), qui se traduit mieux. Vérifier dans Search Console (inspection d'URL) la langue que Google indexe. |

Points secondaires : « A propos » sans accent dans le menu ; « Designed with WordPress » en pied de page ; nom du site « Fray Services Palamós – Obras » dans les onglets (mot espagnol sur un site français) ; emojis dans les titres de la page Services ; « Réponse sous 24h » (Projets, Contact) et « Devis gratuit en 48h » (accueil) cohabitent ; lien Instagram vers `davif_fray` (faute de frappe à vérifier) et lien Facebook de type « partage » au lieu de l'adresse de la page ; grand espace vide avant le pied de page ; photos de la page Projets servies en 3 000 × 4 000 px (lent sur mobile).

Remarque de fond sur le titre : en droit, c'est le client qui est maître d'ouvrage ; Fray Services est **maître d'ouvrage délégué**. « Votre maître d'ouvrage » est donc inexact.

## Textes prêts à coller

### Accueil, titre et sous-titre

> **Vos travaux à Palamós, gérés pendant que vous êtes en France**
>
> Un seul interlocuteur francophone, sur place. Nous coordonnons les artisans, contrôlons chaque étape et vous envoyons un rapport photo chaque semaine.
>
> [Demander mon devis gratuit] [Écrire sur WhatsApp]

### Page Contact

> **Parlons de votre projet**
>
> Décrivez vos travaux en 2 minutes. Nous vous répondons sous 24 h et vous remettons un devis détaillé sous 48 h après la visite.
>
> Champs : Nom · Email · Téléphone (WhatsApp) · Ville du bien · Type de travaux (rénovation complète, salle de bain, cuisine, climatisation, façade, autre) · Budget indicatif (moins de 10 000 €, 10 000 à 30 000 €, 30 000 à 60 000 €, plus de 60 000 €) · Période souhaitée · Message · Photos (facultatif)
>
> Bouton : **Envoyer ma demande**
>
> Sous le formulaire : Vous préférez appeler ? +34 608 85 22 84, du lundi au vendredi, 9 h à 18 h. Ou écrivez-nous sur WhatsApp.

Les champs budget, ville et période donnent directement les éléments de qualification (job réel, budget, urgence).

### Bloc « Votre interlocuteur »

> **Votre interlocuteur : David Fray**
>
> [3 lignes à écrire par David : parcours, années sur la Costa Brava, langues parlées.] Basé à Palamós, Carrer Notaries 15. Je passe sur vos chantiers et je vous rends compte en français.

## Plan d'action

| Quand | Action | Temps | Qui |
|---|---|---|---|
| Cette semaine | Formulaire de contact, téléphone et email cliquables, bouton WhatsApp | 1 h | David (ou séance Cowork avec Claude dans Chrome) |
| Cette semaine | Remplacer les 2 images IA par de vraies photos | 20 min | David |
| Cette semaine | Retirer Solandvolt du menu, renommer « A propos » en « Services » | 5 min | David |
| Novembre | Demander 2 avis Google (Roger Boullier, Alain P.) | 10 min | David |
| Novembre | Charte Fray dans les styles du site, en-tête mobile | 45 min | Séance Cowork |
| Décembre (bilan, basse saison) | 3 fiches projet avant / après, bloc « Votre interlocuteur » | 2 h | David (photos) + Claude (textes) |

Les 3 premières lignes règlent l'essentiel : sans formulaire ni lien cliquable, les autres améliorations ne produisent aucune demande.
