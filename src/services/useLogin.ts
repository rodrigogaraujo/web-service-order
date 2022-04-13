import { AxiosError } from 'axios'
import { useMutation, UseMutationOptions } from 'react-query'
import { ICredentials, IUser } from '~/hooks/Auth'
import { api } from './api'

type Payload = {
  token: { token: string },
  user: IUser
}

export const useLogin = (options: UseMutationOptions<Payload, any, ICredentials>) => {
  return useMutation<Payload, AxiosError, ICredentials>(
    '/sessions',
    async ({ email, password }) => {
      const resp = await api.post('/sessions', {
        email, password
      })
      return resp.data
    },
    options
  )
}
