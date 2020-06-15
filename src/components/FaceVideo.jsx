import React, { useState } from 'react'
import { Canvas } from './Canvas'
import { CamVideo } from './CamVideo'
import styled from 'styled-components'
import { postFaceCheck } from '../axios'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLog } from '../module/log'

const StyledFaceVideo = styled.div`
  border-radius: 20px;
  background: #f2f2f2;
  box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #ffffff;
  overflow: hidden;
`
const StyledHide = styled.div`
  display: none;
`

export const FaceVideo = () => {
  const dispatch = useDispatch()
  const [ctx, setCtx] = useState()
  const [canvas, setCanvas] = useState()
  const [grid, setGrid] = useState()
  const { logValue } = useSelector((state) => state.logs)
  const handleFaceCanvasDrawReady = (dom) => {
    setCanvas(dom)
    setCtx(dom.getContext('2d'))
  }
  const handleGridCanvasDrawReady = (dom) => {
    const gridCtx = dom.getContext('2d')
    const { returnData: faceRecognition } = logValue

    if (faceRecognition) {
      dom.width = canvas.width
      dom.height = canvas.height

      const drawGrid = () => {
        gridCtx.clearRect(0, 0, canvas.width, canvas.height)
        gridCtx.fillStyle = '#ff4d4f'

        faceRecognition.faceRecognition.forEach((item) => {
          gridCtx.fillRect(
            Math.round(item.x * canvas.width),
            Math.round(item.y * canvas.height),
            Math.round(item.width * canvas.width),
            Math.round(item.height * canvas.height)
          )
          gridCtx.clearRect(
            Math.round(item.x * canvas.width) + 3,
            Math.round(item.y * canvas.height) + 3,
            Math.round(item.width * canvas.width) - 6,
            Math.round(item.height * canvas.height) - 6
          )
        })
      }

      drawGrid()
    }

    setGrid(dom)
  }
  const handleCamPlayReady = (dom) => {
    canvas.width = dom.videoWidth
    canvas.height = dom.videoHeight

    const drawVideo = () => {
      ctx.drawImage(dom, 0, 0, dom.videoWidth, dom.videoHeight)

      if (grid) {
        ctx.drawImage(grid, 0, 0, dom.videoWidth, dom.videoHeight)
      }

      setTimeout(drawVideo, 1000 / 15)
    }

    drawVideo()
  }
  const handleImageCheck = () => {
    canvas.toBlob(async (blob) => {
      const formData = new FormData()

      formData.append('image', blob)

      const res = await postFaceCheck(formData)

      dispatch(fetchLog(res))
      handleImageCheck()
    }, 'image/png')
  }

  React.useLayoutEffect(() => {
    if (canvas) {
      handleImageCheck()
    }
  }, [canvas])

  return (
    <StyledFaceVideo>
      <CamVideo onPlayReady={handleCamPlayReady} />
      <Canvas onDrawReady={handleFaceCanvasDrawReady} />
      <StyledHide>
        <Canvas onDrawReady={handleGridCanvasDrawReady} />
      </StyledHide>
    </StyledFaceVideo>
  )
}
