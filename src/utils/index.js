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
  constructor(dom) {
    this.modelCanvas = null
    this.resizedDetections = null
    this.videoDom = dom
    this.displaySize = {}
  }

  async init() {
    try {
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
      const detections = await faceApi
        .detectAllFaces(this.videoDom, new faceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()

      this.resizedDetections = faceApi.resizeResults(detections, this.displaySize)
      this.modelCanvas
        .getContext('2d')
        .clearRect(0, 0, this.modelCanvas.width, this.modelCanvas.height)

      faceApi.draw.drawDetections(this.modelCanvas, this.resizedDetections)
      faceApi.draw.drawFaceLandmarks(this.modelCanvas, this.resizedDetections)
      // faceApi.draw.drawFaceExpressions(this.modelCanvas, this.resizedDetections)
    } catch (err) {
      console.log(err)
    }
  }
}
