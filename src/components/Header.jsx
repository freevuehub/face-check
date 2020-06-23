import React from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  width: 100%;
  background-color: #f2f2f2;
  display: flex;
  padding: 10px;
  box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #ffffff;
  z-index: 100;
  position: relative;
  img {
    width: 100px;
  }
`

export const Header = () => {
  return (
    <StyledHeader>
      <img
        src="https://www.rsupport.com/ko-kr/wp-content/uploads/sites/2/2015/11/rsupport.svg"
        alt=""
      />
    </StyledHeader>
  )
}
