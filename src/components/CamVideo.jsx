import React, { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { sendElement } from '../utils'

const StyledVideo = styled.video`
  display: none;
`

export const CamVideo = (props) => {
  const $video = useRef()
  const getMedia = async () => {
    const res = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false,
    })
    const { current } = $video

    if ('srcObject' in current) {
      current.srcObject = res
    } else {
      current.src = URL.createObjectURL(res)
    }

    current.oncanplay = ({ target }) => {
      props.onPlayReady(target)

      sendElement.setEl = target
    }

    return res
  }

  useLayoutEffect(() => {
    getMedia()
  })

  return <StyledVideo ref={$video} src="#" autoPlay></StyledVideo>
}
