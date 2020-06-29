import React, { useState } from 'react'
import styled from 'styled-components'
import { Button } from './Button'
import { AddImageForm } from './AddImageForm'

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  padding: 15px 30px;
  --background: #edeff5;
  --box-shadow: 0px 5px 10px #c9cbd0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
  position: relative;
  img {
    width: 100px;
  }
  button {
    margin-left: auto;
  }
`

export const Header = () => {
  const [formView, setFormView] = useState(false)
  const handleAddImageClick = (event) => {
    event.preventDefault()

    setFormView(!formView)
  }

  return (
    <>
      <StyledHeader>
        <img src="./image/logo.png" alt="" />
        <Button type="primary" onClick={handleAddImageClick}>
          사진 등록
        </Button>
      </StyledHeader>
      {formView && <AddImageForm />}
    </>
  )
}
