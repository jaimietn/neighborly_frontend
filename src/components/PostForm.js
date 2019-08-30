import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

const POSTS_URL = "http://localhost:3000/api/v1/posts"

class PostForm extends Component {

  state = {
    latitude: '',
    longitude: '',
    posted: '',
    expires: '',
    category: '',
    title: '',
    content: '',
    image: ''
  }


  nextweek() {
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    return nextweek.toDateString();
  }

  handleChange = (event) => {
    console.log(this.state)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log("bert id", this.props.userId)
    console.log("bert name", this.props.username)

    let userId = this.props.userId
    let username = this.props.username
    let latitude = Number(this.props.longLat[1])
    let longitude = Number(this.props.longLat[0])
    let posted = new Date().toDateString()
    let expires = this.nextweek()
    let category = this.state.category
    let title = this.state.title
    let content = this.state.content
    let image = this.state.image

    // console.log(user)
    fetch(`${POSTS_URL}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, body: JSON.stringify({
          post: {
            user_id: userId,
            username: username,
            latitude: latitude,
            longitude: longitude,
            posted: posted,
            expires: expires,
            category: category,
            title: title,
            content: content,
            image: image
          }
        })
      })
      .then(resp => resp.json())
      .then(newPost => {
        console.log(newPost)
      })
  }

  render(){
    return(
        <div>
          <h2 className="form-title">Leave a Note</h2>
          <br />
          <h4> {"Start by clicking on the location"} </h4>
          <Form onSubmit={this.handleSubmit} >
              <p>
                  Latitude: {this.props.longLat[1]}
              </p>
              <p>
                  Longitude: {this.props.longLat[0]}
              </p>
              <Form.Field>
                  <Form.Input
                  placeholder="Enter title"
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title} />
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
              <br></br>
            <Form.Button> Submit </Form.Button>
          </Form>
        </div>
    )
  }
}

function msp(state){
  return {
    longLat: state.longLat
  }
}

export default connect(msp, null)(PostForm)
