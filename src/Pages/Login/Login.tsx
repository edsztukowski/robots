import { FC, useState } from 'react'
import { loginPOST } from '../../network/POST/login'
import { AuthToken } from '../../hooks/useAuth'
import styled from '@emotion/styled'
interface LoginProps {
  setToken: (authToken: AuthToken) => void
}

const NameContainer = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
`

export const Login: FC<LoginProps> = ({ setToken }) => {
  const [register, setRegister] = useState(false)
  const [name, setName] = useState('')
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
        <NameContainer show={register}>
          <input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </NameContainer>
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
        <button type="button" onClick={() => setRegister(true)}>
          Register
        </button>
      </form>
    </div>
  )
}
