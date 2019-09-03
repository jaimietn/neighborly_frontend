import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPosts } from '../actions.js'
import { Card, Form } from 'semantic-ui-react';
const POSTS_URL = "http://localhost:3000/api/v1/posts"

class Profile extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.allPosts === this.props.allPosts){
      this.props.getAllPosts()
    }
  }

  editPost = (post) => {
    console.log("edit post:", post)
  }

  deletePost = (post) => {
    fetch(`${POSTS_URL}/${post}`,  {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    // console.log("delete post:", post)
  }

  render() {
    // console.log("all posts", this.props.allPosts)
    const userPosts = this.props.allPosts.filter(post => post.user_id === this.props.userId)
    // console.log("bert's posts", userPosts)

    let response
    if (userPosts.length === 0) {
      response = "You have don't have any posts."
    } else {

    response = userPosts.map(post => (
        <Card key={post.id}>
          <h2> {post.title} </h2>
          <p> Category: {post.category} </p>
          <p> Posted by: {post.username} </p>
          <p> Posted: {post.posted} </p>
          <p> Expires: {post.expires} </p>
          <br></br>
          <p>{post.content}</p>
          <br></br>
          <img
            src={post.image}
            alt="Unavailable :( "
            className="popup-card-img"/>
          <Form.Button
            onClick={() => this.editPost(post.id)}>
            Edit Post
          </Form.Button>
          <Form.Button
            onClick={(e) => this.deletePost(post.id)}>
            Delete
          </Form.Button>
        </Card>
    ))
}
    return (
      <div>
        <div>
          <br></br>
          <h2 className="form-title"> Hey, {this.props.username}! Here are all of your current posts. </h2>
          <br></br>
        </div>
        <div>
          <Card.Group itemsPerRow={4}>
            {response}
          </Card.Group>
          <br></br>
        </div>
        <div className="city-background"></div>
      </div>
    )
  }
}

function mdp(dispatch) {
  return {
    getAllPosts: () => {
      dispatch(getAllPosts())
    }
  }
}

function msp(state){
  console.log(state)
  return {
    allPosts: state.allPosts
  }
}
export default connect(msp, mdp)(Profile)
