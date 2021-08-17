import { FC } from 'react'
import { Card } from '../Layout/Card'
import { Button } from '../Button/Button'
import { H3 } from '../Typography/Typography'
import { getCSSVal } from '../../utils/getCSSVal'
import { CardWrapper } from '../Layout/CardWrapper'
import { RobotResults } from './RobotResults'
import styled from '@emotion/styled'

interface RobotCardProps {
  id: string
  view: 'vote' | 'admin' | 'results'
  hasVoted?: boolean
  handleClick?: (id: string) => void
  disabled: boolean
  name: string
  url: string
  resultsData?: { robotVotes: number; totalVotes: number }
}

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 23px 37px;
`

export const RobotCard: FC<RobotCardProps> = ({
  id,
  name,
  hasVoted,
  view,
  url,
  disabled,
  handleClick,
  resultsData,
}) => {
  console.log('results data is ', resultsData)
  return (
    <CardWrapper disabled={disabled}>
      <Card>
        <CardContent>
          <H3
            style={{ textTransform: 'capitalize' }}
            color={getCSSVal('--gray3')}
          >
            {name}
          </H3>
          <img alt={name} src={url} />
          {view === 'admin' && handleClick && (
            <Button btnType="secondary" onClick={() => handleClick(id)}>
              Delete
            </Button>
          )}
          {view === 'vote' && handleClick && (
            <Button disabled={hasVoted} onClick={() => handleClick(id)}>
              {hasVoted ? 'Vote Cast' : 'Vote'}
            </Button>
          )}
          {view === 'results' && resultsData && (
            <RobotResults
              robotVotes={resultsData.robotVotes}
              totalVotes={resultsData.totalVotes}
            />
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  )
}
