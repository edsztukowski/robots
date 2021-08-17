import { FC } from 'react'
import { Card } from '../Layout/Card'
import { Button } from '../Button/Button'
import { H3 } from '../Typography/Typography'
import { getCSSVal } from '../../utils/getCSSVal'
import { CardWrapper } from '../Layout/CardWrapper'
import styled from '@emotion/styled'

interface RobotCardProps {
  id: string
  view: 'vote' | 'admin' | 'results'
  hasVoted?: boolean
  handleClick: (id: string) => void
  disabled: boolean
  name: string
  url: string
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
}) => {
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
          {view === 'admin' && (
            <Button btnType="secondary" onClick={() => handleClick(id)}>
              Delete
            </Button>
          )}
          {view === 'vote' && (
            <Button disabled={hasVoted} onClick={() => handleClick(id)}>
              {hasVoted ? 'Vote Cast' : 'Vote'}
            </Button>
          )}
        </CardContent>
      </Card>
    </CardWrapper>
  )
}
