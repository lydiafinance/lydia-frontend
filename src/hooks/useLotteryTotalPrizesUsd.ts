import { useGetApiPrice } from 'state/hooks'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalRewards } from './useTickets'

const useLotteryTotalPrizesUsd = () => {
  const totalRewards = useTotalRewards()
  const totalLyd = getBalanceNumber(totalRewards)
  const lydPriceUsdt = useGetApiPrice('lyd')

  return totalLyd * lydPriceUsdt
}

export default useLotteryTotalPrizesUsd
