import { FC, useState } from 'react'
import { loginPOST } from '../../network/POST/login'
import { AuthToken } from '../../hooks/useAuth'

interface LoginProps {
  setToken: (authToken: AuthToken) => void
}
export const Login: FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.SyntheticEvent) => {
    e.preventDefault()
    loginPOST(email, password).then((res) => {
      setToken({ token: res.token })
    })
  }
  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
