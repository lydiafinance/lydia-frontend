import React from 'react'
import {
  Text,
  Flex,
  Box,
  Image,
  CheckmarkCircleIcon,
  FlexProps,
  HelpIcon,
  useTooltip,
  Button,
  AutoRenewIcon,
} from '@lydiafinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { Ifo, PoolIds } from 'config/constants/types'
import { PublicIfoData, WalletIfoData } from 'hooks/ifo/types'
import { useTranslation } from 'contexts/Localization'
import { getBalanceNumber, getBalanceAmount } from 'utils/formatBalance'
import { getAddress } from 'utils/addressHelpers'
import { EnableStatus } from '../types'
import PercentageOfTotal from './PercentageOfTotal'
import { SkeletonCardTokens } from './Skeletons'

interface TokenSectionProps extends FlexProps {
  img: string
  mb?: string
}

const TokenSection: React.FC<TokenSectionProps> = ({ img, children, ...props }) => {
  return (
    <Flex {...props}>
      <Image src={img} width={32} height={32} mr="16px" />
      <div>{children}</div>
    </Flex>
  )
}

const Label = (props) => <Text bold fontSize="12px" color="secondary" textTransform="uppercase" {...props} />

const Value = (props) => <Text bold fontSize="20px" style={{ wordBreak: 'break-all' }} {...props} />

interface IfoCardTokensProps {
  poolId: PoolIds
  ifo: Ifo
  publicIfoData: PublicIfoData
  walletIfoData: WalletIfoData
  hasProfile: boolean
  isLoading: boolean
  onApprove: () => Promise<any>
  enableStatus: EnableStatus
}

