import axios from 'axios'
import { getToken } from '../getToken'
export interface GetRobotsRes {
  id: string
  name: string
  url: string
}
const headers = {
  'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
  Authorization: `Bearer ${getToken()}`,
}

export const getRobots = (): Promise<GetRobotsRes[]> => {
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/robots`, {
      headers,
    })
    .then((res) => {
      return res.data as GetRobotsRes[]
    })
    .catch((err) => {
      throw new Error(err.message as string)
    })
}
