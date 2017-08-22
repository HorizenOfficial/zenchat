import React, { Component } from 'react'

import { List, ListItem } from 'material-ui/List'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'

import ChatInfo from './ChatInfo'
import ChatSender from './ChatSender'

import CheckCircleIconAsset from 'material-ui/svg-icons/action/check-circle'
import { lightBlack, darkBlack, green500 } from 'material-ui/styles/colors'

import '../assets/scss/ChatContent.scss'

class ChatContent extends React.Component {
  render () {
    return (
      <div className='chatContainerStyle'>
        <ChatInfo/>
        <div className='chatAreaStyle'>
          <List>
            <ListItem rightIcon={<CheckCircleIconAsset color={green500} />}>
              <p>
                <span style={{color: darkBlack,  fontSize: '15px'}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>
                <br />
                <span style={{color: lightBlack, fontSize: '14px'}}>We should eat this: grated squash. Corn and tomatillo tacos.</span>
                <br />
              </p>
            </ListItem>
            <ListItem rightIcon={<div>
                                   <CircularProgress size={15} />
                                 </div>}>
              <p>
                <span style={{color: darkBlack,  fontSize: '15px'}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>
                <br />
                <span style={{color: lightBlack, fontSize: '14px'}}>We should eat this: grated squash. Corn and tomatillo tacos.</span>
                <br />
              </p>
            </ListItem>
            <ListItem rightIcon={<CircularProgress size={15} />}>
              <p>
                <span style={{color: darkBlack,  fontSize: '15px'}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>
                <br />
                <span style={{color: lightBlack, fontSize: '14px'}}>We should eat this: grated squash. Corn and tomatillo tacos.</span>
                <br />
              </p>
            </ListItem>
            <ListItem rightIcon={<CircularProgress size={15} />}>
              <p>
                <span style={{color: darkBlack,  fontSize: '15px'}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>
                <br />
                <span style={{color: lightBlack, fontSize: '14px'}}>We should eat this: grated squash. Corn and tomatillo tacos.</span>
                <br />
              </p>
            </ListItem>
            <ListItem rightIcon={<CircularProgress size={15} />}>
              <p>
                <span style={{color: darkBlack,  fontSize: '15px'}}>Me</span>
                <br />
                <span style={{color: lightBlack, fontSize: '14px'}}>We should eat this: grated squash. Corn and tomatillo tacos.</span>
                <br />
              </p>
            </ListItem>
          </List>
        </div>
        <ChatSender />
      </div>
    )
  }
}

export default ChatContent
