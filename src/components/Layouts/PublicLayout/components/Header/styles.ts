import styled, { css } from 'styled-components'
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Box,
} from '@mui/material'
import { width, breakpoints } from '@mui/system'

interface IPropsVisible {
  visible?: boolean
}

interface IAppBarProps {
  drawerwidth: number,
  visibledrawer?: boolean
}

const sizeScreenWidth = window.innerWidth

export const StyledAppBar = styled(AppBar)<IAppBarProps>`
  background: ${({ theme }) => theme.palette.background.paper};
  transition: width 0.5s;
  ${breakpoints(width)};
  border: 1px solid #DEE2E6;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
  margin: 0px 0px;
`

export const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  width: 100%;
`

export const Row = styled(Box)`
  display: flex;
  align-items: center;
`

export const StyledButton = styled(Button)`
  margin: 0px 5px;
  cursor: pointer;

  span {
    color: ${({ theme }) => theme.palette.text.primary};
  }

  @media (max-width: 600px) {
    width: 100px;

    span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 0.8rem;
    }
  }

  @media (max-width: 450px) {
    span {
      font-size: 0.7rem;
    }
  }

  @media (max-width: 400px) {
    max-width: 100%;

    span {
      white-space: nowrap;
      overflow: visible;
      text-overflow: clip;
      font-size: 0.7rem;
    }
  }
`

export const StyledIconButton = styled(IconButton)<IPropsVisible>`
  margin-right: 8px;

  ${({ visible }) =>
    visible &&
    css`
      display: none;
    `}
`

export const WrapperTitle = styled(Box)<IAppBarProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  min-width: ${({ drawerwidth, visibledrawer }) => visibledrawer ? sizeScreenWidth - drawerwidth - 80 : sizeScreenWidth - 80}px;
`

export const WrapperHeaderOptions = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`
