import React from 'react'
import { BIG_ZERO } from 'utils/bigNumber'
import { useTranslation } from 'contexts/Localization'
import { Button,Box,Alert,Text } from '@lydiafinance/uikit'
import { Link } from 'react-router-dom'
import { getBalanceNumber } from 'utils/formatBalance'

const EligibleInfo = ({minVaultBalance,userVaultBalance}) => {
    const { t } = useTranslation()
    return (
        <>
        <Box mt="16px">
          <Alert title={t("To participate in this sale")}>
            <Text mt="5px" fontSize="14px" as="p">{t("You need to stake on Lydian's Pool at least")} {getBalanceNumber(minVaultBalance)} LYD</Text>
            {!userVaultBalance.isEqualTo(BIG_ZERO) && 
            <Text mt="5px" fontSize="12px" as="p">{t("Your current pool balance")} : {getBalanceNumber(userVaultBalance)} </Text>
            }
          </Alert>
        </Box>
        <Button mt="15px" target="_blank" as={Link} to="/pools" width="100%">
          {t("Stake on Lydian's Pool")}
        </Button>
      </>
    )
}

export default EligibleInfo;