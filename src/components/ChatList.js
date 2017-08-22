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

class ChatList extends React.Component {
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
          <ListItem secondaryText={<p>
                                     <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>
                                     <br /> I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                                   </p>} secondaryTextLines={2} rightIconButton={<span><DialogChatSettings/></span>} />
          <Divider/>
          <ListItem secondaryText={<p>
                                     <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>
                                     <br /> Wish I could come, but I&apos;m out of town this weekend.
                                   </p>} secondaryTextLines={2} rightIconButton={<span><DialogChatSettings/></span>} />
          <Divider/>
          <ListItem secondaryText={<p>
                                     <span style={{color: darkBlack}}>Oui oui</span>
                                     <br /> Do you have any Paris recs? Have you ever been?
                                   </p>} secondaryTextLines={2} rightIconButton={<span><DialogChatSettings/></span>} />
          <Divider />
          <ListItem secondaryText={<p>
                                     <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>
                                     <br /> Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                                   </p>} secondaryTextLines={2} rightIconButton={<span><DialogChatSettings/></span>} />
          <Divider />
          <ListItem secondaryText={<p>
                                     <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>
                                     <br /> We should eat this: grated squash. Corn and tomatillo tacos.
                                   </p>} secondaryTextLines={2} rightIconButton={<span><DialogChatSettings/></span>} />
        </List>
      </div>
    )
  }
}

export default ChatList
