import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import logo from '../../assets/images/logo.png'
import styled from '@emotion/styled'

const HeaderWrapper = styled.div`
  background: var(--white);
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.17);
  display: flex;
  justify-content: space-between;
  padding: 24px 40px;
`

const Logo = styled.img`
  max-height: 32px;
  margin-right: 56px;
  width: auto;
`
const NavContainer = styled.div<{ direction: 'start' | 'end' }>`
  display: flex;
  align-items: center;

  a {
    margin-right: 40px;
  }
  a:last-of-type {
    margin-right: ${({ direction }) => (direction === 'start' ? 0 : '40px')};
  }
`
const StyledLink = styled(Link)``

const ButtonLink = styled.button``

export const Header: FC = () => {
  const { userType } = useAuth()
  return (
    <HeaderWrapper>
      <NavContainer direction="start">
        <Logo src={logo} alt="Back to home" />
        <StyledLink to="/">Robots</StyledLink>
        <StyledLink to="/results">Results</StyledLink>
      </NavContainer>
      <NavContainer direction="end">
        {userType === 'admin' && <StyledLink to="/admin">Admin</StyledLink>}
        <ButtonLink>Log out</ButtonLink>
      </NavContainer>
    </HeaderWrapper>
  )
}
