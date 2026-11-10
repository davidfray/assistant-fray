# Rubrique « Pose solaire » des pages Services de frayservices.com

Statut : **publié le 10/11/2026 (23 h 27) sur les 4 pages Services, accord de David** ; vérifié sur la page publique FR (Firecrawl) et par le connecteur pour ES. Version précédente : révisions WordPress des pages 165, 508, 432, 573. Rédigé le 10/11/2026 d'après `fray/offres/offre-pose-solaire-2026-11-10.md`.
Emplacement : pages Services FR (165), ES (508), CA (432), EN (573), après « Domotique », même format que les autres rubriques (`<h3>` + `<p>`).
L'ancre `id="pose-solaire"` sert de cible au futur bouton « Demander la pose » des fiches Sol & Volt (Q14).

À ne pas ajouter avant la réponse de l'assureur : « main-d'œuvre garantie 2 ans ».
Volontairement absent : la déduction IRPF. Elle ne concerne que les résidents fiscaux en Espagne ; les propriétaires français non résidents relèvent de l'IRNR. Ne l'utiliser que pour un client résident.

## Français (page 165)

```html
<h3 id="pose-solaire">Pose solaire</h3><p>Pose de kits solaires de balcon, de panneaux rigides et de batteries de stockage achetés sur solandvolt.com. Un électricien partenaire habilité tire une ligne dédiée depuis le tableau et signe le certificat d’installation électrique (CIE) : votre installation est déclarée et le surplus peut être valorisé. Kit de balcon : forfait de 383,90 € TTC (IVA 10 %, logement de plus de 2 ans), déplacement inclus à 40 km autour de Palamós, devis sur 4 photos. Panneaux rigides et batteries : devis après visite technique. Pose sous 15 jours ouvrés après réception du matériel, possible en votre absence, avec rapport photo le jour même.</p>
```

## Espagnol (page 508)

```html
<h3 id="pose-solaire">Instalación solar</h3><p>Instalación de kits solares de balcón, paneles rígidos y baterías de almacenamiento comprados en solandvolt.com. Un electricista colaborador autorizado realiza una línea dedicada desde el cuadro y firma el certificado de instalación eléctrica (CIE): su instalación queda registrada y el excedente puede compensarse. Kit de balcón: precio cerrado de 383,90 € IVA incluido (IVA 10 %, vivienda de más de 2 años), desplazamiento incluido a 40 km de Palamós, presupuesto con 4 fotos. Paneles rígidos y baterías: presupuesto tras visita técnica. Instalación en 15 días hábiles tras la recepción del material, también en su ausencia, con informe fotográfico el mismo día.</p>
```

## Catalan (page 432)

```html
<h3 id="pose-solaire">Instal·lació solar</h3><p>Instal·lació de kits solars de balcó, panells rígids i bateries d’emmagatzematge comprats a solandvolt.com. Un electricista col·laborador autoritzat fa una línia dedicada des del quadre i signa el certificat d’instal·lació elèctrica (CIE): la vostra instal·lació queda registrada i l’excedent es pot compensar. Kit de balcó: preu tancat de 383,90 € IVA inclòs (IVA 10 %, habitatge de més de 2 anys), desplaçament inclòs a 40 km de Palamós, pressupost amb 4 fotos. Panells rígids i bateries: pressupost després de visita tècnica. Instal·lació en 15 dies feiners després de rebre el material, també en la vostra absència, amb informe fotogràfic el mateix dia.</p>
```

## Anglais (page 573)

```html
<h3 id="pose-solaire">Solar installation</h3><p>Installation of balcony solar kits, rigid panels and storage batteries bought on solandvolt.com. An authorised partner electrician runs a dedicated line from the fuse board and signs the electrical installation certificate (CIE): your system is registered and surplus energy can be credited. Balcony kit: fixed price of €383.90 including VAT (10 % VAT, home over 2 years old), travel included within 40 km of Palamós, quote from 4 photos. Rigid panels and batteries: quote after a technical visit. Installation within 15 working days of receiving the equipment, even while you are away, with a photo report the same day.</p>
```

## Avant publication

- [x] Accord de David sur les 4 textes, publiés le 10/11.
- [ ] Réponse de l'assureur (garantie de pose) : ajouter la phrase si confirmée.
- [ ] Formulaire de demande avec envoi de 4 photos (Q10, Q14), puis bouton « Demander la pose » sur les fiches Sol & Volt vers `/services/#pose-solaire`.
- [ ] Le Catalan « dies feiners » et l'espagnol « días hábiles » : à relire par David.

## Formulaire de demande de pose (10/11/2026)

Page **« Demande de pose solaire » publiée le 10/11 (23 h 30)**, https://frayservices.com/demande-pose-solaire/, lien « → Demander la pose » sous la rubrique FR : id 815, slug `/demande-pose-solaire/`, aperçu dans wp-admin (Pages). Formulaire Jetpack, envoi à david@frayservices.com, objet « Demande de pose solaire – frayservices.com », redirection vers /merci/ (comme Contact).

