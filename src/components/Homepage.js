import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import CategoryForm from './CategoryForm'
import { getAllPosts } from '../actions.js'
import Map from './Map'

class Homepage extends Component {

  componentDidMount() {
    this.props.getAllPosts()
  }

  render() {
    // console.log(this.props.allPosts)
    // console.log("homepage props", this.props)
    return (
      <>
        <div className="homepage-left-box-outer-container">
          <h1 className="welcome-title-with-name"> Hey there, {this.props.username}! 👋 </h1>
          <CategoryForm />
          <PostForm
            userId={this.props.userId}
            username={this.props.username}/>
        </div>
        <div className="map-container">
          <Map
            userId={this.props.userId}
            username={this.props.username}/>
        </div>
      </>
    )
  }
}

function mdp(dispatch) {
  return {
    getAllPosts: () => {
      dispatch(getAllPosts())},

    recordSelectedCategory: (e) => {
      dispatch({
      type: "RECORD_SELECTED_CATEGORY",
      payload: ({
        category: e.target.value
      })})
    }
  }
}

function msp(state) {
  return {
    allPosts: state.allPosts
  }
}

export default connect(msp, mdp)(Homepage)
