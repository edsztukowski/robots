import axios from 'axios'
import { loginPOST } from './login'
interface SuccessResp {
  token: string
}
const headers = {
  'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
}

export const registerPOST = (
  name: string,
  email: string,
  password: string
): Promise<SuccessResp> => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/auth/register`,
      {
        name,
        email,
        password,
      },
      {
        headers,
      }
    )
    .then(() => {
      return loginPOST(email, password).then((res) => {
        return res as SuccessResp
      })
    })
    .catch((err) => {
      throw new Error(err.message as string)
    })
}
