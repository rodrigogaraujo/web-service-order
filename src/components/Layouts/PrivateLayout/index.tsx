import React from 'react'

import logo from '~/assets/images/logo.png'

import { Wrapper, RedBg, Copyright, Content, IconWrapper } from './styles'

interface IPrivateLayout {
  children: React.ReactNode
}

export const PrivateLayout = ({ children }: IPrivateLayout) => {
  return (
    <Wrapper>
      <RedBg />
      <Content>
        <IconWrapper>
          <img src={logo} width={120} alt='G3 Infotech' />
        </IconWrapper>
        {children}
      </Content>
      <Copyright>© 2021 – G3 Infotech</Copyright>
    </Wrapper>
  )
}
