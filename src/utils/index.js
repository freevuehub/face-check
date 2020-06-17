import * as faceApi from 'face-api.js'

class SendElement {
  el = ''

  set setEl(el) {
    this.el = el
  }

  get getEl() {
    return this.el
  }
}

export const sendElement = new SendElement()

export const MODEL_URL = '/models'

export class FaceModel {
  constructor() {
    this.modelCanvas = null
    this.resizedDetections = null
    this.videoDom = null
    this.displaySize = {}
    this.faceList = []
  }

  set changeVideoDom(videoDom) {
    this.videoDom = videoDom
  }

  set changeFaceName({ faceName, idx }) {
    this.faceList[idx].name = faceName
  }

  get getFaceList() {
    return this.faceList
  }

  async init(dom) {
    this.videoDom = dom

    try {
      if (!this.videoDom) {
        throw Error('미디어가 없습니다.')
      }

      await Promise.all([
        faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        // faceApi.nets.ageGenderNet.loadFromUri(MODEL_URL),
      ])

      this.modelCanvas = faceApi.createCanvasFromMedia(this.videoDom)
      this.displaySize = { width: this.videoDom.videoWidth, height: this.videoDom.videoHeight }

      faceApi.matchDimensions(this.modelCanvas, this.displaySize)
    } catch (err) {
      console.error(err)
    }
  }

  async run() {
    try {
      if (!this.videoDom) {
        throw Error('미디어가 없습니다.')
      }

      const detections = await faceApi
        .detectAllFaces(this.videoDom, new faceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()

      this.resizedDetections = faceApi.resizeResults(detections, this.displaySize)
      this.modelCanvas
        .getContext('2d')
        .clearRect(0, 0, this.modelCanvas.width, this.modelCanvas.height)

      this.faceList = this.resizedDetections.map(({ expressions, detection }) => ({
        expressions,
        area: detection.box,
        name: '',
      }))

      // faceApi.draw.drawDetections(this.modelCanvas, this.resizedDetections)
      // faceApi.draw.drawFaceLandmarks(this.modelCanvas, this.resizedDetections)
      // faceApi.draw.drawFaceExpressions(this.modelCanvas, this.resizedDetections)
    } catch (err) {
      console.error(err)
    }
  }
}

export const faceModel = new FaceModel()

export const canvasToImage = (dom, { x, y, width, height }) => {
  const image = new Image()
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  ctx.drawImage(dom, x, y, width, height, 0, 0, width, height)

  image.src = canvas.toDataURL()

  return image
}

export const cropCanvas = (dom, { x, y, width, height }) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  ctx.drawImage(dom, x, y, width, height, 0, 0, width, height)

  return canvas
}

export const borderCanvasImage = (dom, area, line = 2, color = '#c00000') =>
  new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const { x, y, width, height, bottomRight, topLeft } = area

    canvas.width = dom.width
    canvas.height = dom.height

    ctx.fillStyle = color

    // 라인 생성
    ctx.fillRect(x, y, width, height)
    ctx.clearRect(x + line, y + line, width - line * 2, height - line * 2)

    // 로고 생성
    ctx.fillRect(
      bottomRight.x - (39 + line * 2),
      bottomRight.y - (10 + line * 2),
      39 + line * 2,
      10 + line
    )
    ctx.font = '10px sans-serif'
    ctx.strokeStyle = '#fff'
    ctx.strokeText('Rsupport', bottomRight.x - 39 - line, bottomRight.y - line * 2)

    // 이름 영역 생성
    ctx.fillRect(topLeft.x, topLeft.y - (10 + line / 2), width, 10 + line)

    const addName = (name) => {
      ctx.strokeText(name, topLeft.x + line, topLeft.y - line / 2)
    }

    return resolve({ result: canvas, crop: cropCanvas(canvas, area), addName })
  })
