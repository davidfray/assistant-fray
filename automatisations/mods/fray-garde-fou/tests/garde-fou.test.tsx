import { describe, expect, test } from 'claude-code/testing'

import { classify, cleDe } from '../hooks/rules'

// ---------- règles, fonction pure ----------

describe('règle 1 : emails', () => {
  test('Gmail send_message : destinataire, objet, 200 caractères', () => {
    const corps = 'x'.repeat(250)
    const r = classify('mcp__Gmail__send_message', { to: 'client@exemple.fr', subject: 'Devis salle de bain', body: corps })
    expect(r?.regle).toBe(1)
    expect(r?.question).toContain('client@exemple.fr')
    expect(r?.question).toContain('Devis salle de bain')
    expect(r?.question).toContain(`${'x'.repeat(200)}…`)
    expect(r?.question.includes('x'.repeat(201))).toBe(false)
  })
  test('envoi d’un brouillon existant : consigne de lecture', () => {
    const r = classify('mcp__Gmail__send_message', { draftId: 'r123' })
    expect(r?.regle).toBe(1)
    expect(r?.question).toContain('brouillon n° r123')
    expect(r?.question).toContain('get_draft')
    expect(classify('GMAIL_SEND_DRAFT', { draft_id: 'r9' })?.question ?? '').toContain('brouillon n° r9')
  })
  test('reply et forward interceptés, brouillon non', () => {
    expect(classify('mcp__Gmail__reply', { thread_id: 't1', body: 'ok' })?.regle).toBe(1)
    expect(classify('mcp__Gmail__forward', { to: 'a@b.c' })?.regle).toBe(1)
    expect(classify('mcp__Gmail__create_draft', { to: 'a@b.c' })).toBe(null)
    expect(classify('mcp__Gmail__search_threads', { q: 'x' })).toBe(null)
  })
  test('Composio GMAIL_SEND_EMAIL dans un multi-exécution', () => {
    const r = classify('mcp__Composio__COMPOSIO_MULTI_EXECUTE_TOOL', {
      tools: [{ tool_slug: 'GMAIL_SEND_EMAIL', arguments: { recipient_email: 'x@y.es', subject: 'Pedido', body: 'Hola' } }],
    })
    expect(r?.regle).toBe(1)
    expect(r?.question).toContain('x@y.es')
  })
})

describe('règle 2 : Dolibarr', () => {
  test('création de devis : tiers, HT, IVA', () => {
    const r = classify('mcp__dolibarr__create_proposal', {
      socid: 'Durand',
      lines: [
        { subprice: 1000, qty: 2, tva_tx: 10 },
        { subprice: 500, qty: 1, tva_tx: 10 },
      ],
    })
    expect(r?.regle).toBe(2)
    expect(r?.question).toContain('Durand')
    expect(r?.question).toContain('2 500,00 €')
    expect(r?.question).toContain('10 %')
  })
  test('API : tiers, montant HT et IVA lus dans les données envoyées', () => {
    const r = classify('Bash', {
      command: `curl -s -X POST "https://erp.example/api/index.php/proposals" --data '{"socid":"Client Test","lines":[{"subprice":2000,"qty":1,"tva_tx":10},{"subprice":500,"qty":1,"tva_tx":"10.000"}]}'`,
    })
    expect(r?.question).toContain('création : devis')
    expect(r?.question).toContain('Tiers : Client Test')
    expect(r?.question).toContain('Montant HT : 2 500,00 €')
    expect(r?.question).toContain('IVA : 10 %')
  })
  test('tiers numérique : consigne d’afficher le nom', () => {
    const r = classify('Bash', { command: `curl -X POST https://erp.example/api/index.php/invoices -d '{"socid":42,"lines":[{"subprice":100,"qty":3,"tva_tx":21}]}'` })
    expect(r?.question).toContain('création : facture')
    expect(r?.question).toContain('n° 42 (numéro interne')
    expect(r?.question).toContain('300,00 €')
    expect(r?.question).toContain('21 %')
  })
  test('validation par l’API et données dans un fichier', () => {
    const v = classify('Bash', { command: 'curl -X POST https://erp.example/api/index.php/invoices/12/validate -d "{}"' })
    expect(v?.question).toContain('validation : facture')
    const f = classify('Bash', { command: 'curl -X POST https://erp.example/api/index.php/proposals -d @devis.json' })
    expect(f?.question).toContain('Données lues dans un fichier')
  })
  test('validation de facture interceptée, lecture non', () => {
    expect(classify('mcp__dolibarr__validate_invoice', { id: 12 })?.regle).toBe(2)
    expect(classify('mcp__dolibarr__list_invoices', {})).toBe(null)
  })
  test('API REST Dolibarr en POST par Bash', () => {
    expect(classify('Bash', { command: 'curl -X POST https://erp.local/api/index.php/invoices -d @f.json' })?.regle).toBe(2)
    expect(classify('Bash', { command: 'curl https://erp.local/api/index.php/invoices' })).toBe(null)
  })
})

