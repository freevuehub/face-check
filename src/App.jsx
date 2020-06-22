import React from 'react'
import styled from 'styled-components'
import { FaceVideo, AddImageForm } from './components'

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
        <AddImageForm />
      </div>
      <footer>
        FreeVue Copyright © 2020.
        <br />
        Made by 추은석-Backend, 홍성준-Frontend
      </footer>
    </StyledApp>
  )
}

export default App
