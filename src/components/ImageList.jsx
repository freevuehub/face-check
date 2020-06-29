import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { ImageContext } from '../store'

const StyledItem = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 20px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.3);
  &.on {
    box-shadow: 5px 5px 30px #489dcf, -5px -5px 30px #62d5ff;
  }
  img {
    display: block;
    width: 100%;
  }
`

const baseUrl = 'https://face.toybox7.net/'
const ImageItem = (props) => {
  return (
    <StyledItem>
      <img src={`${baseUrl}${props.url}`} alt={props.name} />
    </StyledItem>
  )
}

const StyledList = styled.div`
  display: flex;
`

export const ImageList = () => {
  const imgContext = useContext(ImageContext)
  const [imgsData] = useState([
    {
      name: '홍성준',
      url: 'faces/d0c9859a27e14d729c22f6f283a2dcbf.jpg',
    },
    {
      name: '심명현',
      url: 'faces/d3a2dca1844e42f8bdad99e8b58b8d4c.jpg',
    },
    {
      name: '박지현',
      url: 'faces/fcc6d90226cc4c3cac94baab19a77825.jpg',
    },
  ])

  React.useEffect(() => {
    if (!imgContext.list.length) {
      imgsData.forEach((item) => {
        const image = new Image()

        image.src = `${baseUrl}${item.url}`
        image.crossOrigin = 'anonymous'
        image.alt = item.name

        image.onload = (event) => {
          imgContext.list = [
            ...imgContext.list,
            {
              image: event.target,
              ...item,
            },
          ]
        }
      })
    }
  }, [imgContext, imgsData])

  return (
    <StyledList>
      {imgsData.map((item) => (
        <ImageItem key={item.url} {...item} />
      ))}
    </StyledList>
  )
}
