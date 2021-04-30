import { useState, useEffect } from 'react'

const breakpoints = {
  xxs: 320,
  xs: 480,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1600,
  width: window.innerWidth,
}

function useDeviceSize() {
  const [deviceSize, setDeviceSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  })

  useEffect(() => {
    function handleResize() {
      const isMobile = breakpoints.sm >= window.innerWidth
      const isTablet = !isMobile && breakpoints.md >= window.innerWidth
      const isDesktop = !isMobile && !isTablet
      const canChange =
        deviceSize.isMobile !== isMobile || deviceSize.isTablet !== isTablet || deviceSize.isDesktop !== isDesktop

      if (canChange) {
        setDeviceSize({
          isMobile,
          isTablet,
          isDesktop,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [deviceSize])

  return deviceSize
}

export default useDeviceSize
