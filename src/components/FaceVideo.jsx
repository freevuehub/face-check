import React, { useState } from 'react'
import { Canvas } from './Canvas'
import { CamVideo } from './CamVideo'
import styled from 'styled-components'
// import { postFaceCheck } from '../axios'
import { faceModel, canvasToImage, fetchFaceImage } from '../utils'
import { useDispatch, useSelector } from 'react-redux'
import { updateImgUrlList } from '../module/faceList'

const StyledFaceVideo = styled.div`
  border-radius: 20px;
  background: #f2f2f2;
  box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #ffffff;
  overflow: hidden;
`

export const FaceVideo = () => {
  const dispatch = useDispatch()
  const { faceList } = useSelector((state) => state)
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

    const drawVideo = () => {
      faceModel.drawArea('border')

      ctx.drawImage(dom, 0, 0, dom.videoWidth, dom.videoHeight)
      ctx.drawImage(faceModel.modelCanvas, 0, 0, dom.videoWidth, dom.videoHeight)

      setTimeout(drawVideo, 1000 / 60)
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

          return faceRecognition[0]
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
      {faceList.imgUrlList.map((url) => {
        return <img src={url} alt="" />
      })}
    </div>
  )
}
