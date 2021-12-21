import React from 'react'
import { ifosConfig } from 'config/constants'
import { Ifo } from 'config/constants/types'
import IfoCardV1Data from './components/IfoCardV1Data'
import IfoCardV2Data from './components/IfoCardV2Data'
import IfoCardV3Data from './components/IfoCardV3Data'
import IfoLayout from './components/IfoLayout'

const inactiveIfo: Ifo[] = ifosConfig.filter((ifo) => !ifo.isActive)

const PastIfo = () => {
  return (
    <IfoLayout>
      {inactiveIfo.length === 0 && 'No past IFO'}
      {inactiveIfo.map((ifo) => {
        switch(ifo.version) { 
          case 1: { 
            return <IfoCardV1Data key={ifo.id} ifo={ifo} isInitiallyVisible={false} />
          } 
          case 2: { 
            return <IfoCardV2Data key={ifo.id} ifo={ifo} isInitiallyVisible={false} />
          } 
          default: { 
            return <IfoCardV3Data key={ifo.id} ifo={ifo} isInitiallyVisible={false} />
          } 
        } 
      }
      )}
    </IfoLayout>
  )
}

export default PastIfo