describe('règle 3 : réseaux sociaux', () => {
  test('publication Instagram et Facebook par Composio', () => {
    const ig = classify('INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH', { creation_id: '42' })
    expect(ig?.regle).toBe(3)
    const fb = classify('mcp__Composio__COMPOSIO_MULTI_EXECUTE_TOOL', {
      tools: [{ tool_slug: 'FACEBOOK_CREATE_POST', arguments: { message: 'Fermer la villa pour l’hiver' } }],
    })
    expect(fb?.regle).toBe(3)
    expect(fb?.question).toContain('Fermer la villa')
  })
  test('page, compte et statut dans le résumé', () => {
    const fb = classify('mcp__Composio__COMPOSIO_MULTI_EXECUTE_TOOL', {
      tools: [{ tool_slug: 'FACEBOOK_CREATE_POST', arguments: { page_id: '659509903912871', message: 'x', published: false } }],
    })
    expect(fb?.question).toContain('page Fray Services (659509903912871)')
    expect(fb?.question).toContain('non publié (invisible du public)')
    const prog = classify('FACEBOOK_CREATE_POST', { page_id: '111', message: 'x', scheduled_publish_time: 1795000000 })
    expect(prog?.question).toContain('page ou compte n° 111 (non reconnu)')
    expect(prog?.question).toContain('programmé pour le 2026-')
    const ig = classify('mcp__Composio__COMPOSIO_MULTI_EXECUTE_TOOL', {
      tools: [{ tool_slug: 'INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH', account: 'instagram_izote-crepe', arguments: { ig_user_id: 'me', creation_id: '42' } }],
    })
    expect(ig?.question).toContain('@solandvolt (Sol & Volt)')
    expect(ig?.question).toContain('publié immédiatement')
    expect(ig?.question).toContain('Conteneur n° 42')
    expect(classify('INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH', { creation_id: '42' })?.question ?? '').toContain('@frayservicespalamos')
  })
  test('pages Facebook nommées, pages hors marques signalées', () => {
    expect(classify('FACEBOOK_CREATE_POST', { page_id: '1244233788769589', message: 'x' })?.question).toContain('page Sol & Volt (Solandvolt) (1244233788769589)')
    expect(classify('FACEBOOK_CREATE_POST', { page_id: '688555174347773', message: 'x' })?.question).toContain('ni Fray Services ni Sol & Volt')
    expect(classify('FACEBOOK_CREATE_POST', { page_id: '894312617095394', message: 'x' })?.question).toContain('Francophones de Palamós')
  })
  test('Instagram : conteneur libre, publication bloquée avec consigne', () => {
    expect(classify('INSTAGRAM_POST_IG_USER_MEDIA', { ig_user_id: 'me', image_url: 'https://x/y.jpg', caption: 'L' })).toBe(null)
    expect(classify('INSTAGRAM_CREATE_MEDIA_CONTAINER', { image_url: 'https://x/y.jpg' })).toBe(null)
    expect(classify('INSTAGRAM_CREATE_CAROUSEL_CONTAINER', { children: ['1', '2'] })).toBe(null)
    const pub = classify('INSTAGRAM_POST_IG_USER_MEDIA_PUBLISH', { ig_user_id: 'me', creation_id: '179' })
    expect(pub?.regle).toBe(3)
    expect(pub?.question).toContain('Conteneur n° 179')
    expect(pub?.question).toContain('légende complète')
  })
  test('Buffer intercepté, lectures non', () => {
    expect(classify('mcp__buffer__create_update', { text: 'Bonjour' })?.regle).toBe(3)
    expect(classify('FACEBOOK_GET_PAGE_POSTS', {})).toBe(null)
    expect(classify('INSTAGRAM_GET_IG_USER_MEDIA', {})).toBe(null)
  })
})

