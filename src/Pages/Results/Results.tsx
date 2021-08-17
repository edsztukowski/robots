import React, { FC, useState, useEffect } from 'react'
import { getRobots, GetRobotsRes } from '../../network/GET/getRobots'
import { getVotes, GetVotesRes } from '../../network/GET/getVotes'
import { PageWrapper } from '../../Components/Layout/PageWrapper'
import { RobotCard } from '../../Components/RobotCard/RobotCard'
import { Loading } from '../../Components/Layout/Loading'
import { CardsWrapper } from '../../Components/Layout/CardsWrapper'
import { H1 } from '../../Components/Typography/Typography'

export const Results: FC = () => {
  const [robots, setRobots] = useState<GetRobotsRes[] | []>([])
  const [processing, setProcessing] = useState(false)
  const [voteData, setVoteData] = useState<GetVotesRes[]>([])
  const [totalVotes, setTotalVotes] = useState(0)

  useEffect(() => {
    setProcessing(true)
    getRobots().then((res) => {
      setRobots(res)
    })
    getVotes().then((res) => {
      setVoteData(res)
      setTotalVotes(res.length)
      setProcessing(false)
    })
  }, [])

  return (
    <PageWrapper>
      <H1>Results</H1>
      <CardsWrapper>
        {processing ? (
          <Loading />
        ) : (
          robots.map((robot) => {
            const robotVotes = voteData.filter(
              (votes) => votes.robot === robot.id
            ).length
            const resultsData = {
              robotVotes,
              totalVotes,
            }
            return (
              <React.Fragment key={robot.id}>
                <RobotCard
                  view="results"
                  disabled={processing}
                  id={robot.id}
                  name={robot.name}
                  url={robot.url}
                  resultsData={resultsData}
                />
              </React.Fragment>
            )
          })
        )}
      </CardsWrapper>
    </PageWrapper>
  )
}
