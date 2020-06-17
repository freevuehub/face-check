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
  overflow-y: scroll;
  overflow-x: hidden;
  .remote {
    padding: 30px 0;
    h4 {
      text-align: center;
      margin-bottom: 10px;
    }
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
        <h4>얼굴인식은 아직 지원하지 않습니다. 얼굴 윤곽만 잡고 있습니다.</h4>
        <AddImageForm />
        <LogBox />
      </div>
      <footer>
        FreeVue Copyright © 2020.
        <br />
        Made by 추은성-Backend, 홍성준-Frontend
      </footer>
    </StyledApp>
  )
}

export default App
