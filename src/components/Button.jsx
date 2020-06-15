import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  display: block;
  box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #ffffff;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  background: linear-gradient(175deg, #ffffff, #dadada);
  &:active {
    background: linear-gradient(175deg, #dadada, #ffffff);
  }
  &.accept {
    background: linear-gradient(175deg, #51bb56, #449e48);
    color: #fff;
    &:active {
      background: linear-gradient(175deg, #449e48, #51bb56);
    }
  }
`

export const Button = (props) => {
  return (
    <StyledButton className={props.type} onClick={props.onClick}>
      {props.children}
    </StyledButton>
  )
}
