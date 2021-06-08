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
    icon: 'FarmIcon',
    href: '/farms',
  },
  {
    label: 'Pools',
    icon: 'PoolIcon',
    href: '/pools',
  },
  {
    label: 'Maximus',
    icon: 'CrownIcon',
    href: '/maximus',
    status: {
      text: 'BETA',
      color: 'warning',
    },
  },
  {
    label: 'Lottery',
    icon: 'TicketIcon',
    href: '/lottery',
    status: {
      text: 'NEW',
      color: 'success',
    },
  },
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
  // {
  //   label: 'IFO',
  //   icon: 'IfoIcon',
  //   href: '/ifo',
  // },
  {
    label: 'More',
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
]

export default config
