import { FC } from 'react'
import styled from '@emotion/styled'

export interface ButtonProps {
  btnType?: 'primary' | 'secondary'
  width?: string
  type?: 'button' | 'reset' | 'submit'
  disabled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any
}

interface StyledProps {
  btnType: 'primary' | 'secondary'
  width: string
}

const StyledButton = styled.button<StyledProps>`
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width};
  font-size: 18px;
  line-height: 21px;
  border-radius: 8px;
  font-weight: bold;
  background: ${({ btnType }) =>
    btnType === 'primary' ? 'var(--gray3)' : 'var(--white)'};
  color: ${({ btnType }) =>
    btnType === 'primary' ? 'var(--white)' : 'var(--gray3)'};
  border: ${({ btnType }) =>
    btnType === 'primary'
      ? '2px solid var(--gray3)'
      : '2px solid var(--gray3)'};
  transition: all 0.3s ease;

  &:hover {
    cursor: pointer;
    background: ${({ btnType }) =>
      btnType === 'primary' ? 'var(--gray2)' : 'var(--gray0)'};
    color: ${({ btnType }) =>
      btnType === 'primary' ? 'var(--white)' : 'var(--gray3)'};
    border: ${({ btnType }) =>
      btnType === 'primary'
        ? '2px solid var(--gray2)'
        : '2px solid var(--gray3)'};
  }

  &:active {
    background: var(--gray3);
    color: var(--white);
    border: 2px solid var(--gray3);
  }
  &:disabled {
    opacity: 0.4;
    background: var(--gray1);
    color: var(--gray3);
    border: none;
    cursor: not-allowed;
  }
`

export const Button: FC<ButtonProps> = ({
  btnType = 'primary',
  type,
  children,
  disabled,
  onClick,
  width = '100%',
}) => {
  return (
    <StyledButton
      disabled={disabled}
      type={type}
      width={width}
      btnType={btnType}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  )
}
