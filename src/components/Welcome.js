import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

class Welcome extends Component {


    render() {
      return (
        <div>
          <div>
            <h1 className="welcome-title">
                Welcome to Neighborly
            </h1>
            <LoginForm
            login={this.props.login}/>
            <SignUpForm
            createUser={this.props.createUser}/>
          </div>
          <div
              className="city-background">
          </div>
        </div>
      )
    }
}
export default withRouter(Welcome)
