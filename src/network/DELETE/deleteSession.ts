import axios from 'axios'
import { getToken } from '../tokenHelpers'

export const deleteSession = (): Promise<string> => {
  const headers = {
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${getToken()}`,
  }
  return axios
    .delete(`${process.env.REACT_APP_BASE_URL}/auth/session`, {
      headers,
    })
    .then((res) => {
      return res.data as string
    })
    .catch((err) => {
      throw new Error(err.message as string)
    })
}
