<?php
// Version espagnole : le bouton de pose mène au formulaire espagnol de frayservices.com (page 827).
add_filter( 'trp_translated_html', function ( $html, $trp_language ) {
	if ( 'es_ES' !== $trp_language || false === strpos( $html, 'frayservices.com/' ) ) {
		return $html;
	}
	return str_replace(
		array( 'frayservices.com/demande-pose-solaire/', 'frayservices.com/solicitud-instalacion-solar/' ),
		'frayservices.com/es/solicitud-instalacion-solar/',
		$html
	);
}, 99, 2 );
