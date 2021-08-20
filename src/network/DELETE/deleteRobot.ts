import axios from 'axios'
import { getToken } from '../tokenHelpers'

export const deleteRobot = (robotId: string): Promise<string> => {
  const headers = {
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${getToken()}`,
  }
  return axios
    .delete(`${process.env.REACT_APP_BASE_URL}/robots/${robotId}`, {
      headers,
    })
    .then((res) => {
      return res.data as string
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
