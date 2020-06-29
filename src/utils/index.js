import * as faceApi from 'face-api.js'

export const MODEL_URL = '/models'

export class FaceModel {
  constructor() {
    this.modelCanvas = null // 얼굴을 인식한 영역을 그릴 캔버스
    this.resizedDetections = [] // 얼굴을 인식한 모델
    this.videoDom = null // 얼굴을 인식할 컨텐츠
    this.displaySize = {} // 얼굴을 인식한 캔버스의 크기
    this.apiFaceList = [] // 서버에서 매칭한 얼굴 모델
  }

  set changeVideoDom(videoDom) {
    this.videoDom = videoDom
  }

  // API에서 받아온 데이터에 라벨링
  set changeApiFaceList(apiFaceList) {
    this.labelingFace(apiFaceList).then((res) => {
      this.apiFaceList = res.map((face) => {
        return new faceApi.FaceMatcher(face.labeling, 0.5)
      })
    })
  }

  // 얼굴 인식 기능 실행
  async init(dom) {
    this.videoDom = dom

    try {
      if (!this.videoDom) {
        throw Error('미디어가 없습니다.')
      }

      console.log('> 모델링을 시작합니다.')

      // 얼굴 인식 모델링
      await Promise.all([
        faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL), // 얼굴 윤곽 모델링
        faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL), // 얼굴 요소 모델링
        faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL), // 감정 모델링

        faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL), // 예상 나이(?) 모델링
        faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL), // 추가 얼굴 인식 모델링
      ])

      console.log('> 모델링이 완료되었습니다.')
      console.log('> 캔버스를 생성합니다.')

      // 얼굴을 인식한 영역을 그려줄 캔버스 생성과 설정
      this.modelCanvas = faceApi.createCanvasFromMedia(this.videoDom)
      this.displaySize = { width: this.videoDom.videoWidth, height: this.videoDom.videoHeight }

      faceApi.matchDimensions(this.modelCanvas, this.displaySize)

      console.log('> 캔버스를 생성했습니다.')
    } catch (err) {
      console.error(err)
    }
  }

  // 리스트를 받아와 라벨링
  // 인식된 영역과 API에 통신한 이미지를 비교하여 라벨링
  async labelingFace(faceLsit) {
    return await Promise.all(
      faceLsit.map(async (faceItem) => {
        const description = []
        const detections = await faceApi
          .detectSingleFace(faceItem.image)
          .withFaceLandmarks()
          .withFaceDescriptor()

        if (detections) {
          description.push(detections.descriptor)
        }

        return {
          ...faceItem,
          labeling: new faceApi.LabeledFaceDescriptors(faceItem.name, description),
        }
      })
    )
  }

  // 타입별로 캔버스에 영역을 그림
  drawArea(type, faceDetection, label) {
    switch (type) {
      case 'landmark':
        return faceApi.draw.drawFaceLandmarks(this.modelCanvas, faceDetection)
      case 'expressions':
        return faceApi.draw.drawFaceExpressions(this.modelCanvas, faceDetection)
      case 'border':
        return borderCanvasImage(this.modelCanvas, faceDetection.detection.box).addName(label)
      case 'default-border':
        return faceApi.draw.drawDetections(this.modelCanvas, faceDetection)
      default:
        return
    }
  }

  buildDetections() {
    return Promise(async (resolve) => {
      const detections = await faceApi
        .detectAllFaces(this.videoDom, new faceApi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions()
        .withFaceDescriptors()

      resolve(detections)
    })
  }

  // 영상에 인식된 얼굴을 그린다.
  async match(..._) {
    const detections = await faceApi
      .detectAllFaces(this.videoDom, new faceApi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions()
      .withFaceDescriptors()

    this.modelCanvas
      .getContext('2d')
      .clearRect(0, 0, this.modelCanvas.width, this.modelCanvas.height)

    this.resizedDetections = faceApi.resizeResults(detections, this.displaySize)

    if (this.apiFaceList.length) {
      this.apiFaceList.forEach((imageFace) => {
        const matcherRes = this.resizedDetections.map((videoFace) => {
          return imageFace.findBestMatch(videoFace.descriptor)
        })

        matcherRes.forEach((resultItem, idx) => {
          _.forEach((type) => {
            this.drawArea(type, this.resizedDetections[idx], resultItem.label)
          })
        })
      })
    } else {
      this.resizedDetections.forEach((faceDetection) => {
        _.forEach((type) => {
          this.drawArea(type, faceDetection, 'loading...')
        })
      })
    }
  }
}

export const faceModel = new FaceModel()

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

export * from './Generator'
export * from './SendElement'
export * from './CanvasToImage'
