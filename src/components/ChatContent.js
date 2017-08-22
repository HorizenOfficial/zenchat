import React, { Component } from 'react'

import { List, ListItem } from 'material-ui/List'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'

import ChatInfo from './ChatInfo'
import ChatSender from './ChatSender'

import CheckCircleIconAsset from 'material-ui/svg-icons/action/check-circle'
import { lightBlack, darkBlack, green500 } from 'material-ui/styles/colors'

import '../assets/scss/ChatContent.scss'

// Chat Content items
// are the messages themselves
class ChatContentItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      sendComplete: true
    }
  }

  render () {
    return (
      <ListItem rightIcon={
          this.state.sendComplete ?
          <CheckCircleIconAsset color={green500}/> :
          <div><CircularProgress size={15}/></div>
      }>
        <p>
          <span className="chatMessageSender">znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>
          <br />
          <span className="chatMessageContent">We should eat this: grated squash. Corn and tomatillo tacos.</span>
          <br />
        </p>
      </ListItem>
    )
  }
}

export default class ChatContent extends Component {
  render () {
    return (
      <div className='chatContainerStyle'>
        <ChatInfo/>
        <div className='chatAreaStyle'>
          <List>
            <ChatContentItem/>
            <ChatContentItem/>
            <ChatContentItem/>
            <ChatContentItem/>
            <ChatContentItem/>
          </List>
        </div>
        <ChatSender />
      </div>
    )
  }
}
