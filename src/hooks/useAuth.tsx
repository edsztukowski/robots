import { useState, useEffect } from 'react'
import { isAdmin } from '../utils/isAdmin'
export interface AuthToken {
  token: string
}

interface useTokenReturnType {
  setToken: (authToken: AuthToken) => void
  userType: 'admin' | 'user'
  token: string | undefined
}
export const useAuth = (): useTokenReturnType => {
  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    if (tokenString) {
      const authToken: AuthToken = JSON.parse(tokenString)
      return authToken?.token
    }
  }
  const [token, setToken] = useState(getToken())
  const [userType, setUserType] = useState<'admin' | 'user'>('user')

  const saveToken = (userToken: AuthToken) => {
    localStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken.token)
  }

  useEffect(() => {
    const checkAdmin = async () => {
      const adminUser = await isAdmin()
      setUserType(adminUser ? 'admin' : 'user')
    }
    if (token) {
      checkAdmin()
    }
  }, [token])

  return {
    setToken: saveToken,
    userType,
    token,
  }
}
