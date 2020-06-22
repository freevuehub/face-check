import React, { useLayoutEffect, useRef } from 'react'
import styled from 'styled-components'
import { sendElement } from '../utils'

const StyledVideo = styled.video`
  display: none;
`

export const CamVideo = (props) => {
  const $video = useRef()
  const handleVideoOnCanPlay = ({ target }) => {
    console.log('handleVideoOnCanPlay')
    props.onPlayReady(target)

    sendElement.setEl = target
  }

  useLayoutEffect(() => {
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

      return res
    }

    getMedia()
  }, [$video])

  return <StyledVideo ref={$video} onCanPlay={handleVideoOnCanPlay} src="#" autoPlay></StyledVideo>
}
