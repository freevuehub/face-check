const LOG_PUSH = 'log/PUSH'
const FACE_PATH = 'log/FACE/PATH'
const FETCH_LOG = 'log/FETCH/LOG'

export const logPush = (payload) => ({ type: LOG_PUSH, payload })
export const facePath = (payload) => ({ type: FACE_PATH, payload })
export const fetchLog = (payload) => ({ type: FETCH_LOG, payload })

const initialize = {
  logs: [],
  path: {
    height: 0,
    score: 0,
    width: 0,
    x: 0,
    y: 0,
  },
  logValue: {},
}

const logs = (state = initialize, action) => {
  switch (action.type) {
    case LOG_PUSH:
      return {
        ...state,
        logs: [...state.logs, action.payload],
      }
    case FACE_PATH:
      return {
        ...state,
        path: action.payload,
      }
    case FETCH_LOG:
      return {
        ...state,
        logValue: action.payload,
      }
    default:
      return state
  }
}

export default logs
