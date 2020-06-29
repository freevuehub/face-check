class CanvasToImage {
  constructor(dom, area) {
    const canvas = document.createElement('canvas')

    canvas.width = area.width
    canvas.height = area.height

    canvas
      .getContext('2d')
      .drawImage(dom, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height)

    this.dom = dom
    this.canvas = canvas
  }

  get image() {
    const image = new Image()

    image.src = this.url

    return image
  }

  get url() {
    return this.canvas.toDataURL()
  }

  get convas() {
    return this.canvas
  }

  blob() {
    return new Promise((resolve) => {
      this.canvas.toBlob((res) => {
        resolve(res)
      })
    })
  }
}

export const canvasToImage = (dom, area) => new CanvasToImage(dom, area)
