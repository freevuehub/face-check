import React, { useState } from 'react'
import { Canvas } from './Canvas'
import { CamVideo } from './CamVideo'
import styled from 'styled-components'
import { faceModel, canvasToImage, fetchFaceImage } from '../utils'

const StyledInfoMessage = styled.p`
  margin-bottom: 20px;
  font-size: 2rem;
`
const StyledFaceVideo = styled.div`
  border-radius: 20px;
  background: #f2f2f2;
  box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #ffffff;
  overflow: hidden;
  min-width: 640px;
  min-height: 480px;
  position: relative;
  @media screen and (max-width: 640px) {
    min-width: unset;
    min-height: unset;
    width: 90vw;
    canvas {
      width: 100%;
    }
  }
`

export const FaceVideo = () => {
  const [ctx, setCtx] = useState()
  const [canvas, setCanvas] = useState()
  const [message, setMessage] = useState('')
  const [type] = useState(['border']) // landmark, expressions, border, default-border
  const handleFaceCanvasDrawReady = (dom) => {
    setCanvas(dom)
    setCtx(dom.getContext('2d'))
  }
  const handleCamPlayReady = async (dom) => {
    setMessage('모델링을 시작합니다.')

    await faceModel.init(dom)

    canvas.width = dom.videoWidth
    canvas.height = dom.videoHeight

    ctx.drawImage(dom, 0, 0, dom.videoWidth, dom.videoHeight)

    const drawVideo = () => {
      faceModel.match(...type)

      ctx.drawImage(dom, 0, 0, dom.videoWidth, dom.videoHeight)
      ctx.drawImage(faceModel.modelCanvas, 0, 0, dom.videoWidth, dom.videoHeight)

      setTimeout(drawVideo, 1000 / 60)
    }
    const postImage = async () => {
      if (!faceModel.resizedDetections.length) {
        return setTimeout(postImage, 1000)
      }

      const padding = 80
      const res = await Promise.all(
        faceModel.resizedDetections.map(async ({ detection: { box } }) => {
          const width = box.width + padding
          const height = box.height + padding + 30
          const cropCanvas = canvasToImage(dom, {
            x: box.x - (width - Math.round(box.width)) / 2,
            y: box.y - (height - Math.round(box.height)) / 2,
            width,
            height,
          })

          const faceBlob = await cropCanvas.blob()
          const {
            returnData: { faceRecognition },
          } = await fetchFaceImage(faceBlob).next().value()

          const image = cropCanvas.image

          return {
            name: faceRecognition[0] ? faceRecognition[0].name : 'No Match Face',
            image,
          }
        })
      )

      faceModel.changeApiFaceList = res.filter((item) => !!item)

      postImage()
    }

    drawVideo()
    postImage()

    setMessage('얼굴을 인식하고 있습니다.')
  }

  return (
    <div>
      <StyledInfoMessage>{message}</StyledInfoMessage>
      <StyledFaceVideo>
        <CamVideo onPlayReady={handleCamPlayReady} />
        <Canvas onDrawReady={handleFaceCanvasDrawReady} />
      </StyledFaceVideo>
    </div>
  )
}
