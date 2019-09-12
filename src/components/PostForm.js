import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

const POSTS_URL = `${process.env.REACT_APP_BACKEND_URL}/api/v1/posts`

const defaultState = {
  latitude: '',
  longitude: '',
  posted: '',
  expires: '',
  category: '',
  title: '',
  neighborhood: '',
  content: '',
  image: ''
}

class PostForm extends Component {

  state = defaultState

  nextweek() {
    var today = new Date()
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7)
    return nextweek.toDateString()
  }

  handleChange = (event) => {
    // console.log(this.state)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("bert name", this.props.username)

    let userId = this.props.userId
    let username = this.props.username
    let latitude = Number(this.props.longLat[1])
    let longitude = Number(this.props.longLat[0])
    let posted = new Date().toDateString()
    let expires = this.nextweek()
    let category = this.state.category
    let title = this.state.title
    let neighborhood = this.state.neighborhood
    let content = this.state.content
    let image = this.state.image

    const newPost = {
      user_id: userId,
      username: username,
      latitude: latitude,
      longitude: longitude,
      posted: posted,
      expires: expires,
      category: category,
      title: title,
      content: content,
      image: image,
      neighborhood: neighborhood
    }

    this.props.addNewPost(newPost)
    this.props.removeLongLat()

    // console.log(user)
    fetch(`${POSTS_URL}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, body: JSON.stringify({
          post: newPost
        })
      })
      .then(resp => resp.json())
      .then(newPost => {
        console.log(newPost)
      })
    this.setState(defaultState)
  }

  render(){
    return(
        <div className="post-form-container">
          <hr/>
          <h2 className="form-title">Leave a Note</h2>
          <h5 className="subtitle-text">
            Start by clicking on a location
          </h5>
          <Form
            onSubmit={this.handleSubmit}>
              <Form.Field>
                  <Form.Input
                  placeholder="Enter title"
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title} />
              </Form.Field>
              <Form.Field>
                  <Form.Input
                  placeholder="Enter city or neighborhood"
                  name="neighborhood"
                  onChange={this.handleChange}
                  value={this.state.neighborhood} />
              </Form.Field>
              <Form.Field>
                  <Form.Input
                  placeholder="Write your note"
                  name="content"
                  onChange={this.handleChange}
                  value={this.state.content} />
              </Form.Field>
              <Form.Field>
                  <Form.Input
                  placeholder="Share an image link"
                  name="image"
                  onChange={this.handleChange}
                  value={this.state.image} />
              </Form.Field>
              <select name="category" value={this.state.category} onChange={this.handleChange}>
                <option value='' disabled> Select a category </option>
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
              <br></br>
            <Form.Button> Submit </Form.Button>
          </Form>
        </div>
    )
  }
}

function mdp(dispatch) {
  return {
    addNewPost: (newPost) => dispatch({
      type: "ADD_NEW_POST",
      payload: newPost}),
    removeLongLat: () => dispatch({
      type: "CLEAR_LONG_LAT"
    })
  }
}

function msp(state){
  return {
    longLat: state.longLat
  }
}

export default connect(msp, mdp)(PostForm)
