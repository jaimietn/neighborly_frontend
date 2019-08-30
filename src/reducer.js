import { combineReducers } from 'redux'

const defaultState = {
  longLat: []
}

function longLatReducer(state=defaultState, action) {
  switch (action.type) {
    case "GET_LONG_LAT":
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  longLat: longLatReducer
})

export default rootReducer
