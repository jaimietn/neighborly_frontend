import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { addNewMessage } from '../actions.js'
import { connect } from 'react-redux'

const  defaultState = {
  title: '',
  content: '',
  sent: '',
  post_id: '',
  sender_id: '',
  recipient_id: '',
}

class MessageForm extends Component {

  state = defaultState

  handleChange = (event) => {
    // console.log(this.state)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {

    let title = this.props.selectedMessage.title
    let content = this.state.content
    let sent = new Date().toDateString()
    let post_id = this.props.selectedMessage.post_id
    let sender_id = this.props.userId
    let recipient_id = this.props.reply_status ?  this.props.selectedMessage.sender.id : this.props.selectedMessage.recipient.id
    console.log("props", this.props)

    const newMessage = {
      title: title,
      content: content,
      sent: sent,
      post_id: post_id,
      sender_id: sender_id,
      recipient_id: recipient_id
    }

    this.props.addNewMessage(newMessage)
    // console.log(user)
    this.setState(defaultState)
  }

  render(){
    // console.log(this.props.selectedMessage)
    // const senderUser = this.props.selectedMessage.sender
    // console.log(senderUser)
    return(
        <div className="message-form-container">
          <h2 className="form-title">Send a Message</h2>

          <Form className="message-form"
            onSubmit={this.handleSubmit}>
            <p>
              Replying to: {this.props.selectedMessage.sender ? this.props.reply_status ?  this.props.selectedMessage.sender.username : this.props.selectedMessage.recipient.username : null}
            </p>
            <p>
              Re: {this.props.selectedMessage.title}
            </p>
              <Form.Field>
                  <Form.Input
                  placeholder="Write your message here."
                  name="content"
                  onChange={this.handleChange}
                  value={this.state.content} />
              </Form.Field>
            <Form.Button> Submit </Form.Button>
          </Form>
        </div>
    )
  }
}

function mdp(dispatch) {
  return {
    addNewMessage: (newMessage) => dispatch(addNewMessage(newMessage)),
  }
}

function msp(state){
  console.log(state.selectedMessage)
  return {
    selectedPost: state.selectedPost,
    selectedMessage: state.selectedMessage
  }
}

export default connect(msp, mdp)(MessageForm)
