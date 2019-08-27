import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { Form } from 'semantic-ui-react';
import Header from './Header'
import SignUpForm from './SignUpForm'
import LoginForm from './LoginForm'

class Welcome extends Component {


    render() {
      return (
          <div className="house-background" >
            <h1 className="welcome-title"> Welcome to Neighborly </h1>
            <LoginForm
            login={this.props.login}/>
            <SignUpForm
            createUser={this.props.createUser}/>
        </div>
      )
    }
}

export default withRouter(Welcome)
