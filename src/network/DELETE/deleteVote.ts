import axios from 'axios'
import { getToken } from '../tokenHelpers'

export const deleteVote = (voteId: string): Promise<string> => {
  const headers = {
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${getToken()}`,
  }
  return axios
    .delete(`${process.env.REACT_APP_BASE_URL}/votes/${voteId}`, {
      headers,
    })
    .then((res) => {
      return res.data as string
    })
    .catch((error) => {
      if (error.response) {
        throw new Error(error.response.message)
      } else if (error.request) {
        throw new Error(error.request)
      } else {
        throw new Error(error.message)
      }
    })
}
