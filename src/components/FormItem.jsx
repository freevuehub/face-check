import React from 'react'
import styled from 'styled-components'

const StyledFormItem = styled.div`
  background: #f2f2f2;
  box-shadow: inset 5px 5px 10px #cecece, inset -5px -5px 10px #ffffff;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 30px;
  input {
    height: 20px;
    background-color: transparent;
    display: block;
    width: 100%;
  }
`

export const FormItem = (props) => {
  return (
    <StyledFormItem>
      <input {...props} />
    </StyledFormItem>
  )
}
