import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

class Welcome extends Component {

    render() {
      return (
        <div className="yellow-blue-login">
          <h1 className="welcome-title">
            Welcome to Neighborly
          </h1>
          <h2 className="subtitle-text">
            Leave a note, anywhere in the world.
          </h2>
          <div>
            <LoginForm
              login={this.props.login}/>
            <SignUpForm
              createUser={this.props.createUser}/>
          </div>
        </div>
      )
    }
}
export default withRouter(Welcome)
