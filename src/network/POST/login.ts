import axios from 'axios'
interface SuccessResp {
  token: string
}
const headers = {
  'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
}
console.log(headers)
export const loginPOST = (
  email: string,
  password: string
): Promise<SuccessResp> => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/auth/session`,
      {
        email,
        password,
      },
      {
        headers,
      }
    )
    .then((res) => {
      return res.data as SuccessResp
    })
    .catch((err) => {
      throw new Error(err.message as string)
    })
}
