
import { Button, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import TextInput from '~/components/HookForm/TextField'
import { BottomButtonWrapper, Form, Link, TitleWrapper } from '../styles'
import { ICredentials, useAuth } from '~/hooks/Auth'
import { useEffect, useState } from 'react'
import { useLogin } from '~/services/useLogin'
import { Navigate } from 'react-router-dom'

export const Login: React.FC = () => {
  const { signIn, user, token } = useAuth()
  const [loading, setLoading] = useState(false)

  const schema = yup.object().shape({
    email: yup.string().email('Email inválido').required('Email obrigatório'),
    password: yup.string().required('Senha obrigatória'),
  })

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: ICredentials) => {
    try {
      setLoading(true)
      const { email, password } = data
      login.mutate({ email, password })
      setLoading(false)
    } catch (er) {
      setLoading(false)
    }
  }

  const login = useLogin({
    onSuccess: async ({ user, token }) => {
      if (user.active) {
        await signIn(token.token, user)
      } else {
        toast.error('Usuário inativo, fale com seu administrador.')
      }
    },
    onError: (er) => {
      toast.error(
        er &&
          er.response &&
          er.response.data &&
          er.response.data.error &&
          er.response.data.error.message
          ? er.response.data.error.message
          : 'Email e senha incorretos')
    },
  })

  useEffect(() => {
    if (errors && errors.email && errors.email.message) {
      toast.error(errors.email.message)
    }
    if (errors && errors.password&& errors.password.message) {
      toast.error(errors.password.message)
    }
  }, [errors])

  if (user && token) {
    return <Navigate to='/dashboard' replace />
  }

  return (
    <Form>
      <TitleWrapper>
        <Typography variant='h2' component='h2'>
          Bem-vindo
        </Typography>
      </TitleWrapper>
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            required
            name='login'
            label='Login'
            placeholder='nome@email.com'
            className='auth-input'
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            required
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
      <BottomButtonWrapper>
        <Link>Esqueci minha senha</Link>
        <Button
          className='auth-button'
          variant='contained'
          onClick={handleSubmit(onSubmit)}
          disabled={loading}
        >
          Enviar
        </Button>
      </BottomButtonWrapper>
    </Form>
  )
}
