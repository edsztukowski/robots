import { AuthToken } from '../hooks/useAuth'

export const getToken = (): string | undefined => {
  const tokenString = localStorage.getItem('token')
  if (tokenString) {
    const authToken: AuthToken = JSON.parse(tokenString)
    return authToken?.token
  }
}
