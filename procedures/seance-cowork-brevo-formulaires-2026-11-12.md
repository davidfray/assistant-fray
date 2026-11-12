# Séance Cowork : formulaires Brevo de solandvolt.com (12/11/2026)

À coller dans Cowork, avec Claude dans Chrome, navigateur connecté à Brevo (compte david@frayservices.com).

## Problème

Les inscriptions à la newsletter de solandvolt.com n'arrivent pas dans Brevo. Le 12/11, deux tests ont été faits depuis le site : celui de David (davidfray@hotmail.fr) et celui de Claude Code (david+test-newsletter-fr@frayservices.com). Brevo répond `{"success":true}` et affiche « Votre inscription est confirmée », mais **aucun contact n'est créé** et aucun email de confirmation n'est envoyé. La liste « SolandVolt - Newsletter » (id 4) est à 0 inscrit depuis sa création : l'ancien formulaire avait donc le même défaut.

Le site n'est pas en cause. Le formulaire HTML de l'accueil (bloc `#sv-newsletter`) envoie aux adresses Brevo d'origine :
- français : `https://1df662ae.sibforms.com/v2/serve/MUIFAB-AIP399rG5uevrK1aP9BOYrvu…` (formulaire « Liste attente Solandvolt ») ;
- espagnol : `https://1df662ae.sibforms.com/v2/serve/MUIFAEvI3-IIUnGOwigLqpfDXdihky9…` (formulaire « Liste attente Solandvolt ES »).

## À faire dans Brevo

Pour chacun des deux formulaires (Contacts > Formulaires) :

1. Ouvrir le formulaire, aller à l'étape **Paramètres** (ou « Configuration »).
2. Noter ce qui est réglé avant de modifier (liste de destination, type de confirmation) et le reporter dans `CLAUDE.md`.
3. Liste de destination : **« SolandVolt - Newsletter »** (id 4), pour les deux formulaires. Si David préfère une liste espagnole à part, la créer (« SolandVolt - Newsletter ES ») et l'utiliser pour le formulaire ES.
4. Confirmation : **simple** (pas de double confirmation), sauf avis contraire de David.
5. Ne pas changer l'apparence ni les champs : le site n'utilise plus le style Brevo.
6. **Enregistrer et publier.** Vérifier que l'adresse du formulaire (`…/v2/serve/MUIFA…`) n'a pas changé ; si elle a changé, la noter : il faudra la mettre à jour dans le bloc `#sv-newsletter` de l'accueil (page 99).
7. Vérifier aussi l'état du compte (bandeau d'alerte, compte à valider, expéditeur non vérifié) et le noter.

## Test

1. Sur https://www.solandvolt.com/, s'inscrire avec davidfray@hotmail.fr ; sur https://www.solandvolt.com/es_es/, avec une autre adresse de David.
2. Dans Brevo, Contacts : les deux contacts doivent apparaître dans « SolandVolt - Newsletter ».
3. Si la double confirmation est gardée : cliquer sur le lien reçu, puis vérifier.

## Fin de séance

Mettre à jour `CLAUDE.md` (Fait en ligne du 12/11, En attente, journal), puis « Commit to main » et « Push origin » dans GitHub Desktop.
