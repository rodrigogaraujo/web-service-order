import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PrivateLayout } from '~/components/Layouts/PrivateLayout'
import { NotFound } from '~/pages/NotFound'

import { Dashboard } from '~/pages/Dashboard'
import { Login } from '~/pages/auth/Login'
import { PrivateRoute } from './PrivateRoute'
import { PublicLayout } from '~/components/Layouts/PublicLayout'
import { useAuth } from '~/hooks/Auth'
import { Users } from '~/pages/Users'
import { UserForm } from '~/pages/Users/UserForm'
import { UserEdit } from '~/pages/Users/UserEdit'
import { Customers } from '~/pages/Customers'
import { CustomerForm } from '~/pages/Customers/CustomerForm'
import { CustomerEdit } from '~/pages/Customers/CustomerEdit'
import { ServiceOrder } from '~/pages/ServiceOrder'
import { ServiceOrderForm } from '~/pages/ServiceOrder/ServiceOrderForm'
import { ServiceOrderEdit } from '~/pages/ServiceOrder/ServiceOrderEdit'

export const RoutesApp: React.FC = () => {
  const { user, token } = useAuth()
  const isAuth = !!user && !!token

  return (
    <Routes>
      <Route index element={(
        <PrivateLayout>
          <Login />
        </PrivateLayout>
      )} />

      <Route element={<PrivateRoute isAuth={isAuth} />}>
        <Route path='/dashboard' element={(
          <PublicLayout>
            <Dashboard />
          </PublicLayout>
        )} />
        <Route path='/dashboard/users' element={(
          <PublicLayout>
            <Users />
          </PublicLayout>
        )} />
        <Route path='/dashboard/user-new' element={(
          <PublicLayout>
            <UserForm />
          </PublicLayout>
        )} />
        <Route path='/dashboard/user-edit' >
          <Route index element={(
            <PublicLayout>
              <UserEdit />
            </PublicLayout>
          )} />
          <Route path=':id' element={(
            <PublicLayout>
              <UserEdit />
            </PublicLayout>
          )} />
        </Route>

        <Route path='/dashboard/customers' element={(
          <PublicLayout>
            <Customers />
          </PublicLayout>
        )} />
        <Route path='/dashboard/customer-new' element={(
          <PublicLayout>
            <CustomerForm />
          </PublicLayout>
        )} />
        <Route path='/dashboard/customer-edit' >
          <Route index element={(
            <PublicLayout>
              <CustomerEdit />
            </PublicLayout>
          )} />
          <Route path=':id' element={(
            <PublicLayout>
              <CustomerEdit />
            </PublicLayout>
          )} />
        </Route>
        <Route path='/dashboard/service-order' element={(
          <PublicLayout>
            <ServiceOrder />
          </PublicLayout>
        )} />
        <Route path='/dashboard/service-order-new' element={(
          <PublicLayout>
            <ServiceOrderForm />
          </PublicLayout>
        )} />
        <Route path='/dashboard/service-order-edit' >
          <Route index element={(
            <PublicLayout>
              <ServiceOrderEdit />
            </PublicLayout>
          )} />
          <Route path=':id' element={(
            <PublicLayout>
              <ServiceOrderEdit />
            </PublicLayout>
          )} />
        </Route>
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}