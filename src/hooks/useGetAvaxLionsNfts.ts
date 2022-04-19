import { useWeb3React } from '@web3-react/core'
import { useEffect, useReducer } from 'react'
import { getNftStakeAddress } from 'utils/addressHelpers'
import { getAvaxLionsContract } from 'utils/contractHelpers'
import fetchData from '../lambda/lambda'

const avaxLionsContract = getAvaxLionsContract()

type Action = { type: 'set_nfts'; data } | { type: 'reset' } | { type: 'refresh'; timestamp: number }

type State = {
  isLoading: boolean
  nfts: []
  lastUpdated: number
}

const initialState: State = {
  isLoading: true,
  nfts: [],
  lastUpdated: Date.now(),
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'set_nfts':
      return {
        ...initialState,
        isLoading: false,
        nfts: action.data,
      }
    case 'refresh':
      return {
        ...initialState,
        lastUpdated: action.timestamp,
      }
    case 'reset':
      return {
        ...initialState,
        isLoading: false,
      }
    default:
      return state
  }
}

const useGetAvaxLionsNfts = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { account } = useWeb3React()
  const { lastUpdated } = state

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const balanceOf = await avaxLionsContract.methods.balanceOf(account).call()
        if (balanceOf > 0) {
          const _lions = []
          const getTokenId = async (index: number) => {
            try {
              const { tokenOfOwnerByIndex, tokenURI, getApproved } = avaxLionsContract.methods
              const tokenId = await tokenOfOwnerByIndex(account, index).call()
              const approvedContract = await getApproved(tokenId).call()
              const isApproved = approvedContract === getNftStakeAddress()
              const tokenUri = await tokenURI(tokenId).call()
              const tokenData = await fetchData(tokenUri)

              return [Number(tokenId), tokenUri, tokenData, isApproved]
            } catch (error) {
              return null
            }
          }

          const tokenIdPromises = []

          for (let i = 0; i < balanceOf; i++) {
            tokenIdPromises.push(getTokenId(i))
          }

          const tokenIdsOwnedByWallet = await Promise.all(tokenIdPromises)
          // console.log(tokenIdsOwnedByWallet)
          tokenIdsOwnedByWallet.reduce((accum, association) => {
            if (!association) {
              return accum
            }

            const [tokenId, tokenUri, tokenData, isApproved] = association
            _lions.push({ tokenId, tokenUri, tokenData, isApproved })

            return {
              ...accum,
              [tokenId]: {
                tokenUri,
                tokenId,
              },
            }
          }, {})

          dispatch({ type: 'set_nfts', data: _lions })
        } else {
          // Reset it in case of wallet change
          dispatch({ type: 'reset' })
        }
      } catch (error) {
        dispatch({ type: 'reset' })
      }
    }

    if (account) {
      fetchNfts()
    }
  }, [account, lastUpdated, dispatch])

  // const refresh = () => dispatch({ type: 'refresh', timestamp: Date.now() })

  return { ...state }
}

export default useGetAvaxLionsNfts
