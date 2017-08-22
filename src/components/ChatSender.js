import React, { Component } from 'react'

import TextField from 'material-ui/TextField'

import '../assets/scss/ChatContent.scss'

export default class ChatSender extends Component {
  render() {
    return (
      <div className='chatSenderDivStyle'>
        <TextField hintText='Type a message' fullWidth={true} />
      </div>
    )
  }
}