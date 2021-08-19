import axios from 'axios'
import { getToken } from '../tokenHelpers'
interface SuccessResp {
  id: string
  name: string
  url: string
}

export const addRobotPOST = (
  name: string,
  image: File
): Promise<SuccessResp> => {
  const headers = {
    'x-robot-art-api-key': process.env.REACT_APP_API_KEY,
    Authorization: `Bearer ${getToken()}`,
    'content-type': 'multipart/form-data',
  }

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
