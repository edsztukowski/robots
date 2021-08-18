import axios from 'axios'
import { getToken } from '../getToken'
export interface GetVotesRes {
  id: string
  robot: string
  user: string
}

export const getVotes = (): Promise<GetVotesRes[]> => {
  const headers = {
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${getToken()}`,
  }
  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/votes`, {
      headers,
    })
    .then((res) => {
      return res.data as GetVotesRes[]
    })
    .catch((err) => {
      throw new Error(err.message as string)
    })
}
