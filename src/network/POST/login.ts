import axios from 'axios'
interface SuccessResp {
  token: string
}
const headers = {
  'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
}
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
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.message)
      } else if (error.request) {
        throw new Error(error.request)
      } else {
        throw new Error(error.message)
      }
    })
}
