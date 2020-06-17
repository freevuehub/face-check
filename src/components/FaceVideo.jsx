import React, { useState, useLayoutEffect } from 'react'
import { Canvas } from './Canvas'
import { CamVideo } from './CamVideo'
import styled from 'styled-components'
// import { postFaceCheck } from '../axios'
import { faceModel, borderCanvasImage } from '../utils'

const StyledFaceVideo = styled.div`
  border-radius: 20px;
  background: #f2f2f2;
  box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #ffffff;
  overflow: hidden;
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

    const drawVideo = () => {
      faceModel.run()

      ctx.drawImage(dom, 0, 0, dom.videoWidth, dom.videoHeight)

      faceModel.faceList.forEach(async (item, idx) => {
        const { result, addName } = await borderCanvasImage(canvas, item.area)

        addName('Loading...')

        ctx.drawImage(result, 0, 0, dom.videoWidth, dom.videoHeight)
      })

      setTimeout(drawVideo, 1000 / 60)
    }

    drawVideo()
  }

  useLayoutEffect(() => {
    const handleImageCheck = async () => {
      if (canvas) {
        // const a = faceModel.faceList.map(async (item) => {
        //   const { crop, addName } = await borderCanvasImage(canvas, item.area)
        //   addName('aa')
        //   return crop
        // })
        // console.log(a)
        // const res = await Promise.all(
        //   faceModel.faceList.map(async (item) => {
        //     const formData = new FormData()
        //     // const blob = canvasToBlob(canvas, item.area, 'image/png')
        //     // if (blob) {
        //     //   formData.append('image', blob)
        //     //   const res = await postFaceCheck(formData)
        //     //   // dispatch(fetchLog(res))
        //     //   return res
        //     // } else {
        //     //   return {}
        //     // }
        //   })
        // )
        // console.log(res)
        // handleImageCheck()
      }
    }

    handleImageCheck()
  }, [canvas])

  return (
    <StyledFaceVideo>
      <CamVideo onPlayReady={handleCamPlayReady} />
      <Canvas onDrawReady={handleFaceCanvasDrawReady} />
    </StyledFaceVideo>
  )
}
