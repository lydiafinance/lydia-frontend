import React, { useEffect, useState } from 'react'
import {
  ExpandableButton,
  Progress,
  Button,
  ChevronUpIcon,
} from '@lydiafinance/uikit'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { PoolIds } from 'config/constants/types'
import { useIfoApprove } from 'hooks/useApprove'
import { useERC20 } from 'hooks/useContract'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import { getAddress } from 'utils/addressHelpers'
import IfoPoolV3Card from './IfoPoolV3Card'
import { EnableStatus, IfoFoldableCardProps } from '../Shared/types'
import Timer from '../Shared/Timer'
import Achievement from '../Shared/Achievement'
import { StyledCard, Header, FoldableContent, CardsWrapper, StyledCardBody, StyledCardFooter } from '../IfoLayout'
import getRibbonComponent from '../Shared/getRibbonComponent'

const IfoFoldableCard: React.FC<IfoFoldableCardProps> = ({ ifo, publicIfoData, walletIfoData, isInitiallyVisible }) => {
  const [isVisible, setIsVisible] = useState(isInitiallyVisible)
  const [enableStatus, setEnableStatus] = useState(EnableStatus.DISABLED)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const raisingTokenContract = useERC20(getAddress(ifo.currency.address))
  const Ribbon = getRibbonComponent(ifo, publicIfoData.status, t)
  const isActive = publicIfoData.status !== 'finished' && ifo.isActive
  const { contract } = walletIfoData
  const onApprove = useIfoApprove(raisingTokenContract, contract.options.address)
  const { toastSuccess } = useToast()

  const handleApprove = async () => {
    try {
      setEnableStatus(EnableStatus.IS_ENABLING)

      await onApprove()

      setEnableStatus(EnableStatus.ENABLED)
      toastSuccess(
        t('Successfully Enabled!'),
        t('You can now participate in the %symbol% IFO.', { symbol: ifo.token.symbol }),
      )
    } catch (error) {
      setEnableStatus(EnableStatus.DISABLED)
    }
  }

  useEffect(() => {
    const checkAllowance = async () => {
      try {
        const response = await raisingTokenContract.methods.allowance(account, contract.options.address).call()
        const currentAllowance = new BigNumber(response)
        setEnableStatus(currentAllowance.lte(0) ? EnableStatus.DISABLED : EnableStatus.ENABLED)
      } catch (error) {
        setEnableStatus(EnableStatus.DISABLED)
      }
    }

    if (account) {
      checkAllowance()
    }
  }, [account, raisingTokenContract, contract, setEnableStatus])

  return (
    <StyledCard ribbon={Ribbon}>
      <Header ifoId={ifo.id}>
        <ExpandableButton expanded={isVisible} onClick={() => setIsVisible((prev) => !prev)} />
      </Header>
      <FoldableContent isVisible={isVisible} isActive={publicIfoData.status !== 'idle' && isActive}>
        {isActive && <Progress variant="flat" primaryStep={publicIfoData.progress} />}
        <StyledCardBody>
          {isActive && <Timer publicIfoData={publicIfoData} />}
          <CardsWrapper singleCard={!publicIfoData.poolBasic || !walletIfoData.poolBasic}>
            {publicIfoData.poolBasic && walletIfoData.poolBasic && (
              <IfoPoolV3Card
                poolId={PoolIds.poolBasic}
                ifo={ifo}
                publicIfoData={publicIfoData}
                walletIfoData={walletIfoData}
                onApprove={handleApprove}
                enableStatus={enableStatus}
              />
            )}
            {publicIfoData.poolUnlimited && walletIfoData.poolUnlimited && (
              <IfoPoolV3Card
                poolId={PoolIds.poolUnlimited}
                ifo={ifo}
                publicIfoData={publicIfoData}
                walletIfoData={walletIfoData}
                onApprove={handleApprove}
                enableStatus={enableStatus}
              />
            )}
          </CardsWrapper>
          <Achievement ifo={ifo} />
        </StyledCardBody>
        <StyledCardFooter>
          <Button variant="text" endIcon={<ChevronUpIcon color="primary" />} onClick={() => setIsVisible(false)}>
            {t('Close')}
          </Button>
        </StyledCardFooter>
      </FoldableContent>
    </StyledCard>
  )
}

export default IfoFoldableCard
