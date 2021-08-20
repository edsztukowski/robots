import React, { FC, useEffect, useState } from 'react'
import { getRobots, GetRobotsRes } from '../../network/GET/getRobots'
import { PageWrapper } from '../../Components/Layout/PageWrapper'
import { RobotCard } from '../../Components/RobotCard/RobotCard'
import { getVotes, GetVotesRes } from '../../network/GET/getVotes'
import { votePOST } from '../../network/POST/vote'
import { useAuth } from '../../hooks/useAuth'
import { CardsWrapper } from '../../Components/Layout/CardsWrapper'
import { deleteVote } from '../../network/DELETE/deleteVote'
import { Loading } from '../../Components/Layout/Loading'
import { H1 } from '../../Components/Typography/Typography'
import { ErrorPage } from '../ErrorPage/ErrorPage'

export const VoteDashboard: FC = () => {
  const [robots, setRobots] = useState<GetRobotsRes[] | []>([])
  const [myVotes, setMyVotes] = useState<GetVotesRes[]>([])
  const [hasError, setHasError] = useState(false)
  const [processing, setProcessing] = useState(false)
  const { userId } = useAuth()

  useEffect(() => {
    getRobots()
      .then((res) => {
        setRobots(res)
      })
      .catch(() => {
        setHasError(true)
      })
  }, [])

  useEffect(() => {
    getVotes()
      .then((res) => {
        getMyVotes(res)
      })
      .catch(() => {
        setHasError(true)
      })
  }, [userId])

  const getMyVotes = (allVotes: GetVotesRes[]) => {
    const votes = allVotes.filter((vote) => {
      return vote.user === userId
    })
    setMyVotes(votes)
  }

  const handleVote = (robotId: string) => {
    setProcessing(true)
    if (myVotes.length > 0) {
      myVotes.map((vote) => {
        return deleteVote(vote.id).then(() => {
          const filteredVotes = myVotes.filter(
            (myVote) => myVote.id !== vote.id
          )
          return votePOST(robotId).then((res) => {
            setMyVotes([...filteredVotes, res])
            setProcessing(false)
          })
        })
      })
    } else {
      votePOST(robotId).then((res) => {
        setMyVotes([res])
        setProcessing(false)
      })
    }
  }

  return (
    <PageWrapper>
      {hasError ? (
        <ErrorPage />
      ) : (
        <>
          <H1>Robots</H1>
          {robots.length === 0 ? (
            <CardsWrapper>
              <Loading />
            </CardsWrapper>
          ) : (
            robots.length > 0 && (
              <CardsWrapper>
                {processing && <Loading />}
                {robots.map((robot) => {
                  const hasVoted =
                    myVotes.filter((vote) => vote.robot === robot.id).length > 0
                  return (
                    <RobotCard
                      key={robot.id}
                      view="vote"
                      disabled={processing}
                      hasVoted={hasVoted}
                      handleClick={handleVote}
                      id={robot.id}
                      name={robot.name}
                      url={robot.url}
                    />
                  )
                })}
              </CardsWrapper>
            )
          )}
        </>
      )}
    </PageWrapper>
  )
}
