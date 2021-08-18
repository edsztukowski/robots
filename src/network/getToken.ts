export const getToken = (): string | undefined => {
  console.log('getToken fires ')
  const tokenString = localStorage.getItem('token')
  console.log('tokenString is ', tokenString)
  if (tokenString) {
    return tokenString
  } else {
    console.log('no token string')
  }
}
