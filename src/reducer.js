import { combineReducers } from 'redux'

const defaultState = {
  longLat: [],
  allPosts: [],
  selectedCategory: ''
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

function selectedCategoryReducer(state=defaultState.selectedCategory, action) {
  switch (action.type) {
    case "RECORD_SELECTED_CATEGORY":
    console.log("selected category", action.payload)
    // const selectedCategory = action.payload
    return action.payload
    default:
      return state
  }
}

function postsReducer(state=defaultState.allPosts, action) {
  switch (action.type) {
    case "GET_ALL_POSTS":
      // console.log(action.payload)
      return action.payload

    case "ADD_NEW_POST":
      // console.log(action.payload)
      // console.log("reducer state", state)
      return [...state, action.payload]

    case "DELETE_POST":
      // console.log(action.payload)
      const postId = action.payload
      return state.filter(post => post.id !== postId)

    default:
      return state
  }
}

const rootReducer = combineReducers({
  longLat: longLatReducer,
  allPosts: postsReducer,
  selectedCategory: selectedCategoryReducer
})

export default rootReducer
