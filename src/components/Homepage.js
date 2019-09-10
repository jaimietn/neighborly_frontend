import React, { Component } from 'react'
import { connect } from 'react-redux'
import PostForm from './PostForm'
import { getAllPosts } from '../actions.js'
import Map from './Map'

class Homepage extends Component {

  state = {
    category: ''
  }

  handleChange = (e) => {
    console.log(e.target.value)
    this.props.recordSelectedCategory(e)
    this.setState({ category: e.target.value })
  }

  componentDidMount() {
    this.props.getAllPosts()
  }

  render() {
    // console.log(this.props.allPosts)
    // console.log("current user posts", this.state.allPosts.filter(post => post.user_id === this.props.userId))
    // console.log("homepage props", this.props)
    return (
      <>
        <div>
          <h1 className="form-title"> Hey there, {this.props.username}! 👋 </h1>
        </div>
        <div>
          <form>
            {/* removed from form: onSubmit={this.handleSubmit}*/}
            <label>
              {"Filter this map area by category: "}
              <select value={this.state.category} onChange={((e) => this.handleChange(e))}>
                <option value='' disabled> Select a category </option>
                <option value="Show All"> Show All </option>
                <option value="Animal Sightings"> Animal Sightings </option>
                <option value="For Sale"> For Sale </option>
                <option value="Free Stuff"> Free Stuff </option>
                <option value="Funny"> Funny </option>
                <option value="General"> General </option>
                <option value="Gigs"> Gigs </option>
                <option value="Lost or Found Items"> Lost or Found Items </option>
                <option value="Lost or Found Pets"> Lost or Found Pets </option>
                <option value="Missed Connections"> Missed Connections </option>
                <option value="Need Help"> Need Help </option>
                <option value="Neighborhood Events"> Neighborhood Events </option>
                <option value="Other"> Other </option>
                <option value="Protest Events"> Protest Events </option>
                <option value="Spotted"> Spotted </option>
                <option value="Thank You Notes"> Thank You Notes </option>
              </select>
            </label>
      {  /* <input className="button" type="submit" value="Submit" />*/}
          </form>
        </div>
        <div className="post-form-container">
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
