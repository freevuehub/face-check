const UPDATE_IMG_LIST = 'faceList/UPDATE/IMG/LIST'
const UPDATE_URL_LIST = 'faceList/UPDATE/IMG/URL/LIST'

export const updateImgList = (payload) => ({ type: UPDATE_IMG_LIST, payload })
export const updateImgUrlList = (payload) => ({ type: UPDATE_URL_LIST, payload })

const initialize = {
  imgList: [],
  imgUrlList: [],
}

const faceList = (state = initialize, action) => {
  switch (action.type) {
    case UPDATE_IMG_LIST:
      return {
        ...state,
        imgList: action.payload,
      }
    case UPDATE_URL_LIST:
      return {
        ...state,
        imgUrlList: action.payload,
      }
    default:
      return state
  }
}

export default faceList
