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

export const compressFile = (
  file: File,
  callback: React.Dispatch<React.SetStateAction<File | null>>
): void => {
  const MAX_WIDTH = 349
  const MAX_HEIGHT = 321
  const QUALITY = 0.7

  const blobURL = URL.createObjectURL(file)
  const img = new Image()
  img.src = blobURL

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
            const myFile = new File([blob], file.name, { type: file.type })

            callback(myFile)
          }
        },
        file.type,
        QUALITY
      )
    }
  }
}
