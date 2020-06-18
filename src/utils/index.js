import * as faceApi from 'face-api.js'
import { postFaceCheck } from '../axios'

export function* fetchFaceImage(value) {
  while (true) {
    yield async () => {
      const formData = new FormData()

      formData.append('image', value)

      const response = await postFaceCheck(formData)

      return response
    }
  }
}

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
    this.resizedDetections = []
    this.videoDom = null
    this.displaySize = {}
    this.apiFaceList = []
  }

  set changeVideoDom(videoDom) {
    this.videoDom = videoDom
  }

  set changeApiFaceList(apiFaceList) {
    this.apiFaceList = apiFaceList
  }

  get filterList() {
    return this.apiFaceList
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

  async drawArea(..._) {
    // this.apiFaceList.map((item) => {
    //   console.log(item)

    //   return item
    // })
    const detections = await faceApi
      .detectAllFaces(this.videoDom, new faceApi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()

    this.resizedDetections = faceApi.resizeResults(detections, this.displaySize)

    // console.log(this.apiFaceList, this.resizedDetections)

    this.modelCanvas
      .getContext('2d')
      .clearRect(0, 0, this.modelCanvas.width, this.modelCanvas.height)

    _.forEach((type) => {
      switch (type) {
        case 'border':
          this.resizedDetections.forEach(({ detection }, idx) => {
            borderCanvasImage(this.modelCanvas, detection.box).addName(
              this.apiFaceList[idx] ? this.apiFaceList[idx].name : 'Loading'
            )
          })
          break
        case 'landmark':
          faceApi.draw.drawFaceLandmarks(this.modelCanvas, this.resizedDetections)
          break
        case 'default-border':
          faceApi.draw.drawDetections(this.modelCanvas, this.resizedDetections)
          break
        case 'expressions':
          faceApi.draw.drawFaceExpressions(this.modelCanvas, this.resizedDetections)
          break
        default:
      }
    })
  }
}

export const faceModel = new FaceModel()

class CanvasToImage {
  constructor(dom, area) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = area.width
    canvas.height = area.height

    ctx.drawImage(dom, area.x, area.y, area.width, area.height, 0, 0, area.width, area.height)

    this.dom = dom
    this.canvas = canvas
  }

  get image() {
    const image = new Image()

    image.src = this.canvas.toDataURL()

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

export const cropCanvas = (dom, { x, y, width, height }) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  canvas.width = width
  canvas.height = height

  ctx.drawImage(dom, x, y, width, height, 0, 0, width, height)

  return canvas
}

export const borderCanvasImage = (dom, area, line = 2, color = '#c00000') => {
  const ctx = dom.getContext('2d')
  const { x, y, width, height, bottomRight, topLeft } = area

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

  return {
    addName: (name) => {
      ctx.strokeText(name, topLeft.x + line, topLeft.y - line / 2)
    },
  }
}
