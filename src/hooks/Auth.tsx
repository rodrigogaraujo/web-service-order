import { createContext, useState, useContext } from 'react'

interface IAuthProvider {
  children: React.ReactNode
}

export interface ICredentials {
  email: string,
  password: string
}

export interface IUser {
  name: string,
  email: string,
  type: string,
  active: boolean
}

interface IAuthContextData {
  user: IUser,
  signIn(token: string, user: IUser): Promise<void>,
  signOut(): void,
  loading: boolean,
  token: string
}

const AuthContext = createContext<IAuthContextData>({} as IAuthContextData)

export function useAuth(): IAuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used whitin an AuthProvider')
  }

  return context
}

export const AuthProvider = ({ children }: IAuthProvider) => {
  const [loading, setLoading] = useState(false)

  const [data, setData] = useState(() => {
    const user = localStorage.getItem('@ginfotech:user')
    const token = localStorage.getItem('@ginfotech:token')
    if (user && token) {
      return { user: JSON.parse(user), token }
    }
    return {}
  })

  const signOut = () => {
    localStorage.removeItem('@ginfotech:user')
    localStorage.removeItem('@ginfotech:token')
    setData({})
  }

  const signIn = async (token: string, user: IUser) => {
    setLoading(true)

    localStorage.setItem('@ginfotech:user', JSON.stringify(user))
    localStorage.setItem('@ginfotech:token', token)
    setData({ user, token })
    setLoading(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        signIn,
        signOut,
        loading,
        token: data.token || ''
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}