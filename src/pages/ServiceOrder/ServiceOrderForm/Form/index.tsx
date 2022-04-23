import { useEffect, useState } from 'react'
import { Autocomplete, Box, Button, CircularProgress,  FormControl,  Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import InputMask from 'react-input-mask'

import TextInput from '~/components/HookForm/TextField'
import { useGetUsers } from '~/services/useUser'
import { ICustomer, IServiceOrder } from '~/types'
import { IUser } from '~/hooks/Auth'
import { useGetCustomers } from '~/services/useCustomer'
import { usePostServiceOrder, useUpdateServiceOrder } from '~/services/useServiceOrder'
interface IProps {
  serviceOrder?: IServiceOrder
}
export const Form = ({ serviceOrder }: IProps) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    description: yup.string().required('Descrição obrigatório'),
    priority: yup.number().required('Prioridade obrigatório'),
    status: yup.number().required('Status obrigatório'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      customer: serviceOrder ? serviceOrder.customer : undefined,
      description: serviceOrder ? serviceOrder.description : '',
      user: serviceOrder ? serviceOrder.user : undefined,
      priority: serviceOrder ? serviceOrder.priority : 1,
      status: serviceOrder ? serviceOrder.status : 1,
      phone_number: serviceOrder && serviceOrder.customer ? serviceOrder.customer.phone_number : '',
      street: serviceOrder && serviceOrder.customer && serviceOrder.customer.address ? serviceOrder.customer.address?.street || '' : '',
      number: serviceOrder && serviceOrder.customer && serviceOrder.customer.address ? serviceOrder.customer.address?.number || '' : '',
      complement: serviceOrder && serviceOrder.customer && serviceOrder.customer.address ? serviceOrder.customer.address?.complement || '' : '',
      neighborhood: serviceOrder && serviceOrder.customer && serviceOrder.customer.address ? serviceOrder.customer.address?.neighborhood || '' : '',
      city: serviceOrder && serviceOrder.customer && serviceOrder.customer.address ? serviceOrder.customer.address?.city || '' : '',
      zipcode: serviceOrder && serviceOrder.customer && serviceOrder.customer.address ? serviceOrder.customer.address?.zipcode || '' : '',
      state: serviceOrder && serviceOrder.customer && serviceOrder.customer.address ? serviceOrder.customer.address?.state || '' : '',
    },
  })

  const onSubmit = async (data: IServiceOrder) => {
    if (!data.user) {
      toast.error('Selecione um usuário')
      return
    }
    if (!data.customer) {
      toast.error('Selecione um cliente')
      return
    }
    try {
      setLoading(true)
      if (serviceOrder) {
        updateServiceOrder.mutate({ ...data, _id: serviceOrder._id })
      } else {
        createServiceOrder.mutate(data)
      }
      setLoading(false)
    } catch (er) {
      setLoading(false)
    }
  }

  const createServiceOrder = usePostServiceOrder({
    onSuccess: async (data) => {
      toast.success('Ordem de serviço criada com sucesso.')
      navigate(`/dashboard/service-order-edit/${data._id}`)
    },
    onError: (er) => {
      toast.error(
        er &&
          er.response &&
          er.response.data &&
          er.response.data.error &&
          er.response.data.error.message
          ? er.response.data.error.message
          : 'Houve um erro, tente novamente mais tarde.')
    },
  })

  const updateServiceOrder = useUpdateServiceOrder({
    onSuccess: async () => {
      toast.success('Ordem de serviço atualizado com sucesso.')
    },
    onError: (er) => {
      toast.error(
        er &&
          er.response &&
          er.response.data &&
          er.response.data.error &&
          er.response.data.error.message
          ? er.response.data.error.message
          : 'Houve um erro, tente novamente mais tarde.')
    },
  })

  const { isLoading, data: dataUsers, isError, error } = useGetUsers()
  const { isLoading: isLoadingCustomers, data: dataCustomers, isError: isErrorCustomers, error: errorCustomers } = useGetCustomers()

  if (isError) {
    toast.error(`Houve um erro, ${error &&
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.error.message
      ? error.response.data.error.message
      : 'tente novamente mais tarde.'}`)
  }

  if (isErrorCustomers) {
    toast.error(`Houve um erro, ${errorCustomers &&
      errorCustomers.response &&
      errorCustomers.response.data &&
      errorCustomers.response.data.errorCustomers &&
      errorCustomers.response.data.errorCustomers.message
      ? errorCustomers.response.data.errorCustomers.message
      : 'tente novamente mais tarde.'}`)
  }

  useEffect(() => {
    if (errors && errors.description && errors.description.message) {
      toast.error(errors.description.message)
    }
  }, [errors])

  useEffect(() => {
    if (serviceOrder && serviceOrder._id) {
      setValue('user', serviceOrder.user)
      setValue('customer', serviceOrder.customer)
      setValue('description', serviceOrder.description)
    }
  }, [setValue, serviceOrder])

  return (
    isLoading || isLoadingCustomers? (
      <CircularProgress />
    ) : (
      <Grid
        container
        direction='column'
        wrap='nowrap'
        alignItems='center'
        justifyContent='center'
        height='100%'
        width='100%'
        textAlign='center'>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name='customer'
              render={({ field: { onBlur, value } }) => (
                <Autocomplete
                  id='user-select'
                  options={dataCustomers as ICustomer[]}
                  autoHighlight
                  value={value as ICustomer}
                  onChange={(_, newValue) => {
                    setValue('customer', newValue as ICustomer)
                    setValue('phone_number', newValue?.phone_number || '')
                    setValue('street', newValue?.address?.street || '')
                    setValue('number', newValue?.address?.number || '')
                    setValue('complement', newValue?.address?.complement || '')
                    setValue('neighborhood', newValue?.address?.neighborhood || '')
                    setValue('zipcode', newValue?.address?.zipcode || '')
                    setValue('state', newValue?.address?.state || '')
                  }}
                  onBlur={onBlur}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box component='li' {...props} key={option.id}>
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Selecione um cliente'
                      fullWidth
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              control={control}
              name='user'
              render={({ field: { onChange, onBlur, value } }) => (
                <Autocomplete
                  id='user-select'
                  options={dataUsers as IUser[]}
                  autoHighlight
                  value={value as IUser}
                  onChange={(_, newValue) => {
                    setValue('user', newValue as IUser)
                  }}
                  onBlur={onBlur}
                  getOptionLabel={(option) => option.name}
                  renderOption={(props, option) => (
                    <Box component='li' {...props}>
                      {option.name}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label='Selecione um usuário'
                      fullWidth
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} md={12}>
            <Controller
              control={control}
              name='description'
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  required
                  name='description'
                  label='Descrição'
                  placeholder='Descrição'
                  className='auth-input'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='priority-label-select'>Prioridade</InputLabel>
              <Controller
                control={control}
                name='priority'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    required
                    labelId='priority-label-select'
                    name='active'
                    label='Prioridade'
                    placeholder='Prioridade'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    fullWidth
                  >
                    <MenuItem value={1}>Baixa</MenuItem>
                    <MenuItem value={2}>Normal</MenuItem>
                    <MenuItem value={3}>Urgente</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id='status-label-select'>Status</InputLabel>
              <Controller
                control={control}
                name='status'
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    required
                    labelId='status-label-select'
                    name='active'
                    label='Status'
                    placeholder='Status'
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    fullWidth
                  >
                    <MenuItem value={1}>Aguardando</MenuItem>
                    <MenuItem value={2}>Em progresso</MenuItem>
                    <MenuItem value={3}>Finalizada</MenuItem>
                  </Select>
                )}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={1}>
          <Grid item xs={12} md={12}>
            <Typography variant='h5'>
            Dados do cliente
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} md={2}>
            <Typography variant='body1'>
            Telefone
            </Typography>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant='body1'>
            Logradouro
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant='body1'>
            Número
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} marginBottom={2}>
          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name='customer'
              render={({ field: { onChange, onBlur, value } }) => (
                <InputMask
                  mask='(99) 99999-9999'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value?.phone_number || ''}
                  required
                  name='phone'
                  className='auth-input'
                >
                  {() => (
                    <TextInput
                      required
                      variant='outlined'
                      name='phone'
                      className='auth-input'/>
                  )}
                </InputMask>
              )}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Controller
              control={control}
              name='street'
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  required
                  name='street'
                  className='auth-input'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Controller
              control={control}
              name='number'
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  required
                  name='number'
                  className='auth-input'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignSelf='center' justifyContent='center'>
          <Grid item xs={3} md={3} alignSelf='center'>
            <Button
              className='auth-button'
              variant='contained'
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              fullWidth
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  )
}
