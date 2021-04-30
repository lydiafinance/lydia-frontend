import { SettingsObject, SettingsType } from './types'

const BASE_URL = 'https://lydia-config-api-chefkai.lydiaswap.vercel.app'
const settings: SettingsObject[] = [
  {
    name: 'ifos',
    url: `${BASE_URL}/ifos`,
    type: SettingsType.IFO,
  },
  {
    name: 'pools',
    url: `${BASE_URL}/pools`,
    type: SettingsType.POOL,
  },
  {
    name: 'farms',
    url: `${BASE_URL}/farms`,
    type: SettingsType.FARM,
  },
  {
    name: 'pools',
    url: `${BASE_URL}/airdrop`,
    type: SettingsType.AIRDROP,
  },
]
export default settings
