export type Compteurs = { bloquees: number; confirmees: number; abandonnees: number }

/** L'action bloquée qui attend le « confirme » de David. */
export type Attente = { cle: string; regle: number; entete: string } | null

declare module 'claude-code' {
  interface PluginState {
    'fray-garde-fou': { compteurs: Compteurs; attente: Attente; autorisation: string | null }
  }
}
