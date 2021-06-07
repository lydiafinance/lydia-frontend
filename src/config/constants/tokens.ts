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
}

export default tokens
