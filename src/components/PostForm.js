import React, { Component } from 'react'
import { Form, Dropdown } from 'semantic-ui-react'
const POSTS_URL = "http://localhost:3000/api/v1/posts"

class PostForm extends Component {

  state = {
    user_id: '',
    latitude: '',
    longitude: '',
    posted: '',
    expires: '',
    category: '',
    title: '',
    content: '',
    image: ''
  }

  handleChange = event => {
    // console.log(this.state)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
  event.preventDefault();
  console.log("bert id", this.props.userId)
  console.log("bert name", this.props.username)
  // const data = new FormData(event.target);
  //
  // console.log(user)
  // fetch(`${USERS_URL}`,
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/json"
  //     }, body: JSON.stringify({
  //       user: {
  //         username: user.username,
  //         password: user.password
  //       }
  //     })
  //   })
  //   .then(resp => resp.json())
  //   .then(newUser => {
  //     console.log(newUser)
  //   })
  }

  render(){
    return(
        <div>
          <h2 className="form-title">Leave a Note</h2>
          <br />
          <Form onSubmit={this.handleSubmit} >
              <Form.Field>
                  <Form.Input
                  placeholder="Enter latitude"
                  onChange={this.handleChange}
                  value={this.state.latitude} />
              </Form.Field>
              <Form.Field>
                  <Form.Input
                  placeholder="Enter longitude"
                  onChange={this.handleChange}
                  value={this.state.longitude} />
              </Form.Field>
              <Form.Field>
                  <Form.Input
                  placeholder="Enter title"
                  onChange={this.handleChange}
                  value={this.state.title} />
              </Form.Field>
              <Form.Field>
                  <Form.Input
                  placeholder="Write your note"
                  onChange={this.handleChange}
                  value={this.state.content} />
              </Form.Field>
              <Form.Field>
                  <Form.Input
                  placeholder="Share an image link"
                  onChange={this.handleChange}
                  value={this.state.image} />
              </Form.Field>
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
              <br></br>
            <Form.Button> Submit </Form.Button>
          </Form>
        </div>
    )
  }

}
export default PostForm
