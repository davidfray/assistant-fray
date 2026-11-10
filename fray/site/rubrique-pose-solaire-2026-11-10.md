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

Page **« Demande de pose solaire » en brouillon** : id 815, slug `/demande-pose-solaire/`, aperçu dans wp-admin (Pages). Formulaire Jetpack, envoi à david@frayservices.com, objet « Demande de pose solaire – frayservices.com », redirection vers /merci/ (comme Contact).

Champs : nom, email, téléphone (indicatif FR par défaut), commune, matériel à poser (Tornasol 800 W, 400 W, Flex 300 W, panneaux rigides, STREAM, autre), numéro de commande Sol & Volt, usage du logement (résidence secondaire non louée, principale, louée : sert au taux d'IVA), logement de plus de 2 ans, type de logement (maison, appartement panneaux invisibles ou visibles : sert à la copropriété), **photos (champ fichier Jetpack, obligatoire)**, présence le jour de la pose, précisions.

À faire avant publication :
- [ ] David ouvre l'aperçu, vérifie le champ photos (le champ fichier de Jetpack peut dépendre de l'offre du site, et peut n'accepter qu'un fichier : si c'est le cas, prévoir 4 champs ou demander l'envoi par WhatsApp).
- [ ] Publier, puis envoyer une demande test avec photos et vérifier la réception à david@frayservices.com.
- [ ] Versions ES, CA, EN du formulaire.
- [ ] Lien de la rubrique `#pose-solaire` (4 langues) vers ce formulaire, puis bouton « Demander la pose » sur les fiches Sol & Volt.
