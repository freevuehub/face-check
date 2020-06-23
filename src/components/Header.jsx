import React from 'react'
import styled from 'styled-components'
import { Button } from './Button'

const StyledHeader = styled.header`
  width: 100%;
  display: flex;
  padding: 15px 30px;
  background: #edeff5;
  background: #edeff5;
  box-shadow: 0px 5px 10px #c9cbd0;
  z-index: 100;
  position: relative;
  img {
    width: 100px;
  }
  button {
    margin-left: auto;
  }
`

export const Header = (props) => {
  const handleAddImageClick = (event) => {
    event.preventDefault()

    props.onToggle()
  }

  return (
    <StyledHeader>
      <img
        src="https://www.rsupport.com/ko-kr/wp-content/uploads/sites/2/2015/11/rsupport.svg"
        alt=""
      />
      <Button type="primary" onClick={handleAddImageClick}>
        사진 등록
      </Button>
    </StyledHeader>
  )
}
