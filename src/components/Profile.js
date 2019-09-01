import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPosts } from '../actions.js'
import { Card } from 'semantic-ui-react';

class Profile extends Component {

  componentDidUpdate(prevProps) {
    if (prevProps.allPosts === this.props.allPosts){
      this.props.getAllPosts()
    }
  }

  render() {
    console.log("all posts", this.props.allPosts)
    const userPosts = this.props.allPosts.filter(post => post.user_id === this.props.userId)
    console.log("bert's posts", userPosts)

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
          <img src={post.image} className="popup-card-img"/>
        </Card>
    ))
}
    return (
      <div>
        <div>
          <h1></h1>
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
