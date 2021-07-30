import React, {useState, useCallback, useEffect} from 'react'
import BigNumber from 'bignumber.js'
import {useWeb3React} from "@web3-react/core";

import useLastUpdated from "../../../hooks/useLastUpdate";
import useGetVaultUserInfo from "../../../hooks/lydVault/useGetVaultUserInfo";
import {convertSharesToLyd} from "../../Pools/helpers";
import {getFullDisplayBalance} from "../../../utils/formatBalance";
import useGetVaultSharesInfo from "../../../hooks/lydVault/useGetVaultSharesInfo";
import {useMaximusPools} from "../../../state/hooks";
import useGetMaximusUserInfo from "../../../hooks/maximus/useGetMaximusUserInfo";
import useGetMaximusFees from "../../../hooks/maximus/useGetMaximusFees";
import useGetMaximusSharesInfo from "../../../hooks/maximus/useGetMaximusSharesInfo";


const FarmedStakingAddCard = () => {
    const {lastUpdated,} = useLastUpdated()
    const {account} = useWeb3React()
    const userVaultInfo = useGetVaultUserInfo(lastUpdated)
    const { totalLydInVault, pricePerFullShare } = useGetVaultSharesInfo()

    const shouldDisplayLydProfit =
        account && userVaultInfo.lydAtLastUserAction && userVaultInfo.lydAtLastUserAction.gt(0) && userVaultInfo.shares && userVaultInfo.shares.gt(0)

    const currentSharesAsLyd = convertSharesToLyd(userVaultInfo.shares, pricePerFullShare)
    const lydProfit = currentSharesAsLyd.lydAsBigNumber.minus(userVaultInfo.lydAtLastUserAction)
    const lydToDisplay = lydProfit.gte(0) ? getFullDisplayBalance(lydProfit, 18, 5) : '0'

    // -----
    const pools = useMaximusPools(account);


    let maximus = new BigNumber("0");
    console.log(maximus)


    pools.forEach(p => {
        maximus = maximus.plus(p.userData.pendingReward);
    })

    console.log(maximus.toString())


    /*

    const { pricePerFullShare2 } = useGetMaximusSharesInfo()

    const { lpSymbol, totalStaked, userData } = pool
    const { depositAt, stakedBalance } = userData || {}
    //   Estimate & manual for now. 288 = once every 5 mins. We can change once we have a better sense of this
    const timesCompoundedDaily = 12
    const accountHasSharesStaked = stakedBalance && stakedBalance.gt(0)
    // const stakingTokenPrice = useGetApiPrice(stakingToken?.symbol?.toLowerCase())
    const stakingTokenPrice = 1
    const isLoading = !pool.userData || !userInfo.shares
    const performanceFeeAsDecimal = vaultFees.performanceFee && parseInt(vaultFees.performanceFee, 10) / 100
    */
    return (
        <span>{lydToDisplay} LYD</span>
    );
}

export default FarmedStakingAddCard;
