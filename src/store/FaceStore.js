import React, { createContext, useState, useEffect } from 'react'
import * as faceApi from 'face-api.js'

export const MODEL_URL = '/models'
export const FaceContext = createContext({
  videoDom: null,
  logList: [],
  changeDom: () => {},
})

const FaceProvider = ({ children }) => {
  // const changeDom = (videoDom) => {
  //   setFaceState({
  //     ...faceState,
  //     videoDom,
  //   })
  // }
  // const initialState = {
  //   videoDom: null,
  //   logList: [],
  //   changeDom,
  // }
  // const [faceState, setFaceState] = useState(initialState)

  // useEffect(() => {
  //   const pushLog = (str) => {
  //     const { logList } = faceState

  //     logList.push(str)

  //     setFaceState({
  //       ...faceState,
  //       logList,
  //     })
  //   }
  //   const init = async () => {
  //     const { videoDom } = faceState

  //     pushLog('모델링을 시작합니다.')

  //     await Promise.all([
  //       faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL), // 얼굴 윤곽 모델링
  //       faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL), // 얼굴 요소 모델링
  //       faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL), // 감정 모델링

  //       faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL), // 예상 나이(?) 모델링
  //       faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL), // 추가 얼굴 인식 모델링
  //     ])

  //     pushLog('모델링이 완료되었습니다.')

  //     const canvas = faceApi.createCanvasFromMedia(videoDom)
  //     const displaySize = {
  //       width: videoDom.videoWidth,
  //       height: videoDom.videoHeight,
  //     }

  //     console.log(canvas, displaySize)
  //   }

  //   init()
  // }, [])

  return <FaceContext.Provider>{children}</FaceContext.Provider>
}

export default FaceProvider

// export default class FaceProvider extends React.Component {
//   state = {
//     videoDom: null,
//     logList: [],
//   }

//   async componentDidMount() {
//     this.state.logList.push('모델링을 시작합니다.')

//     await Promise.all([
//       faceApi.nets.tinyFaceDetector.loadFromUri(MODEL_URL), // 얼굴 윤곽 모델링
//       faceApi.nets.faceLandmark68Net.loadFromUri(MODEL_URL), // 얼굴 요소 모델링
//       faceApi.nets.faceExpressionNet.loadFromUri(MODEL_URL), // 감정 모델링

//       faceApi.nets.faceRecognitionNet.loadFromUri(MODEL_URL), // 예상 나이(?) 모델링
//       faceApi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL), // 추가 얼굴 인식 모델링
//     ])

//     this.state.logList.push('모델링이 완료되었습니다.')
//   }

//   render() {
//     return <FaceContext.Provider value={this.state}>{this.props.children}</FaceContext.Provider>
//   }
// }
