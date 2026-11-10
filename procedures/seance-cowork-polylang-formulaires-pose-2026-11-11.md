# Séance Cowork (Claude dans Chrome) : langue Polylang des 3 formulaires de pose solaire (frayservices.com)

Texte à coller dans Cowork. Durée : environ 15 minutes. Pas besoin de « Fetch / Pull » : la synchro automatique s'en charge.

---

Lis `CLAUDE.md`, puis ce fichier. Travaille dans mon Chrome, sur wp-admin de **frayservices.com** (pas solandvolt.com). **Demande-moi avant chaque enregistrement.**

## Contexte

Le 10/11, Claude Code a créé et publié 3 formulaires de demande de pose solaire, traductions du formulaire français **page 815** (`/demande-pose-solaire/`). Le connecteur WordPress ne peut pas régler la langue Polylang : les 3 pages sont rattachées au **français**. Deux essais de David dans wp-admin n'ont rien changé (date de modification inchangée, adresse sans préfixe, `lang="fr-FR"`).

| Page | Titre | Langue voulue | Adresse actuelle | Adresse attendue |
|---|---|---|---|---|
| 818 | Solicitud de instalación solar | Español | /solicitud-instalacion-solar/ | /es/solicitud-instalacion-solar/ |
| 819 | Sol·licitud d'instal·lació solar | Català | /sollicitud-installacio-solar/ | /ca/sollicitud-installacio-solar/ |
| 820 | Solar installation request | English | /solar-installation-request/ | /en/solar-installation-request/ |

Les liens « → Solicitar la instalación », « → Sol·licitar la instal·lació » et « → Request installation » des pages Services ES (508), CA (432) et EN (573) pointent vers les **adresses actuelles**.

## 1. Diagnostic (sans rien modifier)

1. wp-admin > Pages. Chercher « instal ». Noter pour chacune des 3 pages ce que montre la **colonne des langues** (drapeaux) : drapeau français, aucun drapeau, ou un « + ».
2. Ouvrir la page **815** (français) dans l'éditeur. Dans la barre latérale, onglet « Page », trouver la boîte **« Langues »** de Polylang. Noter ce qu'elle montre (langue, traductions liées).
3. Ouvrir la page **645** (`/es/contacto/`, déjà correctement en espagnol) pour voir à quoi ressemble une page bien réglée.
4. Me faire un compte rendu avant d'aller plus loin. Si la boîte « Langues » n'apparaît pas dans l'éditeur, le dire : il faudra peut-être passer par la modification rapide ou par Langues > Réglages.

## 2. Régler la langue (une page à la fois, avec mon accord)

Pour la page **818** d'abord :
1. Méthode A, dans l'éditeur : boîte « Langues » > langue **Español**. Si Polylang demande de confirmer le changement de langue, accepter. Puis **« Mettre à jour »**.
2. Si l'éditeur ne garde pas le réglage : méthode B, wp-admin > Pages > survoler la ligne > **« Modification rapide »** > champ **« Langue »** = Español > **« Mettre à jour »**.
3. Contrôle immédiat : dans la liste des pages, le drapeau espagnol s'affiche et le lien « Voir » commence par `/es/`. Ouvrir la page : le menu et le bandeau doivent être en espagnol.

Si ça marche, refaire la même chose pour **819** (Català, `/ca/`) puis **820** (English, `/en/`).

## 3. Relier les traductions

Ouvrir la page **815**. Dans la boîte « Langues », en face de chaque langue, choisir la traduction : Español = 818, Català = 819, English = 820. **« Mettre à jour »**. Contrôle : sur la page 815 en ligne, le sélecteur de langue du site doit mener vers les 3 formulaires traduits.

## 4. Mettre à jour les 3 liens des pages Services

Seulement si les 3 nouvelles adresses fonctionnent. Dans chaque page, modifier uniquement l'adresse du lien sous la rubrique « Instalación solar / Instal·lació solar / Solar installation » :

| Page Services | Ancien lien | Nouveau lien |
|---|---|---|
| 508 (ES, /es/servicios/) | /solicitud-instalacion-solar/ | /es/solicitud-instalacion-solar/ |
| 432 (CA, /ca/serveis/) | /sollicitud-installacio-solar/ | /ca/sollicitud-installacio-solar/ |
| 573 (EN, /en/renovation-services/) | /solar-installation-request/ | /en/solar-installation-request/ |

Les anciennes adresses peuvent répondre 404 après le changement de langue : vérifier que les nouveaux liens ouvrent bien les formulaires.

## 5. Contrôle final

- Les 3 formulaires s'ouvrent en `/es/`, `/ca/`, `/en/`, avec menu et bandeau dans la bonne langue.
- Les 3 liens des pages Services mènent à ces adresses.
- Le formulaire français `/demande-pose-solaire/` et la page Services française n'ont pas bougé.

## 6. Fin de séance

Mettre à jour `CLAUDE.md` : section « Fait en ligne » (date, ce qui a marché, méthode A ou B), et retirer le point ouvert « langue Polylang des pages 818, 819, 820 » de « En attente ». Ajouter une ligne au journal des sessions (outil : Cowork). Me rappeler qu'une session Claude Code pourra revérifier les adresses en ligne.

## Si rien ne marche

Ne pas forcer : me dire ce qui bloque (message d'erreur, capture). Solution de repli : supprimer les pages 818, 819, 820 et les recréer depuis Polylang (« + » de la colonne des langues sur la page 815, qui crée la traduction dans la bonne langue), en recopiant le contenu de chaque page (bloc de code de l'éditeur). Me demander avant toute suppression.
