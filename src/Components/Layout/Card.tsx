import { FC } from 'react'
import styled from '@emotion/styled'

interface CardProps {
  maxWidth?: string
  maxHeight?: string
  cardHeight?: string
  cardWidth?: string
}

interface StyledProps {
  maxWidth: string
  maxHeight: string
  cardHeight: string
  cardWidth: string
}

const StyledCard = styled.div<StyledProps>`
  background: var(--white);
  border: 1px solid var(--gray1);
  box-sizing: border-box;
  box-shadow: var(--cardShadow);
  border-radius: 8px;
  width: ${({ cardWidth }) => cardWidth};
  height: ${({ cardHeight }) => cardHeight};
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
  cardWidth = 'auto',
  cardHeight = 'auto',
}) => {
  return (
    <StyledCard
      cardHeight={cardHeight}
      maxHeight={maxHeight}
      maxWidth={maxWidth}
      cardWidth={cardWidth}
    >
      {children}
    </StyledCard>
  )
}
