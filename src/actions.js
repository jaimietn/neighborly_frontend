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

export {getAllPosts, getAllMessages}
