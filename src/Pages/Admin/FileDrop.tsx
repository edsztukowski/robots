import { FC, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

import styled from '@emotion/styled'

interface FileDropProps {
  setFileUpload: React.Dispatch<React.SetStateAction<File | null>>
  setImage: React.Dispatch<React.SetStateAction<string | null>>
}
const DropContainer = styled.div`
  width: 349px;
  height: 208px;
  background: var(--gray4);
  border: 2px dashed var(--gray2);
  border-radius: 8px;
`

export const FileDrop: FC<FileDropProps> = ({ setFileUpload, setImage }) => {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file: File) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        setImage(reader.result as string)
        setFileUpload(file)
      }
    })
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
  })
  return (
    <DropContainer {...getRootProps()}>
      <input
        type="file"
        name="image"
        {...getInputProps()}
        accept="image/png, image/gif, image/jpeg"
      />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </DropContainer>
  )
}
