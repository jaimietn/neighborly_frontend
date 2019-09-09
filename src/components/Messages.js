import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllMessages } from '../actions.js'
import { Card } from 'semantic-ui-react';
import MessageForm from './MessageForm'
// const MESSAGES_URL = "http://localhost:3000/api/v1/messages"

class Messages extends Component {

  componentDidMount() {
    this.props.getAllMessages()
  }

  render() {
    console.log("message page props", this.props.allMessages)

    const userReceivedMessages = this.props.allMessages.filter(message => message.recipient_id === this.props.userId)

    const userSentMessages = this.props.allMessages.filter(message => message.sender_id === this.props.userId)

    let receivedMessages
    let sentMessages

    if (userReceivedMessages.length === 0) {
      receivedMessages = "You don't have any messages."
    } else {
      receivedMessages = userReceivedMessages.map(message => (
        <Card key={message.id}>
          <h2> {message.title} </h2>
          <p> {message.content} </p>
        </Card>
      ))
    }

    if (userSentMessages.length === 0) {
      sentMessages = "You haven't sent any messages!"
    } else {
      sentMessages = userSentMessages.map(message => (
        <Card key={message.id}>
          <h2> {message.title} </h2>
          <p> {message.content} </p>
        </Card>
      ))
    }

    return (
      <div>
        <MessageForm
          userId={this.props.userId}
          username={this.props.userName}/>
        <h2 className="form-title"> Hey, {this.props.username}! Here are all of your current messages. </h2>
        <br></br>
          <div className="messages-received-container">
          <h2> Your inbox: </h2>
          <Card.Group itemsPerRow={2}>
            {receivedMessages}
          </Card.Group>
        </div>
        <div className="messages-sent-container">
          <h2> Your sent messages: </h2>
          <Card.Group itemsPerRow={2}>
            {sentMessages}
          </Card.Group>
        </div>
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
