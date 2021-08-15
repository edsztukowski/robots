import { FC } from 'react'
import { resetPOST } from '../../network/POST/resetData'
export const AdminDash: FC = () => {
  const handleReset = () => {
    resetPOST().then((res) => {
      console.log('reset: ', res)
    })
  }

  return <button onClick={handleReset}>RESET</button>
}
