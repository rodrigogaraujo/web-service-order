import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { PrivateLayout } from '~/components/Layouts/PrivateLayout'
import { NotFound } from '~/pages/NotFound'

import { Dashboard } from '~/pages/Dashboard'
import { Login } from '~/pages/auth/Login'
import { PrivateRoute } from './PrivateRoute'
import { PublicLayout } from '~/components/Layouts/PublicLayout'
import { useAuth } from '~/hooks/Auth'

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
      </Route>
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}