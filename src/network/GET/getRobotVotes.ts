import axios from 'axios'
import { getToken } from '../getToken'
export interface SuccessResp {
  id: string
  robot: string
  user: string
}

export const getRobotVotes = (robotId: string): Promise<SuccessResp[]> => {
  const headers = {
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${getToken()}`,
  }

  return axios
    .get(`${process.env.REACT_APP_BASE_URL}/robots/${robotId}/votes`, {
      headers,
    })
    .then((res) => {
      return res.data as SuccessResp[]
    })
    .catch((err) => {
      throw new Error(err.message as string)
    })
}
