import React from 'react'
import styled from 'styled-components'

const StyledFormItem = styled.div`
  background: #edeff5;
  box-shadow: inset 5px 5px 5px #c9cbd0, inset -5px -5px 5px #ffffff;
  border-radius: 5px;
  height: 30px;
  margin-bottom: 15px;
  input {
    display: block;
    width: 100%;
    height: 100%;
    background-color: transparent;
    padding: 0 10px;
    font-size: 0.8rem;
  }
`

export const FormItem = (props) => {
  return (
    <StyledFormItem>
      <input {...props} />
    </StyledFormItem>
  )
}
