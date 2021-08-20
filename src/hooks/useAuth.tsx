import { useState, useEffect } from 'react'
import { getSession } from '../network/GET/getSession'
import { isAdmin } from '../utils/isAdmin'
// export interface AuthToken {
//   token: string
// }

export type AuthToken = string

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
      return tokenString
    }
  }
  const [token, setToken] = useState<undefined | string>(getToken())
  const [userType, setUserType] = useState<'admin' | 'user'>('user')
  const [userId, setUserId] = useState('')

  const saveToken = (userToken: AuthToken) => {
    if (userToken) {
      localStorage.setItem('token', userToken)
      setToken(userToken)
    }
  }

  useEffect(() => {
    if (token) {
      const checkAdmin = async () => {
        try {
          const sessionData = await getSession()
          if (sessionData) {
            const adminUser = isAdmin(sessionData.id)
            setUserId(sessionData.id)
            setUserType(adminUser ? 'admin' : 'user')
          }
        } catch (error) {
          console.log('error is ', error.message)
        }
      }
      checkAdmin()
    } else {
      setUserId('')
      setUserType('user')
      setToken(undefined)
    }
  }, [token])

  return {
    setToken: saveToken,
    userType,
    userId,
    token,
  }
}
