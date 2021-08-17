import axios from 'axios'
import { getToken } from '../getToken'
export interface GetVotesRes {
  id: string
  robot: string
  user: string
}
const headers = {
  'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
  Authorization: `Bearer ${getToken()}`,
}

export const getVotes = (): Promise<GetVotesRes[]> => {
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
