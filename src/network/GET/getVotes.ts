import axios from 'axios'
import { getToken } from '../getToken'
export interface SuccessResp {
  id: string
  robot: string
  user: string
}
const headers = {
  'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
  Authorization: `Bearer ${getToken()}`,
}

export const getVotes = (): Promise<SuccessResp[]> => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/votes`, {
      headers,
    })
    .then((res) => {
      return res.data as SuccessResp[]
    })
    .catch((err) => {
      throw new Error(err.message as string)
    })
}
