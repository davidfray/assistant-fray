<?php
// 14/11 : forme unique de la marque « Sol & Volt » (décision de David).
// 1) Noms Rank Math (og:site_name, données structurées Organization et WebSite).
add_filter( 'option_rank-math-options-titles', function ( $o ) {
	if ( is_array( $o ) ) {
		$o['knowledgegraph_name'] = 'Sol & Volt';
		$o['website_name']        = 'Sol & Volt';
	}
	return $o;
} );
// 2) Textes affichés : suffixe « — Solandvolt » des fiches 83 et 85 retiré, mot « Solandvolt » remplacé
//    (pied de page, descriptions courtes). Les adresses (solandvolt.com, fichiers) ne sont pas touchées.
function sv_marque_sol_et_volt( $html ) {
	$html = str_replace( array( ' — Solandvolt', '%20%E2%80%94%20Solandvolt' ), '', $html );
	return preg_replace( '/(?<=[\s>"(])Solandvolt(?=[\s.,:;<"·)])/u', 'Sol & Volt', $html );
}
// Espagnol : après TranslatePress, pour garder les traductions existantes.
add_filter( 'trp_translated_html', 'sv_marque_sol_et_volt', 99 );
// Français (langue d'origine, que TranslatePress ne traite pas).
add_action( 'template_redirect', function () {
	global $TRP_LANGUAGE;
	if ( is_admin() || ( isset( $TRP_LANGUAGE ) && 'fr_FR' !== $TRP_LANGUAGE ) ) {
		return;
	}
	ob_start( 'sv_marque_sol_et_volt' );
}, 1 );
