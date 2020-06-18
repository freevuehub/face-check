import { combineReducers } from 'redux'
import logs from './log'
import faceList from './faceList'

const rootReducer = combineReducers({
  logs,
  faceList,
})

export default rootReducer
