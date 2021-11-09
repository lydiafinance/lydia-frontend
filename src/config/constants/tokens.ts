import { ChainId } from '@lydiafinance/sdk'

const tokens = {
  avax: {
    symbol: 'AVAX',
    projectLink: 'https://www.avalabs.org/',
  },
  wavax: {
    symbol: 'WAVAX',
    address: {
      [ChainId.AVALANCHE]: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
      [ChainId.FUJI]: '0xd00ae08403B9bbb9124bB305C09058E32C39A48c',
    },
    decimals: 18,
    projectLink: 'https://www.avalabs.org/',
  },
  lyd: {
    symbol: 'LYD',
    address: {
      [ChainId.AVALANCHE]: '0x4C9B4E1AC6F24CdE3660D5E4Ef1eBF77C710C084',
      [ChainId.FUJI]: '0xDe5D7A6484E885eDcCA237dFa93E970DA60F74Db',
    },
    decimals: 18,
    projectLink: 'https://lydia.finance/',
  },
  electrum: {
    symbol: 'ELECTRUM',
    address: {
      [ChainId.AVALANCHE]: '0x814409AbbC142fa5824C034d564D8D738b20cD51',
      [ChainId.FUJI]: '0xfE1e507CeB712BDe086f3579d2c03248b2dB77f9',
    },
    decimals: 18,
    projectLink: 'https://lydia.finance/',
  },
  usdt: {
    symbol: 'USDT',
    address: {
      [ChainId.AVALANCHE]: '0xde3A24028580884448a5397872046a019649b084',
      [ChainId.FUJI]: '0x7E3a976295AD9426168500a288015CC7b24ebf3A',
    },
    decimals: 6,
    projectLink: 'https://tether.to/',
  },
  eth: {
    symbol: 'ETH',
    address: {
      [ChainId.AVALANCHE]: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
      [ChainId.FUJI]: '0x0D4cBc976E19aB50d8C67275bDc0c8cA43b0c471',
    },
    decimals: 18,
    projectLink: 'https://ptokens.io/',
  },
  sushi: {
    symbol: 'SUSHI',
    address: {
      [ChainId.AVALANCHE]: '0x39cf1BD5f15fb22eC3D9Ff86b0727aFc203427cc',
      [ChainId.FUJI]: '0x4e881Ca1e81A176D09e45370DE3622dADC8aE34c',
    },
    decimals: 18,
    projectLink: 'https://ptokens.io/',
  },
  dai: {
    symbol: 'DAI',
    address: {
      [ChainId.AVALANCHE]: '0xbA7dEebBFC5fA1100Fb055a87773e1E99Cd3507a',
      [ChainId.FUJI]: '0xb090C5b83CaC5Cf751E8CB8F8B2401fF6799d011',
    },
    decimals: 18,
    projectLink: 'https://ptokens.io/',
  },
  uni: {
    symbol: 'UNI',
    address: {
      [ChainId.AVALANCHE]: '0xf39f9671906d8630812f9d9863bBEf5D523c84Ab',
      [ChainId.FUJI]: '0x6d3b5f42F625031304A86dfBC6bBA506f6047088',
    },
    decimals: 18,
    projectLink: 'https://ptokens.io/',
  },
  png: {
    symbol: 'PNG',
    address: {
      [ChainId.AVALANCHE]: '0x60781C2586D68229fde47564546784ab3fACA982',
      [ChainId.FUJI]: '0xDFE6639633394fC5C8ADc14f12Dc0F99Cf6cc71d',
    },
    decimals: 18,
    projectLink: 'https://ptokens.io/',
  },
  wbtc: {
    symbol: 'WBTC',
    address: {
      [ChainId.AVALANCHE]: '0x408d4cd0adb7cebd1f1a1c33a0ba2098e1295bab',
      [ChainId.FUJI]: '0xDFE6639633394fC5C8ADc14f12Dc0F99Cf6cc71d',
    },
    decimals: 8,
    projectLink: 'https://ptokens.io/',
  },
  snob: {
    symbol: 'SNOB',
    address: {
      [ChainId.AVALANCHE]: '0xc38f41a296a4493ff429f1238e030924a1542e50',
      [ChainId.FUJI]: '0xDFE6639633394fC5C8ADc14f12Dc0F99Cf6cc71d',
    },
    decimals: 18,
    projectLink: 'https://snowball.network/',
  },
  xava: {
    symbol: 'XAVA',
    address: {
      [ChainId.AVALANCHE]: '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4',
      [ChainId.FUJI]: '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4',
    },
    decimals: 18,
    projectLink: 'https://avalaunch.app/',
  },
  olive: {
    symbol: 'OLIVE',
    address: {
      [ChainId.AVALANCHE]: '0x617724974218a18769020a70162165a539c07e8a',
      [ChainId.FUJI]: '0xd1c3f94DE7e5B45fa4eDBBA472491a9f4B166FC4',
    },
    decimals: 18,
    projectLink: 'https://avax.olive.cash/',
  },
  test: {
    symbol: 'FTT',
    address: {
      [ChainId.AVALANCHE]: '0x65E50902eD92899d599671b14a6b16f0a5036A7c',
      [ChainId.FUJI]: '0x65E50902eD92899d599671b14a6b16f0a5036A7c',
    },
    decimals: 18,
    projectLink: 'https://avax.olive.cash/',
  },
  bag: {
    symbol: 'BAG',
    address: {
      [ChainId.AVALANCHE]: '0xa1144a6A1304bd9cbb16c800F7a867508726566E',
      [ChainId.FUJI]: '0xa1144a6A1304bd9cbb16c800F7a867508726566E',
    },
    decimals: 18,
    projectLink: 'https://baguette.exchange',
  },
  yak: {
    symbol: 'YAK',
    address: {
      [ChainId.AVALANCHE]: '0x59414b3089ce2AF0010e7523Dea7E2b35d776ec7',
      [ChainId.FUJI]: '0x59414b3089ce2AF0010e7523Dea7E2b35d776ec7',
    },
    decimals: 18,
    projectLink: 'https://yieldyak.com',
  },
  link: {
    symbol: 'LINK',
    address: {
      [ChainId.AVALANCHE]: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651',
      [ChainId.FUJI]: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651',
    },
    decimals: 18,
    projectLink: 'https://chain.link',
  },
  qi: {
    symbol: 'QI',
    address: {
      [ChainId.AVALANCHE]: '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
      [ChainId.FUJI]: '0x8729438eb15e2c8b576fcc6aecda6a148776c0f5',
    },
    decimals: 18,
    projectLink: 'https://benqi.fi/',
  },
  usdt_e: {
    symbol: 'USDT.e',
    address: {
      [ChainId.AVALANCHE]: '0xc7198437980c041c805a1edcba50c1ce5db95118',
      [ChainId.FUJI]: '0xc7198437980c041c805a1edcba50c1ce5db95118',
    },
    decimals: 6,
    projectLink: 'https://tether.to/',
  },
  usdc_e: {
    symbol: 'USDC.e',
    address: {
      [ChainId.AVALANCHE]: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
      [ChainId.FUJI]: '0xA7D7079b0FEaD91F3e65f86E8915Cb59c1a4C664',
    },
    decimals: 6,
    projectLink: 'https://www.centre.io/usdc',
  },
  eth_e: {
    symbol: 'ETH.e',
    address: {
      [ChainId.AVALANCHE]: '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
      [ChainId.FUJI]: '0x49d5c2bdffac6ce2bfdb6640f4f80f226bc10bab',
    },
    decimals: 18,
    projectLink: 'https://ptokens.io/',
  },
  sushi_e: {
    symbol: 'SUSHI.e',
    address: {
      [ChainId.AVALANCHE]: '0x37b608519f91f70f2eeb0e5ed9af4061722e4f76',
      [ChainId.FUJI]: '0x37b608519f91f70f2eeb0e5ed9af4061722e4f76',
    },
    decimals: 18,
    projectLink: 'https://ptokens.io/',
  },
  dai_e: {
    symbol: 'DAI.e',
    address: {
      [ChainId.AVALANCHE]: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
      [ChainId.FUJI]: '0xd586e7f844cea2f87f50152665bcbc2c279d8d70',
    },
    decimals: 18,
    projectLink: 'https://ptokens.io/',
  },
  uni_e: {
    symbol: 'UNI.e',
    address: {
      [ChainId.AVALANCHE]: '0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580',
      [ChainId.FUJI]: '0x8ebaf22b6f053dffeaf46f4dd9efa95d89ba8580',
    },
    decimals: 18,
    projectLink: 'https://ptokens.io/',
  },
  wbtc_e: {
    symbol: 'WBTC.e',
    address: {
      [ChainId.AVALANCHE]: '0x50b7545627a5162f82a992c33b87adc75187b218',
      [ChainId.FUJI]: '0x50b7545627a5162f82a992c33b87adc75187b218',
    },
    decimals: 8,
    projectLink: 'https://ptokens.io/',
  },
  link_e: {
    symbol: 'LINK.e',
    address: {
      [ChainId.AVALANCHE]: '0x5947bb275c521040051d82396192181b413227a3',
      [ChainId.FUJI]: '0x5947bb275c521040051d82396192181b413227a3',
    },
    decimals: 18,
    projectLink: 'https://yieldyak.com',
  },
  cnr: {
    symbol: 'CNR',
    address: {
      [ChainId.AVALANCHE]: '0x8D88e48465F30Acfb8daC0b3E35c9D6D7d36abaf',
      [ChainId.FUJI]: '0x8D88e48465F30Acfb8daC0b3E35c9D6D7d36abaf',
    },
    decimals: 18,
    projectLink: 'https://canary.exchange',
  },
  vso: {
    symbol: 'VSO',
    address: {
      [ChainId.AVALANCHE]: '0x846D50248BAf8b7ceAA9d9B53BFd12d7D7FBB25a',
      [ChainId.FUJI]: '0x846D50248BAf8b7ceAA9d9B53BFd12d7D7FBB25a',
    },
    decimals: 18,
    projectLink: 'https://verso.finance',
  },
  a_avax_b: {
    symbol: 'aAVAXb',
    address: {
      [ChainId.AVALANCHE]: '0x6C6f910A79639dcC94b4feEF59Ff507c2E843929',
      [ChainId.FUJI]: '0x6C6f910A79639dcC94b4feEF59Ff507c2E843929',
    },
    decimals: 18,
    projectLink: 'https://stakefi.ankr.com',
  },
  pefi: {
    symbol: 'PEFI',
    address: {
      [ChainId.AVALANCHE]: '0xe896cdeaac9615145c0ca09c8cd5c25bced6384c',
      [ChainId.FUJI]: '0xe896cdeaac9615145c0ca09c8cd5c25bced6384c',
    },
    decimals: 18,
    projectLink: 'https://penguinfinance.org',
  },
  evrt: {
    symbol: 'EVRT',
    address: {
      [ChainId.AVALANCHE]: '0x3ACa5545e76746A3Fe13eA66B24BC0eBcC51E6b4',
      [ChainId.FUJI]: '0x3ACa5545e76746A3Fe13eA66B24BC0eBcC51E6b4',
    },
    decimals: 18,
    projectLink: 'https://everestdao.net',
  },
  duel: {
    symbol: 'DUEL',
    address: {
      [ChainId.AVALANCHE]: '0xc1a49c0B9C10F35850bd8E15EaeF0346BE63E002',
      [ChainId.FUJI]: '0xc1a49c0B9C10F35850bd8E15EaeF0346BE63E002',
    },
    decimals: 18,
    projectLink: 'https://duel.network',
  },
  joe: {
    symbol: 'JOE',
    address: {
      [ChainId.AVALANCHE]: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
      [ChainId.FUJI]: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd',
    },
    decimals: 18,
    projectLink: 'https://www.traderjoexyz.com',
  },
  m_yak: {
    symbol: 'mYAK',
    address: {
      [ChainId.AVALANCHE]: '0xdDAaAD7366B455AfF8E7c82940C43CEB5829B604',
      [ChainId.FUJI]: '0xdDAaAD7366B455AfF8E7c82940C43CEB5829B604',
    },
    decimals: 12,
    projectLink: 'https://yieldyak.com',
  },
  avme: {
    symbol: 'AVME',
    address: {
      [ChainId.AVALANCHE]: '0x1ECd47FF4d9598f89721A2866BFEb99505a413Ed',
      [ChainId.FUJI]: '0x1ECd47FF4d9598f89721A2866BFEb99505a413Ed',
    },
    decimals: 18,
    projectLink: 'https://avme.io',
  },
  aave_e: {
    symbol: 'AAVE.e',
    address: {
      [ChainId.AVALANCHE]: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9',
      [ChainId.FUJI]: '0x63a72806098Bd3D9520cC43356dD78afe5D386D9',
    },
    decimals: 18,
    projectLink: 'https://aave.com',
  },
  teddy: {
    symbol: 'TEDDY',
    address: {
      [ChainId.AVALANCHE]: '0x094bd7B2D99711A1486FB94d4395801C6d0fdDcC',
      [ChainId.FUJI]: '0x094bd7B2D99711A1486FB94d4395801C6d0fdDcC',
    },
    decimals: 18,
    projectLink: 'https://teddy.cash',
  },
  orca: {
    symbol: 'ORCA',
    address: {
      [ChainId.AVALANCHE]: '0x8B1d98A91F853218ddbb066F20b8c63E782e2430',
      [ChainId.FUJI]: '0x8B1d98A91F853218ddbb066F20b8c63E782e2430',
    },
    decimals: 18,
    projectLink: 'https://www.avai.finance',
  },
  maxi: {
    symbol: 'MAXI',
    address: {
      [ChainId.AVALANCHE]: '0x885d748C00A279B67A7749EC6b03301700dd0455',
      [ChainId.FUJI]: '0x885d748C00A279B67A7749EC6b03301700dd0455',
    },
    decimals: 18,
    projectLink: 'https://www.maximus.farm',
  },
}

export default tokens
