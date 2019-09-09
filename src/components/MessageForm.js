import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'

const MESSAGES_URL = "http://localhost:3000/api/v1/messages"


class MessageForm extends Component {

  state = {
    title: '',
    content: '',
    sent: '',
    post_id: '',
    sender_id: '',
    recipient_id: ''
  }

  handleChange = (event) => {
    // console.log(this.state)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log("bert id", this.props.userId)
    // console.log("bert name", this.props.username)

    let title = this.state.title
    let content = this.state.content
    let sent = new Date().toDateString()
    let post_id = '2'
    let sender_id = this.props.userId
    let recipient_id = '3'
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
    fetch(`${MESSAGES_URL}`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }, body: JSON.stringify({
          message: newMessage
        })
      })
      .then(resp => resp.json())
      .then(newMessage => {
        console.log(newMessage)
      })
  }

  render(){
    return(
        <div>
          <h2 className="form-title">Send a Message</h2>
          <br />
          <Form className="message-form"
            onSubmit={this.handleSubmit}>
              <Form.Field>
                  <Form.Input
                  placeholder="Enter title"
                  name="title"
                  onChange={this.handleChange}
                  value={this.state.title} />
              </Form.Field>
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
    addNewMessage: (newMessage) => dispatch({
    type: "ADD_NEW_MESSAGE",
    payload: newMessage})
  }
}

export default connect(null, mdp)(MessageForm)
