import { FC, useEffect, useState } from 'react'
import { getRobots, SuccessResp } from '../../network/GET/getRobots'
import { PageWrapper } from '../../Components/Layout/PageWrapper'
import { VoteCard } from './VoteCard'
import { getVotes } from '../../network/GET/getVotes'
import { votePOST } from '../../network/POST/vote'
import { useAuth } from '../../hooks/useAuth'
import styled from '@emotion/styled'
import { deleteVote } from '../../network/DELETE/deleteVote'

interface myVotes {
  id: string
  robot: string
  user: string
}

const RobotsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const VoteDashboard: FC = () => {
  const [robots, setRobots] = useState<SuccessResp[] | []>([])
  const [myVotes, setMyVotes] = useState<myVotes[]>([])
  const { userId } = useAuth()

  useEffect(() => {
    getRobots().then((res) => {
      setRobots(res)
    })
  }, [])

  useEffect(() => {
    getVotes().then((res) => {
      const votes = res.filter((vote) => {
        return vote.user === userId
      })
      setMyVotes(votes)
    })
  }, [userId])

  const handleVote = (robotId: string) => {
    myVotes.map((vote) => {
      return deleteVote(vote.id).then(() => {
        return votePOST(robotId).then((res) => {
          console.log('res is ', res)
        })
      })
    })
  }

  return (
    <PageWrapper>
      {robots.length > 0 && (
        <RobotsWrapper>
          {robots.map((robot) => {
            const hasVoted =
              myVotes.filter((vote) => vote.robot === robot.id).length > 0
            return (
              <VoteCard
                hasVoted={hasVoted}
                handleVote={handleVote}
                key={robot.id}
                id={robot.id}
                name={robot.name}
                url={robot.url}
              />
            )
          })}
        </RobotsWrapper>
      )}
    </PageWrapper>
  )
}
