import { useState } from 'react'

export interface AuthToken {
  token: string
}
interface useTokenReturnType {
  setToken: (authToken: AuthToken) => void
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

  const saveToken = (userToken: AuthToken) => {
    localStorage.setItem('token', JSON.stringify(userToken))
    setToken(userToken.token)
  }

  return {
    setToken: saveToken,
    token,
  }
}
