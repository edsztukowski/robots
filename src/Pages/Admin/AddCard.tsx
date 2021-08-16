import { FC, useEffect, useState } from 'react'
import { H3 } from '../../Components/Typography/Typography'
import { Card } from '../../Components/Layout/Card'
import { Button } from '../../Components/Button/Button'

import styled from '@emotion/styled'
import { TextField } from '../../Components/Inputs/TextField'
import { FileDrop } from './FileDrop'

interface AddCardProps {
  disabled?: boolean
  label: string
  resetAdd: boolean
  handleAdd: (name: string, image: File | null) => void
}

const CardWrapper = styled.div<{ disabled?: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')};
  max-width: 397px;
  max-height: 519px;
  width: 100%;
  Button {
    max-width: 149px;
  }
  img {
    max-width: 100%;
    max-height: 321px;
    margin-bottom: 36px;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 397px;
  padding-bottom: 40px;
  padding: 39px 24px 27px;
`

const UploadImage = styled.img`
  max-width: 100%;
  max-height: 240px;
  margin-bottom: 36px;
`

export const AddCard: FC<AddCardProps> = ({
  label,
  disabled,
  handleAdd,
  resetAdd,
}) => {
  const [disableAdd, setDisableAdd] = useState(true)
  const [name, setName] = useState('')
  const [fileUpload, setFileUpload] = useState<File | null>(null)
  const [image, setImage] = useState<string | null>(null)

  useEffect(() => {
    if (name && fileUpload) {
      setDisableAdd(false)
    } else {
      setDisableAdd(true)
    }
  }, [name, fileUpload])

  useEffect(() => {
    setName('')
    setFileUpload(null)
    setImage('')
  }, [resetAdd])

  return (
    <CardWrapper disabled={disabled}>
      <Card width="100%">
        <CardContent>
          <H3>{label}</H3>
          <TextField value={name} onChange={setName} label="Name" />
          {image ? (
            <UploadImage alt={name} src={image} />
          ) : (
            <FileDrop setFileUpload={setFileUpload} setImage={setImage} />
          )}

          <Button
            onClick={() => handleAdd(name, fileUpload)}
            disabled={disableAdd}
            type="submit"
          >
            {label}
          </Button>
        </CardContent>
      </Card>
    </CardWrapper>
  )
}
