import React, { FC, useState, useEffect } from 'react'
import { getRobots, SuccessResp } from '../../network/GET/getRobots'
import { addRobotPOST } from '../../network/POST/addRobot'
import { PageWrapper } from '../../Components/Layout/PageWrapper'
import { RobotCard } from '../../Components/RobotCard/RobotCard'
import { Loading } from '../../Components/Layout/Loading'
import styled from '@emotion/styled'
import { AddCard } from './AddCard'

const RobotsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const AdminDash: FC = () => {
  const [robots, setRobots] = useState<SuccessResp[] | []>([])
  const [processing, setProcessing] = useState(false)
  const [resetAdd, setResetAdd] = useState(false)

  useEffect(() => {
    getRobots().then((res) => {
      setRobots(res)
    })
  }, [])

  const handleDelete = () => {
    console.log('delete')
  }

  const handleAdd = (name: string, image: File | null) => {
    if (name && image) {
      setProcessing(true)
      addRobotPOST(name, image)
        .then((res) => {
          setRobots([...robots, res])
          setProcessing(false)
          setResetAdd(!resetAdd)
        })
        .catch((err) => {
          console.log('an error occurred: ', err)
        })
    }
  }

  return (
    <PageWrapper>
      <RobotsWrapper>
        <AddCard label="Add Robots" handleAdd={handleAdd} resetAdd={resetAdd} />
        {robots.map((robot) => {
          return (
            <React.Fragment key={robot.id}>
              {processing && <Loading />}
              <RobotCard
                view="admin"
                disabled={processing}
                id={robot.id}
                handleClick={handleDelete}
                name={robot.name}
                url={robot.url}
              />
            </React.Fragment>
          )
        })}
      </RobotsWrapper>
      )
    </PageWrapper>
  )
}
