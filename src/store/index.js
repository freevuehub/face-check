import React, { createContext } from 'react'

export const ImageContext = createContext()
export const FaceContext = createContext()

class ImageProvider extends React.Component {
  state = {
    list: [],
  }

  render() {
    return <ImageContext.Provider value={this.state}>{this.props.children}</ImageContext.Provider>
  }
}

class FaceProvider extends React.Component {
  state = {}

  render() {
    return <FaceContext.Provider value={this.state}>{this.props.children}</FaceContext.Provider>
  }
}

const AppProvider = ({ children }) => {
  return (
    <ImageProvider>
      <FaceProvider>{children}</FaceProvider>
    </ImageProvider>
  )
}

export { AppProvider }
