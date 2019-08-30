import React, { Component } from 'react'
import PostForm from './PostForm'

import Map from './Map'
// import CategoryForm from './CategoryForm'
const POSTS_URL = "http://localhost:3000/api/v1/posts"


class Homepage extends Component {

  state = {
    category: '',
    allPosts: []
  }

  handleChange = (event) => {
    // console.log("target", event.target)
    this.setState({ category: event.target.value})
  }

  handleSubmit = (event) => {
    console.log("You selected this category:", this.state.category)
    console.log("current user", this.props.username)
    event.preventDefault()
  }

  componentDidMount() {
      fetch(`${POSTS_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accepts: 'application/json'
        }
      })
        .then(resp => resp.json())
        .then(postsArray => {
          // console.log(postsArray)
          this.setState({ allPosts: postsArray })
    })
  }

  render() {
    console.log("homepage props", this.props)
    return (
      <>
        <div>
          <h1 className="form-title"> Welcome back, {this.props.username}! </h1>
          <h4> {"Search anywhere in the world and click the map to leave a note. It's the neighborly thing to do."} </h4>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              {"Filter this map area by category: "}
              <select value={this.state.category} onChange={this.handleChange}>
                <option value="animal_sightings"> Animal Sightings </option>
                <option value="candid_camera"> Candid Camera </option>
                <option value="free_stuff"> Free Stuff </option>
                <option value="general_notes"> General Notes </option>
                <option value="for_sale"> Items For Sale </option>
                <option value="live_music"> Live Music </option>
                <option value="lost_found_items"> Lost or Found Items </option>
                <option value="lost_found_pet"> Lost or Found Pets </option>
                <option value="missed_connections"> Missed Connections </option>
                <option value="need_help"> Need Help </option>
                <option value="neighborhood_events"> Neighborhood Events </option>
                <option value="other"> Other </option>
                <option value="protest_events"> Protest Events </option>
                <option value="safety_concerns"> Safety Concerns </option>
                <option value="thank_you_notes"> Thank You Notes </option>
              </select>
            </label>
            <input className="button" type="submit" value="Submit" />
          </form>
        </div>
        <div className="post-form-container">
          <PostForm
            userId={this.props.userId}
            username={this.props.username}/>
        </div>
        <div className="map-container">
          <Map
            allPosts={this.state.allPosts}
            userId={this.props.userId}
            username={this.props.username}/>
        </div>
      </>
    )
  }
}

export default Homepage
