import React, { Component } from 'react'

const DUMMY_DATA = [
  {
    sender_id: "Jaimie",
    text: "hi"
  },
  {
    sender_id: "Sully",
    text: "hi sis!"
  }
]

class MessageList extends Component {

  render(){
    return(
      <div className="message-list">
        {DUMMY_DATA.map((message, index) => {
          return (
            <div key={index} className="message">
              <div className="message-username">
              {message.sender_id}
              </div>
              <div className="message-text">
              {message.text}
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
export default MessageList
