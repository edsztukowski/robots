import axios from 'axios'
import { getToken } from '../tokenHelpers'
export interface GetRobotsRes {
  id: string
  name: string
  url: string
}

export const getRobots = (): Promise<GetRobotsRes[]> => {
  const headers = {
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${getToken()}`,
  }
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
