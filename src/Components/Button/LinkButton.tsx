import { FC } from 'react'
import { ButtonProps } from './Button'
import styled from '@emotion/styled'

type LinkButtonProps = Omit<ButtonProps, 'btnType'>

const StyledLinkButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  font-size: 20px;
  line-height: 23px;
  text-decoration: underline;
  font-weight: bold;
  background: none;
  color: 'var(--gray3)';
  border: none;
  font-weight: 400;

  &:hover {
    cursor: pointer;
  }

  &:active {
    background: none;
    text-decoration: none;
  }
  &:disabled {
    opacity: 0.4;
  }
`

export const LinkButton: FC<LinkButtonProps> = ({
  type,
  children,
  disabled,
  onClick,
}) => {
  return (
    <StyledLinkButton disabled={disabled} type={type} onClick={onClick}>
      {children}
    </StyledLinkButton>
  )
}
