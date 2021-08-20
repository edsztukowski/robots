import axios from 'axios'
import { getToken } from '../tokenHelpers'
interface SuccessResp {
  id: string
  name: string
  email: string
}

export const getSession = (): Promise<SuccessResp> => {
  const headers = {
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${getToken()}`,
  }

  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/auth/session`, {
      headers,
    })
    .then((res) => {
      console.log('res.data is ', res.data)
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
