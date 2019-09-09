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

function getSinglePost(selectedPostId){
  console.log("selectedpostid", selectedPostId)
  return function(dispatch){
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
        dispatch({type: "GET_SINGLE_POST",
        payload: selectedPost})
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

export {getAllPosts, getSinglePost, getAllMessages}
