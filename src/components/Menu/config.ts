import { MenuEntry } from '@lydiafinance/uikit'

const config: MenuEntry[] = [
  {
    label: 'Home',
    icon: 'HomeIcon',
    href: '/',
  },
  {
    label: 'Exchange',
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
    label: 'LYD Gate',
    icon: 'GateIcon',
    href: 'https://gate.lydia.finance/#/bridge',
    status: {
      text: 'Bridge',
      // @ts-ignore
      color: 'failure',
    },
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
    label: 'Maximus Farm',
    icon: 'CrownIcon',
    href: '/maximus',
    status: {
      text: 'NEW',
      color: 'success',
    },
  },
  {
    label: 'Lottery',
    icon: 'Lottery2',
    href: '/lottery',
    status: {
      text: 'NEW',
      color: 'success',
    },
  },
  {
    label: 'Launchpad',
    icon: 'LaunchpadIcon',
    href: '/coming-soon',
    status: {
      text: 'SOON',
      color: 'warning',
    },
  },
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: '/ifo',
  //   status: {
  //     text: 'NEW',
  //     color: 'success',
  //   },
  // },
  // {
  //   label: 'Collectibles',
  //   icon: 'NftIcon',
  //   href: '/collectibles',
  // },
  // {
  //   label: 'Teams & Profile',
  //   icon: 'GroupsIcon',
  //   calloutClass: 'rainbow',
  //   items: [
  //     {
  //       label: 'Leaderboard',
  //       href: '/teams',
  //     },
  //     {
  //       label: 'Task Center',
  //       href: '/profile/tasks',
  //     },
  //     {
  //       label: 'Your Profile',
  //       href: '/profile',
  //     },
  //   ],
  // },
  {
    label: 'Listings',
    icon: 'ListingIcon',
    items: [
      {
        label: 'CoinMarketCap',
        href: 'https://coinmarketcap.com/currencies/lydia-finance',
      },
      {
        label: 'CoinGecko',
        href: 'https://www.coingecko.com/en/coins/lydia-finance',
      },
      {
        label: 'LiveCoinWatch',
        href: 'https://www.livecoinwatch.com/price/LydiaFinance-_LYD',
      },
      {
        label: 'Markr.io',
        href: 'https://markr.io/#/applications/LydiaFinance',
      },
      {
        label: 'DefiLama',
        href: 'https://defillama.com/protocol/lydia',
      },
      {
        label: 'AvaxProjects',
        href: 'https://www.avax-projects.com/',
      },
      {
        label: 'Coinpaprika',
        href: 'https://coinpaprika.com/coin/lyd-lydia-finance-token/',
      },
      {
        label: 'Nomics',
        href: 'https://nomics.com/assets/lyd2-lydia-finance',
      },
    ],
  },
  {
    label: 'Info',
    icon: 'InfoIcon',
    items: [
      {
        label: 'Overview',
        href: 'https://info.lydia.finance',
      },
      {
        label: 'Tokens',
        href: 'https://info.lydia.finance/tokens',
      },
      {
        label: 'Pairs',
        href: 'https://info.lydia.finance/pairs',
      },
      {
        label: 'Accounts',
        href: 'https://info.lydia.finance/accounts',
      },
    ],
  },
  {
    label: 'Learn More',
    icon: 'MoreIcon',
    items: [
      {
        label: 'Github',
        href: 'https://github.com/lydiafinance',
      },
      {
        label: 'Docs',
        href: 'https://docs.lydia.finance',
      },
      // {
      //   label: 'Blog',
      //   href: 'https://lydia.medium.com',
      // },
    ],
  },
  {
    label: 'Audited by CertiK',
    icon: 'ShieldIcon',
    href: 'https://www.certik.org/projects/lydiafinance',
  },
]

export default config
