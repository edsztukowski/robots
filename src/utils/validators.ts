export const validEmail = (emailVal: string): boolean => {
  const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  return regexEmail.test(emailVal)
}
