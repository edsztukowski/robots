import { FC, useState, useEffect } from 'react'
import { H2, H3 } from '../Typography/Typography'
import { FlexRow } from '../Layout/Flex'
import { getCSSVal } from '../../utils/getCSSVal'
import styled from '@emotion/styled'
interface ResultsProps {
  robotVotes: number
  totalVotes: number
}

const VoteNum = styled(FlexRow)`
  H2,
  H3 {
    margin: 0;
  }
`

const StyledBar = styled.div`
  width: 100%;
  height: 34px;
  border: 2px solid var(--gray1);
  box-sizing: border-box;
  padding: 4px;
  border-radius: 8px;
`

const InnerBar = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  height: 100%;
  background: var(--gray3);
  border-radius: 5px;
  transition: all 0.4s ease-in-out;
`

const VoteBar: FC<{ percentVote: number }> = ({ percentVote }) => {
  return (
    <StyledBar>
      <InnerBar width={percentVote}></InnerBar>
    </StyledBar>
  )
}

export const RobotResults: FC<ResultsProps> = ({ robotVotes, totalVotes }) => {
  const [robotPercent, setRobotPercent] = useState(0)

  useEffect(() => {
    setRobotPercent((robotVotes / totalVotes) * 100)
  }, [robotVotes, totalVotes])
  return (
    <>
      <VoteNum alignItems="baseline" justifyContent="center">
        <H2>{robotVotes}</H2>
        <H3 color={getCSSVal('--gray2')}> /{totalVotes}</H3>
      </VoteNum>
      <FlexRow>
        <VoteBar percentVote={robotPercent} />
      </FlexRow>
    </>
  )
}
