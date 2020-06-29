import React, { useState, useContext } from 'react'
import { Canvas } from './Canvas'
import { CamVideo } from './CamVideo'
import styled from 'styled-components'
import { faceModel, canvasToImage, fetchFaceImage } from '../utils'
import { ImageContext } from '../store'

const StyledFaceVideo = styled.div`
  border-radius: 20px;
  box-shadow: 5px 5px 5px #c9cbd0, -5px -5px 5px #ffffff;
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
  const matchImgs = useContext(ImageContext)
  const [canvas, setCanvas] = useState()
  const [type] = useState(['border']) // landmark, expressions, border, default-border\
  const handleFaceCanvasDrawReady = (dom) => {
    setCanvas(dom)
  }
  const handleCamPlayReady = async (dom) => {
    // const canvasOffscreen = canvas.transferControlToOffscreen()
    // const worker = new Worker('./Worker.js')

    // worker.postMessage({ canvas: canvasOffscreen }, [canvasOffscreen])
    canvas.width = dom.videoWidth
    canvas.height = dom.videoHeight

    const drawVideo = () => {
      const ctx = canvas.getContext('2d')

      ctx.drawImage(dom, 0, 0, dom.videoWidth, dom.videoHeight)

      if (faceModel.modelCanvas) {
        faceModel.match(...type)
        ctx.drawImage(faceModel.modelCanvas, 0, 0, dom.videoWidth, dom.videoHeight)
      }

      setTimeout(drawVideo, 1000 / 60)
    }
    const postImage = () => {
      faceModel.changeApiFaceList = matchImgs.list.map(({ name, image }) => {
        const width = image.width
        const height = image.height
        const cropCanvas = canvasToImage(image, {
          x: image.x - (width - Math.round(image.width)) / 2,
          y: image.y - (height - Math.round(image.height)) / 2,
          width,
          height,
        })

        const buildImage = cropCanvas.image

        return {
          name,
          image: buildImage,
        }
      })
    }

    drawVideo()

    await faceModel.init(dom)

    postImage()
  }

  return (
    <StyledFaceVideo>
      <CamVideo onPlayReady={handleCamPlayReady} />
      <Canvas onDrawReady={handleFaceCanvasDrawReady} />
    </StyledFaceVideo>
  )
}
