import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllMessages } from '../actions.js'
import { Card } from 'semantic-ui-react';
const MESSAGES_URL = "http://localhost:3000/api/v1/messages"

class Messages extends Component {

  componentDidMount() {
    this.props.getAllMessages()
  }

  render() {
    console.log("message page props", this.props.allMessages)
    const userMessages = this.props.allMessages.filter(message => message.recipient_id === this.props.userId)
    console.log("current user messages", userMessages)
    let response
    if (userMessages.length === 0) {
      response = "You don't have any messages."
    } else {
      response = userMessages.map(message => (
        <Card>
        <h2>{message.title}</h2>
        </Card>
      ))
    }

    return(
      <div>
        <h2 className="form-title"> Hey, {this.props.username}! Here are all of your current messages. </h2>
        <Card.Group itemsPerRow={4}>
          {response}
        </Card.Group>
      </div>
    )
  }
}

function mdp(dispatch) {
  return {
    getAllMessages: () => {
      dispatch(getAllMessages())
    }
  }
}

function msp(state) {
  return {
    allMessages: state.allMessages
  }
}

export default connect(msp, mdp)(Messages)
