add_action( 'template_redirect', function () {
	if ( ! is_404() ) {
		return;
	}
	$map = array(
		'produit/centrale-electrique-portable-ac70p-solandvolt'          => 'categorie-produit/autonomie-energetique/la-base/',
		'produit/centrale-electrique-portable-pw2000-2000-w-solandvolt'  => 'categorie-produit/autonomie-energetique/la-base/',
		'produit/panneau-solaire-trust-zuny-20w-20-w-solandvolt'         => 'categorie-produit/autonomie-energetique/la-veilleuse/',
		'produit/panneau-solaire-ecoflow-400w-400-w-solandvolt'          => 'categorie-produit/autonomie-energetique/le-module/',
		'es_es/producto/centrale-electrique-portable-ac70p-solandvolt'         => 'categoria-producto/autonomie-energetique/la-base/',
		'es_es/producto/centrale-electrique-portable-pw2000-2000-w-solandvolt' => 'categoria-producto/autonomie-energetique/la-base/',
		'es_es/producto/panneau-solaire-trust-zuny-20w-20-w-solandvolt'        => 'categoria-producto/autonomie-energetique/la-veilleuse/',
		'es_es/producto/panneau-solaire-ecoflow-400w-400-w-solandvolt'         => 'categoria-producto/autonomie-energetique/le-module/',
	);
	$path = strtolower( trim( (string) wp_parse_url( $_SERVER['REQUEST_URI'], PHP_URL_PATH ), '/' ) );
	// 14/11 : pages de marque espagnoles /es_es/marca/x/ (404) vers /es_es/marque/x/ (200)
	if ( preg_match( '#^es_es/marca/([a-z0-9-]+)$#', $path, $m ) ) { wp_safe_redirect( home_url( '/marque/' . $m[1] . '/' ), 301 ); exit; }
	if ( isset( $map[ $path ] ) ) {
		wp_safe_redirect( home_url( '/' . $map[ $path ] ), 301 );
		exit;
	}
} );
