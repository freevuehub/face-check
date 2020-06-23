import React, { useState } from 'react'
import styled from 'styled-components'
import { FormItem } from './FormItem'
import { Canvas } from './Canvas'
import { Button } from './Button'
import { sendElement, faceModel, cropCanvas } from '../utils'
import { postAddImage } from '../axios'

const StyledForm = styled.div`
  position: fixed;
  right: 20px;
  top: 80px;
  min-width: 300px;
  z-index: 110;
  background: #f2f2f2;
  box-shadow: 0 5px 10px #cecece;
  padding: 20px;
  border-radius: 10px;
  form {
    width: 100%;
    margin-bottom: 10px;
    .form {
      display: flex;
      justify-content: space-between;
      div {
        flex-basis: 45%;
      }
      .thumb {
        display: flex;
        flex-direction: column;
        width: 150px;
        img {
          display: block;
          width: 100%;
        }
        canvas {
          display: block;
          width: 100%;
        }
        button {
          margin-top: auto;
          margin-bottom: 30px;
        }
      }
    }
  }
  p {
    opacity: 0.5;
  }
`

export const AddImageForm = () => {
  const imageSize = { width: 210, height: 270 }
  const [ctx, setCtx] = useState()
  const [canvas, setCanvas] = useState()
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)
  const [inputValue, setInputValue] = useState({
    email: { value: '', name: '이메일' },
    username: { value: '', name: '이름' },
    company: { value: '', name: '회사' },
    belong: { value: '', name: '부서' },
  })
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    try {
      if (!image) {
        throw Error('이미지가 없습니다.')
      }

      const objList = Object.entries(inputValue)
      const check = objList.every((item) => {
        if (!item[1].value) {
          throw Error(`${item[1].name}을(를) 입력해주세요.`)
        }

        return !!item[1].value
      })

      if (!check) {
        throw Error('알 수 없는 에러가 발생했습니다.')
      }

      setLoading(true)

      const formData = new FormData()

      objList.forEach((item) => {
        formData.append(item[0], item[1].value)
      })
      formData.append('image', image)

      await postAddImage(formData)

      alert('등록되었습니다.')

      setLoading(false)
    } catch (err) {
      setLoading(false)

      alert(err)
    }
  }
  const handleInputChange = (value, key) => {
    const changeValue = {
      ...inputValue,
    }

    changeValue[key].value = value

    setInputValue(changeValue)
  }
  const handleCanvasDrawReady = (dom) => {
    dom.width = imageSize.width
    dom.height = imageSize.height

    setCanvas(dom)
    setCtx(dom.getContext('2d'))
  }
  const handleCamCapture = (event) => {
    event.preventDefault()

    setLoading(true)

    if (sendElement.getEl) {
      if (faceModel.resizedDetections.length > 1) {
        return alert('인식된 얼굴이 많습니다. 한명만 인식되게 자리를 이동해주세요.')
      } else if (!faceModel.resizedDetections.length) {
        return alert('인식된 얼굴이 없습니다.')
      }

      const area = faceModel.resizedDetections[0].detection.box

      const crop = cropCanvas(sendElement.getEl, {
        x: area.x - (imageSize.width - Math.round(area.width)) / 2,
        y: area.y - (imageSize.height - Math.round(area.height)) / 2,
        ...imageSize,
      })

      ctx.drawImage(crop, 0, 0, imageSize.width, imageSize.height)
    }

    canvas.toBlob((res) => {
      setImage(res)

      setLoading(false)
    }, 'image/png')
  }

  return (
    <StyledForm>
      <form onSubmit={handleFormSubmit}>
        <div className="form">
          <div className="thumb">
            {image ? (
              <img src={URL.createObjectURL(image)} alt="" />
            ) : (
              <>
                <Canvas onDrawReady={handleCanvasDrawReady} />
              </>
            )}
            <Button loading={loading} onClick={handleCamCapture}>
              캡쳐
            </Button>
          </div>
          <div>
            {Object.entries(inputValue).map((item) => {
              return (
                <FormItem
                  key={item[0]}
                  onChange={(event) => handleInputChange(event.target.value, item[0])}
                  type="text"
                  placeholder={item[1].name}
                  value={item[1].value}
                />
              )
            })}
          </div>
        </div>
        <Button loading={loading} type="accept">
          등록
        </Button>
      </form>
      <p>안경을 벗고 등록하면 정확도가 올라갑니다.</p>
    </StyledForm>
  )
}
