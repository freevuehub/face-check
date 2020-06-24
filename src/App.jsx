import React, { useState } from 'react'
import styled from 'styled-components'
import { FaceVideo, Header, AddImageForm, ImageList } from './components'

const StyledApp = styled.section`
  display: flex;
  height: 100%;
  overflow: hidden;
  flex-direction: column;
  background: #edeff5;
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
  const [formView, setFormView] = useState(false)
  const handleFormToggle = () => {
    setFormView(!formView)
  }

  return (
    <>
      <StyledApp>
        <Header onToggle={handleFormToggle} />
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
      {formView && <AddImageForm />}
    </>
  )
}

export default App
