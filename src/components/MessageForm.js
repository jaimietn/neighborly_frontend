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

  // componentDidMount(this.props.selectedPostId) {
  //   this.props.getSinglePost(this.props.selectedPostId)
  //   console.log(selectedPostObj)
  // }

  handleChange = (event) => {
    // console.log(this.state)
    this.setState({ [event.target.name]: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    // console.log("bert id", this.props.userId)
    // console.log("bert name", this.props.username)

    let title = this.props.selectedPost.title
    let content = this.state.content
    let sent = new Date().toDateString()
    let post_id = this.props.selectedPost.id
    let sender_id = this.props.userId
    let recipient_id = this.props.selectedPost.user_id
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
              <p> Replying to: {this.props.selectedPost.username}</p>
              <p> Re: {this.props.selectedPost.title} </p>
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

function msp(state){
  return {
    selectedPost: state.selectedPost
  }
}

export default connect(msp, mdp)(MessageForm)
