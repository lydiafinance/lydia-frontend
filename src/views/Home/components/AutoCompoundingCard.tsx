import React from 'react'
import BigNumber from 'bignumber.js'
import {useWeb3React} from "@web3-react/core";
import styled from "styled-components";
import {Card} from "@lydiafinance/uikit";

import useLastUpdated from "../../../hooks/useLastUpdate";
import useGetVaultUserInfo from "../../../hooks/lydVault/useGetVaultUserInfo";
import {convertSharesToLyd} from "../../Pools/helpers";

import useGetVaultSharesInfo from "../../../hooks/lydVault/useGetVaultSharesInfo";
import {useGetApiPrice, useMaximusPools} from "../../../state/hooks";

import {BIG_TEN} from "../../../utils/bigNumber";
import {useTranslation} from "../../../contexts/Localization";
import CardValue from "./CardValue";
import CardUsdValue from "./CardUsdValue";


const CardBody = styled.div`
  padding: 10px 20px;
`

const StyledAutoCompoundingCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`

const CardHeader = styled.div`
  color: ${({theme}) => theme.colors.avalanche};
  font-weight: bold;
`

const CardNumbers = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: auto 1fr;
  grid-gap: 4px;
`

const AutoCompoundingCard = () => {
    const {t} = useTranslation()
    const {lastUpdated,} = useLastUpdated()
    const {account} = useWeb3React()

    const lydPrice = useGetApiPrice('lyd')

    // Auto LYD
    const autoVaultUserInfo = useGetVaultUserInfo(lastUpdated)
    const {pricePerFullShare: autoVaultPerShare} = useGetVaultSharesInfo()

    const currentSharesAsLyd = convertSharesToLyd(autoVaultUserInfo.shares, autoVaultPerShare)
    const autoLydProfit = currentSharesAsLyd.lydAsBigNumber.minus(autoVaultUserInfo.lydAtLastUserAction)
    const autoLydEarnings = new BigNumber(autoLydProfit).dividedBy(BIG_TEN.pow(18)).toNumber()

    // Maximus
    const maximusPools = useMaximusPools(account);

    if (!account) {
        return null;
    }

    let maximusProfit = 0;

    maximusPools.forEach(p => {
        maximusProfit += p.userData.pendingReward.toNumber();
    })

    const earningsSum = maximusProfit + autoLydEarnings;

    if (!Number.isNaN(earningsSum) && earningsSum > 0) {
        const earningsUsdt = earningsSum * lydPrice;
        return (
            <>
                <StyledAutoCompoundingCard>
                    <CardBody>
                        <CardHeader> {t('Auto-Compounding LYD Earnings')}</CardHeader>
                        <CardNumbers>
                            <CardValue value={earningsSum} fontSize="24px" lineHeight="1.5"/>
                            <CardUsdValue key={earningsUsdt} value={earningsUsdt}/>
                        </CardNumbers>
                    </CardBody>
                </StyledAutoCompoundingCard>
            </>
        );
    }

    return null;
}

export default AutoCompoundingCard;
