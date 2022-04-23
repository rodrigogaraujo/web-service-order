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
import { useGetServiceOrders } from '~/services/useServiceOrder'
import { IServiceOrder } from '~/types'

export const ServiceOrder: React.FC = () => {
  const navigate = useNavigate()
  const theme = useTheme()

  const themeWithLocale = useMemo(
    () => createTheme(theme, locales['ptBR']),
    [theme],
  )

  const handlePriority = (number: number) => {
    switch (number) {
    case 1:
      return 'Baixa'
    case 2:
      return 'Média'
    default:  return 'Alta'
    }
  }

  const handleStatus = (number: number) => {
    switch (number) {
    case 1:
      return 'Aguardando'
    case 2:
      return 'Em progresso'
    default:  return 'Finalizada'
    }
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'customer.name', headerName: 'Nome', width: 350,
      renderCell: (params: any) => (
        <Typography variant='body1' >{params.row.customer.name}</Typography>
      )
    },
    {
      field: 'customer.email', headerName: 'email', width: 300,
      renderCell: (params: any) => (
        <Typography variant='body1' >{params.row.customer.email}</Typography>
      )
    },
    {
      field: 'customer.phone',
      headerName: 'Telefone',
      width: 150,
      renderCell: (params: any) => (
        <Typography variant='body1' >{params.row.customer.phone_number}</Typography>
      )
    },
    {
      field: 'priority',
      headerName: 'Prioridade',
      width: 150,
      renderCell: (params: any) => (
        <Typography variant='body1'>{handlePriority(params.row.priority)}</Typography>
      )
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params: any) => (
        <Typography variant='body1'>{handleStatus(params.row.status)}</Typography>
      )
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params: any) => (
        <WrapperButtonsAction>
          <IconButton>
            <EditOutlined onClick={() => navigate(`/dashboard/service-order-edit/${params.row._id}`)}/>
          </IconButton>
          <IconButton>
            <DeleteOutline />
          </IconButton>
        </WrapperButtonsAction>
      )
    },
  ]

  const { isLoading, data, isError, error } = useGetServiceOrders()

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
        Ordem de serviço
        </Typography>
        <Button
          className='auth-button'
          variant='contained'
          onClick={() =>  navigate(`/dashboard/service-order-new`)}
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
              rows={data as IServiceOrder[]}
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
