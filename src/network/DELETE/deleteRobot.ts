import axios from 'axios'
import { getToken } from '../getToken'

const headers = {
  'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
  Authorization: `Bearer ${getToken()}`,
}

export const deleteRobot = (robotId: string): Promise<string> => {
  return axios
    .delete(`${process.env.REACT_APP_BASE_URL}/robots/${robotId}`, {
      headers,
    })
    .then((res) => {
      return res.data as string
    })
    .catch((err) => {
      throw new Error(err.message as string)
    })
}
