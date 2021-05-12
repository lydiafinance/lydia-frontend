/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3React } from '@web3-react/core'
import { Heading } from '@lydiafinance/uikit'
import useWeb3 from 'hooks/useWeb3'

import { useTranslation } from 'contexts/Localization'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import AirdropCard from './components/AirdropCard'
import Divider from './components/Divider'
import { useAirdropContract } from '../../hooks/useContract'

const Airdrop: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const airdropContract = useAirdropContract()
  const web3 = useWeb3()

  const [claimingAllowed, setClaimingAllowed] = useState(false)
  const [userAmount, setUserAmount] = useState(0)

  useEffect(() => {
    if (account) {
      _claimingAllowed()
      _userAmount(account)
    }
  }, [account])

  const _claimingAllowed = () => {
    airdropContract.methods.claimingAllowed().call().then(setClaimingAllowed)
  }

  const _userAmount = (_account) => {
    airdropContract.methods
      .withdrawAmount(_account)
      .call()
      .then((_value) => {
        const _amount = parseInt(web3.utils.fromWei(_value, 'ether'))
        setUserAmount(_amount)
      })
  }

  const _claim = () => {
    airdropContract.methods
      .claim()
      .send({ from: account, gas: 200000 })
      .then((res) => {
        if (res.status) {
          setUserAmount(0)
        }
      })
  }

  return (
    <Page>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {t('Airdrop')}
          </Heading>
          <Heading as="h6" size="md" mb="5px">
            {t('Claim your airdrop.')}
          </Heading>
          <Heading as="h6" size="md" mb="5px">
            {t('Create LP or stake them to Electrum,')}
          </Heading>
          <Heading as="h6" size="md" mb="5px">
            {t('And start to earn more LYD.')}
          </Heading>
        </div>
        <img src="/images/mascot_airdrop.png" alt="Electrum POOL icon" width={280} height={180} />
      </Hero>
      <Divider />
      <FlexLayout>
        <AirdropCard claimingAllowed={claimingAllowed} amount={userAmount} airdrop={null} onClaim={_claim} />
      </FlexLayout>
    </Page>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;

    li {
      margin-bottom: 4px;
    }
  }

  img {
    height: auto;
    max-width: 100%;
  }

  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Airdrop
