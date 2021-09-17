import { FarmConfig } from 'config/constants/types'
import fetchPublicFarmData from './fetchPublicFarmData'

const fetchFarm = async (farm: FarmConfig): Promise<FarmConfig> => {
  const farmPublicData = await fetchPublicFarmData(farm)

  return { ...farm, ...farmPublicData }
}

export default fetchFarm
