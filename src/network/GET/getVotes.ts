import axios from 'axios'
import { getToken } from '../tokenHelpers'
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
