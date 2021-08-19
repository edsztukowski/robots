import { FC } from 'react'
import { H1, H2 } from '../../Components/Typography/Typography'
import { deleteToken } from '../../network/tokenHelpers'
import styled from '@emotion/styled'

const ErrorWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background: var(--gray0);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const StyledButton = styled.button`
  color: ${({ color }) => color};
  background: none;
  border: none;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
`

const handleLogout = () => {
  deleteToken()
  window.location.reload()
}

export const ErrorPage: FC = () => {
  return (
    <ErrorWrapper>
      <H1>Woah what happened here?</H1>
      <p>Something went wrong. Try logging in again?</p>
      <StyledButton onClick={handleLogout}>
        <H2>Back to login</H2>
      </StyledButton>
    </ErrorWrapper>
  )
}
