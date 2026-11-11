// fray-garde-fou : demande confirmation avant toute action irréversible ou visible
// par un client. N'utilise que $.ui (dialogue, bande) et $.state (compteurs de la
// session) : aucun réseau, aucun fichier, aucun sous-processus.
import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Compteurs } from '../types'
import { classify } from './rules'

const compteurs = atom(
  { plugin: 'fray-garde-fou', key: 'compteurs' } as const,
  { bloquees: 0, refusees: 0 } as Compteurs,
)

const CONFIRMER = 'Confirmer'
const REFUSER = 'Refuser'

const bloquees = (n: number) => (n > 1 ? `${n} actions bloquées` : `${n} action bloquée`)

export const register: Register = on => {
  on('tool.call', async ($, e, next) => {
    const action = classify(e.tool, e as unknown as Record<string, unknown>)

    if (action === null) {
      return next(e)
    }

    await update($, compteurs, c => ({ ...c, bloquees: c.bloquees + 1 }))

    let reponse = ''
    try {
      reponse = await $.ui.ask(action.question, {
        options: [CONFIRMER, REFUSER],
        header: action.entete,
      })
    } catch {
      // Dialogue fermé, ou personne pour répondre (mode -p) : on n'exécute pas.
      reponse = ''
    }

    if (reponse === CONFIRMER) {
      return next(e)
    }

    await update($, compteurs, c => ({ ...c, refusees: c.refusees + 1 }))

    const motif = reponse && reponse !== REFUSER ? ` Réponse de David : « ${reponse} ».` : ''
    return {
      deny: `fray-garde-fou (règle ${action.regle}) : action non confirmée par David, rien n'a été exécuté.${motif}`,
    }
  }).catch(($, e, next) =>
    // Si le garde-fou lui-même échoue avant d'avoir laissé passer l'appel, on bloque.
    next.called ? next(e) : { deny: 'fray-garde-fou : contrôle en échec, action non exécutée par prudence.' },
  )

  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }

    const c = await read($, compteurs)
    const { Box, Text } = $.ui.resolve(e)

    return (
      <Box>
        <Text color="warning" weight="bold">
          garde-fou actif
        </Text>
        <Text dimColor>
          {' '}
          · {bloquees(c.bloquees)} dans la session
          {c.refusees > 0 ? ` (${c.refusees} refusée${c.refusees > 1 ? 's' : ''})` : ''}
        </Text>
      </Box>
    )
  })
}
