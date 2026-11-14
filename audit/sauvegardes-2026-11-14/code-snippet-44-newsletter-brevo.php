// 14/11 : newsletter de l'accueil inscrite directement dans Brevo (API v3), sans passer par les formulaires Brevo,
// qui répondaient « succès » sans créer de contact. Clé API saisie par David dans Réglages > Sol & Volt : Brevo
// (jamais dans le code ni dans le dépôt). Liste par défaut : 4 « SolandVolt - Newsletter ».

// 1) Page de réglage (administrateurs seulement).
add_action( 'admin_menu', function () {
	add_options_page( 'Sol & Volt : Brevo', 'Sol & Volt : Brevo', 'manage_options', 'sv-brevo', function () {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		if ( isset( $_POST['sv_brevo_nonce'] ) && wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['sv_brevo_nonce'] ) ), 'sv_brevo_save' ) ) {
			$k = isset( $_POST['sv_brevo_api_key'] ) ? trim( sanitize_text_field( wp_unslash( $_POST['sv_brevo_api_key'] ) ) ) : '';
			if ( '' !== $k ) {
				update_option( 'sv_brevo_api_key', $k, false );
			}
			$l = isset( $_POST['sv_brevo_list_id'] ) ? absint( $_POST['sv_brevo_list_id'] ) : 0;
			if ( $l ) {
				update_option( 'sv_brevo_list_id', $l, false );
			}
			echo '<div class="updated"><p>Réglages enregistrés.</p></div>';
		}
		$has  = get_option( 'sv_brevo_api_key' ) ? 'oui' : 'non';
		$list = (int) get_option( 'sv_brevo_list_id', 4 );
		echo '<div class="wrap"><h1>Sol & Volt : newsletter Brevo</h1>';
		echo '<p>Clé API enregistrée : <strong>' . esc_html( $has ) . '</strong></p><form method="post">';
		wp_nonce_field( 'sv_brevo_save', 'sv_brevo_nonce' );
		echo '<p><label>Clé API Brevo (commence par xkeysib-)<br><input type="password" name="sv_brevo_api_key" class="regular-text" autocomplete="off" placeholder="Laisser vide pour garder la clé actuelle"></label></p>';
		echo '<p><label>Numéro de la liste Brevo<br><input type="number" name="sv_brevo_list_id" value="' . esc_attr( $list ) . '"></label></p>';
		submit_button( 'Enregistrer' );
		echo '</form></div>';
	} );
} );

// 2) Adresse d'inscription : POST /wp-json/sv/v1/newsletter {email, email_address_check}.
add_action( 'rest_api_init', function () {
	register_rest_route( 'sv/v1', '/newsletter', array(
		'methods'             => 'POST',
		'permission_callback' => '__return_true',
		'callback'            => function ( $req ) {
			if ( '' !== (string) $req->get_param( 'email_address_check' ) ) {
				return new WP_REST_Response( array( 'success' => true ), 200 ); // piège à robots
			}
			$email = sanitize_email( (string) $req->get_param( 'email' ) );
			if ( ! is_email( $email ) ) {
				return new WP_REST_Response( array( 'success' => false, 'error' => 'invalid' ), 400 );
			}
			$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : '';
			$tk = 'sv_nl_' . md5( $ip );
			$n  = (int) get_transient( $tk );
			if ( $n >= 5 ) {
				return new WP_REST_Response( array( 'success' => false, 'error' => 'rate' ), 429 );
			}
			set_transient( $tk, $n + 1, HOUR_IN_SECONDS );
			$key = get_option( 'sv_brevo_api_key' );
			if ( ! $key ) {
				return new WP_REST_Response( array( 'success' => false, 'error' => 'config' ), 503 );
			}
			$r    = wp_remote_post( 'https://api.brevo.com/v3/contacts', array(
				'timeout' => 10,
				'headers' => array( 'api-key' => $key, 'Content-Type' => 'application/json', 'Accept' => 'application/json' ),
				'body'    => wp_json_encode( array(
					'email'         => $email,
					'listIds'       => array( (int) get_option( 'sv_brevo_list_id', 4 ) ),
					'updateEnabled' => true,
				) ),
			) );
			$code = is_wp_error( $r ) ? 0 : (int) wp_remote_retrieve_response_code( $r );
			if ( 201 === $code || 204 === $code ) {
				return new WP_REST_Response( array( 'success' => true ), 200 );
			}
			return new WP_REST_Response( array( 'success' => false, 'error' => 'brevo', 'code' => $code ), 502 );
		},
	) );
} );

// 3) Le formulaire de l'accueil (#sv-newsletter) envoie à cette adresse au lieu de Brevo.
add_action( 'wp_footer', function () {
	?>
<script>
document.addEventListener('submit', function (e) {
  var f = e.target, box = document.getElementById('sv-newsletter');
  if (!f || f.id !== 'sib-form' || !box || !box.contains(f)) { return; }
  e.preventDefault(); e.stopImmediatePropagation();
  var inp = f.querySelector('#EMAIL'), hp = f.querySelector('[name="email_address_check"]');
  var ok = document.getElementById('success-message'), ko = document.getElementById('error-message');
  var btn = f.querySelector('button[type="submit"]');
  var show = function (good) {
    [ok, ko].forEach(function (p) { if (p) { p.style.display = 'none'; p.classList.remove('sib-form-message-panel--active'); } });
    var p = good ? ok : ko;
    if (p) { p.style.display = 'block'; p.classList.add('sib-form-message-panel--active'); }
    if (good && inp) { inp.value = ''; }
    if (btn) { btn.disabled = false; }
  };
  var v = inp ? inp.value.trim() : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) { show(false); return; }
  if (btn) { btn.disabled = true; }
  fetch('/wp-json/sv/v1/newsletter', {
    method: 'POST', credentials: 'omit', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: v, email_address_check: hp ? hp.value : '' })
  }).then(function (r) { return r.json().then(function (j) { show(r.ok && j && j.success); }); })
    .catch(function () { show(false); });
}, true);
</script>
	<?php
}, 99 );
