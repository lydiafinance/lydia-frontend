import { ChainId } from '@lydiafinance/sdk'
import { Nft, NftSource, NftType } from './types'

export const IPFS_GATEWAY = 'https://gateway.pinata.cloud'

export const nftSources: NftSource = {
  [NftType.LYDIA]: {
    address: {
      [ChainId.FUJI]: '',
      [ChainId.AVALANCHE]: '',
    },
    identifierKey: 'image',
  },
}

const Nfts: Nft[] = []

export default Nfts
