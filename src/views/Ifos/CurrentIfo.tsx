import React from 'react'
import { ifosConfig } from 'config/constants'
import IfoLayout from './components/IfoLayout'
import IfoSteps from './components/IfoSteps'
import IfoQuestions from './components/IfoQuestions'
import IfoCardV2Data from './components/IfoCardV2Data'
import IfoCardV3Data from './components/IfoCardV3Data'

/**
 * Note: currently there should be only 1 active IFO at a time
 */
const activeIfo = ifosConfig.find((ifo) => ifo.isActive)
const inDevelopmentIfo = ifosConfig.find((ifo) => ifo.inDevelopment)

const Ifo = () => {
  return (
    <IfoLayout>
      <IfoCardV3Data key={inDevelopmentIfo.id} ifo={inDevelopmentIfo} isInitiallyVisible />
      <IfoCardV2Data key={activeIfo.id} ifo={activeIfo} isInitiallyVisible={false} />
      <IfoSteps />
      <IfoQuestions />
    </IfoLayout>
  )
}

export default Ifo
