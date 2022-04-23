import React from 'react'
import { Hidden, IconButton, Divider, List, useTheme, Typography, Box } from '@mui/material'
import { ChevronLeft } from '@mui/icons-material'
import { useLocation } from 'react-router-dom'

import { StyledDrawer, Row, Logo } from './styles'

import { DrawerItem } from './components/DrawerItem'

import logoWhite from '~/assets/images/logo_white.png'
import buildingWhite from '~/assets/icons/building_white.svg'
import buildingGreen from '~/assets/icons/building_red.svg'
import clipboardWhite from '~/assets/icons/clipboard_white.svg'
import clipboardGreen from '~/assets/icons/clipboard_red.svg'
import pencilWhite from '~/assets/icons/pencil_white.svg'
import pencilGreen from '~/assets/icons/pencil_red.svg'
import customerWhite from '~/assets/icons/customers.png'
import customerColor from '~/assets/icons/customers_color.png'

interface IDrawerMenuProps {
  handleDrawer: React.MouseEventHandler<HTMLButtonElement>,
  visibleDrawer: boolean,
  drawerWidth: number
}

export const DrawerMenu = ({ handleDrawer, visibleDrawer, drawerWidth }: IDrawerMenuProps) => {
  const theme = useTheme()
  const location = useLocation()

  const currentLink = location.pathname.substr(location.pathname.indexOf('/'))

  const listMenu = [
    {
      title: 'Gerenciamento',
      items: [{
        id: 1,
        name: 'Dashboard',
        link: '/dashboard',
        icon: buildingGreen,
        iconSelected: buildingWhite,
        disabled: false
      }, {
        id: 2,
        name: 'Usuários',
        link: '/dashboard/users',
        icon: pencilGreen,
        iconSelected: pencilWhite,
        disabled: false
      }, {
        id: 3,
        name: 'Clientes',
        link: '/dashboard/customers',
        icon: customerColor,
        iconSelected: customerWhite,
        disabled: false
      }, {
        id: 5,
        name: 'Ordem de serviço',
        link: '/dashboard/service-order',
        icon: clipboardGreen,
        iconSelected: clipboardWhite,
        disabled: false
      }],
    },
  ]

  const checkSelected = (itemLink: string) => {
    return itemLink === currentLink
  }

  const ItemsDrawer = () => {
    return (
      <Box sx={{ minHeight: '100vh', position: 'relative' }}>
        <Row>
          <Logo>
            <img src={logoWhite} width={120} alt='ginfotech' />
          </Logo>
          <IconButton onClick={handleDrawer}>
            <ChevronLeft style={{ color: theme.palette.primary.main }}/>
          </IconButton>
        </Row>
        <Divider />

        <List>
          {listMenu.map(item => (
            <Box marginTop={3}>
              <Typography component='span' marginLeft={2}>{item.title}</Typography>
              <Box marginTop={1.5}>
                {item.items.map(itm => (
                  <DrawerItem
                    key={itm.id}
                    item={itm}
                    checkSelected={checkSelected}
                    icon={itm.icon}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </List>
        <Box sx={{ position: 'absolute', bottom: 16 }}>
          <Typography component='span' marginLeft={2}>© 2021 – ginfotech</Typography>
        </Box>
      </Box>
    )
  }

  return (
    <>
      <Hidden smDown>
        <StyledDrawer
          variant='persistent'
          anchor='left'
          ModalProps={{
            disableScrollLock: true,
          }}
          drawerwidth={drawerWidth}
          open={visibleDrawer}
        >
          {ItemsDrawer()}
        </StyledDrawer>
      </Hidden>

      <Hidden mdUp>
        <StyledDrawer
          variant='temporary'
          anchor='left'
          drawerwidth={drawerWidth}
          open={visibleDrawer}
          onClose={handleDrawer}
          ModalProps={{
            keepMounted: true,
            disableScrollLock: true,
          }}
        >
          {ItemsDrawer()}
        </StyledDrawer>
      </Hidden>
    </>
  )
}
