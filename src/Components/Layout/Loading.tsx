import { FC } from 'react'
import styled from '@emotion/styled'

const SpinWrap = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`
const Spinner = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid #000;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #000 transparent transparent transparent;
  }
  div:nth-of-type(1) {
    animation-delay: -0.45s;
  }
  div:nth-of-type(2) {
    animation-delay: -0.3s;
  }
  div:nth-of-type(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const Loading: FC = () => {
  return (
    <SpinWrap>
      <Spinner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </Spinner>
    </SpinWrap>
  )
}
