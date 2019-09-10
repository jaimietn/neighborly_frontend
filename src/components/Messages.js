import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllMessages, getSinglePost, getSingleMessage } from '../actions.js'
import { Card } from 'semantic-ui-react'
import MessageForm from './MessageForm'
const MESSAGES_URL = "http://localhost:3000/api/v1/messages"

class Messages extends Component {

  state = {
    reply_status: false
  }

  componentDidMount() {
    this.props.getAllMessages()
  }

  deleteSingleMessage = (messageId) => {
    fetch(`${MESSAGES_URL}/${messageId}`,  {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    console.log("delete message:", messageId)
    this.props.deleteMessage(messageId)
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
          <h2> Re: {message.title} </h2>
          <p> {message.content} </p>
          <p> Sent from {message.sender.username} on {message.sent} </p>
          <button className="delete-btn"
            onClick={(e) => this.deleteSingleMessage(message.id)}>
            &times;
          </button>
          <button className="form-button" onClick={(e) => {
            this.setState({reply_status: true})
            this.props.getSingleMessage(message.id)}} id={message.id}> Reply </button>
        </Card>
      ))
    }

    if (userSentMessages.length === 0) {
      sentMessages = "You haven't sent any messages!"
    } else {
      sentMessages = userSentMessages.map(message => (
        <Card key={message.id}>
          <h2> Re: {message.title} </h2>
          <p> {message.content} </p>
          <p> Sent to {message.recipient.username} on {message.sent} </p>
          <button className="delete-btn"
            onClick={(e) => this.deleteSingleMessage(message.id)}>
            &times;
          </button>
          <button className="form-button" onClick={(e) =>{
            this.setState({reply_status: false})
             this.props.getSingleMessage(message.id)}} id={message.id}> Send a follow-up message </button>
        </Card>
      ))
    }

    return (
      <div>
        <MessageForm
          reply_status={this.state.reply_status}
          userId={this.props.userId}
          username={this.props.userName}/>
        <h2 className="form-title"> Hey,  {this.props.username}! Here are all of your current messages. </h2>
        <br></br>
          <div className="messages-received-container">
          <h3> Your Inbox: </h3>
          <Card.Group itemsPerRow={1}>
            {receivedMessages}
          </Card.Group>
        </div>
        <div className="messages-sent-container">
          <h3> Your Sent Messages: </h3>
          <Card.Group itemsPerRow={1}>
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
      dispatch(getAllMessages())},
    deleteMessage: (messageId) => dispatch({
      type: "DELETE_MESSAGE",
      payload: messageId}),
    getSinglePost: (selectedPostId) => {
      getSinglePost(dispatch, selectedPostId)},
    getSingleMessage: (selectedMessageId) => {
      getSingleMessage(dispatch, selectedMessageId)}
  }
}

function msp(state) {
  return {
    allMessages: state.allMessages,
    selectedPost: state.selectedPost,
    selectedMessage: state.selectedMessage
  }
}

export default connect(msp, mdp)(Messages)
