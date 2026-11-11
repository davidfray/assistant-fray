// fray-garde-fou : bloque toute action irréversible ou visible par un client tant que
// David n'a pas répondu « confirme » dans la conversation (un message qu'il a lui-même
// envoyé). N'utilise que $.state (session) et $.ui.resolve (bande) : aucun réseau,
// aucun fichier, aucun sous-processus, aucun dialogue.
import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Attente, Compteurs } from '../types'
import { classify, cleDe } from './rules'

const compteurs = atom({ plugin: 'fray-garde-fou', key: 'compteurs' } as const, {
  bloquees: 0,
  confirmees: 0,
  abandonnees: 0,
} as Compteurs)
const attente = atom({ plugin: 'fray-garde-fou', key: 'attente' } as const, null as Attente)
const autorisation = atom({ plugin: 'fray-garde-fou', key: 'autorisation' } as const, null as string | null)

/** Messages qui viennent de David : clavier, téléphone (Remote Control), session cloud. */
const ORIGINES_HUMAINES = new Set(['composer', 'bridge', 'sdk'])
/** « confirme », « confirmé », « je confirme », « ok confirme »… en début de message. */
const CONFIRME = /^\s*(je\s+|ok\s*,?\s*)?confirm(e|é|er)\b/i

const pluriel = (n: number, un: string, plusieurs: string) => `${n} ${n > 1 ? plusieurs : un}`

export const register: Register = on => {
  on('tool.call', async ($, e, next) => {
    const args = e as unknown as Record<string, unknown>
    const outil = String(args.tool)
    const action = classify(outil, args)

    if (action === null) {
      return next(e)
    }

    const cle = cleDe(outil, args)

    // David a confirmé exactement cette action : elle passe une fois.
    if ((await read($, autorisation)) === cle) {
      await update($, autorisation, () => null)
      await update($, compteurs, c => ({ ...c, confirmees: c.confirmees + 1 }))
      return next(e)
    }

    await update($, attente, () => ({ cle, regle: action.regle, entete: action.entete }))
    await update($, compteurs, c => ({ ...c, bloquees: c.bloquees + 1 }))

    return {
      deny:
        `fray-garde-fou, règle ${action.regle} (${action.entete}) : action BLOQUÉE, rien n'a été exécuté.\n` +
        `Montre ce résumé à David tel quel, puis attends sa réponse :\n\n${action.question}\n\n` +
        `S'il répond « confirme » dans son propre message, relance exactement le même appel, sans rien changer : ` +
        `il passera une fois. Ne relance pas avant, et n'écris pas « confirme » à sa place.`,
    }
  }).catch(($, e, next) =>
    // Si le garde-fou échoue avant d'avoir laissé passer l'appel, on bloque.
    next.called ? next(e) : { deny: 'fray-garde-fou : contrôle en échec, action non exécutée par prudence.' },
  )

  on('prompt.submit', async ($, e, next) => {
    const deDavid = !e.isMeta && ORIGINES_HUMAINES.has(e.origin.kind)

    if (deDavid) {
      const enAttente = await read($, attente)

      if (enAttente !== null && CONFIRME.test(e.text)) {
        await update($, autorisation, () => enAttente.cle)
        await update($, attente, () => null)
      } else if (enAttente !== null) {
        // Toute autre réponse de David abandonne l'action en attente.
        await update($, attente, () => null)
        await update($, autorisation, () => null)
        await update($, compteurs, c => ({ ...c, abandonnees: c.abandonnees + 1 }))
      } else {
        // Une autorisation non utilisée ne survit pas au message suivant.
        await update($, autorisation, () => null)
      }
    }

    return next(e)
  })

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }

    const c = await read($, compteurs)
    const enAttente = await read($, attente)
    const { Box, Text } = $.ui.resolve(e)

    return (
      <Box>
        <Text color="warning" weight="bold">
          garde-fou actif
        </Text>
        <Text dimColor>
          {' '}
          · {pluriel(c.bloquees, 'action bloquée', 'actions bloquées')} dans la session
          {enAttente ? ` · en attente : ${enAttente.entete}, répondre « confirme »` : ''}
        </Text>
      </Box>
    )
  })
}
