import { FC } from 'react'
import styled from '@emotion/styled'

interface ButtonProps {
  btnType?: 'primary' | 'secondary'
  type?: 'button' | 'reset' | 'submit'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: () => any
}

const StyledButton = styled.button<{ btnType: 'primary' | 'secondary' }>`
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  background: ${({ btnType }) =>
    btnType === 'primary' ? 'var(--gray3)' : 'var(--white)'};
  color: ${({ btnType }) =>
    btnType === 'primary' ? 'var(--white)' : 'var(--gray3)'};
  border: ${({ btnType }) =>
    btnType === 'primary'
      ? '2px solid var(--gray3)'
      : '2px solid var(--gray3)'};

  &:hover {
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
    border: '2px solid var(--gray1)';
  }
`

export const Button: FC<ButtonProps> = ({
  btnType = 'primary',
  type,
  children,
  onClick,
}) => {
  return (
    <StyledButton type={type} btnType={btnType} onClick={onClick}>
      {children}
    </StyledButton>
  )
}
