import { Box } from '@mui/material'
import styled from 'styled-components'

interface IContentProps {
  drawerWidth?: number,
  visibleDrawer?: boolean
}

export const Wrapper = styled(Box)`
  height: 100%;
`

export const ContentMenu = styled(Box)`
  display: flex;
`

export const Content = styled(Box)<IContentProps>`
  flex-grow: 1;
  padding: 80px 20px 20px;
  margin-left: ${({ visibleDrawer, drawerWidth }) =>
    visibleDrawer ? `${drawerWidth}px` : '0px'};
  transition: all 0.5s ease-in-out;

  @media (max-width: 960px) {
    margin-left: 0;
  }
`
