import { FC, useEffect, useState } from 'react'
import { H3 } from '../../Components/Typography/Typography'
import { Card } from '../../Components/Layout/Card'
import { Button } from '../../Components/Button/Button'

import styled from '@emotion/styled'
import { TextField } from '../../Components/Inputs/TextField'
import { FileDrop } from './FileDrop'
import { CardWrapper } from '../../Components/Layout/CardWrapper'
import { LinkButton } from '../../Components/Button/LinkButton'
import { FlexRow } from '../../Components/Layout/Flex'

interface AddCardProps {
  disabled?: boolean
  label: string
  resetAdd: boolean
  handleAdd: (name: string, image: File | null) => void
}

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 23px 37px;

  Button {
    max-width: 229px;
  }
`

const UploadImage = styled.img`
  max-width: 100%;
  max-height: 203px;
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

  const handleClear = () => {
    setImage(null)
    setFileUpload(null)
    setName('')
  }

  return (
    <CardWrapper disabled={disabled}>
      <Card cardHeight="519px" cardWidth="100%">
        <CardContent>
          <H3>{label}</H3>
          <TextField
            value={name}
            onChange={setName}
            label="Name"
            margin={'30px 0 24px 0'}
          />
          {image ? (
            <UploadImage alt={name} src={image} />
          ) : (
            <FileDrop setFileUpload={setFileUpload} setImage={setImage} />
          )}
          <FlexRow justifyContent="space-between">
            <LinkButton onClick={() => handleClear()}>Clear</LinkButton>
            <Button
              width="229px"
              onClick={() => handleAdd(name, fileUpload)}
              disabled={disableAdd}
              type="submit"
            >
              {label}
            </Button>
          </FlexRow>
        </CardContent>
      </Card>
    </CardWrapper>
  )
}
