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
    label: 'NFT Stake',
    icon: 'NftIcon',
    href: '/nft-stake'
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
    href: "https://exchange.lydia.finance",
  },
]

export default config
