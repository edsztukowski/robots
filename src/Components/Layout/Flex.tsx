import styled from '@emotion/styled'

//basic flex layouts

export const FlexRow = styled.div<{
  alignContent?: string
  justifyContent?: string
  width?: string
  alignItems?: string
}>`
  display: flex;
  width: ${({ width }) => (width ? width : '100%')};
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'normal')};
  align-content: ${({ alignContent }) =>
    alignContent ? alignContent : 'stretch'};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'flex-start'};
`

export const FlexCol = styled.div<{
  alignContent?: string
  justifyContent?: string
}>`
  display: flex;
  flex-direction: column;
  align-content: ${({ alignContent }) =>
    alignContent ? alignContent : 'stretch'};
  justify-content: ${({ justifyContent }) =>
    justifyContent ? justifyContent : 'flex-start'};
`
