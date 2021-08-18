import { FC, useState } from 'react'
import { loginPOST } from '../../network/POST/login'
import { registerPOST } from '../../network/POST/register'
import { TextField } from '../../Components/Inputs/TextField'
import { Card } from '../../Components/Layout/Card'
import { Button } from '../../Components/Button/Button'
import logo from '../../assets/images/logo.png'
import styled from '@emotion/styled'

interface LoginProps {
  setToken: (arg0: string) => void
}

const NameContainer = styled.div<{ show: boolean }>`
  height: ${({ show }) => (show ? '64px' : '0px')};
  transition: all 0.3s ease-in-out;
  margin-bottom: ${({ show }) => (show ? '44px' : '0px')};
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
  padding: 80px 54px 94px 53px;
`

const Logo = styled.img`
  margin: 0 auto 84px;
  display: flex;
`

const ButtonWrap = styled.div`
  margin-bottom: 16px;
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
        setToken(res.token)
      })
    } else {
      loginPOST(email, password).then((res) => {
        setToken(res.token)
      })
    }
  }
  return (
    <PageContainer>
      <Card maxHeight="836px" maxWidth="607px" cardWidth="100%">
        <LoginContainer>
          <Logo src={logo} alt="Logo" />
          <form onSubmit={handleSubmit}>
            <NameContainer show={register}>
              <TextField
                aria-hidden={!register}
                label="Name"
                value={name}
                onChange={setName}
              />
            </NameContainer>
            <TextField label="Email" value={email} onChange={setEmail} />
            <TextField
              label="Password"
              value={password}
              onChange={setPassword}
            />
            <ButtonWrap>
              <Button type="submit" btnType="primary">
                {!register ? 'Login' : 'Register'}
              </Button>
            </ButtonWrap>

            <Button
              type="button"
              btnType="secondary"
              onClick={() => setRegister(!register)}
            >
              {!register ? 'Register' : 'Back to Login'}
            </Button>
          </form>
        </LoginContainer>
      </Card>
    </PageContainer>
  )
}
