import React from 'react'
import styled from 'styled-components'
import { FaceVideo, AddImageForm, LogBox } from './components'

const StyledApp = styled.section`
  height: 100%;
  position: relative;
  background-color: #f2f2f2;
  padding: 20px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  .remote {
  }
  footer {
    margin-top: auto;
    width: 100%;
  }
`

const App = () => {
  return (
    <StyledApp>
      <FaceVideo />
      <div className="remote">
        <AddImageForm />
        <LogBox />
      </div>
      <footer>FreeVue Copyright © 2020. Made by 홍성준</footer>
    </StyledApp>
  )
}

export default App
