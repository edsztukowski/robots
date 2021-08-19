import { FC, useState, useCallback } from 'react'
import { loginPOST } from '../../network/POST/login'
import { registerPOST } from '../../network/POST/register'
import { TextField } from '../../Components/Inputs/TextField'
import { Card } from '../../Components/Layout/Card'
import { Button } from '../../Components/Button/Button'
import { validEmail } from '../../utils/validators'
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

  @media screen and (max-width: 419px) {
    padding: 50px 20px 94px 20px;
    height: 100vh;
  }
`

const Logo = styled.img`
  margin: 0 auto 84px;
  display: flex;
  max-height: 91px;

  @media screen and (max-width: 419px) {
    max-height: 65px;
  }
`

const ButtonWrap = styled.div`
  margin-bottom: 16px;
`

export const Login: FC<LoginProps> = ({ setToken }) => {
  const [register, setRegister] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [emailError, setEmailError] = useState(false)

  const clearFieldErrors = () => {
    setNameError(false)
    setEmailError(false)
    setPasswordError(false)
  }

  const hasNoErrors = useCallback(
    (submitType: 'register' | 'login'): boolean => {
      const isEmailValid = validEmail(email)
      if (submitType === 'register') {
        if (!name || !password || !isEmailValid) {
          setNameError(Boolean(!name))
          setPasswordError(Boolean(!password))
          setEmailError(!isEmailValid)
          return false
        }
        clearFieldErrors()
        return true
      } else {
        if (!name || !password || !isEmailValid) {
          setNameError(Boolean(!name))
          setPasswordError(Boolean(!password))
          setEmailError(!isEmailValid)
          return false
        }
        clearFieldErrors()
        return true
      }
    },
    [name, email, password]
  )

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (register && hasNoErrors('register')) {
      registerPOST(name, email, password).then((res) => {
        setToken(res.token)
      })
    } else {
      if (hasNoErrors('login')) {
        loginPOST(email, password)
          .then((res) => {
            setToken(res.token)
          })
          .catch((err) => {
            console.log('catching an error', err)
          })
      }
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
                hasError={nameError}
                aria-hidden={!register}
                label="Name"
                value={name}
                onChange={setName}
              />
            </NameContainer>
            <TextField
              hasError={emailError}
              label="Email"
              value={email}
              onChange={setEmail}
            />
            <TextField
              hasError={passwordError}
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
