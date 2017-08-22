import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'

import DialogNewChat from './DialogNewChat'
import DialogAppSettings from './DialogAppSettings'
import DialogChatSettings from './DialogChatSettings'

import '../assets/scss/ChatContent.scss'

import { darkBlack, lightBlack } from 'material-ui/styles/colors'

class ChatListItem extends Component {
  render () {
    return (
      <ListItem secondaryText={<p>
        <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>
        <br /> I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
      </p>} secondaryTextLines={2} rightIconButton={<span><DialogChatSettings/></span>} />
    )
  }
}

export default class ChatList extends Component {
  render () {
    return (
      <div style={{height: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
        <Subheader style={{padding: '0px'}}>
          <div style={{textAlign: 'right'}}>
            <DialogNewChat />
            <DialogAppSettings />
          </div>
        </Subheader>
        <Divider/>
        <List>
          <ChatListItem />
          <Divider/>
          <ChatListItem />
          <Divider/>
          <ChatListItem />
          <Divider/>
          <ChatListItem />
          <Divider/>          
        </List>
      </div>
    )
  }
}