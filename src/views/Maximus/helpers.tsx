import BigNumber from 'bignumber.js'
import { getBalanceNumber, getFullDisplayBalance, getDecimalAmount } from 'utils/formatBalance'

export const convertSharesToLyd = (
  shares: BigNumber,
  lydPerFullShare: BigNumber,
  decimals = 18,
  decimalsToRound = 3,
) => {
  const sharePriceNumber = getBalanceNumber(lydPerFullShare, decimals)
  const amountInLyd = new BigNumber(shares.multipliedBy(sharePriceNumber))
  const lydAsNumberBalance = getBalanceNumber(amountInLyd, decimals)
  const lydAsBigNumber = getDecimalAmount(new BigNumber(lydAsNumberBalance), decimals)
  const lydAsDisplayBalance = getFullDisplayBalance(amountInLyd, decimals, decimalsToRound)
  return { lydAsNumberBalance, lydAsBigNumber, lydAsDisplayBalance }
}

export const convertLydToShares = (lyd: BigNumber, lydPerFullShare: BigNumber, decimals = 18, decimalsToRound = 3) => {
  const sharePriceNumber = getBalanceNumber(lydPerFullShare, decimals)
  const amountInShares = new BigNumber(lyd.dividedBy(sharePriceNumber))
  const sharesAsNumberBalance = getBalanceNumber(amountInShares, decimals)
  const sharesAsBigNumber = getDecimalAmount(new BigNumber(sharesAsNumberBalance), decimals)
  const sharesAsDisplayBalance = getFullDisplayBalance(amountInShares, decimals, decimalsToRound)
  return { sharesAsNumberBalance, sharesAsBigNumber, sharesAsDisplayBalance }
}
