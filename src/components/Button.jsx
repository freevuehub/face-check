import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  position: relative;
  display: block;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  background: linear-gradient(175deg, #ffffff, #dadada);
  box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #ffffff;
  min-height: 36px;
  .active {
    &:active {
      background: linear-gradient(175deg, #dadada, #ffffff);
    }
  }
  &.accept {
    background: linear-gradient(175deg, #51bb56, #449e48);
    color: #fff;
    &.active {
      &:active {
        background: linear-gradient(175deg, #449e48, #51bb56);
      }
    }
  }
  &.disabled {
    background: linear-gradient(175deg, #ffffff, #dadada);
  }
  span {
    position: absolute;
    font-size: 0;
    display: block;
    width: 10px;
    height: 10px;
    background-color: #449e48;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    margin-top: -5px;
    &:nth-child(1) {
      margin-left: -20px;
      animation: loading infinite 1s;
    }
    &:nth-child(2) {
      margin-left: -5px;
      animation: loading infinite 1s 0.3s;
    }
    &:nth-child(3) {
      margin-left: 10px;
      animation: loading infinite 1s 0.6s;
    }
  }

  @keyframes loading {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }
`

export const Button = (props) => {
  const classList = [props.type, props.loading ? 'disabled' : 'active']

  return (
    <StyledButton disabled={props.loading} className={classList} onClick={props.onClick}>
      {props.loading ? (
        <>
          <span>1</span>
          <span>2</span>
          <span>3</span>
        </>
      ) : (
        props.children
      )}
    </StyledButton>
  )
}
