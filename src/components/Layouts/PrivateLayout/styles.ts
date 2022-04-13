import { Typography, Box } from '@mui/material'
import styled from 'styled-components'

export const Wrapper = styled(Box)`
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  align-items: center;
  overflow: hidden;
`

export const RedBg = styled(Box)`
  position: absolute;
  left: 0px;
  right: -6.07px;
  top: 0.32px;
  bottom: 449.13px;

  background: ${({ theme }) => theme.palette.primary.main};
  transform: matrix(1, -0.09, 0, 1, 0, 0);
  height: 450px;
  top: -200px;
`

export const Content = styled(Box)`
  z-index: 999;
  background-color: ${({ theme }) => theme.palette.background.paper};
  padding: 32px;
  border: 1px solid #CED4DA;
  box-sizing: border-box;
  /* Shadows / 03. Larger */
  box-shadow: 0px 16px 48px rgba(0, 0, 0, 0.176);
  border-radius: 4px;
  width: 541px;
`

export const IconWrapper = styled.div`
    display: flex;
    justify-content: center;

    img {
      position: relative;
      width: 65px;
    }
`

export const Copyright = styled(Typography)`
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  bottom: 0;
  color: ${({ theme }) => theme.palette.text.primary};
  font-size: 14px;
`