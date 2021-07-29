import React, {useState, useCallback, useEffect} from 'react'

import {useWeb3React} from "@web3-react/core";

import useLastUpdated from "../../../hooks/useLastUpdate";
import useGetVaultUserInfo from "../../../hooks/lydVault/useGetVaultUserInfo";
import {convertSharesToLyd} from "../../Pools/helpers";
import {getFullDisplayBalance} from "../../../utils/formatBalance";
import useGetVaultSharesInfo from "../../../hooks/lydVault/useGetVaultSharesInfo";


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


    return (
        <span>{lydToDisplay} LYD</span>
    );
}

export default FarmedStakingAddCard;
