import { useQuery,  } from 'react-query'
import { IUser } from '~/types'
import { api } from './api'

const getUserById = async (id: string) => {
  const response = await api.get(`users/${id}`)
  return response.data
}

const getUsers = async () => {
  const response = await api.get(`users`)
  return response.data.map((user: IUser, index: number) => {
    return { ...user, id: index }
  })
}

export const useGetUser = (id: string) => {
  return useQuery<IUser, any, IUser>(
    '/user/id',
    () => getUserById(id)
  )
}

export const useGetUsers = () => {
  return useQuery<IUser[], any, IUser[]>(
    '/users',
    () => getUsers()
  )
}
