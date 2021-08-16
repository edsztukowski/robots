import axios from 'axios'
import { getToken } from '../getToken'

interface SuccessResp {
  id: string
  robot: string
  user: string
}
const headers = {
  'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
  Authorization: `Bearer ${getToken()}`,
}

export const resetPOST = (): Promise<SuccessResp> => {
  return axios
    .post(
      `${process.env.REACT_APP_BASE_URL}/reset`,
      {},
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