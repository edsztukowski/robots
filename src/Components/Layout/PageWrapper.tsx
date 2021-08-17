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
`

export const PageWrapper: FC = ({ children }) => {
  return (
    <StyledWrapper>
      <ContentContainer>{children}</ContentContainer>
    </StyledWrapper>
  )
}
