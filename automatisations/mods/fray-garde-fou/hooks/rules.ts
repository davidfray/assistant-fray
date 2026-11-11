// Règles du garde-fou : fonctions pures, sans réseau, sans fichier, sans processus.
// classify(nom de l'outil, arguments) -> null (laisser passer) ou l'action à confirmer.

export type Regle = 1 | 2 | 3 | 4 | 5

export type Interception = {
  regle: Regle
  /** Puce courte du dialogue (12 caractères au plus). */
  entete: string
  /** Question affichée à David, terminée par un point d'interrogation. */
  question: string
}

type Args = Record<string, unknown>

const SITES: Record<string, string> = {
  '257165426': 'solandvolt.com',
  '253853971': 'frayservices.com',
}
const DOMAINES = /(solandvolt\.com|frayservices\.com)/i

// ---------- petits outils ----------

const texte = (v: unknown): string => {
  if (v === undefined || v === null) return ''
  if (typeof v === 'string') return v
  if (typeof v === 'number' || typeof v === 'boolean') return String(v)
  if (Array.isArray(v)) return v.map(texte).filter(Boolean).join(', ')
  try {
    return JSON.stringify(v)
  } catch {
    return ''
  }
}

const premier = (a: Args, cles: readonly string[]): string => {
  for (const c of cles) {
    const v = texte(a[c]).trim()
    if (v) return v
  }
  return ''
}

const couper = (s: string, n: number): string => {
  const plat = s.replace(/\s+/g, ' ').trim()
  return plat.length > n ? `${plat.slice(0, n)}…` : plat
}

const objet = (v: unknown): Args =>
  v && typeof v === 'object' && !Array.isArray(v) ? (v as Args) : {}

/** Dernier segment d'un nom MCP (`mcp__Gmail__send_message` -> `send_message`). */
const action = (nom: string): string => {
  const i = nom.lastIndexOf('__')
  return (i >= 0 ? nom.slice(i + 2) : nom).toLowerCase()
}

const LECTURE = /(^|[_-])(get|list|lists|fetch|read|search|find|lookup|count|show|download|insights?|stats|docs|check|preview|screenshot|status|describe|schema|guide)([_-]|$)/

// ---------- règle 1 : emails ----------

function email(nom: string, a: Args): Interception | null {
  const n = nom.toLowerCase()
  if (!n.includes('gmail')) return null
  const act = action(nom)
  if (!/(send|reply|forward)/.test(act)) return null
  // Envoi d'un brouillon existant : l'appel ne contient que son identifiant.
  const brouillon = premier(a, ['draftId', 'draft_id'])
  if (brouillon) {
    return {
      regle: 1,
      entete: 'Email',
      question:
        `Email (envoi du brouillon n° ${brouillon}) — destinataire, objet et texte ne sont pas dans l'appel.\n` +
        `Avant de demander « confirme », lis ce brouillon dans Gmail (get_draft) et affiche à David : ` +
        `le destinataire, l'objet et les 200 premiers caractères du texte.\n` +
        `Confirmer l'envoi ?`,
    }
  }
  const dest =
    premier(a, ['to', 'recipient_email', 'recipients', 'to_recipients', 'recipient', 'email']) ||
    '(destinataire non indiqué)'
  const cc = premier(a, ['cc', 'extra_recipients'])
  const sujet =
    premier(a, ['subject', 'objet']) ||
    (premier(a, ['thread_id', 'threadId', 'message_id', 'messageId'])
      ? `(réponse ou transfert, fil ${premier(a, ['thread_id', 'threadId', 'message_id', 'messageId'])})`
      : '(sans objet)')
  const corps = premier(a, ['body', 'message_body', 'text', 'html_body', 'htmlBody', 'content', 'message'])
  const verbe = /forward/.test(act) ? 'transfert' : /reply/.test(act) ? 'réponse' : 'envoi'
  return {
    regle: 1,
    entete: 'Email',
    question:
      `Email (${verbe}) — À : ${dest}${cc ? ` · Cc : ${cc}` : ''}\n` +
      `Objet : ${sujet}\n` +
      `Début : ${corps ? couper(corps, 200) : '(corps vide)'}\n` +
      `Confirmer l'${verbe === 'envoi' ? 'envoi' : verbe === 'réponse' ? 'envoi de la réponse' : 'envoi du transfert'} ?`,
  }
}

// ---------- règle 2 : Dolibarr ----------