describe('règle 4 : sites en production', () => {
  test('page WordPress.com de solandvolt.com', () => {
    const r = classify('mcp__WordPress_com__wpcom-mcp-pages-update', { wpcom_site: '257165426', id: 7, title: 'Boutique' })
    expect(r?.regle).toBe(4)
    expect(r?.question).toContain('solandvolt.com')
  })
  test('extension, DNS, redirection Rank Math par curl', () => {
    expect(classify('mcp__WordPress_com__wpcom-plugin-activate', { wpcom_site: '253853971', plugin: 'x' })?.regle).toBe(4)
    expect(classify('mcp__WordPress_com__wpcom-domain-update-dns-records', { domain: 'frayservices.com' })?.regle).toBe(4)
    expect(
      classify('Bash', { command: 'curl -X POST https://www.solandvolt.com/wp-json/rankmath/v1/updateRedirection --json \'{}\'' })?.regle,
    ).toBe(4)
  })
  test('type, statut, champs et consigne avant / après', () => {
    const p = classify('mcp__WordPress_com__wpcom-mcp-pages-update', { wpcom_site: '253853971', id: 638, title: 'Aviso legal', status: 'publish' })
    expect(p?.question).toContain('frayservices.com')
    expect(p?.question).toContain('Type : page n° 638')
    expect(p?.question).toContain('Statut envoyé : publish (en ligne)')
    expect(p?.question).toContain('Champs modifiés : title, status')
    expect(p?.question).toContain("l'AVANT et l'APRÈS")
    const c = classify('Bash', { command: 'curl -X PUT https://www.solandvolt.com/wp-json/wc/v3/products/87 -d x=1' })
    expect(c?.question).toContain('produit WooCommerce')
    expect(c?.question).toContain("l'AVANT et l'APRÈS")
    expect(classify('Bash', { command: 'curl -X POST https://www.solandvolt.com/wp-json/code-snippets/v1/snippets/22 -d x=1' })?.question).toContain('snippet de code')
    expect(classify('mcp__WordPress_com__wpcom-global-styles-update', { wpcom_site: '257165426' })?.question).toContain('styles du site (CSS)')
  })
  test('CSS : chaque modification affichée, CSS complet signalé', () => {
    const e = classify('mcp__WordPress_com__wpcom-global-styles-update', {
      wpcom_site: '257165426',
      css_edits: [
        { search: '/* fin */', replace: '/* fin */\n/* test */' },
        { search: '.a { color: red; }', replace: '' },
        { search: '', replace: 'body { margin: 0; }' },
      ],
    })
    expect(e?.question).toContain('CSS, modification 1 : remplace « /* fin */ » par « /* fin */ /* test */ »')
    expect(e?.question).toContain('CSS, modification 2 : suppression de « .a { color: red; } »')
    expect(e?.question).toContain('CSS, modification 3 : ajout de « body { margin: 0; } »')
    const c = classify('mcp__WordPress_com__wpcom-global-styles-update', { wpcom_site: '257165426', styles: { css: 'x'.repeat(250), color: {} } })
    expect(c?.question).toContain('CSS complet remplacé (250 caractères, tout l\'ancien CSS est écrasé)')
    expect(c?.question).toContain('Styles modifiés : color')
  })
  test('produit : prix, promotion, stock et rappel PVP EcoFlow', () => {
    const URL = 'https://www.solandvolt.com/wp-json/wc/v3/products'
    const p = classify('Bash', { command: `curl -s -X PUT "${URL}/87" --data '{"regular_price":"229.00","sale_price":"199"}'` })
    expect(p?.question).toContain('Champs envoyés : prix normal 229,00 €, prix promotionnel 199,00 €')
    expect(p?.question).toContain('PVP conseillé')
    const s = classify('Bash', { command: `curl -s -X PUT "${URL}/493" --data '{"stock_quantity":0,"backorders":"no","sale_price":""}'` })
    expect(s?.question).toContain('promotion retirée, stock 0, commandes en rupture no')
    const st = classify('Bash', { command: `curl -s -X PUT "${URL}/87" --data '{"status":"publish"}'` })
    expect(st?.question).toContain('statut publish (en ligne)')
    expect(st?.question.includes('PVP')).toBe(false)
    const b = classify('Bash', { command: `curl -s -X POST "${URL}/batch" --data '{"update":[{"id":623,"regular_price":"399"},{"id":344,"stock_quantity":3}],"delete":[90]}'` })
    expect(b?.question).toContain('Produit 623 (modification) : prix normal 399,00 €')
    expect(b?.question).toContain('Produit 344 (modification) : stock 3')
    expect(b?.question).toContain('Produits supprimés : 90')
    expect(b?.question).toContain('PVP conseillé')
  })
  test('snippet : avertissement si code, activation ou suppression', () => {
    const URL = 'https://www.solandvolt.com/wp-json/code-snippets/v1/snippets/24'
    const desc = classify('Bash', { command: `curl -X POST ${URL} --data '{"desc":"x"}'` })
    expect(desc?.question.includes('ATTENTION')).toBe(false)
    const code = classify('Bash', { command: `curl -X POST ${URL} --data '{"code":"add_filter();"}'` })
    expect(code?.question.startsWith('⚠ ATTENTION : code PHP modifié.')).toBe(true)
    expect(code?.question).toContain('code complet avant et après')
    expect(classify('Bash', { command: `curl -X POST ${URL} --data '{"active":false}'` })?.question).toContain('snippet activé ou désactivé')
    expect(classify('Bash', { command: `curl -X POST ${URL}/deactivate -d "{}"` })?.question).toContain('snippet activé ou désactivé')
    expect(classify('Bash', { command: `curl -X DELETE ${URL}` })?.question).toContain('snippet supprimé')
    expect(classify('Bash', { command: `python3 -c "import requests; requests.post('${URL}', json={'code': 'x'})"` })?.question).toContain('code PHP modifié')
  })
  test('Rank Math : redirection et SEO distingués', () => {
    const r = classify('Bash', {
      command: `curl -s -X POST "https://www.solandvolt.com/wp-json/rankmath/v1/updateRedirection" --data '{"objectID":87,"hasRedirect":true}'`,
    })
    expect(r?.question).toContain('— redirection (Rank Math)')
    const m = classify('Bash', { command: `curl -s -X POST "https://www.solandvolt.com/wp-json/rankmath/v1/updateMeta" --data '{"objectID":7}'` })
    expect(m?.question).toContain('— SEO Rank Math (titre ou description)')
  })
  test('lectures et autres sites : rien', () => {
    expect(classify('mcp__WordPress_com__wpcom-mcp-pages-get', { wpcom_site: '257165426', id: 7 })).toBe(null)
    expect(classify('Bash', { command: 'curl -s https://www.solandvolt.com/wp-json/wc/v3/products' })).toBe(null)
    expect(classify('mcp__WordPress_com__wpcom-mcp-pages-update', { wpcom_site: 'autre-site.fr', id: 1 })).toBe(null)
  })
})

