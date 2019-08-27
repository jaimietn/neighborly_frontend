import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class LoginForm extends Component {

  state = {
      username: "",
      password: ""
  }

  handleChangeUsername = event => {
    this.setState({ username: event.target.value })
  }

  handleChangePassword = event => {
    // console.log(this.state)
    this.setState({ password: event.target.value })
  }

  render(){
    return(
      <div className="login-card">
        <div className="login-card-inner">
          <h1>Login</h1>
          <br />
          <Form onSubmit={() => this.props.login(this.state)} >
              <Form.Field>
                  <Form.Input placeholder="Enter your username" onChange={this.handleChangeUsername} value={this.state.username} />
              </Form.Field>
              <br />
              <Form.Field>
                  <Form.Input type="password" placeholder="Enter your password" onChange={this.handleChangePassword} value={this.state.password} />
              </Form.Field>
              <br />
              <Form.Button>Submit</Form.Button>
          </Form>
          <br />
        </div>
      </div>
    )
  }


}

export default LoginForm
