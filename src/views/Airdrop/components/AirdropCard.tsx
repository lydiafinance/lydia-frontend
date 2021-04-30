/* eslint-disable no-nested-ternary */
import React from 'react'
import { Button, Image } from '@lydiafinance/uikit'
import { useWeb3React } from '@web3-react/core'
import styled, { keyframes } from 'styled-components'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
import { getLydAddress } from 'utils/addressHelpers'
import useI18n from 'hooks/useI18n'
import Balance from 'components/Balance'
import { Pool } from 'state/types'
import Card from './Card'
import CardFooter from './CardFooter'

interface HarvestProps {
  airdrop?: Pool
  amount?: number
  claimingAllowed?: boolean
  onClaim?: () => void
}

const RainbowLight = keyframes`
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    #e60040 0%,
    #f9d92e 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    #15b0f8 50%,
    rgba(28, 127, 238, 1) 60%,
    #2f1b6d 70%,
    rgba(186, 12, 248, 1) 80%,
    #d4008f 90%,
    #f9d92e 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 32px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const AirdropCard: React.FC<HarvestProps> = ({ onClaim, amount, claimingAllowed }) => {
  const TranslateString = useI18n()
  const { account } = useWeb3React()
  const userCanClaim = claimingAllowed && Number(amount) > 0

  return (
    <Card isActive={!userCanClaim && claimingAllowed} isFinished={userCanClaim}>
      {userCanClaim && <StyledCardAccent />}
      <div
        style={{
          padding: '24px',
          textAlign: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Image src="/images/lyd.svg" alt="lyd" width={64} height={64} />
        <Balance value={amount} isDisabled={!userCanClaim} />
        <Label
          isFinished={userCanClaim || !claimingAllowed}
          text={TranslateString(330, userCanClaim ? 'No LYD to claim' : `Unclaimed LYD`)}
        />
        <StyledCardActions>
          {!account && <UnlockButton />}
          {account && (
            <>
              <Button disabled={!userCanClaim} onClick={onClaim}>
                {userCanClaim ? 'Claim LYD' : Number(amount) > 0 ? 'Claiming is not allowed, yet' : 'No LYD to claim'}
              </Button>
            </>
          )}
        </StyledCardActions>
      </div>
      <CardFooter tokenName="LYD" tokenAddress={getLydAddress()} tokenDecimals={18} />
    </Card>
  )
}

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px 0;
  width: 100%;
  box-sizing: border-box;
`

export default AirdropCard