describe('règle 5 : Make et n8n', () => {
  test('activation, suppression, lancement', () => {
    expect(classify('mcp__Make__scenarios_activate', { scenarioId: 8239857 })?.regle).toBe(5)
    expect(classify('mcp__Make__scenarios_delete', { scenarioId: 1 })?.regle).toBe(5)
    expect(classify('mcp__Make__scenarios_run', { scenarioId: 1 })?.regle).toBe(5)
    expect(classify('mcp__n8n__execute_workflow', { workflowId: 'a' })?.regle).toBe(5)
    expect(classify('Bash', { command: 'curl -X POST https://hook.eu2.make.com/abc -d x=1' })?.regle).toBe(5)
  })
  test('désactivation : rien (décision du 11/11)', () => {
    expect(classify('mcp__Make__scenarios_deactivate', { scenarioId: 8239857 })).toBe(null)
    expect(classify('mcp__n8n__deactivate_workflow', { workflowId: 'a' })).toBe(null)
    expect(classify('Bash', { command: 'curl -X POST https://eu2.make.com/api/v2/scenarios/1/stop' })).toBe(null)
    expect(classify('Bash', { command: 'curl -X POST https://x.app.n8n.cloud/api/v1/workflows/a/deactivate' })).toBe(null)
    expect(classify('Bash', { command: 'curl -X POST https://x.app.n8n.cloud/api/v1/workflows/a/activate' })?.regle).toBe(5)
  })
  test('résumé : français correct et consigne de lecture du scénario', () => {
    const run = classify('mcp__Make__scenarios_run', { scenarioId: 8239857, data: { a: 1 } })
    expect(run?.question).toContain('Scénario Make : lancement')
    expect(run?.question).toContain('Confirmer le lancement ?')
    expect(run?.question).toContain('scenarios_get')
    expect(run?.question).toContain('son état (actif ou inactif)')
    expect(run?.question).toContain('Données envoyées : {"a":1}')
    expect(classify('mcp__Make__scenarios_activate', { scenarioId: 1 })?.question).toContain("Confirmer l'activation ?")
    expect(classify('mcp__Make__scenarios_delete', { scenarioId: 1 })?.question).toContain('Confirmer la suppression ?')
    expect(classify('mcp__Make__scenarios_run', { scenarioId: 1 })?.question.includes('la lancement')).toBe(false)
    expect(classify('Bash', { command: 'curl -X POST https://hook.eu2.make.com/abc -d x=1' })?.question).toContain('quel scénario ce lien déclenche')
  })
  test('lecture de scénario : rien', () => {
    expect(classify('mcp__Make__scenarios_list', {})).toBe(null)
    expect(classify('mcp__Make__scenarios_get', { scenarioId: 1 })).toBe(null)
  })
})

