import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class SignUpForm extends Component {

  state = {
      username: '',
      password: ''
  }

  handleChange = event => {
    // console.log(this.state)
    this.setState({ [event.target.name]: event.target.value })
  }

  render(){
    return(
        <div className="signup-card">
          <h1 className="form-title">Sign Up</h1>
          <br />
          <Form onSubmit={() => this.props.createUser(this.state)} >
              <Form.Field>
                  <Form.Input
                    name="username"
                    placeholder="Enter your username"
                    onChange={this.handleChange}
                    value={this.state.username} />
              </Form.Field>
              <br />
              <Form.Field>
                  <Form.Input
                    name="password"
                    type="password" 
                    placeholder="Enter your password"
                    onChange={this.handleChange}
                    value={this.state.password} />
              </Form.Field>
              <br />
              <Form.Button>Submit</Form.Button>
          </Form>
        </div>
    )
  }
}

export default SignUpForm
