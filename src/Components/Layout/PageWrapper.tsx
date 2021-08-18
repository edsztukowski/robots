import { FC } from 'react'
import styled from '@emotion/styled'

const StyledWrapper = styled.div`
  background: var(--gray0);
  height: calc(100% - 144px);
  padding: 0px 39px;
  border-top: 1px solid var(--gray1);
`

const ContentContainer = styled.div`
  max-width: 1240px;
  margin: 0 auto;

  @media screen and (max-width: 1317px) {
    max-width: 826px;
  }
  @media screen and (max-width: 895px) {
    max-width: 400px;
  }
`

export const PageWrapper: FC = ({ children }) => {
  return (
    <StyledWrapper>
      <ContentContainer>{children}</ContentContainer>
    </StyledWrapper>
  )
}
