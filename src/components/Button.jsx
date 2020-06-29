import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  position: relative;
  display: block;
  border-radius: 5px;
  background: linear-gradient(175deg, #feffff, #d5d7dd);
  --box-shadow: 5px 5px 5px #c9cbd0, -5px -5px 5px #ffffff;
  height: 25px;
  padding: 0 20px;
  .active {
    &:active {
      background: linear-gradient(175deg, #d5d7dd, #feffff);
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
  &.primary {
    background: linear-gradient(175deg, #5bc6ff, #4da7db);
    color: #fff;
    &.active {
      &:active {
        background: linear-gradient(175deg, #4da7db, #5bc6ff);
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
    width: 5px;
    height: 5px;
    background-color: #449e48;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
        </>
      ) : (
        props.children
      )}
    </StyledButton>
  )
}
