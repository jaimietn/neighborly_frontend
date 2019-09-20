import React, { Component } from 'react'
import Chatkit from '@pusher/chatkit-client'
import Message from './Message'
import MessageList from './MessageList'
import NewRoomForm from './NewRoomForm'
import RoomList from './RoomList'
import SendMessageForm from './SendMessageForm'

const NEIGHBORLY_KEY = "fbe15b56-ea28-4318-aabe-6933ea477f93:nt6OZhpL3GuQNErFzd5ARc+kZ+Mzz+/ZLK7VSh1tPZY="

const instanceLocator = "v1:us1:e72650f4-cd53-4925-a318-77d5c77f82f3"

const testToken = "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e72650f4-cd53-4925-a318-77d5c77f82f3/token"

class Chat extends Component {

  constructor() {
    super()
    this.state = {
      messages: []
    }
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
       instanceLocator: instanceLocator,
       userId: 'Jaimie',
       tokenProvider: new Chatkit.TokenProvider({
         url: testToken
       })
    })
    chatManager.connect()
    .then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: "44f5b803-baaa-4eef-b900-ec60b3976dd1",
        hooks: {
          onNewMessage: message => {
            console.log('message.text: ', message.text)
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
    })
  }

  render(){
    console.log('this.state.messages: ', this.state.messages)
    return(
      <div className="chat-box">
        <RoomList />
        <MessageList />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    )
  }
}
export default Chat
