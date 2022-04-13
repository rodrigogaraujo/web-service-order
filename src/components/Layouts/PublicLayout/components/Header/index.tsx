import React from 'react'
import { Typography, useTheme } from '@mui/material'
import {  Menu, PersonOutline } from '@mui/icons-material'

import {
  StyledAppBar,
  StyledToolbar,
  Row,
  StyledIconButton,
  WrapperTitle,
  WrapperHeaderOptions,
} from './styles'
import { useAuth } from '~/hooks/Auth'

interface IHeaderProps {
  handleDrawer: React.MouseEventHandler<HTMLButtonElement>,
  visibleDrawer: boolean,
  drawerWidth: number
}

export const Header = ({ handleDrawer, visibleDrawer, drawerWidth }: IHeaderProps) => {
  const theme = useTheme()
  const { user } = useAuth()
  return (
    <StyledAppBar
      elevation={0}
      position='fixed'
      drawerwidth={drawerWidth}
      sx={{
        width: { sm: '100%',
          md: visibleDrawer ? `calc(100% - ${drawerWidth}px)` : '100%',
        }
      }}
    >
      <StyledToolbar>
        <Row>
          <StyledIconButton
            color='secondary'
            onClick={handleDrawer}
            edge='start'
            visible={visibleDrawer ? true : false}
          >
            <Menu style={{ color: theme.palette.text.primary }} />
          </StyledIconButton>
          <WrapperTitle visibledrawer={visibleDrawer ? true : false} drawerwidth={drawerWidth}>
            <WrapperHeaderOptions>
              <PersonOutline style={{ marginRight: 8, color: theme.palette.primary.main }} />
              <Typography
                style={{ color: theme.palette.text.primary }}
              >
                {user.name}
              </Typography>
            </WrapperHeaderOptions>
          </WrapperTitle>
        </Row>
      </StyledToolbar>
    </StyledAppBar>
  )
}