/** 2500 -> « 2 500,00 € » ; une valeur non numérique est rendue telle quelle. */
function euros(v: string): string {
  const n = Number(v.replace(/\s/g, '').replace(',', '.'))
  if (!Number.isFinite(n) || v.trim() === '') return v
  const [ent, dec] = Math.abs(n).toFixed(2).split('.')
  return `${n < 0 ? '-' : ''}${(ent ?? '0').replace(/\B(?=(\d{3})+(?!\d))/g, ' ')},${dec} €`
}

function montantLignes(a: Args): { ht: string; tva: string } {
  const lignes = Array.isArray(a.lines) ? a.lines : []
  let total = 0
  let vu = false
  const taux = new Set<string>()
  for (const l of lignes) {
    const o = objet(l)
    const pu = Number(o.subprice ?? o.price ?? o.pu_ht)
    const q = Number(o.qty ?? o.quantity ?? 1)
    const remise = Number(o.remise_percent ?? 0)
    if (Number.isFinite(pu)) {
      total += pu * (Number.isFinite(q) ? q : 1) * (Number.isFinite(remise) ? 1 - remise / 100 : 1)
      vu = true
    }
    const t = texte(o.tva_tx ?? o.vat_rate ?? o.tva)
    if (t) taux.add(t.replace(/\.0+$/, ''))
  }
  return {
    ht: vu ? total.toFixed(2) : '',
    tva: [...taux].map(t => `${t} %`).join(' / '),
  }
}

/** Résumé commun (connecteur ou API) : type, action, tiers, montant HT, IVA. */
function resumeDolibarr(verbe: string, sujet: string, origine: string, a: Args, note = ''): Interception {
  const lignes = montantLignes(a)
  const nomTiers = premier(a, ['thirdparty_name', 'socname', 'soc_name', 'tiers', 'customer', 'client', 'nom_client'])
  const idTiers = premier(a, ['socid', 'thirdparty', 'thirdparty_id', 'fk_soc'])
  const tiers = nomTiers
    ? nomTiers
    : /^\d+$/.test(idTiers)
      ? `n° ${idTiers} (numéro interne : avant de demander « confirme », lis ce tiers dans Dolibarr et affiche à David le nom du client)`
      : idTiers || '(tiers non indiqué : à afficher à David avant de demander « confirme »)'
  const htBrut = premier(a, ['total_ht', 'amount_ht', 'montant_ht', 'totalHT', 'total_ht_amount']) || lignes.ht
  const tvaBrute = premier(a, ['tva_tx', 'vat_rate', 'tva', 'taux_iva', 'iva'])
  const tva = tvaBrute ? `${tvaBrute.replace(/\.0+$/, '')} %` : lignes.tva
  return {
    regle: 2,
    entete: 'Dolibarr',
    question:
      `Dolibarr, ${verbe} : ${sujet} — ${origine}\n` +
      `Tiers : ${tiers}\n` +
      `Montant HT : ${htBrut ? euros(htBrut) : '(non indiqué dans l\'appel : à afficher à David)'}\n` +
      `IVA : ${tva || '(non indiquée dans l\'appel : à afficher à David)'}\n` +
      note +
      `Confirmer la ${verbe} ?`,
  }
}

const sujetDe = (s: string): string =>
  /supplier/i.test(s)
    ? 'facture fournisseur'
    : /(invoice|facture)/i.test(s)
      ? 'facture'
      : /(propal|proposal|devis|quote)/i.test(s)
        ? 'devis'
        : /(order|commande)/i.test(s)
          ? 'commande'
          : 'objet Dolibarr'

function dolibarr(nom: string, a: Args): Interception | null {
  const n = nom.toLowerCase()
  if (!n.includes('dolibarr')) return null
  const act = action(nom)
  if (LECTURE.test(act) && !/(valid|create|update|add|set|close|delete|modify|edit)/.test(act)) return null
  const verbe = /valid/.test(act) ? 'validation' : /(delete|remove)/.test(act) ? 'suppression' : /(update|set|modify|edit)/.test(act) ? 'modification' : 'création'
  return resumeDolibarr(verbe, sujetDe(`${act} ${texte(a.module ?? a.object ?? a.type ?? '')}`), act, a)
}

