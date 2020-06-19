import React, { useState } from 'react'
import { Canvas } from './Canvas'
import { CamVideo } from './CamVideo'
import styled from 'styled-components'
import { faceModel, canvasToImage, fetchFaceImage } from '../utils'

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
  const handleFaceCanvasDrawReady = (dom) => {
    setCanvas(dom)
    setCtx(dom.getContext('2d'))
  }
  const handleCamPlayReady = async (dom) => {
    await faceModel.init(dom)

    canvas.width = dom.videoWidth
    canvas.height = dom.videoHeight

    ctx.drawImage(dom, 0, 0, dom.videoWidth, dom.videoHeight)

    const drawVideo = () => {
      faceModel.drawArea('border') // landmark, expressions, border, default-border

      ctx.drawImage(dom, 0, 0, dom.videoWidth, dom.videoHeight)
      ctx.drawImage(faceModel.modelCanvas, 0, 0, dom.videoWidth, dom.videoHeight)

      setTimeout(drawVideo, 1000 / 30)
    }
    const postImage = async () => {
      if (!faceModel.resizedDetections.length) {
        return setTimeout(postImage, 1000)
      }

      const res = await Promise.all(
        faceModel.resizedDetections.map(async ({ detection }) => {
          const faceBlob = await canvasToImage(canvas, detection.box).blob()
          const {
            returnData: { faceRecognition },
          } = await fetchFaceImage(faceBlob).next().value()

          const faceImage = canvasToImage(canvas, detection.box).image

          return {
            name: faceRecognition[0] ? faceRecognition[0].name : '일치하는 인물이 없습니다.',
            image: faceImage,
          }
        })
      )

      faceModel.changeApiFaceList = res.filter((item) => !!item)

      postImage()
    }

    drawVideo()
    postImage()
  }

  return (
    <div>
      <StyledFaceVideo>
        <CamVideo onPlayReady={handleCamPlayReady} />
        <Canvas onDrawReady={handleFaceCanvasDrawReady} />
      </StyledFaceVideo>
    </div>
  )
}
