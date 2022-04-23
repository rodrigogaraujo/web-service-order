import { useEffect, useState } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputMask from 'react-input-mask'
import { useNavigate } from 'react-router-dom'

import TextInput from '~/components/HookForm/TextField'
import { ICustomer } from '~/types'
import { usePostCustomer, useUpdateCustomer } from '~/services/useCustomer'
interface IProps {
  customer?: ICustomer
}
export const Form = ({ customer }: IProps) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    name: yup.string().required('Nome obrigatório'),
    phone_number: yup.string().required('Telefone obrigatório'),
    document: yup.string().required('Documento obrigatório'),
    neighborhood: yup.string().required('Bairro obrigatório'),
    number: yup.string().required('Número obrigatório'),
    street: yup.string().required('Logradouro obrigatório'),
    zipcode: yup.string().required('CEP obrigatório'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: customer ? customer.name : '',
      email: customer ? customer.email : '',
      phone_number: customer ? customer.phone_number : '',
      active: customer ? customer.active : 1,
      document: customer ? customer.document : '',
      password: '',
      city: customer?.address?.city ||'',
      complement: customer?.address?.complement ||'',
      neighborhood: customer?.address?.neighborhood ||'',
      number: customer?.address?.number ||'',
      state: customer?.address?.state ||'',
      street: customer?.address?.street ||'',
      zipcode: customer?.address?.zipcode ||''
    },
  })

  const onSubmit = async (data: ICustomer) => {
    try {
      setLoading(true)
      if (customer) {
        updateCustomer.mutate({ ...data, _id: customer._id })
      } else {
        createCustomer.mutate(data)
      }
      setLoading(false)
    } catch (er) {
      setLoading(false)
    }
  }

  const createCustomer = usePostCustomer({
    onSuccess: async (data) => {
      toast.success('Usuário criado com sucesso.')
      navigate(`/dashboard/customer-edit/${data._id}`)
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

  const updateCustomer = useUpdateCustomer({
    onSuccess: async () => {
      toast.success('Usuário atualizado com sucesso.')
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

  useEffect(() => {
    if (errors && errors.email && errors.email.message) {
      toast.error(errors.email.message)
    }
    if (errors && errors.name && errors.name.message) {
      toast.error(errors.name.message)
    }
    if (errors && errors.phone_number && errors.phone_number.message) {
      toast.error(errors.phone_number.message)
    }
    if (errors && errors.document && errors.document.message) {
      toast.error(errors.document.message)
    }
    if (errors && errors.neighborhood && errors.neighborhood.message) {
      toast.error(errors.neighborhood.message)
    }
    if (errors && errors.number && errors.number.message) {
      toast.error(errors.number.message)
    }
    if (errors && errors.street && errors.street.message) {
      toast.error(errors.street.message)
    }
    if (errors && errors.zipcode && errors.zipcode.message) {
      toast.error(errors.zipcode.message)
    }
  }, [errors])

  useEffect(() => {
    if (customer && customer._id) {
      setValue('active', customer.active)
      setValue('name', customer.name)
      setValue('email', customer.email)
      setValue('phone_number', customer.phone_number)
      setValue('document', customer.document)

      setValue('number', customer?.address?.number || '')
      setValue('neighborhood', customer?.address?.neighborhood || '')
      setValue('state', customer?.address?.state || '')
      setValue('street', customer?.address?.street || '')
      setValue('zipcode', customer?.address?.zipcode || '')
      setValue('city', customer?.address?.city || '')
      setValue('complement', customer?.address?.complement || '')
    }
  }, [setValue, customer])

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
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name='name'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                required
                name='name'
                label='Nome do usuário'
                placeholder='Nome do usuário'
                className='auth-input'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name='document'
            render={({ field: { onChange, onBlur, value } }) => (
              <InputMask
                mask='999.999.999-99'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required
                name='document'
                placeholder='CPF'
                className='auth-input'
              >
                {() => (
                  <TextInput
                    required
                    variant='outlined'
                    name='document'
                    label='CPF'
                    placeholder='CPF'
                    className='auth-input'/>
                )}
              </InputMask>
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} marginBottom={2}>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name='email'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                required
                name='Email'
                label='Email'
                placeholder='nome@email.com'
                className='auth-input'
                onChange={onChange}
                onBlur={onBlur}
                value={value ? value.toLowerCase().trim() : ''}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name='password'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                name='password'
                label='Senha'
                type='password'
                className='auth-input'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container marginBottom={2} spacing={2} >
        <Grid item xs={12} md={6}>
          <Controller
            control={control}
            name='phone_number'
            render={({ field: { onChange, onBlur, value } }) => (
              <InputMask
                mask='(99) 99999-9999'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required
                name='phone_number'
                placeholder='Telefone'
                className='auth-input'
              >
                {() => (
                  <TextInput
                    required
                    variant='outlined'
                    name='phone_number'
                    label='Telefone'
                    placeholder='Telefone'
                    className='auth-input'/>
                )}
              </InputMask>
            )}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-helper-label'>Status</InputLabel>
            <Controller
              control={control}
              name='active'
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  required
                  labelId='demo-simple-select-helper-label'
                  name='active'
                  label='Status'
                  placeholder='Status'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  fullWidth
                >
                  <MenuItem value={1}>Ativo</MenuItem>
                  <MenuItem value={0}>Inativo</MenuItem>
                </Select>
              )}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Grid container marginBottom={2}>
        <Typography variant='h5'>
          Endereço
        </Typography>
      </Grid>
      <Grid container marginBottom={2} spacing={2}>
        <Grid item xs={12} md={4}>
          <Controller
            control={control}
            name='street'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                required
                name='street'
                label='Logradouro'
                placeholder='Logradouro'
                className='auth-input'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            control={control}
            name='number'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                required
                name='number'
                label='Número'
                placeholder='Número'
                className='auth-input'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Controller
            control={control}
            name='neighborhood'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                required
                name='neighborhood'
                label='Bairro'
                placeholder='Bairro'
                className='auth-input'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container marginBottom={2} spacing={2}>
        <Grid item xs={12} md={3}>
          <Controller
            control={control}
            name='complement'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                name='complement'
                label='Complemento'
                placeholder='Complemento'
                className='auth-input'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            control={control}
            name='city'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                name='city'
                label='Cidade'
                placeholder='Cidade'
                className='auth-input'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            control={control}
            name='state'
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                name='state'
                label='Estado'
                placeholder='Estado'
                className='auth-input'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <Controller
            control={control}
            name='zipcode'
            render={({ field: { onChange, onBlur, value } }) => (
              <InputMask
                mask='99999.999'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required
                name='zipcode'
                placeholder='CEP'
                className='auth-input'
              >
                {() => (
                  <TextInput
                    required
                    variant='outlined'
                    name='zipcode'
                    label='CEP'
                    placeholder='CEP'
                    className='auth-input'/>
                )}
              </InputMask>
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
}
