import { useEffect, useState } from 'react'
import { Button, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import InputMask from 'react-input-mask'
import { useNavigate } from 'react-router-dom'

import TextInput from '~/components/HookForm/TextField'
import { IUser } from '~/hooks/Auth'
import { usePostUser, useUpdateUser } from '~/services/useUser'
interface IProps {
  user?: IUser
}
export const Form = ({ user }: IProps) => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    name: yup.string().required('Nome obrigatório'),
    type: yup.string().required('Nível obrigatório'),
    phone: yup.string().required('Telefone obrigatório'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user ? user.name : '',
      email: user ? user.email : '',
      type: user ? user.type : 3,
      phone: user ? user.phone : '',
      active: user ? user.active : 1,
      password: '',
    },
  })

  const onSubmit = async (data: IUser) => {
    try {
      setLoading(true)
      if (user) {
        updateUser.mutate({ ...data, _id: user._id })
      } else {
        createUser.mutate(data)
      }
      setLoading(false)
    } catch (er) {
      setLoading(false)
    }
  }

  const createUser = usePostUser({
    onSuccess: async (data) => {
      toast.success('Usuário criado com sucesso.')
      navigate(`/dashboard/user-edit/${data._id}`)
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

  const updateUser = useUpdateUser({
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
    if (errors && errors.phone && errors.phone.message) {
      toast.error(errors.phone.message)
    }
    if (errors && errors.type && errors.type.message) {
      toast.error(errors.type.message)
    }
  }, [errors])

  useEffect(() => {
    if (user && user._id) {
      setValue('active', user.active)
      setValue('type', user.type)
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('phone', user.phone)
    }
  }, [setValue, user])

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
          <FormControl fullWidth>
            <InputLabel id='type-label-select'>Nível</InputLabel>
            <Controller
              control={control}
              name='type'
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  required
                  labelId='type-label-select'
                  name='active'
                  label='Nível'
                  placeholder='Nível'
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  fullWidth
                >
                  <MenuItem value={1}>Administrador</MenuItem>
                  <MenuItem value={2}>Técnico</MenuItem>
                </Select>
              )}
            />
          </FormControl>
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
            name='phone'
            render={({ field: { onChange, onBlur, value } }) => (
              <InputMask
                mask='(99) 99999-9999'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                required
                name='phone'
                placeholder='Telefone'
                className='auth-input'
              >
                {() => (
                  <TextInput
                    required
                    variant='outlined'
                    name='phone'
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
