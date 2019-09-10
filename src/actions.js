const MESSAGES_URL = "http://localhost:3000/api/v1/messages"

function getAllPosts(){
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(postsArray => {
        console.log(dispatch)
        dispatch({type: "GET_ALL_POSTS",
        payload: postsArray})
      })
  }
}

function getSinglePost(dispatch, selectedPostId){
  console.log("selectedpostid", selectedPostId)
    fetch(`http://localhost:3000/api/v1/posts/${selectedPostId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(selectedPost => {
        console.log("get single post", dispatch)
        console.log(selectedPost)
        dispatch({type: "GET_SINGLE_POST",
        payload: selectedPost})
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
      console.log(newMessage)
      dispatch({type: "ADD_NEW_MESSAGE",
      payload: newMessage})
    })
  }
}

function getAllMessages(){
  return function(dispatch){
    fetch('http://localhost:3000/api/v1/messages', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(messagesArray => {
        console.log(dispatch)
        dispatch({type: "GET_ALL_MESSAGES",
        payload: messagesArray})
      })
  }
}

export {getAllPosts, getSinglePost, getAllMessages, addNewMessage}
