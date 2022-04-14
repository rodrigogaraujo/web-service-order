import React, { useMemo } from 'react'
import { Grid, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import * as locales from '@mui/material/locale'
import { DeleteOutline, EditOutlined } from '@mui/icons-material'

import { WrapperTable, WrapperButtonsAction } from './styles'

export const Users: React.FC = () => {

  const theme = useTheme()

  const themeWithLocale = useMemo(
    () => createTheme(theme, locales['ptBR']),
    [theme],
  )

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Nome', width: 300 },
    { field: 'email', headerName: 'email', width: 300 },
    {
      field: 'phone',
      headerName: 'Telefone',
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Ações',
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <WrapperButtonsAction>
          <IconButton>
            <EditOutlined />
          </IconButton>
          <IconButton>
            <DeleteOutline />
          </IconButton>
        </WrapperButtonsAction>
      )
    },
  ]

  const rows = [
    { id: 1, name: 'Snow', email: 'Jon', phone: '35' },
    { id: 2, name: 'Lannister', email: 'Cersei', phone: '42' },
    { id: 3, name: 'Lannister', email: 'Jaime', phone: '45' },
    { id: 4, name: 'Stark', email: 'Arya', phone: '16' },
    { id: 5, name: 'Targaryen', email: 'Daenerys', phone: '44' },
    { id: 6, name: 'Melisandre', email: 'Daenerys', phone: '150' },
    { id: 7, name: 'Clifford', email: 'Ferrara', phone: '44' },
    { id: 8, name: 'Frances', email: 'Rossini', phone: '36' },
    { id: 9, name: 'Roxie', email: 'Harvey', phone: '65' },
  ]

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
      <Typography>
        Usuários
      </Typography>
      <WrapperTable>
        <ThemeProvider theme={themeWithLocale}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </ThemeProvider>
      </WrapperTable>
    </Grid>
  )
}
