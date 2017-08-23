import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'

import DialogChatSettings from './DialogChatSettings'
import DialogSetNickname from '../components/DialogSetNickname'

import { setChatName } from '../actions/ChatSettings'

import InformationIconAsset from 'material-ui/svg-icons/action/info'

import '../assets/scss/ChatInfo.scss'

class ChatInfo extends React.Component {
  constructor (props) {
    super(props)
  
    this.state = {
      drawerOpen: false
    }

    this.handleToggleDrawer = this.handleToggleDrawer.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
  }

  handleToggleDrawer () {
    this.setState({drawerOpen: !this.state.drawerOpen})
  }

  handleCloseDrawer () {
    this.setState({drawerOpen: false})
  }

  render () {
    const chat = this.props.chatList.filter((x) => x.address === this.props.chatContent.address)
    var chatName    

    if (chat.length === 0){
      chatName = 'Select a room'
    } else {
      chatName = chat[0].chatName === '' ? chat[0].address : chat[0].chatName
    }    

    return (
      <div className='chatInfoDivStyle'>
        <div className='chatTitleStyle'>{chatName}</div>

        {
          (chat.length > 0) ?
          (
            <div style={{width: '50px'}}>
              <IconButton tooltip='room info' onClick={this.handleToggleDrawer}>
                <InformationIconAsset/>
              </IconButton>
            </div>
          )
          : null
        }
        <Drawer
            width={425}
            docked={false}
            openSecondary={true}
            open={this.state.drawerOpen}
            onRequestChange={this.handleCloseDrawer}>
            <List>
              <ListItem style={{wordWrap: 'break-word'}} primaryText={<span>{chatName}</span>} rightIconButton={<span><DialogChatSettings/></span>} />
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

function mapStateToProps (state) {
  return {
    chatList: state.chatList,
    chatContent: state.chatContent
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {      
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChatInfo)
