import { FC } from 'react'
import styled from '@emotion/styled'

interface TextProps {
  value: string
  label: string
  hasError?: boolean
  onChange: React.Dispatch<React.SetStateAction<string>>
  placeholder?: string
  margin?: string
  type?: 'text' | 'password'
}

const TextContainer = styled.div<{ margin?: string; hasError?: boolean }>`
  position: relative;
  background: var(--white);
  height: 64px;
  width: 100%;
  border: ${({ hasError }) =>
    hasError ? '1px solid var(--error)' : '1px solid var(--gray1)'};
  box-sizing: border-box;
  border-radius: 8px;
  margin: ${({ margin }) => margin};
  display: flex;
  align-items: center;
  justify-content: center;
  &:focus-within {
    outline: -webkit-focus-ring-color auto 1px;
  }
`

const StyledInput = styled.input`
  height: 60px;
  color: var(--gray3);
  font-size: 22px;
  border: none;
  width: calc(100% - 13px);
  &:focus,
  &:focus-visible {
    outline: none;
  }
`

const StyledLabel = styled.label`
  color: var(--gray2);
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  background: var(--white);
  position: absolute;
  top: -15px;
  padding: 0 4px;
  left: 10px;
`

const ErrorField = styled.div`
  color: var(--error);
  font-size: 18px;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0em;
  background: var(--white);
  position: absolute;
  top: -15px;
  padding: 0 4px;
  right: 10px;
`

export const TextField: FC<TextProps> = ({
  value,
  onChange,
  label,
  hasError,
  type = 'text',
  placeholder,
  margin = '0 0 44px 0',
}) => {
  return (
    <>
      <TextContainer hasError={hasError} margin={margin}>
        {hasError && <ErrorField>Required</ErrorField>}
        <StyledLabel>{label}</StyledLabel>
        <StyledInput
          aria-label={label}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </TextContainer>
    </>
  )
}