describe('faux positifs : un texte cité ne bloque pas', () => {
  const SITE = 'curl -X POST https://www.solandvolt.com/wp-json/wp/v2/pages/7 -d x=1'
  const DOLI = `curl -X POST https://erp.example/api/index.php/proposals -d '{"socid":1}'`
  const MAKE = 'curl -X POST https://hook.eu2.make.com/abc -d x=1'
  test('echo, printf, grep, git commit', () => {
    expect(classify('Bash', { command: `echo ${MAKE}` })).toBe(null)
    expect(classify('Bash', { command: `printf '%s' "${SITE}"` })).toBe(null)
    expect(classify('Bash', { command: `grep -rn "api/index.php/proposals" . && grep -c "${MAKE}" notes.md` })).toBe(null)
    expect(classify('Bash', { command: `git commit -m "Test : ${SITE}"` })).toBe(null)
  })
  test('fichier écrit par heredoc (cat > fichier)', () => {
    expect(classify('Bash', { command: `cat > notes.md <<'EOF'\n${SITE}\n${DOLI}\nEOF\nwc -l notes.md` })).toBe(null)
  })
  test('chaîne de caractères dans un script Python (cas du 11/11)', () => {
    const script = `python3 - <<'EOF'\ns = open('t.ts').read()\ns = s.replace("a", """${DOLI}""")\nopen('t.ts','w').write(s)\nEOF`
    expect(classify('Bash', { command: script })).toBe(null)
  })
  test('lecture seule : GET sur le site', () => {
    expect(classify('Bash', { command: 'curl -s https://www.solandvolt.com/wp-json/wc/v3/products/87' })).toBe(null)
  })
  test('code Composio (workbench) qui ne fait que lire', () => {
    expect(classify('mcp__Composio__COMPOSIO_REMOTE_WORKBENCH', { code_to_execute: `r = requests.get("https://www.solandvolt.com/")\nprint("${SITE}")` })).toBe(null)
  })
})

