import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { compressFile } from '../../utils/compressImage'
import uploadIcon from '../../assets/icons/upload.png'
import styled from '@emotion/styled'

interface FileDropProps {
  setFileUpload: React.Dispatch<React.SetStateAction<File | null>>
  setImage: React.Dispatch<React.SetStateAction<string | null>>
  hasError: boolean
}
const DropContainer = styled.div<{ hasError: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 208px;
  background: var(--gray4);
  border: ${({ hasError }) =>
    hasError ? '2px dashed var(--error)' : '2px dashed var(--gray2)'};
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

export const FileDrop: FC<FileDropProps> = ({
  setFileUpload,
  setImage,
  hasError,
}) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        setImage(reader.result as string)
        //Compress the file size to make sure it can be fully uploaded
        compressFile(file, setFileUpload)
      }
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  })

  return (
    <DropContainer {...getRootProps()} hasError={hasError}>
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
