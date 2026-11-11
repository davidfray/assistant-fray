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

const OBJETS_DOLIBARR = /(propal|proposal|invoice|facture|devis|quote|order|commande)/

function montantLignes(a: Args): { ht: string; tva: string } {
  const lignes = Array.isArray(a.lines) ? a.lines : []
  let total = 0
  let vu = false
  const taux = new Set<string>()
  for (const l of lignes) {
    const o = objet(l)
    const pu = Number(o.subprice ?? o.price ?? o.pu_ht)
    const q = Number(o.qty ?? o.quantity ?? 1)
    if (Number.isFinite(pu)) {
      total += pu * (Number.isFinite(q) ? q : 1)
      vu = true
    }
    const t = texte(o.tva_tx ?? o.vat_rate ?? o.tva)
    if (t) taux.add(t)
  }
  return {
    ht: vu ? total.toFixed(2) : '',
    tva: [...taux].map(t => `${t} %`).join(' / '),
  }
}

function dolibarr(nom: string, a: Args): Interception | null {
  const n = nom.toLowerCase()
  if (!n.includes('dolibarr')) return null
  const act = action(nom)
  if (LECTURE.test(act) && !/(valid|create|update|add|set|close|delete|modify|edit)/.test(act)) return null
  const sujet = OBJETS_DOLIBARR.test(act) || OBJETS_DOLIBARR.test(texte(a.module ?? a.object ?? a.type ?? ''))
    ? 'devis ou facture'
    : 'objet Dolibarr'
  const lignes = montantLignes(a)
  const tiers =
    premier(a, ['thirdparty_name', 'socname', 'soc_name', 'tiers', 'customer', 'client', 'thirdparty', 'socid']) ||
    '(tiers non indiqué)'
  const ht =
    premier(a, ['total_ht', 'amount_ht', 'montant_ht', 'totalHT', 'total_ht_amount']) ||
    lignes.ht ||
    '(non indiqué)'
  const tva =
    premier(a, ['tva_tx', 'vat_rate', 'tva', 'taux_iva', 'iva']) ||
    lignes.tva ||
    '(non indiqué)'
  const verbe = /valid/.test(act) ? 'validation' : /(delete|remove)/.test(act) ? 'suppression' : /(update|set|modify|edit)/.test(act) ? 'modification' : 'création'
  return {
    regle: 2,
    entete: 'Dolibarr',
    question:
      `Dolibarr, ${verbe} (${sujet}) — ${act}\n` +
      `Tiers : ${tiers}\n` +
      `Montant HT : ${ht}${/^[\d.,\s]+$/.test(ht) ? ' €' : ''} · IVA : ${tva}${/^\d+([.,]\d+)?$/.test(tva) ? ' %' : ''}\n` +
      `Confirmer la ${verbe} ?`,
  }
}

function dolibarrHttp(cmd: string): Interception | null {
  if (!/api\/index\.php\/(proposals|invoices|supplierinvoices|orders)/i.test(cmd)) return null
  if (!ecritureHttp(cmd)) return null
  return {
    regle: 2,
    entete: 'Dolibarr',
    question:
      `Dolibarr par l'API (devis ou facture), commande :\n${couper(cmd, 300)}\n` +
      `Tiers, montant HT et IVA : à lire dans la commande ci-dessus.\nConfirmer ?`,
  }
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
      `Texte : ${txt ? couper(txt, 1000) : '(aucun texte dans l\'appel)'}\n` +
      (media ? `Média : ${couper(media, 150)}\n` : '') +
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
  const contenu = premier(a, ['content', 'css', 'records', 'source', 'destination', 'status'])
  return {
    regle: 4,
    entete: 'Site',
    question:
      `Modification de production sur ${site || '(site non indiqué)'} — ${act}\n` +
      (cible ? `Élément : ${couper(cible, 120)}\n` : '') +
      (titre && titre !== cible ? `Titre : ${couper(titre, 120)}\n` : '') +
      (contenu ? `Change : ${couper(contenu, 300)}\n` : '') +
      `Confirmer la modification ?`,
  }
}

const ecritureHttp = (cmd: string): boolean =>
  /(-X\s*(POST|PUT|PATCH|DELETE)|--request\s+(POST|PUT|PATCH|DELETE)|\s(-d|--data[\w-]*|--json|-F|--form)\s|requests\.(post|put|patch|delete)|method\s*[:=]\s*['"](POST|PUT|PATCH|DELETE)|\bwp\s+(post|option|plugin|theme|rewrite|menu|user)\s+(update|create|delete|activate|deactivate|install|set|add))/i.test(
    ` ${cmd} `,
  )

function siteHttp(cmd: string): Interception | null {
  if (!DOMAINES.test(cmd) || !ecritureHttp(cmd)) return null
  const site = (cmd.match(DOMAINES)?.[1] ?? '').toLowerCase()
  const route = cmd.match(/https?:\/\/[^\s'"]+/)?.[0] ?? ''
  return {
    regle: 4,
    entete: 'Site',
    question:
      `Écriture sur ${site} par une commande (API REST, WooCommerce, Rank Math, redirections…)\n` +
      (route ? `Adresse : ${couper(route, 200)}\n` : '') +
      `Commande : ${couper(cmd, 300)}\n` +
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
  const verbe = /activate/.test(act) ? 'activation' : /delete/.test(act) ? 'suppression' : 'lancement'
  return {
    regle: 5,
    entete: estMake ? 'Make' : 'n8n',
    question:
      `${estMake ? 'Scénario Make' : 'Workflow n8n'} : ${verbe} — ${act}\n` +
      `Identifiant : ${id || '(non indiqué)'}\n` +
      `Confirmer la ${verbe} ?`,
  }
}

function automatisationHttp(cmd: string): Interception | null {
  const make = /hook\.[a-z0-9]+\.make\.com|hook\.make\.com|\.make\.com\/api\/v2\/scenarios\/\d+\/(run|start)/i.test(cmd)
  const n8n = /n8n/i.test(cmd) && /(\/webhook\/|\/workflows\/[^\s]*\/activate|\/executions)/i.test(cmd)
  if (!make && !n8n) return null
  return {
    regle: 5,
    entete: make ? 'Make' : 'n8n',
    question: `${make ? 'Make' : 'n8n'} lancé par une commande :\n${couper(cmd, 300)}\nConfirmer le lancement ?`,
  }
}

// ---------- commandes shell et exécutions distantes ----------

function commande(cmd: string): Interception | null {
  return siteHttp(cmd) ?? dolibarrHttp(cmd) ?? automatisationHttp(cmd)
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
  if (tool === 'Bash' || /composio_remote_(bash_tool|workbench)$/i.test(tool)) {
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
