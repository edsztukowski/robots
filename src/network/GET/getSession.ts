import axios from 'axios'
import { getToken } from '../getToken'
interface SuccessResp {
  id: string
  name: string
  email: string
}
const headers = {
  'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
  Authorization: `Bearer ${getToken()}`,
}

export const getSession = (): Promise<SuccessResp> => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/auth/session`, {
      headers,
    })
    .then((res) => {
      return res.data as SuccessResp
    })
    .catch((err) => {
      throw new Error(err.message as string)
    })
}
