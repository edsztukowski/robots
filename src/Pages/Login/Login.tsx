import { FC, useState } from 'react'
import { loginPOST } from '../../network/POST/login'
import { AuthToken } from '../../hooks/useAuth'
import { registerPOST } from '../../network/POST/register'
import { TextField } from '../../Components/Inputs/TextField'
import { Card } from '../../Components/Layout/Card'
import logo from '../../assets/images/logo.png'
import styled from '@emotion/styled'
interface LoginProps {
  setToken: (authToken: AuthToken) => void
}

const NameContainer = styled.div<{ show: boolean }>`
  display: ${({ show }) => (show ? 'block' : 'none')};
`

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: var(--background1);
  width: 100%;
`

const LoginContainer = styled.div`
  padding: 80px 54px 53px 94px;
`

const Logo = styled.img`
  margin: 0 auto 84px;
  display: flex;
`

export const Login: FC<LoginProps> = ({ setToken }) => {
  const [register, setRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (register) {
      registerPOST(name, email, password).then((res) => {
        setToken({ token: res.token })
      })
    } else {
      loginPOST(email, password).then((res) => {
        setToken({ token: res.token })
      })
    }
  }
  return (
    <PageContainer>
      <Card maxHeight="836px" maxWidth="607px">
        <LoginContainer>
          <Logo src={logo} alt="Logo" />
          <form onSubmit={handleSubmit}>
            <NameContainer show={register}>
              <TextField label="Name" value={name} onChange={setName} />
            </NameContainer>
            <TextField label="Email" value={email} onChange={setEmail} />
            <TextField
              label="Password"
              value={password}
              onChange={setPassword}
            />
            <button type="submit">{!register ? 'Login' : 'Register'}</button>
            <button type="button" onClick={() => setRegister(!register)}>
              {!register ? 'Register' : 'Back to Login'}
            </button>
          </form>
        </LoginContainer>
      </Card>
    </PageContainer>
  )
}