/** Données JSON envoyées par curl (`--data`, `-d`, `--json`, `--data-raw`), si elles sont dans la commande. */
function donneesCurl(cmd: string): { a: Args; fichier: boolean } {
  const m = cmd.match(/(?:--data(?:-raw|-binary)?|--json|-d)\s+(?:'([^']*)'|"((?:[^"\\]|\\.)*)"|(\S+))/)
  const brut = m ? (m[1] ?? (m[2] !== undefined ? m[2].replace(/\\"/g, '"') : m[3]) ?? '') : ''
  if (brut.startsWith('@')) return { a: {}, fichier: true }
  try {
    return { a: objet(JSON.parse(brut)), fichier: false }
  } catch {
    return { a: {}, fichier: false }
  }
}

function dolibarrHttp(cmd: string, force = false): Interception | null {
  const route = cmd.match(/api\/index\.php\/(proposals|invoices|supplierinvoices|orders)(\/\d+)?(\/[a-z_]+)?/i)
  if (!route || (!force && !ecritureHttp(cmd))) return null
  const methode = (cmd.match(/(?:-X|--request)\s*(POST|PUT|PATCH|DELETE)/i)?.[1] ?? 'POST').toUpperCase()
  const suite = (route[3] ?? '').toLowerCase()
  const verbe = /valid/.test(suite)
    ? 'validation'
    : methode === 'DELETE'
      ? 'suppression'
      : methode === 'PUT' || methode === 'PATCH' || route[2] || suite
        ? 'modification'
        : 'création'
  const { a, fichier } = donneesCurl(cmd)
  const note = fichier ? 'Données lues dans un fichier : affiche à David son contenu (tiers, lignes, montant, IVA) avant de demander « confirme ».\n' : ''
  return resumeDolibarr(verbe, sujetDe(route[1] ?? ''), `API ${methode} ${route[0]}`, a, note)
}

// ---------- règle 3 : réseaux sociaux ----------

/** Pages et comptes connus (identifiants publics, aucun secret). */
const PAGES_FACEBOOK: Record<string, string> = { '659509903912871': 'Fray Services' }
const COMPTES_COMPOSIO: Record<string, string> = {
  'instagram_creagh-averah': '@frayservicespalamos (Fray Services)',
  'instagram_izote-crepe': '@solandvolt (Sol & Volt)',
}

function compteSocial(plateforme: string, a: Args): string {
  const compte = premier(a, ['_compte'])
  if (compte) return COMPTES_COMPOSIO[compte] ?? `compte Composio « ${compte} » (non reconnu)`
  const page = premier(a, ['page_id', 'pageId', 'ig_user_id', 'igUserId', 'profile_ids', 'profile_id', 'account_id'])
  if (page && page !== 'me') return PAGES_FACEBOOK[page] ? `page ${PAGES_FACEBOOK[page]} (${page})` : `page ou compte n° ${page} (non reconnu)`
  if (plateforme === 'Instagram') return 'compte Instagram par défaut de Composio : @frayservicespalamos (Fray Services)'
  return '(page ou compte non indiqué)'
}

function statutSocial(act: string, a: Args): string {
  const quand = a.scheduled_publish_time ?? a.scheduled_at ?? a.scheduledAt ?? a.publish_at
  if (quand !== undefined && quand !== null && quand !== '') {
    const n = Number(quand)
    const date = Number.isFinite(n) && n > 1e9 ? new Date((n < 1e12 ? n * 1000 : n)).toISOString().replace('T', ' ').slice(0, 16) + ' UTC' : texte(quand)
    return `programmé pour le ${date}`
  }
  if (a.published === false) return 'non publié (invisible du public)'
  if (/(comment|reply)/.test(act)) return 'commentaire public immédiat'
  return 'publié immédiatement (visible du public)'
}

function social(nom: string, a: Args): Interception | null {
  const n = nom.toLowerCase()
  const m = n.match(/(facebook|instagram|buffer|postiz)/)
  if (!m) return null
  const act = action(nom)
  if (!/(publish|post|schedule|share|send|reel|stor(y|ies)|comment|reply|create_update)/.test(act)) return null
  if (LECTURE.test(act)) return null
  const plateforme = { facebook: 'Facebook', instagram: 'Instagram', buffer: 'Buffer', postiz: 'Postiz' }[m[1] as 'facebook']
  // Instagram publie en 2 étapes : la création du conteneur (photo + légende) est invisible
  // et passe ; seule la publication (`…_publish`) est bloquée.
  if (plateforme === 'Instagram' && !/publish/.test(act) && /(media|container)/.test(act)) return null
  const txt = premier(a, ['caption', 'message', 'text', 'content', 'body', 'description'])
  const media = premier(a, ['image_url', 'video_url', 'media_url', 'url', 'creation_id', 'link'])
  const nomPlateforme = plateforme ?? 'Social'
  return {
    regle: 3,
    entete: nomPlateforme,
    question:
      `Publication ${nomPlateforme} — ${act}\n` +
      `Page ou compte : ${compteSocial(nomPlateforme, a)}\n` +
      `Statut : ${statutSocial(act, a)}\n` +
      (!txt && premier(a, ['creation_id'])
        ? `Conteneur n° ${premier(a, ['creation_id'])} : la légende et la photo ne sont pas dans l'appel.\n` +
          `Avant de demander « confirme », affiche à David la légende complète et l'adresse de la photo ou de la vidéo ` +
          `utilisées à la création de ce conteneur (étape 1 dans cette conversation, ou social/instagram/file-publication.json). ` +
          `Si tu ne les retrouves pas, dis-le et ne relance pas.\n`
        : `Texte : ${txt ? couper(txt, 1000) : '(aucun texte dans l\'appel)'}\n` +
          (media ? `Média : ${couper(media, 150)}\n` : '')) +
      `Confirmer la publication ?`,
  }
}

// ---------- règle 4 : sites en production ----------

const ECRITURE_WP = /(create|update|delete|install|uninstall|activate|deactivate|upload|switch|save|attach|detach|set|purchase|provision|insert|replace|remove|move|import|add|change|invite|resend|cancel|edit|trash)/

function siteDe(a: Args): string {
  const brut = premier(a, ['wpcom_site', 'site', 'site_id', 'siteId', 'blog_id', 'domain'])
  return SITES[brut] ?? brut
}

function wordpress(nom: string, a: Args): Interception | null {
  const n = nom.toLowerCase()
  if (!/(wordpress|wpcom)/.test(n)) return null
  const act = action(nom)
  if (!ECRITURE_WP.test(act)) return null
  const site = siteDe(a)
  // Un domaine clairement étranger aux deux sites de David : on laisse passer.
  // Site absent ou identifiant numérique inconnu : on demande (prudence).
  if (site && !DOMAINES.test(site) && !/^\d+$/.test(site)) return null
  const cible = premier(a, ['id', 'post_id', 'page_id', 'ID', 'slug', 'name', 'plugin', 'theme', 'domain'])
  const titre = premier(a, ['title', 'name'])
  const contenu = premier(a, ['content', 'css', 'records', 'source', 'destination'])
  const statut = premier(a, ['status'])
  const champs = Object.keys(a).filter(k => !/^(wpcom_site|site|site_id|siteId|blog_id|id|ID|post_id|page_id|include_fields|context|_compte|tool|tool_use_id|agentId|requestMeta|_host|description)$/.test(k))
  return {
    regle: 4,
    entete: 'Site',
    question:
      `Modification de production sur ${site || '(site non indiqué)'} — ${act}\n` +
      `Type : ${typeElementWp(act)}${cible ? ` n° ${couper(cible, 120)}` : ''}\n` +
      (titre && titre !== cible ? `Titre envoyé : ${couper(titre, 120)}\n` : '') +
      (statut ? `Statut envoyé : ${statut}${statut === 'publish' ? ' (en ligne)' : ''}\n` : '') +
      (contenu ? `Contenu envoyé : ${couper(contenu, 300)}\n` : '') +
      changementsCss(a) +
      (champs.length ? `Champs modifiés : ${champs.join(', ')}\n` : '') +
      CONSIGNE_AVANT_APRES +
      `Confirmer la modification ?`,
  }
}

/**
 * Snippet Code Snippets : avertissement en tête si le code PHP est envoyé, si le snippet est
 * activé ou désactivé, ou s'il est supprimé. Une erreur de PHP peut rendre le site inaccessible.
 */
function avertissementSnippet(cmd: string): string {
  if (!/code-snippets/i.test(cmd)) return ''
  const raisons: string[] = []
  if (/["']code["']\s*:/.test(cmd)) raisons.push('code PHP modifié')
  if (/["']active["']\s*:|\/(activate|deactivate)\b/i.test(cmd)) raisons.push('snippet activé ou désactivé')
  if (/-X\s*DELETE|--request\s+DELETE|requests\.delete|method\s*[:=]\s*['"]DELETE/i.test(cmd)) raisons.push('snippet supprimé')
  if (!raisons.length) return ''
  return (
    `⚠ ATTENTION : ${raisons.join(', ')}. Une erreur de PHP peut rendre solandvolt.com inaccessible. ` +
    `Avant de demander « confirme », montre à David le code complet avant et après, ` +
    `et prévois le retour arrière (ancien code ou désactivation du snippet).\n`
  )
}

/** Champs d'un produit WooCommerce envoyés : prix, promotion, stock, statut. */
function champsProduit(p: Args): string[] {
  const l: string[] = []
  const prix = texte(p.regular_price)
  const promo = p.sale_price === undefined ? undefined : texte(p.sale_price)
  if (prix) l.push(`prix normal ${euros(prix)}`)
  if (promo !== undefined) l.push(promo ? `prix promotionnel ${euros(promo)}` : 'promotion retirée')
  if (p.stock_quantity !== undefined) l.push(`stock ${texte(p.stock_quantity)}`)
  if (p.stock_status !== undefined) l.push(`état du stock ${texte(p.stock_status)}`)
  if (p.backorders !== undefined) l.push(`commandes en rupture ${texte(p.backorders)}`)
  if (p.status !== undefined) l.push(`statut ${texte(p.status)}${texte(p.status) === 'publish' ? ' (en ligne)' : ''}`)
  if (p.name !== undefined) l.push(`nom « ${couper(texte(p.name), 80)} »`)
  return l
}

/** Produit WooCommerce par l'API : champs envoyés lisibles, et rappel du PVP EcoFlow si un prix change. */
function resumeProduit(cmd: string): string {
  if (!/wc\/v3\/products/i.test(cmd)) return ''
  const { a } = donneesCurl(cmd)
  const lignes: string[] = []
  const lots: Array<[string, unknown]> = [['modification', a.update], ['création', a.create]]
  let prixEnJeu = false
  for (const [verbe, liste] of lots) {
    if (!Array.isArray(liste)) continue
    for (const item of liste.slice(0, 10)) {
      const o = objet(item)
      const champs = champsProduit(o)
      if (o.regular_price !== undefined || o.sale_price !== undefined) prixEnJeu = true
      lignes.push(`Produit ${texte(o.id) || '(nouveau)'} (${verbe}) : ${champs.join(', ') || 'autres champs'}`)
    }
    if (liste.length > 10) lignes.push(`… et ${liste.length - 10} autre(s) produit(s)`)
  }
  if (Array.isArray(a.delete) && a.delete.length) lignes.push(`Produits supprimés : ${a.delete.map(texte).join(', ')}`)
  if (!lignes.length) {
    const champs = champsProduit(a)
    if (champs.length) lignes.push(`Champs envoyés : ${champs.join(', ')}`)
    if (a.regular_price !== undefined || a.sale_price !== undefined) prixEnJeu = true
  }
  if (prixEnJeu) {
    lignes.push(
      `Rappel prix : pour une fiche EcoFlow (SKU SV-ECF…), le prix TTC ne doit jamais être sous le PVP conseillé ` +
        `(PVP HT du fichier Innov8 × 1,21), promotion comprise. Vérifie la référence et ce minimum avant de demander « confirme ».`,
    )
  }
  return lignes.map(l => `${l}\n`).join('')
}

/** CSS modifié : chaque « remplace … par … » (css_edits), ou le début du CSS complet envoyé. */
function changementsCss(a: Args): string {
  const lignes: string[] = []
  const edits = Array.isArray(a.css_edits) ? a.css_edits : []
  edits.slice(0, 5).forEach((e, i) => {
    const o = objet(e)
    const cherche = texte(o.search)
    const remplace = texte(o.replace)
    lignes.push(
      `CSS, modification ${i + 1} : ` +
        (cherche === '' ? `ajout de « ${couper(remplace, 200)} » (CSS vide jusqu'ici)` : remplace === ''
          ? `suppression de « ${couper(cherche, 200)} »`
          : `remplace « ${couper(cherche, 200)} » par « ${couper(remplace, 200)} »`),
    )
  })
  if (edits.length > 5) lignes.push(`… et ${edits.length - 5} autre(s) modification(s) CSS`)
  const styles = objet(a.styles)
  const cssComplet = typeof styles.css === 'string' ? styles.css : typeof a.css === 'string' ? a.css : ''
  if (cssComplet) {
    lignes.push(
      `CSS complet remplacé (${cssComplet.length} caractères, tout l'ancien CSS est écrasé) : « ${couper(cssComplet, 200)} »`,
    )
  }
  const autresStyles = Object.keys(styles).filter(k => k !== 'css')
  if (autresStyles.length) lignes.push(`Styles modifiés : ${autresStyles.join(', ')}`)
  const reglages = Object.keys(objet(a.settings))
  if (reglages.length) lignes.push(`Réglages de styles modifiés : ${reglages.join(', ')}`)
  return lignes.map(l => `${l}\n`).join('')
}

/** Consigne commune aux écritures sur les sites (connecteur ou commande). */
const CONSIGNE_AVANT_APRES =
  `Avant de demander « confirme », lis l'élément tel qu'il est maintenant et affiche à David, pour chaque champ modifié, ` +
  `l'AVANT et l'APRÈS (titre, texte, statut, prix, CSS, redirection…), en citant les passages changés. ` +
  `Dis aussi si le changement est visible tout de suite par les visiteurs (élément en ligne) ou non (brouillon). ` +
  `Si tu ne peux pas lire l'élément, dis-le.\n`

/** Type d'élément WordPress d'après le nom de l'outil ou l'adresse de l'API. */
function typeElementWp(s: string): string {
  const t = s.toLowerCase()
  const types: Array<[RegExp, string]> = [
    [/(wc\/v3\/products|product)/, 'produit WooCommerce'],
    [/(wc\/v3\/orders|order)/, 'commande WooCommerce'],
    [/(rankmath|rank-math)[\s\S]*redirect|redirect[\s\S]*(rankmath|rank-math)/, 'redirection (Rank Math)'],
    [/redirect/, 'redirection'],
    [/(rankmath|rank-math)/, 'SEO Rank Math (titre ou description)'],
    [/(code-snippets|snippet)/, 'snippet de code (Code Snippets)'],
    [/(global-styles|global_styles|custom_css|css)/, 'styles du site (CSS)'],
    [/(template-part|template_part)/, 'partie de modèle (en-tête, pied de page…)'],
    [/template/, 'modèle de page'],
    [/(navigation|menu)/, 'menu'],
    [/(dns|nameserver|domain)/, 'domaine ou DNS'],
    [/plugin/, 'extension'],
    [/theme/, 'thème'],
    [/(media|upload)/, 'média'],
    [/comment/, 'commentaire'],
    [/(settings|option)/, 'réglages du site'],
    [/(\/pages|pages-|page)/, 'page'],
    [/(\/posts|posts-|post)/, 'article'],
    [/(categor|tag|term)/, 'catégorie ou étiquette'],
    [/user/, 'utilisateur'],
  ]
  return types.find(([re]) => re.test(t))?.[1] ?? 'élément du site'
}

const ecritureHttp = (cmd: string): boolean =>
  /(-X\s*(POST|PUT|PATCH|DELETE)|--request\s+(POST|PUT|PATCH|DELETE)|\s(-d|--data[\w-]*|--json|-F|--form)\s|requests\.(post|put|patch|delete)|method\s*[:=]\s*['"](POST|PUT|PATCH|DELETE)|\bwp\s+(post|option|plugin|theme|rewrite|menu|user)\s+(update|create|delete|activate|deactivate|install|set|add))/i.test(
    ` ${cmd} `,
  )

function siteHttp(cmd: string, force = false): Interception | null {
  if (!DOMAINES.test(cmd) || (!force && !ecritureHttp(cmd))) return null
  const site = (cmd.match(DOMAINES)?.[1] ?? '').toLowerCase()
  const route = cmd.match(/https?:\/\/[^\s'"]+/)?.[0] ?? ''
  return {
    regle: 4,
    entete: 'Site',
    question:
      avertissementSnippet(cmd) +
      `Écriture sur ${site} par une commande — ${typeElementWp(route || cmd)}\n` +
      (route ? `Adresse : ${couper(route, 200)}\n` : '') +
      resumeProduit(cmd) +
      `Commande : ${couper(cmd, 300)}\n` +
      CONSIGNE_AVANT_APRES +
      `Confirmer la modification ?`,
  }
}

// ---------- règle 5 : Make et n8n ----------

function automatisation(nom: string, a: Args): Interception | null {
  const n = nom.toLowerCase()
  const act = action(nom)
  const estMake = n.startsWith('mcp__make__') || n.startsWith('make_')
  const estN8n = n.includes('n8n')
  // La désactivation n'est pas bloquée (décision de David, 11/11).
  if (/deactivate/.test(act)) return null
  if (estMake && !/(scenarios?_(activate|delete|run|replay|start)|run_scenario)/.test(act)) return null
  if (estN8n && !/(activate|delete|execute|run|trigger|start)/.test(act)) return null
  if (!estMake && !estN8n) return null
  const id = premier(a, ['scenarioId', 'scenario_id', 'id', 'workflowId', 'workflow_id', 'name'])
  const verbe = /activate/.test(act) ? 'l\'activation' : /delete/.test(act) ? 'la suppression' : 'le lancement'
  const nomScenario = premier(a, ['scenarioName', 'scenario_name', 'workflowName', 'workflow_name'])
  const donnees = a.data !== undefined ? texte(a.data) : ''
  const quoi = estMake ? 'Scénario Make' : 'Workflow n8n'
  return {
    regle: 5,
    entete: estMake ? 'Make' : 'n8n',
    question:
      `${quoi} : ${verbe.replace(/^(l'|la |le )/, '')} — ${act}\n` +
      `Identifiant : ${id || '(non indiqué)'}${nomScenario ? ` · ${nomScenario}` : ''}\n` +
      (donnees ? `Données envoyées : ${couper(donnees, 300)}\n` : '') +
      `Avant de demander « confirme », lis ce ${estMake ? 'scénario' : 'workflow'} ` +
      `(${estMake ? 'scenarios_get' : 'lecture du workflow'}) et affiche à David : son nom, son état (actif ou inactif) ` +
      `et ce qu'il fait en une phrase (applications touchées, emails envoyés, fiches modifiées).\n` +
      `Confirmer ${verbe} ?`,
  }
}

function automatisationHttp(cmd: string): Interception | null {
  const make = /hook\.[a-z0-9]+\.make\.com|hook\.make\.com|\.make\.com\/api\/v2\/scenarios\/\d+\/(run|start)/i.test(cmd)
  const n8n = /n8n/i.test(cmd) && /(\/webhook\/|\/workflows\/[^\s]*\/activate|\/executions)/i.test(cmd)
  if (!make && !n8n) return null
  return {
    regle: 5,
    entete: make ? 'Make' : 'n8n',
    question:
      `${make ? 'Make' : 'n8n'} lancé par une commande :\n${couper(cmd, 300)}\n` +
      `Avant de demander « confirme », indique à David quel ${make ? 'scénario' : 'workflow'} ce lien déclenche ` +
      `(nom, état, ce qu'il fait), ou dis-lui que tu ne le sais pas.\n` +
      `Confirmer le lancement ?`,
  }
}

// ---------- commandes shell et exécutions distantes ----------

// Seules les commandes qui s'exécutent vraiment sont examinées : un texte cité
// (echo, grep, message de commit, fichier écrit par heredoc, chaîne dans un script)
// ne bloque plus rien.

type Morceau = { type: 'shell' | 'code'; texte: string }

/** Préfixes qui ne changent pas la commande lancée (variables, sudo, time…). */
const PREFIXES = /^(?:(?:[A-Za-z_]\w*=\S*\s+)|(?:sudo|time|command|exec|nohup|env|xargs(?:\s+-\S+)*)\s+)*/
/** Outils qui envoient une requête HTTP ou modifient WordPress quand ils sont lancés. */
const OUTILS_HTTP = /^(curl|wget|http|https|xh|wp)\b/
const INTERPRETES = /^(python3?(\.\d+)?|node|deno|bun|php|ruby|perl)\b/
const SHELLS = /^(bash|sh|zsh|dash)\b/
/** Dans du code (Python, JavaScript…), un appel réseau en écriture ou un lancement de commande. */
const CODE_ECRITURE =
  /(\b(requests|httpx|session|client|s)\.(post|put|patch|delete|request)\s*\(|\bfetch\s*\([\s\S]*?method\s*:\s*['"](POST|PUT|PATCH|DELETE)|method\s*=\s*['"](POST|PUT|PATCH|DELETE)|\burlopen\s*\(|\b(subprocess|os\.system|os\.popen|execSync|spawnSync|spawn|exec)\b[\s\S]*\bcurl\b)/i

const SEPARATEURS = /\n|;|&&|\|\||\||\$\(|`/

const premierMot = (segment: string): string => segment.trim().replace(/^[({\s]+/, '').replace(PREFIXES, '')

export function morceaux(cmd: string, profondeur = 0): Morceau[] {
  const sortie: Morceau[] = []
  const lignes = cmd.replace(/\\\r?\n/g, ' ').split(/\r?\n/)
  const gardees: string[] = []

  for (let i = 0; i < lignes.length; i++) {
    const ligne = lignes[i] ?? ''
    const m = ligne.match(/<<-?\s*(['"]?)([A-Za-z_]\w*)\1/)
    if (!m) {
      gardees.push(ligne)
      continue
    }
    // Corps du heredoc : jusqu'à la ligne qui ne contient que le délimiteur.
    const corps: string[] = []
    let j = i + 1
    while (j < lignes.length && (lignes[j] ?? '').trim() !== m[2]) corps.push(lignes[j++] ?? '')
    const avant = ligne.slice(0, m.index)
    const lanceur = premierMot(avant.split(SEPARATEURS).pop() ?? '')
    if (INTERPRETES.test(lanceur)) sortie.push({ type: 'code', texte: corps.join('\n') })
    else if (SHELLS.test(lanceur) && profondeur < 3) sortie.push(...morceaux(corps.join('\n'), profondeur + 1))
    // Autre lanceur (cat > fichier, tee…) : le corps n'est que du texte écrit.
    gardees.push(ligne)
    i = j
  }

  // Code passé en argument (`python3 -c "…"`, `node -e '…'`, `bash -c '…'`) : extrait
  // avant le découpage, car il contient souvent des « ; ».
  let reste = gardees.join('\n')
  const ARG_CODE = /\b(python3?(?:\.\d+)?|node|deno|bun|php|ruby|perl|bash|sh|zsh|dash)\s+(?:-[A-Za-z]+\s+)*-(?:c|e)\s+(?:'([^']*)'|"((?:[^"\\]|\\.)*)")/g
  reste = reste.replace(ARG_CODE, (_tout, lanceur: string, simple?: string, double?: string) => {
    const code = simple ?? (double ?? '').replace(/\\"/g, '"')
    if (SHELLS.test(lanceur)) {
      if (profondeur < 3) sortie.push(...morceaux(code, profondeur + 1))
    } else sortie.push({ type: 'code', texte: code })
    return lanceur
  })

  for (const segment of reste.split(SEPARATEURS)) {
    const s = premierMot(segment)
    if (OUTILS_HTTP.test(s)) sortie.push({ type: 'shell', texte: s })
  }
  return sortie
}

function codeHttp(code: string): Interception | null {
  if (!CODE_ECRITURE.test(code)) return null
  return siteHttp(code, true) ?? dolibarrHttp(code, true) ?? automatisationHttp(code)
}

function commande(cmd: string, estCode = false): Interception | null {
  const liste: Morceau[] = estCode ? [{ type: 'code', texte: cmd }] : morceaux(cmd)
  for (const m of liste) {
    const r = m.type === 'code' ? codeHttp(m.texte) : (siteHttp(m.texte) ?? dolibarrHttp(m.texte) ?? automatisationHttp(m.texte))
    if (r) return r
  }
  return null
}

/** Point d'entrée : un appel d'outil -> l'action à confirmer, ou null. */
export function classify(tool: string, args: Args): Interception | null {
  // Composio : l'outil réel est dans la liste `tools` (slug + arguments).
  if (/composio_multi_execute_tool$/i.test(tool) && Array.isArray(args.tools)) {
    for (const t of args.tools) {
      const o = objet(t)
      const slug = texte(o.tool_slug ?? o.slug ?? o.name)
      const compte = texte(o.account)
      const r = classify(slug, { ...objet(o.arguments ?? o.args ?? o.input), ...(compte ? { _compte: compte } : {}) })
      if (r) return r
    }
    return null
  }
  if (/composio_proxy_execute$/i.test(tool)) {
    const methode = (premier(args, ['method']) || 'GET').toUpperCase()
    if (methode === 'GET') return null
    const cible = `${premier(args, ['toolkit', 'toolkit_slug', 'app'])} ${premier(args, ['endpoint', 'url'])}`
    if (!/(gmail|dolibarr|facebook|instagram|buffer|make\.com|n8n|wordpress|wpcom|solandvolt|frayservices)/i.test(cible)) return null
    return {
      regle: /gmail/i.test(cible) ? 1 : /dolibarr/i.test(cible) ? 2 : /(facebook|instagram|buffer)/i.test(cible) ? 3 : /(make\.com|n8n)/i.test(cible) ? 5 : 4,
      entete: 'Composio',
      question: `Requête ${methode} par Composio vers ${couper(cible, 200)}\nCorps : ${couper(texte(args.body), 300) || '(vide)'}\nConfirmer ?`,
    }
  }
  if (/composio_remote_workbench$/i.test(tool)) {
    return commande(premier(args, ['code_to_execute', 'code', 'script', 'command']), true)
  }
  if (tool === 'Bash' || /composio_remote_bash_tool$/i.test(tool)) {
    return commande(premier(args, ['command', 'code_to_execute', 'code', 'script']))
  }
  return email(tool, args) ?? dolibarr(tool, args) ?? social(tool, args) ?? automatisation(tool, args) ?? wordpress(tool, args)
}

// ---------- empreinte d'une action ----------

/** Champs qui changent d'un appel à l'autre sans changer l'action. */
const IGNORES = new Set(['tool', 'tool_use_id', 'agentId', 'requestMeta', '_host', 'description'])

const stable = (v: unknown): string => {
  if (Array.isArray(v)) return `[${v.map(stable).join(',')}]`
  if (v && typeof v === 'object') {
    const o = v as Record<string, unknown>
    return `{${Object.keys(o)
      .sort()
      .map(k => `${JSON.stringify(k)}:${stable(o[k])}`)
      .join(',')}}`
  }
  return JSON.stringify(v) ?? 'null'
}

/** Empreinte de l'action : l'outil et ses arguments exacts. */
export const cleDe = (tool: string, args: Record<string, unknown>): string =>
  `${tool}|${stable(Object.fromEntries(Object.entries(args).filter(([k]) => !IGNORES.has(k))))}`
