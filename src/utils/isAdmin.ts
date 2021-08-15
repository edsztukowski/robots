const adminUsers = ['admin@mondorobot.com']

export const isAdmin = (userEmail: string): boolean => {
  if (adminUsers.indexOf(userEmail) > -1) {
    return true
  } else {
    return false
  }
}
