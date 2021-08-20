import styled from '@emotion/styled'

export const H1 = styled.h1<{ color?: string }>`
  font-size: 60px;
  font-weight: 700;
  line-height: 69px;
  color: ${({ color }) => (color ? color : '#000000')};
`

export const H2 = styled.h2<{ color?: string }>`
  font-size: 40px;
  font-weight: 700;
  line-height: 46px;
  color: ${({ color }) => (color ? color : '#000000')};
`

export const H3 = styled.h3<{ color?: string }>`
  font-size: 22px;
  font-style: normal;
  font-weight: 700;
  line-height: 25px;
  color: ${({ color }) => (color ? color : '#000000')};
`

export const Error = styled.div`
  color: var(--error);
`
