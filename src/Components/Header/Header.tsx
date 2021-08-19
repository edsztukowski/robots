import { FC, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { MobileMenu } from './MobileMenu'
import { HamburgerMenu } from './HamburgerMenu'
import { deleteSession } from '../../network/DELETE/deleteSession'
import { deleteToken } from '../../network/tokenHelpers'
import logo from '../../assets/images/logo.png'
import styled from '@emotion/styled'

const HeaderWrapper = styled.nav`
  background: var(--white);
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.17);
  display: flex;
  justify-content: space-between;
  padding: 24px 40px;
  max-width: 1240px;
  box-sizing: content-box;
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
  @media screen and (max-width: 895px) {
    display: none;
  }
`

const SecondaryLink = styled(StyledLink)`
  font-size: 16px;
  font-weight: 400;
  color: var(--gray2);
  @media screen and (max-width: 895px) {
    display: none;
  }
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
  @media screen and (max-width: 895px) {
    display: none;
  }
`

export const Header: FC = () => {
  const { userType } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleLogout = () => {
    deleteSession().then(() => {
      deleteToken()
      window.location.reload()
    })
  }

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
        <ButtonLink onClick={handleLogout}>Log out</ButtonLink>
        <HamburgerMenu
          open={mobileMenuOpen}
          handleClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </NavContainer>
      <MobileMenu
        adminUser={userType === 'admin'}
        handleLogout={handleLogout}
        currentPage={location.pathname}
        open={mobileMenuOpen}
      />
    </HeaderWrapper>
  )
}
