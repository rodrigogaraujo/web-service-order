import React from 'react'
import { Grid, Typography } from '@mui/material'
import { Illustration } from '~/assets/illustrations/Illustration'

export const NotFound: React.FC = () => {
  return (
    <Grid container direction='column' wrap='nowrap' alignItems='center' justifyContent='center' height='100%' textAlign='center'>
      <Illustration />

      <Typography variant='h3' component='h1'>
        Ops, página não encontrada!
      </Typography>

      <Typography>
        A página que você tentou acessar não existe.
      </Typography>
    </Grid>
  )
}
