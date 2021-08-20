const adminUsers = ['826d380ec98eb6bb6027d92fbdf298b9']

export const isAdmin = (userId: string): boolean => {
  if (adminUsers.indexOf(userId) > -1) {
    return true
  } else {
    return false
  }
}
