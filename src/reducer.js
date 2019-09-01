import { combineReducers } from 'redux'

const defaultState = {
  longLat: [],
  allPosts: []
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

function getAllPostsReducer(state=defaultState.allPosts, action) {
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
  allPosts: getAllPostsReducer
})

export default rootReducer
