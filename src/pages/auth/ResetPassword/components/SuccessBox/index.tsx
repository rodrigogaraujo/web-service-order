
import { Box, Typography } from '@mui/material'
import { ResetWrapper, BottomButtonWrapper, Link } from '../../../styles'

export const SuccessBox: React.FC = () => {
  return (
    <ResetWrapper>
      <Box className={'auth-success-box'}>
        <Typography style={{ fontWeight: 'bold' }} variant='body1' component='span'>
            E-mail enviado com sucesso.
        </Typography>
        <Typography style={{ maxWidth: '80%' }} variant='body1' component='p'>
            Acesse sua caixa de e-mail e use o link enviado para redefinir sua senha.
        </Typography>
      </Box>
      <BottomButtonWrapper className={'auth-only-link'}>
        <Link>Voltar para o login</Link>
      </BottomButtonWrapper>
    </ResetWrapper>
  )
}
