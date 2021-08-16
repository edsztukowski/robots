import axios from 'axios'
import { getToken } from '../getToken'
interface SuccessResp {
  id: string
  name: string
  url: string
}
const headers = {
  'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
  Authorization: `Bearer ${getToken()}`,
  'content-type': 'multipart/form-data',
}

export const addRobotPOST = (
  name: string,
  image: File
): Promise<SuccessResp> => {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('image', image)
  return axios
    .post(`${process.env.REACT_APP_BASE_URL}/robots`, formData, {
      headers,
    })
    .then((res) => {
      return res.data as SuccessResp
    })
    .catch((err) => {
      console.log('error!')
      throw new Error(err.message as string)
    })
}
