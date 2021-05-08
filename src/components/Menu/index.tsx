import React, { useContext } from 'react'
import { Menu as UikitMenu } from '@lydiafinance/uikit'
import { useWeb3React } from '@web3-react/core'
import { languageList } from 'config/localization/languages'
import { useTranslation } from 'contexts/Localization'
import useTheme from 'hooks/useTheme'
import { useGetApiPrice } from 'state/hooks'
import useAuth from 'hooks/useAuth'
import config from './config'
// const { profile } = useProfile()

const Menu = (props) => {
  const { account } = useWeb3React()
  const { login, logout } = useAuth()
  const { currentLanguage, setLanguage } = useTranslation()
  const { isDark, toggleTheme } = useTheme()
  const lydPrice = useGetApiPrice('lyd')

  return (
    <UikitMenu
      account={account}
      login={login}
      logout={logout}
      isDark={isDark}
      toggleTheme={toggleTheme}
      links={config}
      currentLang={currentLanguage.code}
      langs={languageList}
      setLang={setLanguage}
      lydPriceUsd={lydPrice}
      profile={null}
      {...props}
    />
  )
}

export default Menu
