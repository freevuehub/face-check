import React, { useContext } from 'react'
import styled from 'styled-components'
import { FaceContext } from '../store/FaceStore'

const StyledBox = styled.div`
  position: fixed;
  left: 10px;
  top: 60px;
`

export const LogBox = () => {
  const faceCtx = useContext(FaceContext)

  return (
    <StyledBox>
      {faceCtx.logList.map((log, idx) => (
        <p key={idx}>{log}</p>
      ))}
    </StyledBox>
  )
}
