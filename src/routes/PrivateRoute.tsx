import { Navigate, Outlet } from 'react-router-dom'

type IProps = { isAuth: boolean, children?: JSX.Element }

export const PrivateRoute = ({ isAuth, children }: IProps) => {
  if (!isAuth) {
    return <Navigate to='/' />
  }
  return children ? children : <Outlet />
}
