import axios from 'axios'
import { getToken } from '../tokenHelpers'

interface SuccessResp {
  id: string
  robot: string
  user: string
}

export const resetPOST = (): Promise<SuccessResp> => {
  const headers = {
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${getToken()}`,
  }
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
    .catch((error) => {
      if (error.response) {
        throw new Error(JSON.stringify(error.response.statusText))
      } else if (error.request) {
        throw new Error(error.request)
      } else {
        throw new Error(error.message)
      }
    })
}
