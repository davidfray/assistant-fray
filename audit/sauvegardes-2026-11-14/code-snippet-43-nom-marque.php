<?php
// 14/11 : retire le suffixe « — Solandvolt » des noms affichés (fiches 83 et 85), en français et en espagnol.
// Espagnol : après TranslatePress, pour garder les traductions existantes.
add_filter( 'trp_translated_html', function ( $html ) {
	return str_replace( ' — Solandvolt', '', $html );
}, 99 );
// Français (langue d'origine, que TranslatePress ne traite pas) : sur la page envoyée au visiteur.
add_action( 'template_redirect', function () {
	global $TRP_LANGUAGE;
	if ( is_admin() || ( isset( $TRP_LANGUAGE ) && 'fr_FR' !== $TRP_LANGUAGE ) ) {
		return;
	}
	ob_start( function ( $html ) {
		return str_replace( ' — Solandvolt', '', $html );
	} );
}, 1 );
