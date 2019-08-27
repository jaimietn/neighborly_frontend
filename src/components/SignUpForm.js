import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

class SignUpForm extends Component {

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
        <div className="signin-card">
            <div className="login-card-inner">
                <br />
                <h1>Sign Up</h1>
                <br />
                <Form onSubmit={() => this.props.createUser(this.state)} >
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
            </div>
        </div>
    )
  }
}

export default SignUpForm
