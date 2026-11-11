import { describe, expect, test } from 'claude-code/testing'

import { classify } from '../hooks/rules'

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
    expect(r?.question).toContain('2500.00')
    expect(r?.question).toContain('10 %')
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
  test('lecture de scénario : rien', () => {
    expect(classify('mcp__Make__scenarios_list', {})).toBe(null)
    expect(classify('mcp__Make__scenarios_get', { scenarioId: 1 })).toBe(null)
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

// Le moteur pose la question par l'outil AskUserQuestion : ce faux moteur y répond.
const repondre = (e: { questions?: unknown }, reponse: string) => {
  const qs = (e.questions ?? []) as Array<{ question: string }>
  return { result: { questions: qs, answers: Object.fromEntries(qs.map(q => [q.question, reponse])) } }
}

const EMAIL = { tool: 'mcp__Gmail__send_message', to: 'client@exemple.fr', subject: 'Test', body: 'Bonjour' } as const

test('confirmé : l’email part ; refusé : bloqué ; la bande compte', async ($, on) => {
  let envoyes = 0
  let reponse = 'Confirmer'
  on('tool.call', (_, e) => {
    if (e.tool === 'AskUserQuestion') return repondre(e, reponse) as never
    envoyes += 1
    return { result: {} }
  })

  const ok = await $.tool.call(EMAIL)
  expect(ok.deny).toBe(undefined)
  expect(envoyes).toBe(1)

  reponse = 'Refuser'
  const non = await $.tool.call(EMAIL)
  expect(non.deny ?? '').toContain('non confirmée')
  expect(envoyes).toBe(1)

  const ui = await $.ui.mount({ ...BANDE, surface: 'terminal' })
  const ligne = await ui.find({ type: 'Text', text: /bloquées/ })
  expect(ligne?.text ?? '').toContain('2 actions bloquées')
  expect(ligne?.text ?? '').toContain('1 refusée')
  await ui.unmount()
})

test('dialogue fermé : l’action est bloquée', async ($, on) => {
  let envoyes = 0
  on('tool.call', (_, e) => {
    if (e.tool === 'AskUserQuestion') return { deny: 'dialogue fermé' }
    envoyes += 1
    return { result: {} }
  })
  const r = await $.tool.call(EMAIL)
  expect(r.deny ?? '').toContain('fray-garde-fou')
  expect(envoyes).toBe(0)
})

test('outil ordinaire : aucune question, aucun compteur', async ($, on) => {
  let questions = 0
  on('tool.call', (_, e) => {
    if (e.tool === 'AskUserQuestion') {
      questions += 1
      return repondre(e, 'Confirmer') as never
    }
    return { result: {} }
  })
  await $.tool.call({ tool: 'Bash', command: 'ls' })
  expect(questions).toBe(0)

  const ui = await $.ui.mount({ ...BANDE, surface: 'desktop' })
  expect((await ui.find({ type: 'Text', text: /garde-fou actif/ }))?.text).toBe('garde-fou actif')
  expect((await ui.find({ type: 'Text', text: /bloquée/ }))?.text ?? '').toContain('0 action bloquée')
  await ui.unmount()
})
