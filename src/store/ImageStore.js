import React, { createContext } from 'react'

export const ImageContext = createContext()

export default class ImageProvider extends React.Component {
  state = {
    list: [],
  }

  render() {
    return <ImageContext.Provider value={this.state}>{this.props.children}</ImageContext.Provider>
  }
}
