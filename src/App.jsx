import React from 'react'
import styled from 'styled-components'
import { FaceVideo, Header, ImageList } from './components'
import { AppProvider } from './store'

const StyledApp = styled.section`
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  --background: #edeff5;
  background-image: url('./image/bg.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  footer {
    width: 100%;
    padding: 10px;
    opacity: 0.8;
  }
`
const StyledContainer = styled.article`
  position: relative;
  padding: 20px;
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
`

const App = () => {
  return (
    <AppProvider>
      <StyledApp>
        <Header />
        <StyledContainer>
          <FaceVideo />
          <ImageList />
        </StyledContainer>
        <footer>
          FreeVue Copyright © 2020.
          <br />
          Made by 추은석-Backend, 홍성준-Frontend
        </footer>
      </StyledApp>
    </AppProvider>
  )
}

export default App
