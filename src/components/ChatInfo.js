import React, { Component } from 'react'

import { List, ListItem } from 'material-ui/List'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'

import DialogChatSettings from './DialogChatSettings'
import DialogSetNickname from './DialogSetNickname'

import InformationIconAsset from 'material-ui/svg-icons/action/info'

export default class ChatInfo extends React.Component {
  constructor (props) {
    super(props)

    this.handleToggleDrawer = this.handleToggleDrawer.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.state = {
      drawerOpen: false
    }
  }

  handleToggleDrawer () {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  handleCloseDrawer () {
    this.setState({drawerOpen: false})
  }

  render () {
    return (
      <div className='roomInfoDivStyle'>
        <span className='roomTitleStyle'>Room Chat Name Here</span>
        <div style={{marginLeft: 'auto'}}>
          <IconButton tooltip='room info' onClick={this.handleToggleDrawer}>
            <InformationIconAsset/>
          </IconButton>
        </div>
        <Drawer
          width={425}
          docked={false}
          openSecondary={true}
          open={this.state.drawerOpen}
          onRequestChange={this.handleCloseDrawer}>
          <List>
            <ListItem primaryText={<span>Room name here @@@@ @@@@ @@@@ @@@@ @@@@ @@@@ @@@@</span>} rightIconButton={<span><DialogChatSettings/></span>} />
          </List>
          <Subheader>
            Nicknames
          </Subheader>
          <List>
            <DialogSetNickname/>
            <DialogSetNickname/>
            <DialogSetNickname/>
          </List>
        </Drawer>
      </div>
    )
  }
}
