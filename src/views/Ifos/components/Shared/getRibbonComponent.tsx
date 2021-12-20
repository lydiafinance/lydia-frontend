import React from 'react'
import {CardRibbon}from '@lydiafinance/uikit'
import { Ifo, IfoStatus } from 'config/constants/types'

const getRibbonComponent = (ifo: Ifo, status: IfoStatus, t: any) => {
    if (status === 'coming_soon') {
      return <CardRibbon variantColor="primaryBright" ribbonPosition="left" text={t('Coming Soon')} />
    }
  
    if (status === 'live' || (status === 'finished' && ifo.isActive)) {
      return (
        <CardRibbon
          variantColor="primary"
          ribbonPosition="left"
          style={{ textTransform: 'uppercase' }}
          text={status === 'live' ? `${t('Live')}!` : `${t('Finished')}!`}
        />
      )
    }
  
    return null
  }

  export default getRibbonComponent;