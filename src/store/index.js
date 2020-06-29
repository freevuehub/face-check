import React from 'react'
import ImageProvider from './ImageStore'
import FaceProvider from './FaceStore'

const AppProvider = ({ children }) => {
  return (
    <ImageProvider>
      <FaceProvider>{children}</FaceProvider>
    </ImageProvider>
  )
}

export { AppProvider }
