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
        <div>
          <p>key={post.id}</p>
          <p>title={post.title}</p>
          <p>content={post.content}</p>
        </div>
    ))
}
    return (
      <div>
        <div>
          <h1> This is the user profile page </h1>
          <h2> Hey, {this.props.username}! Here are all of your current posts. </h2>
        </div>
        <div>
          <Card.Group itemsPerRow={4}>
            {response}
          </Card.Group>
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
