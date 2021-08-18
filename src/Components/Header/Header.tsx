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
  max-width: 1240px;
  margin: 0 auto;
  @media screen and (max-width: 1317px) {
    max-width: 826px;
  }
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

const StyledLink = styled(Link)`
  text-decoration: none;
  &:active {
    text-decoration: underline;
  }
`

const PrimaryLink = styled(StyledLink)`
  font-size: 18px;
  font-weight: 700;
  color: var(--gray3);
`

const SecondaryLink = styled(StyledLink)`
  font-size: 16px;
  font-weight: 400;
  color: var(--gray2);
`

const ButtonLink = styled.button`
  font-size: 16px;
  font-weight: 400;
  background: none;
  border: none;
  color: var(--gray2);
  &:hover {
    cursor: pointer;
  }
  &:active {
    text-decoration: underline;
  }
`

export const Header: FC = () => {
  const { userType } = useAuth()
  return (
    <HeaderWrapper>
      <NavContainer direction="start">
        <Logo src={logo} alt="Back to home" />
        <PrimaryLink to="/">Robots</PrimaryLink>
        <PrimaryLink to="/results">Results</PrimaryLink>
      </NavContainer>
      <NavContainer direction="end">
        {userType === 'admin' && (
          <SecondaryLink to="/admin">Admin</SecondaryLink>
        )}
        <ButtonLink>Log out</ButtonLink>
      </NavContainer>
    </HeaderWrapper>
  )
}
