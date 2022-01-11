import { MenuEntry } from '@lydiafinance/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Trade',
    icon: 'TradeIcon',
    items: [
      {
        label: 'Exchange',
        href: 'https://exchange.lydia.finance',
      },
      {
        label: 'Liquidity',
        href: 'https://exchange.lydia.finance/#/pool',
      },
    ],
  },
  {
    label: 'Farms',
    icon: 'PoolIcon',
    href: '/farms',
  },
  {
    label: 'Electrum Pools',
    icon: 'FarmIcon',
    href: '/pools',
  },
  {
    label: 'Maximizer Farms',
    icon: 'CrownIcon',
    href: '/maximizer'
  },
  {
    label: 'Launchpad',
    icon: 'LaunchpadIcon',
    href: '/launchpad'
  },
  {
    label: 'Lottery',
    icon: 'Lottery2',
    href: '/lottery'
  },
  {
    label: 'Governance',
    icon: 'GroupsIcon',
    href: 'https://snapshot.org/#/lydiafinance.eth'
  },
  {
    label: "Buy LYD",
    icon: "CoinIcon",
    items: [
      {
        label: "Lydia",
        href: "https://exchange.lydia.finance",
      },
      {
        label: "Pangolin",
        href: "https://app.pangolin.exchange/#/swap?outputCurrency=0x4C9B4E1AC6F24CdE3660D5E4Ef1eBF77C710C084",
      },
      {
        label: "LYD Gate",
        href: "https://gate.lydia.finance/#/bridge",
      }
    ],
  },
]

export default config
