
import { Divider, Typography } from '@mui/material'
import { useState } from 'react'
import { Form, TitleWrapper } from '../styles'

import { ResetFormEmail } from './components/ResertFormEmail'
import { SuccessBox } from './components/SuccessBox'

export const ResetPassword: React.FC = () => {
  const [isSuccess, setSuccess] = useState<boolean>(true)

  return (
    <Form>
      <TitleWrapper className='auth-title-subtitle'>
        <Typography variant='h3' component='h2'>
            Redefinir senha
        </Typography>
        <Typography variant='subtitle1' component='h4'>
            Informe seu e-mail cadastrado abaixo e vamos lhe enviar um código para definir uma nova senha.
        </Typography>
      </TitleWrapper>
      <Divider />
      {
        isSuccess
          ? <SuccessBox />
          : <ResetFormEmail />
      }
    </Form>
  )
}
