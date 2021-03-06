const MESSAGES_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/messages`

function getAllPosts(){
  return function(dispatch){
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(postsArray => {
        // console.log(dispatch)
        dispatch({type: "GET_ALL_POSTS",
        payload: postsArray})
      })
  }
}

function getSinglePost(dispatch, selectedPostId){
  console.log("selectedpostid", selectedPostId)
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/posts/${selectedPostId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(selectedPost => {
        const newMessageObject = {
          title: selectedPost.title,
          post_id: selectedPost.id,
          recipient: {
            id: selectedPost.user_id,
            username: selectedPost.username
          },
          sender: {
            id: selectedPost.user_id,
            username: selectedPost.username
          }
        }
        // console.log("get single post", dispatch)
        // console.log(selectedPost)
        dispatch({type: "GET_SINGLE_POST",
        payload: selectedPost})
        dispatch({type: "GET_SINGLE_MESSAGE",
        payload: newMessageObject})
      })
}

function getAllMessages(){
  return function(dispatch){
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/v1/messages`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(messagesArray => {
        // console.log(dispatch)
        dispatch({type: "GET_ALL_MESSAGES",
        payload: messagesArray})
      })
  }
}

function getSingleMessage(dispatch, selectedMessageId) {
  fetch(`${MESSAGES_URL}/${selectedMessageId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json'
    }
  })
  .then(resp => resp.json())
  .then(selectedMessage => {
    dispatch({type: "GET_SINGLE_MESSAGE",
    payload: selectedMessage})
  })
}

function addNewMessage(newMessage){
  return function(dispatch){
  fetch(`${MESSAGES_URL}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }, body: JSON.stringify({
        message: newMessage
      })
    })
    .then(resp => resp.json())
    .then(newMessage => {
      // console.log(newMessage)
      dispatch({type: "ADD_NEW_MESSAGE",
      payload: newMessage})
    })
  }
}

export { getAllPosts, getSinglePost, getAllMessages, addNewMessage, getSingleMessage }
