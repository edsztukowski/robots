import { FC } from 'react'
import styled from '@emotion/styled'

interface TextProps {
  value: string
  label: string
  onChange: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
}

const TextContainer = styled.div`
  display: flex;
`

const StyledInput = styled.input``

const StyledLabel = styled.label``

export const TextField: FC<TextProps> = ({
  value,
  onChange,
  label,
  placeholder,
}) => {
  return (
    <TextContainer>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </TextContainer>
  )
}
