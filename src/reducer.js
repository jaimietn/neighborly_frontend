import { combineReducers } from 'redux'

const defaultState = {
  longLat: [],
  allPosts: [],
  allMessages: [],
  selectedCategory: '',
  selectedPostId: '',
  selectedPost: {}
}

function selectedPostReducer(state=defaultState.selectedPost, action) {
  switch (action.type) {
    case "GET_SINGLE_POST":
      return action.payload
    default:
      return state
  }
}

// function selectedPostIdReducer(state=defaultState.selectedPostId, action) {
//   switch (action.type) {
//     case "GET_SELECTED_POST_ID":
//       console.log("GET_SELECTED_POST_ID payload", action.payload)
//       return action.payload
//     default:
//       return state
//   }
// }

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

function messagesReducer(state=defaultState.allMessages, action) {
  switch (action.type) {
    case "GET_ALL_MESSAGES":
    console.log("GET_ALL_MESSAGES", action.payload)
      return action.payload

    case "ADD_NEW_MESSAGE":
      return [...state, action.payload]

    case "DELETE_MESSAGE":
      const messageId = action.payload
      return state.filter(message => message.id !== messageId)

    default:
      return state
  }
}

const rootReducer = combineReducers({
  longLat: longLatReducer,
  allPosts: postsReducer,
  allMessages: messagesReducer,
  selectedCategory: selectedCategoryReducer,
  // selectedPostId: selectedPostIdReducer,
  selectedPost: selectedPostReducer
})

export default rootReducer
