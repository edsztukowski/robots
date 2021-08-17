import styled from '@emotion/styled'

//Contains single card
export const CardWrapper = styled.div<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')};
  max-width: 397px;
  width: 100%;
  max-height: 519px;
  margin: 0 12.5px 0;
  margin-bottom: 45px;
  Button {
    max-width: 149px;
  }
  img {
    max-width: 100%;
    max-height: 321px;
    margin-bottom: 36px;
  }
`
