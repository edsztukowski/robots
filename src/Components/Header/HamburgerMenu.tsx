import { FC } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

interface HamburgerProps {
  handleClick: () => void
  open: boolean
}

const StyledHamburger = styled.div<{ open: boolean }>`
  display: none;
  @media screen and (max-width: 895px) {
    display: block;
  }
  z-index: 3;
  span {
    display: block;
    width: 33px;
    height: 4px;
    margin-bottom: 5px;
    position: relative;
    background: #cdcdcd;
    border-radius: 3px;
    transform-origin: 4px 0px;
    transition: transform 0.5s cubic-bezier(0.77, 0.2, 0.05, 1),
      background 0.5s cubic-bezier(0.77, 0.2, 0.05, 1), opacity 0.55s ease;
  }
  span:first-child {
    transform-origin: 0% 0%;
  }
  span:nth-last-child(2) {
    transform-origin: 0% 100%;
  }
  ${({ open }) =>
    open &&
    css`
      span {
        opacity: 1;
        transform: rotate(45deg) translate(-3px, -5px);
        background: #fff;
      }
      span:nth-last-child(2) {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }
      span:nth-last-child(1) {
        transform: rotate(-45deg) translate(0, -5px);
      }
    `}
`

export const HamburgerMenu: FC<HamburgerProps> = ({ handleClick, open }) => {
  return (
    <StyledHamburger open={open} onClick={handleClick}>
      <span></span>
      <span></span>
      <span></span>
    </StyledHamburger>
  )
}
