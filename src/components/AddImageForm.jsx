import React, { useState } from 'react'
import styled from 'styled-components'
import { FormItem } from './FormItem'
import { Canvas } from './Canvas'
import { Button } from './Button'
import { sendElement } from '../utils'
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
    }
  }
`

export const AddImageForm = () => {
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
    dom.width = 150
    dom.height = 150

    setCanvas(dom)
    setCtx(dom.getContext('2d'))
  }
  const handleCamCapture = (event) => {
    event.preventDefault()

    if (sendElement.getEl) {
      ctx.drawImage(sendElement.getEl, 0, 0, 150, 150)
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
