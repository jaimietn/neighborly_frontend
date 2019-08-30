import { combineReducers } from 'redux'

const defaultState = {
  longLat: [],
  getAllPosts: []
}

function longLatReducer(state=defaultState.longLat, action) {
  switch (action.type) {
    case "GET_LONG_LAT":
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}

function getAllPostsReducer(state=defaultState.getAllPosts, action) {
  switch (action.type) {
    case "GET_ALL_POSTS":
      console.log(action.payload)
      return action.payload
    default:
      return state
  }
}

const rootReducer = combineReducers({
  longLat: longLatReducer,
  getAllPosts: getAllPostsReducer
})

export default rootReducer
