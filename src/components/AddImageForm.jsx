import React, { useState } from 'react'
import styled from 'styled-components'
import { FormItem } from './FormItem'
import { Canvas } from './Canvas'
import { Button } from './Button'
import { sendElement, faceModel, cropCanvas } from '../utils'
import { postAddImage } from '../axios'

const StyledForm = styled.div`
  min-width: 300px;
  background: #f2f2f2;
  box-shadow: 5px 5px 10px #cecece, -5px -5px 10px #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  form {
    width: 100%;
    .form {
      display: flex;
      justify-content: space-between;
      div {
        flex-basis: 45%;
      }
      .thumb {
        display: flex;
        flex-direction: column;
        button {
          margin-top: auto;
          margin-bottom: 20px;
        }
      }
    }
  }
`

export const AddImageForm = () => {
  const imageSize = { width: 150, height: 180 }
  const [ctx, setCtx] = useState()
  const [canvas, setCanvas] = useState()
  const [image, setImage] = useState('')
  const [inputValue, setInputValue] = useState({
    email: '',
    username: '',
    company: '',
    belong: '',
  })
  const handleFormSubmit = async (event) => {
    event.preventDefault()

    try {
      if (!inputValue.email) {
        throw Error('이메일을 입력해주세요.')
      } else if (!image) {
        throw Error('이미지를 추가해주세요.')
      }

      const formData = new FormData()

      Object.entries(inputValue).forEach((item) => {
        formData.append(item[0], item[1])
      })
      formData.append('image', image)

      await postAddImage(formData)

      alert('등록되었습니다.')
    } catch (err) {
      alert(err)
    }
  }
  const handleInputChange = (value, key) => {
    const changeValue = {
      ...inputValue,
    }

    changeValue[key] = value

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

    if (sendElement.getEl) {
      if (faceModel.faceList.length > 1) {
        return alert('인식된 얼굴이 많습니다. 한명만 인식되게 자리를 이동해주세요.')
      } else if (!faceModel.faceList.length) {
        return alert('인식된 얼굴이 없습니다.')
      }

      const crop = cropCanvas(sendElement.getEl, {
        x: faceModel.faceList[0].area.x,
        y: faceModel.faceList[0].area.y,
        ...imageSize,
      })

      ctx.drawImage(crop, 0, 0, imageSize.width, imageSize.height)
    }

    canvas.toBlob((res) => {
      setImage(res)
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
            <Button onClick={handleCamCapture}>캡쳐</Button>
          </div>
          <div>
            {Object.entries(inputValue).map((item) => {
              return (
                <FormItem
                  key={item[0]}
                  onChange={(event) => handleInputChange(event.target.value, item[0])}
                  type="text"
                  placeholder={item[0]}
                  value={item[1]}
                />
              )
            })}
          </div>
        </div>
        <Button type="accept">등록</Button>
      </form>
    </StyledForm>
  )
}
