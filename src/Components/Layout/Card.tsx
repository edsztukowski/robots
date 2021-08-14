import { FC } from 'react'
import styled from '@emotion/styled'

interface CardProps {
  maxWidth?: string
  maxHeight?: string
}

interface StyledProps {
  maxWidth: string
  maxHeight: string
}

const StyledCard = styled.div<StyledProps>`
  background: var(--white);
  border: 1px solid var(--gray1);
  box-sizing: border-box;
  box-shadow: var(--cardShadow);
  border-radius: 8px;
  width: 100%;
  height: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  max-height: ${({ maxHeight }) => maxHeight};

  @media screen and (max-width: 419px) {
    max-width: 100%;
    max-height: 100%;
  }
`

export const Card: FC<CardProps> = ({
  children,
  maxHeight = '100%',
  maxWidth = '100%',
}) => {
  return (
    <StyledCard maxHeight={maxHeight} maxWidth={maxWidth}>
      {children}
    </StyledCard>
  )
}
