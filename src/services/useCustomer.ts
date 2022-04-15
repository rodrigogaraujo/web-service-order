import { AxiosError } from 'axios'
import { useMutation, UseMutationOptions, useQuery,  } from 'react-query'
import { ICustomer } from '~/types'
import { formatDocument, phoneMask } from '~/utils'
import { api } from './api'

const getCustomerById = async (id: string) => {
  const response = await api.get(`customers/${id}`)
  return response.data
}

const getCustomers = async () => {
  const response = await api.get(`customers`)
  return response.data.map((customer: ICustomer, index: number) => {
    return { ...customer, id: index + 1, document: formatDocument(customer.document),
      phone_number: phoneMask(customer.phone_number) }
  })
}

export const useGetCustomer = (id: string) => {
  return useQuery<ICustomer, any, ICustomer>(
    '/customer/id',
    async () => getCustomerById(id)
  )
}

export const useGetCustomers = () => {
  return useQuery<ICustomer[], any, ICustomer[]>(
    '/customers',
    async () => getCustomers()
  )
}

export const usePostCustomer = (options: UseMutationOptions<ICustomer, any, ICustomer>) => {
  return useMutation<ICustomer, AxiosError, ICustomer>(
    '/customers-create',
    async (data) => {
      const resp = await api.post('/customers', {
        ...data
      })
      return resp.data
    },
    options
  )
}

export const useUpdateCustomer = (options: UseMutationOptions<ICustomer, any, ICustomer>) => {
  return useMutation<ICustomer, AxiosError, ICustomer>(
    '/customers-update',
    async (data) => {
      const resp = await api.put(`/customers/${data._id}`, {
        ...data
      })
      return resp.data
    },
    options
  )
}
