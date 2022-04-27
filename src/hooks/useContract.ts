import { useMemo } from 'react'
import useWeb3 from 'hooks/useWeb3'
import {
  getBep20Contract,
  getLydContract,
  getBunnyFactoryContract,
  getLydiaRabbitContract,
  getProfileContract,
  getIfoContract,
  getLotteryContract,
  getLotteryTicketContract,
  getMasterchefContract,
  getPointCenterIfoContract,
  getSouschefContract,
  getClaimRefundContract,
  getAirdropContract,
  getLydVaultContract,
  getLydGovernanceContract,
  getMaximusFeeManagerContract,
  getMaximusContract,
  getMaximusDashboardContract,
  getIfoV1Contract,
  getIfoV2Contract,
  getIfoV3Contract,
  getErc721Contract,
  getNftStakeContract,
  getAvaxLionsContract,
} from 'utils/contractHelpers'

/**
 * Helper hooks to get specific contracts (by ABI)
 */

export const useIfoV1Contract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoV1Contract(address, web3), [address, web3])
}

export const useIfoV2Contract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoV2Contract(address, web3), [address, web3])
}
export const useIfoV3Contract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoV3Contract(address, web3), [address, web3])
}

export const useIfoContract = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getIfoContract(address, web3), [address, web3])
}

export const useERC20 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getBep20Contract(address, web3), [address, web3])
}

export const useLyd = () => {
  const web3 = useWeb3()
  return useMemo(() => getLydContract(web3), [web3])
}

export const useBunnyFactory = () => {
  const web3 = useWeb3()
  return useMemo(() => getBunnyFactoryContract(web3), [web3])
}

export const useLydiaLions = () => {
  const web3 = useWeb3()
  return useMemo(() => getLydiaRabbitContract(web3), [web3])
}

export const useProfile = () => {
  const web3 = useWeb3()
  return useMemo(() => getProfileContract(web3), [web3])
}

export const useLottery = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryContract(web3), [web3])
}

export const useLotteryTicket = () => {
  const web3 = useWeb3()
  return useMemo(() => getLotteryTicketContract(web3), [web3])
}

export const useMasterchef = () => {
  const web3 = useWeb3()
  return useMemo(() => getMasterchefContract(web3), [web3])
}

export const useSousChef = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getSouschefContract(id, web3), [id, web3])
}

export const usePointCenterIfoContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getPointCenterIfoContract(web3), [web3])
}

export const useClaimRefundContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getClaimRefundContract(web3), [web3])
}

export const useAirdropContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getAirdropContract(web3), [web3])
}

export const useLydVaultContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getLydVaultContract(web3), [web3])
}

export const useLydGovernanceContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getLydGovernanceContract(web3), [web3])
}

export const useMaximusFeeManagerContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getMaximusFeeManagerContract(web3), [web3])
}

export const useMaximusContact = (id) => {
  const web3 = useWeb3()
  return useMemo(() => getMaximusContract(id, web3), [id, web3])
}

export const useMaximusDashboardContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getMaximusDashboardContract(web3), [web3])
}

export const useERC721 = (address: string) => {
  const web3 = useWeb3()
  return useMemo(() => getErc721Contract(address, web3), [address, web3])
}

export const useNftStakeContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getNftStakeContract(web3), [web3])
}

export const useAvaxLionsNftContract = () => {
  const web3 = useWeb3()
  return useMemo(() => getAvaxLionsContract(web3), [web3])
}
