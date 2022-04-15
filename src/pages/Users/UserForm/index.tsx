import React from 'react'
import { Grid } from '@mui/material'
import { Form } from './Form'

export const UserForm: React.FC = () => {
  const user =  { id: 1, name: 'Snow', email: 'Jon', phone: '35', active: 1, _id: '123', type: 1, password: '123' }
  return (
    <Grid
      container
      direction='column'
      wrap='nowrap'
      alignItems='center'
      justifyContent='center'
      height='100%'
      width='100%'
      textAlign='center'>
      <Form user={user} />
    </Grid>
  )
}
