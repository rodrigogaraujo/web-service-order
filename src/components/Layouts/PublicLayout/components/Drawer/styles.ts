import styled from 'styled-components'
import { Drawer, Box } from '@mui/material'

interface IDrawerProps {
  drawerwidth: number
}

export const StyledDrawer = styled(Drawer)<IDrawerProps>`
  flex-shrink: 0;

  .MuiDrawer-paper {
    background: ${({ theme }) => theme.palette.background.paper};
    color: ${({ theme }) => theme.palette.text.primary};
    width: ${({ drawerwidth }) => drawerwidth}px;
    overflow: auto;
    overflow-x: hidden;

    ::-webkit-scrollbar {
      width: 12px;
      background: ${({ theme }) => theme.palette.text.primary};

      border-right: 1px solid ${({ theme }) => theme.palette.text.primary};
    }

    ::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.palette.text.primary};
    }
  }

  .MuiDrawer-paperAnchorDockedLeft {
    border-right: none;
  }

  svg {
    color: ${({ theme }) => theme.palette.text.primary};
  }
`

export const Row = styled(Box)`
  display: flex;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.palette.common.white};
  padding: 0 0 0 20px;
  border: 1px solid #DEE2E6;
  border-right: none;
`

export const RowPlans = styled(Box)`
  display: flex;
  justify-content: space-around;
  padding: 5px;
`

export const ButtonMenu = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 15px;
    color: #fff;
  }
`

export const Logo = styled(Box)`
  width: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-height: 80px;
`
