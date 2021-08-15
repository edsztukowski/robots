import { useState, useEffect } from 'react'
import { getSession } from '../network/GET/getSession'
import { isAdmin } from '../utils/isAdmin'
export interface AuthToken {
  token: string
}

interface useTokenReturnType {
  setToken: (authToken: AuthToken) => void
  userType: 'admin' | 'user'
  userId: string
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
  const [token, setToken] = useState<undefined | string>(getToken())
  const [userType, setUserType] = useState<'admin' | 'user'>('user')
  const [userId, setUserId] = useState('')

  const saveToken = (userToken: AuthToken) => {
    localStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken.token)
  }

  useEffect(() => {
    if (token) {
      const checkAdmin = async () => {
        const sessionData = await getSession()
        const adminUser = isAdmin(sessionData.email)
        setUserId(sessionData.id)
        setUserType(adminUser ? 'admin' : 'user')
      }
      checkAdmin()
    }
  }, [token])

  return {
    setToken: saveToken,
    userType,
    userId,
    token,
  }
}
