import React, { createContext } from 'react'

export const FaceContext = createContext()

const FaceProvider = ({ children }) => {
  return <FaceContext.Provider>{children}</FaceContext.Provider>
}

export default FaceProvider
