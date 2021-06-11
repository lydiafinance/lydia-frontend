import BigNumber from 'bignumber.js'
import chunk from 'lodash/chunk'

import poolsConfig from 'config/constants/maximus'
import maximusAbi from 'config/abi/maximusAbi.json'
import multicall from 'utils/multicall'
import { getAddress } from 'utils/addressHelpers'

const fetchMaximusFarms = async () => {
  const calls = poolsConfig.reduce((multiCalls, poolConfig) => {
    const contractAddress = getAddress(poolConfig.contractAddress)

    const currentPoolCals = [
      {
        address: contractAddress,
        name: 'balance',
      },
      {
        address: contractAddress,
        name: 'priceShare',
      },
      {
        address: contractAddress,
        name: 'rewardPerToken',
      },
      {
        address: contractAddress,
        name: 'rewardRate',
      },
      {
        address: contractAddress,
        name: 'rewardsDuration',
      },
      {
        address: contractAddress,
        name: 'rewardsToken',
      },
      {
        address: contractAddress,
        name: 'stakingToken',
      },
    ]

    return [...multiCalls, ...currentPoolCals]
  }, [])

  let maximusFarmsTotalStacked = await multicall(maximusAbi, calls)

  maximusFarmsTotalStacked = chunk(maximusFarmsTotalStacked, 7)

  return [
    ...poolsConfig.map((p, index) => ({
      pid: p.pid,
      totalStaked: new BigNumber(maximusFarmsTotalStacked[index][0]).toJSON(),
      priceShare: new BigNumber(maximusFarmsTotalStacked[index][1]).toJSON(),
      rewardPerToken: new BigNumber(maximusFarmsTotalStacked[index][2]).toJSON(),
      rewardRate: new BigNumber(maximusFarmsTotalStacked[index][3]).toJSON(),
      rewardsDuration: new BigNumber(maximusFarmsTotalStacked[index][4]).toJSON(),
      rewardsToken: maximusFarmsTotalStacked[index][5][0],
      // stakingToken: maximusFarmsTotalStacked[index][6][0],
    })),
  ]
}

export default fetchMaximusFarms
