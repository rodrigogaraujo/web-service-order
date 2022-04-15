import React from 'react'
import { Grid } from '@mui/material'

import { Form } from './Form'

export const CustomerForm: React.FC = () => {
  return (
    <Grid
      container
      direction='column'
      wrap='nowrap'
      alignItems='center'
      justifyContent='center'
      height='100%'
      width='100%'
      paddingTop={5}
      textAlign='center'>
      <Form customer={undefined} />
    </Grid>
  )
}
