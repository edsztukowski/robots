import React, { FC, useState, useEffect } from 'react'
import { getRobots, SuccessResp } from '../../network/GET/getRobots'
import { addRobotPOST } from '../../network/POST/addRobot'
import { PageWrapper } from '../../Components/Layout/PageWrapper'
import { RobotCard } from '../../Components/RobotCard/RobotCard'
import { Loading } from '../../Components/Layout/Loading'

import { AddCard } from './AddCard'
import { deleteRobot } from '../../network/DELETE/deleteRobot'
import { CardsWrapper } from '../../Components/Layout/CardsWrapper'

export const AdminDash: FC = () => {
  const [robots, setRobots] = useState<SuccessResp[] | []>([])
  const [processing, setProcessing] = useState(false)
  const [resetAdd, setResetAdd] = useState(false)

  useEffect(() => {
    getRobots().then((res) => {
      setRobots(res)
    })
  }, [])

  const handleDelete = (id: string) => {
    deleteRobot(id)
      .then(() => {
        setRobots(robots.filter((robot) => robot.id !== id))
      })
      .catch(() => {
        console.log('error occurred')
      })
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
      <CardsWrapper>
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
      </CardsWrapper>
      )
    </PageWrapper>
  )
}
