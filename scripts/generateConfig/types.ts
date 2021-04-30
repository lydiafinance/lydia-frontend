export enum SettingsType {
  'IFO' = 'IFO',
  'POOL' = 'POOL',
  'FARM' = 'FARM',
  'AIRDROP' = 'AIRDROP',
}

export interface SettingsObject {
  name: string
  url: string
  type: SettingsType
}