describe('vraies écritures : toujours bloquées', () => {
  test('curl après cd, &&, variables, sudo, $( )', () => {
    expect(classify('Bash', { command: 'cd /tmp && curl -X PUT https://www.solandvolt.com/wp-json/wc/v3/products/87 -d x=1' })?.regle).toBe(4)
    expect(classify('Bash', { command: 'TOKEN=1 curl -X POST https://www.frayservices.com/wp-json/wp/v2/pages/10 --json "{}"' })?.regle).toBe(4)
    expect(classify('Bash', { command: 'sudo curl -X DELETE https://www.solandvolt.com/wp-json/wp/v2/posts/1' })?.regle).toBe(4)
    expect(classify('Bash', { command: 'R=$(curl -s -X POST https://hook.eu2.make.com/abc -d x=1)' })?.regle).toBe(5)
  })
  test('curl sur plusieurs lignes (antislash)', () => {
    expect(classify('Bash', { command: 'curl -s \\\n  -X POST \\\n  https://www.solandvolt.com/wp-json/rankmath/v1/updateMeta \\\n  --data "{}"' })?.regle).toBe(4)
  })
  test('heredoc lancé par bash, et bash -c', () => {
    expect(classify('Bash', { command: `bash <<'EOF'\ncurl -X POST https://hook.eu2.make.com/abc -d x=1\nEOF` })?.regle).toBe(5)
    expect(classify('Bash', { command: `bash -c 'curl -X POST https://www.solandvolt.com/wp-json/wp/v2/pages/7 -d x=1'` })?.regle).toBe(4)
  })
  test('Python qui écrit vraiment (requests.post, subprocess curl)', () => {
    expect(classify('Bash', { command: `python3 - <<'EOF'\nimport requests\nrequests.post("https://www.solandvolt.com/wp-json/wc/v3/products/87", json={})\nEOF` })?.regle).toBe(4)
    expect(classify('Bash', { command: `python3 -c "import subprocess; subprocess.run(['curl','-X','POST','https://erp.example/api/index.php/invoices'])"` })?.regle).toBe(2)
    expect(classify('mcp__Composio__COMPOSIO_REMOTE_WORKBENCH', { code_to_execute: 'requests.put("https://www.frayservices.com/wp-json/wp/v2/pages/10", json={})' })?.regle).toBe(4)
  })
  test('WP-CLI', () => {
    expect(classify('Bash', { command: 'cd site && wp option update blogname "X" --url=https://www.solandvolt.com' })?.regle).toBe(4)
  })
})

test('outils ordinaires : rien', () => {
  expect(classify('Read', { file_path: '/x' })).toBe(null)
  expect(classify('Bash', { command: 'git status' })).toBe(null)
})

// ---------- comportement dans le moteur ----------

const BANDE = {
  plugin: 'fray-garde-fou',
  component: 'AbovePrompt',
  props: {
    hasSurvey: false,
    isCollapsed: false,
    isWorking: false,
    maxRows: 3,
    bodyColumns: 80,
    scroll: { offset: 0, bodyRows: 3 },
    view: {},
  },
} as const

const EMAIL = { tool: 'mcp__Gmail__send_message', to: 'client@exemple.fr', subject: 'Test', body: 'Bonjour' } as const

type Origine = 'sdk' | 'composer' | 'bridge' | 'plugin' | 'peer' | 'task-notification'
const message = (text: string, kind: Origine = 'sdk', isMeta = false) =>
  ({ text, origin: { kind }, wait: false, ...(isMeta ? { isMeta: true } : {}) }) as never

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OnTest = (event: any, hook: (...a: any[]) => unknown) => unknown
// Appel d'outil typé simplement (les types complets des outils MCP sont trop profonds pour tsc).
const appeler = (moteurTest: unknown, input: unknown) =>
  (moteurTest as { tool: { call: (i: unknown) => Promise<{ deny?: string }> } }).tool.call(input)

