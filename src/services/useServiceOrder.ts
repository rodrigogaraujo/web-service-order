import { AxiosError } from 'axios'
import { useMutation, UseMutationOptions, useQuery,  } from 'react-query'
import { IServiceOrder } from '~/types'
import { api } from './api'

const getServiceOrderById = async (id: string) => {
  const response = await api.get(`service-order/${id}`)
  return response.data
}

const getServiceOrders = async () => {
  const response = await api.get(`service-order`)
  return response.data.map((serviceOrder: IServiceOrder, index: number) => {
    return { ...serviceOrder, id: index + 1 }
  })
}

export const useGetServiceOrder = (id: string) => {
  return useQuery<IServiceOrder, any, IServiceOrder>(
    '/service-order/id',
    async () => getServiceOrderById(id)
  )
}

export const useGetServiceOrders = () => {
  return useQuery<IServiceOrder[], any, IServiceOrder[]>(
    '/service-order',
    async () => getServiceOrders()
  )
}

export const usePostServiceOrder = (options: UseMutationOptions<IServiceOrder, any, IServiceOrder>) => {
  return useMutation<IServiceOrder, AxiosError, IServiceOrder>(
    '/service-order-create',
    async (data) => {
      const resp = await api.post('/service-order', {
        ...data
      })
      return resp.data
    },
    options
  )
}

export const useUpdateServiceOrder = (options: UseMutationOptions<IServiceOrder, any, IServiceOrder>) => {
  return useMutation<IServiceOrder, AxiosError, IServiceOrder>(
    '/service-order-update',
    async (data) => {
      const resp = await api.put(`/service-order/${data._id}`, {
        ...data
      })
      return resp.data
    },
    options
  )
}
