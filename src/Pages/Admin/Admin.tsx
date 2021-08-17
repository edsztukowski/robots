import React, { FC, useState, useEffect } from 'react'
import { getRobots, GetRobotsRes } from '../../network/GET/getRobots'
import { addRobotPOST } from '../../network/POST/addRobot'
import { PageWrapper } from '../../Components/Layout/PageWrapper'
import { RobotCard } from '../../Components/RobotCard/RobotCard'
import { Loading } from '../../Components/Layout/Loading'

import { AddCard } from './AddCard'
import { deleteRobot } from '../../network/DELETE/deleteRobot'
import { CardsWrapper } from '../../Components/Layout/CardsWrapper'
import { H1 } from '../../Components/Typography/Typography'

export const AdminDash: FC = () => {
  const [robots, setRobots] = useState<GetRobotsRes[] | []>([])
  const [processing, setProcessing] = useState(false)
  const [resetAdd, setResetAdd] = useState(false)

  useEffect(() => {
    setProcessing(true)
    getRobots().then((res) => {
      setRobots(res)
      setProcessing(false)
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
      <H1>Admin</H1>
      <CardsWrapper>
        {processing ? (
          <Loading />
        ) : (
          <>
            <AddCard
              label="Add Robots"
              handleAdd={handleAdd}
              resetAdd={resetAdd}
            />
            {robots.map((robot) => {
              return (
                <React.Fragment key={robot.id}>
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
          </>
        )}
      </CardsWrapper>
    </PageWrapper>
  )
}
