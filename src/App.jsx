import React from 'react'
import styled from 'styled-components'
import { FaceVideo, Header, AddImageForm } from './components'

const StyledApp = styled.section`
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  background-color: #f2f2f2;
`
const StyledContainer = styled.article`
  position: relative;
  background-color: #f2f2f2;
  padding: 20px;
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  footer {
    margin-top: auto;
    width: 100%;
    padding: 10px;
  }
`

const App = () => {
  return (
    <>
      <StyledApp>
        <Header />
        <StyledContainer>
          <FaceVideo />
        </StyledContainer>
        <footer>
          FreeVue Copyright © 2020.
          <br />
          Made by 추은석-Backend, 홍성준-Frontend
        </footer>
      </StyledApp>
      <AddImageForm />
    </>
  )
}

export default App
