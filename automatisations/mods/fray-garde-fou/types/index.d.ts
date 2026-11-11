export type Compteurs = { bloquees: number; refusees: number }

declare module 'claude-code' {
  interface PluginState {
    'fray-garde-fou': { compteurs: Compteurs }
  }
}
