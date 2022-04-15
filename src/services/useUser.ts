import { AxiosError } from 'axios'
import { useMutation, UseMutationOptions, useQuery,  } from 'react-query'
import { IUser } from '~/types'
import { api } from './api'

const getUserById = async (id: string) => {
  const response = await api.get(`users/${id}`)
  return response.data
}

const getUsers = async () => {
  const response = await api.get(`users`)
  return response.data.map((user: IUser, index: number) => {
    return { ...user, id: index + 1 }
  })
}

export const useGetUser = (id: string) => {
  return useQuery<IUser, any, IUser>(
    '/user/id',
    async () => getUserById(id)
  )
}

export const useGetUsers = () => {
  return useQuery<IUser[], any, IUser[]>(
    '/users',
    async () => getUsers()
  )
}

export const usePostUser = (options: UseMutationOptions<IUser, any, IUser>) => {
  return useMutation<IUser, AxiosError, IUser>(
    '/users-create',
    async (data) => {
      const resp = await api.post('/users', {
        ...data
      })
      return resp.data
    },
    options
  )
}

export const useUpdateUser = (options: UseMutationOptions<IUser, any, IUser>) => {
  return useMutation<IUser, AxiosError, IUser>(
    '/users-update',
    async (data) => {
      const resp = await api.put(`/users/${data._id}`, {
        ...data
      })
      return resp.data
    },
    options
  )
}
