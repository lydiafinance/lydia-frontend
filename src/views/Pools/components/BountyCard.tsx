import React from 'react'
import styled from 'styled-components'
import { Card, Text, useTooltip } from '@lydiafinance/uikit'
import { useTranslation } from 'contexts/Localization'
import useGetVaultFees from 'hooks/lydVault/useGetVaultFees'
import { useLydVaultContract,useLydGovernanceContract } from 'hooks/useContract'
import useGetGovernanceFees from 'hooks/lydGovernance/useGetGovernanceFees'
import useGetVaultBountyInfo from 'hooks/lydVault/useGetVaultBountyInfo'
import useGetGovernanceBountyInfo from 'hooks/lydGovernance/useGetGovernanceBountyInfo'
import BountyCardItem from './BountyCardItem'

const StyledCard = styled(Card)`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-column: span 1;
  max-width: 200px;
  ${({ theme }) => theme.mediaQueries.md} {
    grid-template-columns: repeat(2, 1fr);
    max-width: 400px;
  }
  width: 100%;
  
`

const BountyCard = () => {
  const { t } = useTranslation()
  const vaultBountyInfo = useGetVaultBountyInfo()
  const governanceBountyInfo = useGetGovernanceBountyInfo()
  const vaultFees = useGetVaultFees()
  const governanceFees = useGetGovernanceFees();
  const lydVaultContract = useLydVaultContract()
  const lydGovernanceContract = useLydGovernanceContract()

  const TooltipVaultComponent = () => (
    <>
      <Text mb="16px">{`${t(`This bounty is given as a reward for providing a service to other users.`)}`}</Text>
      <Text mb="16px">
        {t(
          'Whenever you successfully claim the bounty, you’re also helping out by activating the Auto LYD Pool’s compounding function for everyone.',
        )}
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        {t(`Auto-Compound Bounty: %fee%% of all Auto LYD pool users’ pending yield`, { fee: vaultFees.callFee / 100 })}
      </Text>
    </>
  )

  const TooltipGovernanceComponent = () => (
    <>
      <Text mb="16px">{`${t(`This bounty is given as a reward for providing a service to other users.`)}`}</Text>
      <Text mb="16px">
        {t(
          'Whenever you successfully claim the bounty, you’re also helping out by activating the Lydian’s Pool’s compounding function for everyone.',
        )}
      </Text>
      <Text style={{ fontWeight: 'bold' }}>
        {t(`Auto-Compound Bounty: %fee%% of all Lydian’s Pool users’ pending yield`, { fee: governanceFees.callFee / 100 })}
      </Text>
    </>
  )

  const vaultToolTip = useTooltip(<TooltipVaultComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  const governanceToolTip = useTooltip(<TooltipGovernanceComponent />, {
    placement: 'bottom-end',
    tooltipOffset: [20, 10],
  })

  return (
    <>
      {vaultToolTip.tooltipVisible && vaultToolTip.tooltip}
      {governanceToolTip.tooltipVisible && governanceToolTip.tooltip}
      <StyledCard>
        <BountyCardItem
          title={t('Auto LYD')}
          targetRef={vaultToolTip.targetRef}
          callFee={vaultFees.callFee}
          TooltipComponent={TooltipVaultComponent}
          bountyInfo={vaultBountyInfo}
          contract={lydVaultContract}
        />
        <BountyCardItem
          title={t('Lydian\'s Pool')}
          targetRef={governanceToolTip.targetRef}
          callFee={governanceFees.callFee}
          TooltipComponent={TooltipGovernanceComponent}
          bountyInfo={governanceBountyInfo}
          contract={lydGovernanceContract}
        />
      </StyledCard>
    </>
  )
}

export default BountyCard