const IfoCardTokens: React.FC<IfoCardTokensProps> = ({
  poolId,
  ifo,
  publicIfoData,
  walletIfoData,
  hasProfile,
  isLoading,
  onApprove,
  enableStatus,
}) => {
  const { account } = useWeb3React()
  const { t } = useTranslation()
  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t(
      'Sorry, you didn’t contribute enough LP tokens to meet the minimum threshold. You didn’t buy anything in this sale, but you can still reclaim your LP tokens.',
    ),
    { placement: 'bottom' },
  )

  const publicPoolCharacteristics = publicIfoData[poolId]
  const userPoolCharacteristics = walletIfoData[poolId]

  const { currency, token } = ifo
  const { hasClaimed } = userPoolCharacteristics
  const distributionRatio = ifo[poolId].distributionRatio * 100
  const tokenImage = `/images/tokens/${getAddress(ifo.token.address)}.png`

  let nextReleasePercent = 0
  ifo.releasePercent.find((_percent, i) => {
    if (publicIfoData.releasedPercent.toNumber() === _percent) {
      nextReleasePercent += ifo.releasePercent[i + 1] - ifo.releasePercent[i]
      return true
    }
    return false
  })

  const renderTokenSection = () => {
    if (isLoading) {
      return <SkeletonCardTokens />
    }
    if (account && !hasProfile) {
      if (publicIfoData.status === 'finished') {
        return <Text textAlign="center">{t('Activate LydiaFinance Profile to take part in next IFO‘s!')}</Text>
      }
      return <Text textAlign="center">{t('You need an active LydiaFinance Profile to take part in an IFO!')}</Text>
    }
    if (publicIfoData.status === 'coming_soon') {
      return (
        <>
          <TokenSection img="/images/present.svg">
            <Label>{t('On sale')}</Label>
            <Value>{ifo[poolId].saleAmount}</Value>
          </TokenSection>
          <Text fontSize="14px" color="textSubtle" pl="48px">
            {t('%ratio%% of total sale', { ratio: distributionRatio })}
          </Text>
          {enableStatus !== EnableStatus.ENABLED && account && (
            <Button
              width="100%"
              mt="16px"
              onClick={onApprove}
              isLoading={enableStatus === EnableStatus.IS_ENABLING}
              endIcon={enableStatus === EnableStatus.IS_ENABLING ? <AutoRenewIcon spin color="currentColor" /> : null}
            >
              {t('Enable')}
            </Button>
          )}
        </>
      )
    }
    if (publicIfoData.status === 'live') {
      return (
        <>
          <TokenSection img="/images/farms/avax-lyd.svg" mb="24px">
            <Label>{t('Your %symbol% committed', { symbol: currency.symbol })}</Label>
            <Value>{getBalanceAmount(userPoolCharacteristics.amountTokenCommittedInLP, currency.decimals).toString()}</Value>
            <PercentageOfTotal
              userAmount={userPoolCharacteristics.amountTokenCommittedInLP}
              totalAmount={publicPoolCharacteristics.totalAmountPool}
            />
          </TokenSection>
          <TokenSection img={tokenImage}>
            <Label>{t('%symbol% to receive', { symbol: token.symbol })}</Label>
            <Value>{getBalanceNumber(userPoolCharacteristics.offeringAmountInToken, token.decimals)}</Value>
          </TokenSection>
        </>
      )
    }
    if (publicIfoData.status === 'finished') {
      return userPoolCharacteristics.amountTokenCommittedInLP.isEqualTo(0) ? (
        <Flex flexDirection="column" alignItems="center">
          <Image src="/images/present.svg" width={80} height={80} mb="16px" />
          <Text>{t('You didn’t participate in this sale!')}</Text>
        </Flex>
      ) : (
        <>
          <TokenSection img="/images/farms/avax-lyd.svg" mb="24px">
            <Label>
              {t(hasClaimed ? 'Your %symbol% RECLAIMED' : 'Your %symbol% TO RECLAIM', { symbol: currency.symbol })}
            </Label>
            <Flex alignItems="center">
              <Value>{getBalanceNumber(userPoolCharacteristics.refundingAmountInLP, currency.decimals)}</Value>
              {hasClaimed && <CheckmarkCircleIcon color="success" ml="8px" />}
            </Flex>
            <PercentageOfTotal
              userAmount={userPoolCharacteristics.amountTokenCommittedInLP}
              totalAmount={publicPoolCharacteristics.totalAmountPool}
            />
          </TokenSection>
          <TokenSection img={tokenImage}>
            <Label> {t(hasClaimed ? '%symbol% received' : '%symbol% to receive', { symbol: token.symbol })}</Label>
            <Flex alignItems="center">
              {userPoolCharacteristics.purchasedTokens.isGreaterThan(0) ? (
                <Value>
                  {getBalanceNumber(userPoolCharacteristics.claimedTokens, token.decimals)} of{' '}
                  {getBalanceNumber(userPoolCharacteristics.purchasedTokens, token.decimals)}{' '}
                </Value>
              ) : (
                <Value>{getBalanceNumber(userPoolCharacteristics.offeringAmountInToken, token.decimals)}</Value>
              )}
              {!hasClaimed && userPoolCharacteristics.offeringAmountInToken.isEqualTo(0) && (
                <div ref={targetRef} style={{ display: 'flex', marginLeft: '8px' }}>
                  <HelpIcon />
                </div>
              )}
            </Flex>
          </TokenSection>
          {userPoolCharacteristics.purchasedTokens.isGreaterThan(0) &&
            !!nextReleasePercent &&
            !userPoolCharacteristics.claimableTokens.isGreaterThan(0) && (
              <TokenSection img={tokenImage} mt="24px">
                <Label> {t('Next unlock %symbol% to be received', { symbol: token.symbol })}</Label>
                <Flex alignItems="center">
                  <Value>
                    {(getBalanceNumber(userPoolCharacteristics.purchasedTokens, token.decimals) * nextReleasePercent) /
                      100}
                  </Value>
                  {!hasClaimed && userPoolCharacteristics.offeringAmountInToken.isEqualTo(0) && (
                    <div ref={targetRef} style={{ display: 'flex', marginLeft: '8px' }}>
                      <HelpIcon />
                    </div>
                  )}
                </Flex>
              </TokenSection>
            )}
        </>
      )
    }
    return null
  }
  return (
    <Box pb="24px">
      {tooltipVisible && tooltip}
      {renderTokenSection()}
    </Box>
  )
}

export default IfoCardTokens
