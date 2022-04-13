
import { Button } from '@mui/material'

import TextField from '~/components/HookForm/TextField'
import { ResetWrapper, BottomButtonWrapper, Link } from '../../../styles'

export const ResetFormEmail: React.FC = () => {
  return (
    <ResetWrapper>
      <TextField
        required
        name='email'
        label='E-mail'
        placeholder='nome@email.com'
        style={{ marginTop: 35, marginBottom: 15 }}
      />
      <BottomButtonWrapper>
        <Link>Voltar para o login</Link>
        <Button
          className='auth-button'
          variant='contained'
        >
          Enviar
        </Button>
      </BottomButtonWrapper>
    </ResetWrapper>
  )
}
