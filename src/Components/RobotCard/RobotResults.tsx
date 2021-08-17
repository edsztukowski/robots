import { FC } from 'react'
import { H2, H3 } from '../Typography/Typography'
import { FlexRow } from '../Layout/Flex'
import { getCSSVal } from '../../utils/getCSSVal'
interface ResultsProps {
  robotVotes: number
  totalVotes: number
}

export const RobotResults: FC<ResultsProps> = ({ robotVotes, totalVotes }) => {
  return (
    <FlexRow alignItems="baseline" justifyContent="center">
      <H2>{robotVotes}</H2>
      <H3 color={getCSSVal('--gray2')}> /{totalVotes}</H3>
    </FlexRow>
  )
}
