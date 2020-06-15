import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const StyledLogBox = styled.div`
  background: #f2f2f2;
  box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #ffffff;
  padding: 20px;
  border-radius: 10px;
`

export const LogBox = () => {
  const { logValue } = useSelector((state) => state.logs)

  return (
    <StyledLogBox>
      {logValue.returnCode ? (
        <div>
          {logValue.message
            ? logValue.message
            : logValue.returnData.faceRecognition.map(({ name }, idx) => <p key={idx}>{name}</p>)}
        </div>
      ) : (
        'Loading...'
      )}
    </StyledLogBox>
  )
}
