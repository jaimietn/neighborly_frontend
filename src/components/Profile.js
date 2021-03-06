import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPosts } from '../actions.js'
import { Card } from 'semantic-ui-react';
const POSTS_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`

class Profile extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.allPosts === this.props.allPosts){
      this.props.getAllPosts()
    }
  }

  deleteSinglePost = (postId) => {
    fetch(`${POSTS_URL}/${postId}`,  {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    console.log("delete post:", postId)
    this.props.deletePost(postId)
  }

  render() {
    console.lot(this.props)
    // console.log("all posts", this.props.allPosts)
    const userPosts = this.props.allPosts.filter(post => post.user_id === this.props.userId)

    let response
    if (userPosts.length === 0) {
      response = "You have don't have any posts."
    } else {

    response = userPosts.map(post => (
        <Card key={post.id} className="post-card">
          {post.image ? (
            <img
              src={post.image}
              alt="Unavailable :( "
              className="popup-card-img"/>
          ) : null }
          <h2 className="post-title"><strong>{post.title}</strong></h2>
          {/*<p><strong>Expires: </strong>{post.expires}</p>*/}
          <p><strong>{post.category}</strong>
          {(post.neighborhood !== null) ? (<strong>{" - " + post.neighborhood} </strong> ) : null } </p>
          <p>{post.content}</p>
          <button className="delete-btn"
            onClick={(e) => this.deleteSinglePost(post.id)}>
            &times;
          </button>
          <p className="date-posted">Posted by <strong> {post.username}</strong> on {post.posted}</p>
        </Card>
    ))
    }
    return (
      <div className="yellow-stripes-corners-background">
        <div>
          <h2 className="form-title-profile"> Hey, {this.props.username}! Here are your current posts: </h2>
          <br></br>
        </div>
        <div>
            <Card.Group itemsPerRow={4}>
              {response}
            </Card.Group>
        </div>
      </div>
    )
  }
}

function mdp(dispatch) {
  return {
    getAllPosts: () => {dispatch(getAllPosts())},
    deletePost: (postId) => dispatch({
      type: "DELETE_POST",
      payload: postId})
  }
}

function msp(state){
  // console.log(state)
  return {
    allPosts: state.allPosts
  }
}

export default connect(msp, mdp)(Profile)
