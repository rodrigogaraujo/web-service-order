import React, { useMemo } from 'react'
import { Button, CircularProgress, Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import * as locales from '@mui/material/locale'
import { DeleteOutline, EditOutlined } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

import { WrapperTable, WrapperButtonsAction, WrapperHeader } from './styles'
import { toast } from 'react-toastify'
import { useGetCustomers } from '~/services/useCustomer'
import { ICustomer } from '~/types'

export const Customers: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  const themeWithLocale = useMemo(
    () => createTheme(theme, locales['ptBR']),
    [theme],
  )

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 350 },
    { field: 'email', headerName: 'email', width: 300 },
    {
      field: 'phone_number',
      headerName: 'Telefone',
      width: 250,
    },
    {
      field: 'document',
      headerName: 'CPF',
      width: 250,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 100,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <WrapperButtonsAction>
          <IconButton>
            <EditOutlined onClick={() => navigate(`/dashboard/customer-edit/${params.row._id}`)}/>
          </IconButton>
          <IconButton>
            <DeleteOutline />
          </IconButton>
        </WrapperButtonsAction>
      )
    },
  ]

  const { isLoading, data, isError, error } = useGetCustomers()

  if (isError) {
    toast.error(`Houve um erro, ${error &&
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
      textAlign='center'>
      <WrapperHeader>
        <Typography variant='h5'>
        Lista de clientes
        </Typography>
        <Button
          className='auth-button'
          variant='contained'
          onClick={() =>  navigate(`/dashboard/customer-new`)}
          sx={{ minWidth: 150, maxHeight: 40 }}
        >
          Novo
        </Button>
      </WrapperHeader>
      <WrapperTable>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <ThemeProvider theme={themeWithLocale}>
            <DataGrid
              rows={data as ICustomer[]}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              sx={{ minHeight: '75vh' }}
            />
          </ThemeProvider>
        ) }
      </WrapperTable>
    </Grid>
  )
}
