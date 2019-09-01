// const POSTS_URL = "http://localhost:3000/api/v1/posts"

function getAllPosts(dispatch){
  return function(){
    return fetch('http://localhost:3000/api/v1/posts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accepts: 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(postsArray => {
        // console.log(postsArray)
        dispatch({type: "GET_ALL_POSTS",
        payload: postsArray})
      })
  }
}
export {getAllPosts}
