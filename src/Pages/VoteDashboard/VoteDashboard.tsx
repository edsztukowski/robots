import { FC, useEffect, useState } from 'react'
import { getRobots, SuccessResp } from '../../network/GET/getRobots'
import { PageWrapper } from '../../Components/Layout/PageWrapper'
import { VoteCard } from './VoteCard'
import { getVotes } from '../../network/GET/getVotes'
import { votePOST } from '../../network/POST/vote'
import { useAuth } from '../../hooks/useAuth'
import styled from '@emotion/styled'
import { deleteVote } from '../../network/DELETE/deleteVote'
import { Loading } from '../../Components/Layout/Loading'

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
  const [processing, setProcessing] = useState(false)

  const { userId } = useAuth()

  useEffect(() => {
    getRobots().then((res) => {
      setRobots(res)
    })
  }, [])

  useEffect(() => {
    getVotes().then((res) => {
      getMyVotes(res)
    })
  }, [userId])

  const getMyVotes = (allVotes: myVotes[]) => {
    const votes = allVotes.filter((vote) => {
      return vote.user === userId
    })
    setMyVotes(votes)
  }

  const handleVote = (robotId: string) => {
    setProcessing(true)
    myVotes.map((vote) => {
      return deleteVote(vote.id).then(() => {
        return votePOST(robotId).then(() => {
          getVotes()
            .then((res) => {
              getMyVotes(res)
            })
            .then(() => {
              setProcessing(false)
            })
        })
      })
    })
  }

  return (
    <PageWrapper>
      {robots.length === 0 ? (
        <div>test</div>
      ) : (
        robots.length > 0 && (
          <RobotsWrapper>
            {robots.map((robot) => {
              const hasVoted =
                myVotes.filter((vote) => vote.robot === robot.id).length > 0
              return (
                <>
                  {processing && <Loading />}

                  <VoteCard
                    disabled={processing}
                    hasVoted={hasVoted}
                    handleVote={handleVote}
                    key={robot.id}
                    id={robot.id}
                    name={robot.name}
                    url={robot.url}
                  />
                </>
              )
            })}
          </RobotsWrapper>
        )
      )}
    </PageWrapper>
  )
}
