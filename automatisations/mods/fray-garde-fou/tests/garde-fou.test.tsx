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
