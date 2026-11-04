# Séance Cowork du 04/11/2026, 16 h : titres et descriptions espagnols, article « Corte de luz »

Demande à copier dans Cowork (Claude dans Chrome, connecté à wp-admin de solandvolt.com), après « Fetch origin » puis « Pull » dans GitHub Desktop.

---

Bonjour. Séance TranslatePress sur solandvolt.com. Lis d'abord `CLAUDE.md`, puis ce fichier. Valide chaque étape avec moi avant d'enregistrer.

## 1. Titres et descriptions Google des pages espagnoles

- **Source : `audit/titulos-metas-es-2026-11-04.csv`** (une ligne par page : URL, titre ES, méta ES). Colonne vide = garder ce qui existe. Le fichier `.md` du même nom ne sert que de résumé.
- Le CSV a été corrigé le 04/11 par Claude Code :
  - les anciennes pages de niveau (/es_es/le-module/, /la-base/, /la-veilleuse/, redirigées en 301) sont remplacées par les catégories ;
  - les promesses retirées du site le 29/10 sont supprimées (« 48 horas », « una semana », « nevera de 40 L ») ;
  - « La Veilleuse » devient « El Piloto » ;
  - garantie : « Garantía legal de 3 años » partout (décision du 26/10, CGV), au lieu de « 2 años » ou « 7 años del fabricante ».
- Saisie : ouvrir chaque URL /es_es/, « Traduire la page », onglet SEO de la barre latérale. Si les champs SEO demandent l'extension payante, s'arrêter et me le dire.

## 2. Titres absents du CSV, à relever dans TranslatePress

- **Catégories (`/es_es/categoria-producto/...`)** : leurs lignes sont maintenant dans le CSV, mais leurs titres actuels n'ont pas pu être lus de l'extérieur. Relever dans TranslatePress le titre et la méta en place de chaque catégorie, comparer avec le CSV, puis saisir.
- **Fiche EcoFlow DELTA 3 Max Plus (?p=850, réf. ECF0081)** : absente du CSV. Relever son titre et sa méta dans TranslatePress, proposer une version espagnole (titre de 62 caractères maximum, méta de 160 maximum, garantie légale de 3 ans, aucune promesse de durée), et me la faire valider avant de l'enregistrer.

## 3. Article « Corte de luz »

1. Dans Articles, **confirmer que l'article espagnol « Corte de luz: ¿qué puede alimentar una estación portátil con un panel solar? » porte bien le numéro `?p=906`** (adresse /corte-de-luz-estacion-portatil-panel-solar/). Ne rien faire si le numéro diffère : me le signaler.
2. Ouvrir l'article français « Coupure de courant : que peut alimenter une station portable avec un panneau solaire ? » sur /es_es/, « Traduire la page », et coller le texte espagnol de ?p=906 bloc par bloc (titre, paragraphes, intertitres, listes, mention de la vidéo).
3. Vérifier la page espagnole en navigation privée.
4. Passer ?p=906 en **brouillon**.
5. Rank Math > Redirections : 301, source exacte `corte-de-luz-estacion-portatil-panel-solar/`, destination `/es_es/` + adresse de l'article français. Pas d'antislash dans les règles. Tester la redirection.

## 4. Si le temps le permet

Libellés « … cantidad » du champ quantité (lecteurs d'écran) sur les fiches.

## Fin de séance

Mettre à jour `CLAUDE.md` (Fait en ligne du 04/11, En attente, journal), puis « Commit to main » et « Push origin » dans GitHub Desktop.
