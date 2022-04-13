import React, { useState, useEffect } from 'react'

import { DrawerMenu } from './components/Drawer'
import { Header } from './components/Header'

import { Wrapper, Content } from './styles'

export const PublicLayout: React.FC = ({ children }) => {
  const [visibleDrawer, setVisibleDrawer] = useState(true)

  const drawerWidth = 270

  const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  }

  const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    )

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
  }

  const handleDrawer = () => {
    setVisibleDrawer(!visibleDrawer)
  }

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width <= 960) {
      setVisibleDrawer(false)
    }
  }, [width])

  return (
    <Wrapper>
      <Header
        handleDrawer={handleDrawer}
        visibleDrawer={visibleDrawer}
        drawerWidth={drawerWidth}
      />
      <DrawerMenu
        handleDrawer={handleDrawer}
        visibleDrawer={visibleDrawer}
        drawerWidth={drawerWidth} />

      <Content visibleDrawer={visibleDrawer} drawerWidth={drawerWidth}>
        {children}
      </Content>
    </Wrapper>
  )
}
