import { FC } from 'react'
import { Card } from '../../Components/Layout/Card'
import { Button } from '../../Components/Button/Button'
import { H3 } from '../../Components/Typography/Typography'
import { getCSSVal } from '../../utils/getCSSVal'

import styled from '@emotion/styled'

interface VoteCardProps {
  id: string
  hasVoted: boolean
  handleVote: (id: string) => void
  disabled: boolean
  name: string
  url: string
}

const CardWrapper = styled.div<{ disabled: boolean }>`
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'initial')};
  max-width: 397px;
  max-height: 519px;
  Button {
    max-width: 149px;
  }
  img {
    max-width: 100%;
    max-height: 321px;
    margin-bottom: 36px;
  }
`

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
`

export const VoteCard: FC<VoteCardProps> = ({
  id,
  name,
  hasVoted,
  url,
  disabled,
  handleVote,
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
          <Button disabled={hasVoted} onClick={() => handleVote(id)}>
            Vote
          </Button>
        </CardContent>
      </Card>
    </CardWrapper>
  )
}
