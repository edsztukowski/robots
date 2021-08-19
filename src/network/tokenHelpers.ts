export const getToken = (): string | undefined => {
  const tokenString = localStorage.getItem('token')
  if (tokenString) {
    return tokenString
  }
}

export const deleteToken = (): void => {
  localStorage.removeItem('token')
}
