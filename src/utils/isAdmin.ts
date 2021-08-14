import { getSession } from '../network/GET/getSession'

const adminUsers = ['admin@mondorobot.com']

export const isAdmin = async (): Promise<boolean> => {
  return getSession()
    .then((res) => {
      if (adminUsers.indexOf(res.email) > -1) {
        return true
      } else {
        return false
      }
    })
    .catch(() => {
      return false
    })
}
