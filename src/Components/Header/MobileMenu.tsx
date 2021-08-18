import { FC } from 'react'
import styled from '@emotion/styled'
import { H2 } from '../Typography/Typography'
import { getCSSVal } from '../../utils/getCSSVal'
import { Link } from 'react-router-dom'

const StyledMenu = styled.nav<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--gray3);
  transform: ${({ open }) => (open ? 'translateX(0%)' : 'translateX(-100%)')};
  height: 100vh;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1;
  @media (max-width: 576px) {
    width: 100%;
  }
`

const StyledLink = styled(Link)<{ color: string }>`
  color: ${({ color }) => color};
  text-decoration: none;
`

export const MobileMenu: FC<{
  open: boolean
  currentPage: string
}> = ({ open, currentPage }) => {
  const gray = getCSSVal('--gray1')
  const activeLink = getCSSVal('--white')

  return (
    <>
      <StyledMenu open={open}>
        <H2>
          <StyledLink color={currentPage === '/' ? activeLink : gray} to="/">
            Robots
          </StyledLink>
        </H2>
        <H2>
          <StyledLink
            color={currentPage === '/results' ? activeLink : gray}
            to="/results"
          >
            Results
          </StyledLink>
        </H2>
        <H2>
          <StyledLink
            color={currentPage === '/admin' ? activeLink : gray}
            to="/admin"
          >
            Admin
          </StyledLink>
        </H2>
        <H2 color={gray}>
          <a href="/logout">Logout</a>
        </H2>
      </StyledMenu>
    </>
  )
}