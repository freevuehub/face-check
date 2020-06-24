import React, { useState } from 'react'
import styled from 'styled-components'

const StyledItem = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 20px;
  box-shadow: 5px 5px 5px #c9cbd0, -5px -5px 5px #ffffff;
  img {
    display: block;
    width: 100%;
  }
`

const ImageItem = (props) => {
  return (
    <StyledItem>
      <img src={`https://face.toybox7.net/${props.url}`} alt={props.name} />
    </StyledItem>
  )
}

const StyledList = styled.div`
  display: flex;
`

export const ImageList = () => {
  const [images] = useState([
    {
      name: '홍성준',
      url: 'faces/1f91ed3ed4a94659a6af8cb07c9ebe72.jpg',
    },
    {
      name: '박지현',
      url: 'faces/fcc6d90226cc4c3cac94baab19a77825.jpg',
    },
    {
      name: '조지현',
      url: 'faces/9a2f2845321942a68a7ce7c84a529f3c.jpg',
    },
  ])

  return (
    <StyledList>
      {images.map((item) => (
        <ImageItem key={item.url} {...item} />
      ))}
    </StyledList>
  )
}
