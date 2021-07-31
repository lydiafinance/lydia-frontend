import React from 'react'
import BigNumber from 'bignumber.js'
import {useWeb3React} from "@web3-react/core";
import styled from "styled-components";
import {Flex, TooltipText, useTooltip} from "@lydiafinance/uikit";
import useLastUpdated from "../../../hooks/useLastUpdate";
import useGetVaultUserInfo from "../../../hooks/lydVault/useGetVaultUserInfo";
import {convertSharesToLyd} from "../../Pools/helpers";

import useGetVaultSharesInfo from "../../../hooks/lydVault/useGetVaultSharesInfo";
import {useGetApiPrice, useMaximusPools} from "../../../state/hooks";

import {BIG_TEN} from "../../../utils/bigNumber";
import {useTranslation} from "../../../contexts/Localization";
import CardValue from "./CardValue";
import CardUsdValue from "./CardUsdValue";


const Block = styled.div`
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid ${({theme}) => (theme.isDark ? '#524B63' : '#E9EAEB')};
`

const Label = styled.div`
  color: ${({theme}) => theme.colors.textSubtle};
  font-size: 14px;
`

const FarmedStakingAddCard = () => {
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

    const tooltipContent = "Auto compounded earnings from Auto LYD Pool and Maximus farms."

    const {targetRef, tooltip, tooltipVisible} = useTooltip(tooltipContent, {placement: 'bottom-start'})

    if (!account) {
        return null;
    }

    let maximusProfit = 0;

    maximusPools.forEach(p => {
        maximusProfit += p.userData.pendingReward.toNumber();
    })

    const earningsSum = maximusProfit + autoLydEarnings;


    if (!Number.isNaN(earningsSum)) {
        const earningsUsdt = earningsSum * lydPrice;
        return (
            <>
                <Block>
                    {tooltipVisible && tooltip}
                    <TooltipText ref={targetRef}>{t('Auto-Compounding LYD Earnings')}:</TooltipText>

                    <CardValue value={earningsSum} fontSize="24px" lineHeight="1.5"/>
                    <CardUsdValue key={earningsUsdt} value={earningsUsdt}/>
                </Block>
            </>
        );
    }

    return null;
}

export default FarmedStakingAddCard;