const moteur = (on: OnTest) => {
  const executes: string[] = []
  on('tool.call', (_: unknown, e: { tool: string }) => {
    executes.push(String(e.tool))
    return { result: {} }
  })
  on('prompt.submit', (_: unknown, e: { text: string }) => ({ text: e.text }))
  return executes
}

test('bloqué, puis « confirme » de David : passe une seule fois', async ($, on) => {
  const executes = moteur(on as unknown as OnTest)

  const r1 = await appeler($, EMAIL)
  expect(r1.deny ?? '').toContain('BLOQUÉE')
  expect(r1.deny ?? '').toContain('client@exemple.fr')
  expect(executes.length).toBe(0)

  await $.prompt.submit(message('confirme'))
  const r2 = await appeler($, EMAIL)
  expect(r2.deny).toBe(undefined)
  expect(executes.length).toBe(1)

  const r3 = await appeler($, EMAIL)
  expect(r3.deny ?? '').toContain('BLOQUÉE')
  expect(executes.length).toBe(1)

  const ui = await $.ui.mount({ ...BANDE, surface: 'terminal' })
  const ligne = await ui.find({ type: 'Text', text: /bloquées/ })
  expect(ligne?.text ?? '').toContain('2 actions bloquées')
  expect(ligne?.text ?? '').toContain('en attente : Email')
  await ui.unmount()
})

test('la confirmation ne vaut que pour l’action identique', async ($, on) => {
  const executes = moteur(on as unknown as OnTest)
  await appeler($, EMAIL)
  await $.prompt.submit(message('Je confirme'))
  const autre = await appeler($, { ...EMAIL, to: 'autre@exemple.fr' })
  expect(autre.deny ?? '').toContain('BLOQUÉE')
  expect(executes.length).toBe(0)
})

test('une autre réponse de David abandonne l’action', async ($, on) => {
  const executes = moteur(on as unknown as OnTest)
  await appeler($, EMAIL)
  await $.prompt.submit(message('non, attends'))
  await $.prompt.submit(message('confirme'))
  const r = await appeler($, EMAIL)
  expect(r.deny ?? '').toContain('BLOQUÉE')
  expect(executes.length).toBe(0)
})

test('« confirme » qui ne vient pas de David : sans effet', async ($, on) => {
  const executes = moteur(on as unknown as OnTest)
  for (const kind of ['plugin', 'peer', 'task-notification'] as const) {
    await appeler($, EMAIL)
    await $.prompt.submit(message('confirme', kind))
    expect((await appeler($, EMAIL)).deny ?? '').toContain('BLOQUÉE')
  }
  await appeler($, EMAIL)
  await $.prompt.submit(message('confirme', 'sdk', true))
  expect((await appeler($, EMAIL)).deny ?? '').toContain('BLOQUÉE')
  expect(executes.length).toBe(0)
})

test('confirmation depuis le téléphone (bridge) et le clavier (composer)', async ($, on) => {
  const executes = moteur(on as unknown as OnTest)
  for (const kind of ['bridge', 'composer'] as const) {
    await appeler($, EMAIL)
    await $.prompt.submit(message('confirme', kind))
    expect((await appeler($, EMAIL)).deny).toBe(undefined)
  }
  expect(executes.length).toBe(2)
})

test('outil ordinaire : jamais bloqué', async ($, on) => {
  const executes = moteur(on as unknown as OnTest)
  await appeler($, { tool: 'Bash', command: 'ls' })
  expect(executes).toEqual(['Bash'])

  const ui = await $.ui.mount({ ...BANDE, surface: 'desktop' })
  expect((await ui.find({ type: 'Text', text: /garde-fou actif/ }))?.text).toBe('garde-fou actif')
  expect((await ui.find({ type: 'Text', text: /bloquée/ }))?.text ?? '').toContain('0 action bloquée')
  await ui.unmount()
})

test('empreinte : la description Bash et l’identifiant d’appel sont ignorés', () => {
  const a = cleDe('Bash', { command: 'x', description: 'a', tool_use_id: '1' })
  const b = cleDe('Bash', { command: 'x', description: 'b', tool_use_id: '2' })
  expect(a).toBe(b)
  expect(cleDe('Bash', { command: 'y' }) === a).toBe(false)
})