Champs : nom, email, téléphone (indicatif FR par défaut), commune, matériel à poser (Tornasol 800 W, 400 W, Flex 300 W, panneaux rigides, STREAM, autre), numéro de commande Sol & Volt, usage du logement (résidence secondaire non louée, principale, louée : sert au taux d'IVA), logement de plus de 2 ans, type de logement (maison, appartement panneaux invisibles ou visibles : sert à la copropriété), **photos (champ fichier Jetpack, obligatoire)**, présence le jour de la pose, précisions.

À faire avant publication :
- [x] David a vérifié le champ photos (10/11). **Mais la lecture de la page publique par Firecrawl (10/11, 23 h 31) ne trouve ni le libellé ni le champ fichier** : à revérifier dans une fenêtre privée, sans être connecté. Si le champ manque pour les visiteurs, ajouter l'envoi des photos par WhatsApp. Ancienne note : (le champ fichier de Jetpack peut dépendre de l'offre du site, et peut n'accepter qu'un fichier : si c'est le cas, prévoir 4 champs ou demander l'envoi par WhatsApp).
- [x] Publié. - [ ] Envoyer une demande test avec photos et vérifier la réception à david@frayservices.com.
- [ ] Versions ES, CA, EN du formulaire.
- [x] Lien FR fait (page 165). - [ ] Liens ES, CA, EN vers les futurs formulaires traduits, puis bouton « Demander la pose » sur les fiches Sol & Volt.

## Versions ES, CA, EN du formulaire (10/11/2026, brouillons)

| Langue | Page | Slug | Remerciement |
|---|---|---|---|
| ES | 818 « Solicitud de instalación solar » | `solicitud-instalacion-solar` | /es/gracias/ |
| CA | 819 « Sol·licitud d'instal·lació solar » | `sollicitud-installacio-solar` | /ca/gracies/ |
| EN | 820 « Solar installation request » | `solar-installation-request` | /en/thank-you/ |

Mêmes champs que la page FR 815, champ photos compris. **Restées en brouillon** : le connecteur ne peut pas régler la langue Polylang ; publiées telles quelles, elles seraient rattachées au français (adresse sans /es/, menu et bandeau français).
À faire par David dans wp-admin, pour chaque page : boîte « Langue » de Polylang = ES, CA ou EN, puis la relier comme traduction de la page 815. Ensuite Claude publie, vérifie les adresses /es/, /ca/, /en/ et ajoute le lien « → Solicitar la instalación / Sol·licitar la instal·lació / Request installation » sous la rubrique des pages 508, 432, 573.

**10/11, 23 h 33 : pages 818, 819, 820 publiées à la demande de David.** Contrôle Firecrawl : /es/solicitud-instalacion-solar/ redirige vers /solicitud-instalacion-solar/, avec `lang="fr-FR"` et `og:locale fr_FR` : **la langue Polylang est toujours le français** (le réglage de David ne s'est pas enregistré). Adresses actuelles sans préfixe : /solicitud-instalacion-solar/, /sollicitud-installacio-solar/, /solar-installation-request/. Aucun lien du site n'y mène. À corriger dans wp-admin (boîte « Langue » de chaque page, puis « Mettre à jour »), puis revérifier et ajouter les liens sous les rubriques ES, CA, EN.

**10/11, 23 h 35 : liens ajoutés à la demande de David** sous les rubriques ES (508, « → Solicitar la instalación »), CA (432, « → Sol·licitar la instal·lació »), EN (573, « → Request installation »), vers les adresses actuelles sans préfixe. Lien ES vérifié sur la page publique. **Langue Polylang des pages 818, 819, 820 toujours française** après 2 tentatives de David (adresse sans préfixe, `lang="fr-FR"`, date de modification inchangée). **Quand la langue sera corrigée, les adresses passeront en /es/, /ca/, /en/ : mettre à jour ces 3 liens.** Piste si la langue ne prend toujours pas : séance Cowork dans Chrome pour régler Polylang en direct.

## Bouton « Demander la pose » sur les fiches Sol & Volt (10/11/2026)

Bloc bilingue `[trp_language]` (classe `sv-pose`, titre « Pose par un électricien », bouton `wp-element-button`) ajouté dans la description, avant le bloc « Ce produit fait partie de » quand il existe, sinon à la fin :
- **Kits de balcon** ?p=114, 360, 362, 33 : forfait 383,90 € TTC, devis sur 4 photos ;
- **Batteries STREAM** ?p=494, 658, 671, 750 : devis après visite technique.
Liens : FR vers https://www.frayservices.com/demande-pose-solaire/ ; ES vers https://www.frayservices.com/solicitud-instalacion-solar/ (**à changer en /es/solicitud-instalacion-solar/ quand la langue Polylang sera réglée**). Vérifié en ligne FR et ES sur les 8 fiches, chaque langue n'affiche que son bloc. Sauvegardes : `audit/sauvegardes-2026-11-10/produit-<id>-avant-bouton-pose.json`.
Non ajouté : Zendure (batteries, livraison Espagne, hors périmètre Q1), panneaux EcoFlow (pliables ou portables, pas de panneaux rigides au catalogue).
