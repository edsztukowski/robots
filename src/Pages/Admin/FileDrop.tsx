import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import uploadIcon from '../../assets/icons/upload.png'
import styled from '@emotion/styled'

interface FileDropProps {
  setFileUpload: React.Dispatch<React.SetStateAction<File | null>>
  setImage: React.Dispatch<React.SetStateAction<string | null>>
}
const DropContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 208px;
  background: var(--gray4);
  border: 2px dashed var(--gray2);
  border-radius: 8px;
  margin-bottom: 24px;
  &:hover {
    cursor: pointer;
  }
`

const MessageContainer = styled.div`
  color: var(--gray3);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  img {
    margin-bottom: 20px;
  }
`

const UploadIcon = styled.img`
  margin-bottom: 21px;
`

export const FileDrop: FC<FileDropProps> = ({ setFileUpload, setImage }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        console.log('file is ', file)
        setImage(reader.result as string)
        compressFile(file)
      }
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  })

  function calculateSize(
    img: HTMLImageElement,
    maxWidth: number,
    maxHeight: number
  ) {
    let width = img.width
    let height = img.height

    // calculate the width and height, constraining the proportions
    if (width > height) {
      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }
    } else {
      if (height > maxHeight) {
        width = Math.round((width * maxHeight) / height)
        height = maxHeight
      }
    }
    return [width, height]
  }

  const compressFile = (file: File) => {
    const MAX_WIDTH = 349
    const MAX_HEIGHT = 321
    const QUALITY = 0.7

    const blobURL = URL.createObjectURL(file)
    const img = new Image()
    img.src = blobURL

    img.onerror = function () {
      URL.revokeObjectURL(this.src)
      // Handle the failure properly
      console.log('Cannot load image')
    }
    img.onload = function () {
      URL.revokeObjectURL(img.src)
      const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT)
      const canvas = document.createElement('canvas')
      canvas.width = newWidth
      canvas.height = newHeight
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.drawImage(img, 0, 0, newWidth, newHeight)
        canvas.toBlob(
          (blob) => {
            if (blob) {
              console.log('blob is ', blob)
              const myFile = new File([blob], file.name, { type: file.type })
              console.log('myFile is', myFile)
              // Handle the compressed image. es. upload or save in local state
              setFileUpload(myFile)
            }
          },
          file.type,
          QUALITY
        )
      }
    }
  }

  return (
    <DropContainer {...getRootProps()}>
      <input
        type="file"
        name="image"
        {...getInputProps()}
        accept="image/png, image/gif, image/jpeg"
      />
      {isDragActive ? (
        <MessageContainer>Drop!</MessageContainer>
      ) : (
        <MessageContainer>
          <UploadIcon src={uploadIcon} alt="upload" />
          <p>Select image to upload</p>
        </MessageContainer>
      )}
    </DropContainer>
  )
}
