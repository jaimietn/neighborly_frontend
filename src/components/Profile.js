import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllPosts } from '../actions.js'

class Profile extends Component {

  componentDidMount() {
    this.props.getAllPosts()
  }

  render() {
    console.log("profile props.getAllPosts", this.props.getAllPosts)
    console.log("profile props", this.props)
    return (
      <div>
        <div>
          <h1> This is the user profile page </h1>
          <h2> Hey, {this.props.username}! Here are all of your current posts. </h2>
        </div>
        <div>
          <p>"Flex container of post cards here"</p>
        </div>
        <div className="city-background"></div>
      </div>
    )
  }
}

function mdp(dispatch) {
  return {
    getAllPosts: () => {
      getAllPosts(dispatch)()
    }
  }
}

function msp(state){
  return {
    getAllPosts: state.getAllPosts
  }
}
export default connect(msp, mdp)(Profile)
