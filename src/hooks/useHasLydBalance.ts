import BigNumber from 'bignumber.js'
import { getLydAddress } from 'utils/addressHelpers'
import useTokenBalance from './useTokenBalance'

/**
 * A hook to check if a wallet's LYD balance is at least the amount passed in
 */
const useHasLydBalance = (minimumBalance: BigNumber) => {
  const lydBalance = useTokenBalance(getLydAddress())
  return lydBalance.gte(minimumBalance)
}

export default useHasLydBalance
