import React from 'react'
import { CircularProgress, Grid } from '@mui/material'
import { useParams } from 'react-router-dom'

import { Form } from '../ServiceOrderForm/Form'
import { toast } from 'react-toastify'
import { useGetServiceOrder } from '~/services/useServiceOrder'

type IProps = {
  id: string
}

export const ServiceOrderEdit: React.FC = () => {
  const { id } = useParams<IProps>()

  const { isLoading, data, isError, error } = useGetServiceOrder(id as string)

  if (isError) {
    toast.error(`Ouve um erro, ${error &&
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message
      ? error.response.data.error.message
      : 'tente novamente mais tarde.'}`)
  }

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
      {isLoading ? (
        <CircularProgress />
      ) : <Form serviceOrder={data} /> }
    </Grid>
  )
}
