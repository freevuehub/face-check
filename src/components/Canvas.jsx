import React, { useRef, useLayoutEffect } from 'react'
import styled from 'styled-components'

const StyleCanvas = styled.canvas`
  display: block;
`

export const Canvas = (props) => {
  const $canvas = useRef()

  useLayoutEffect(() => {
    props.onDrawReady($canvas.current)
  })

  return <StyleCanvas ref={$canvas}>해당 브라우저는 지원하지 않습니다.</StyleCanvas>
}
