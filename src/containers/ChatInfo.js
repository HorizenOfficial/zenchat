import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'

import DialogChatSettings from './DialogChatSettings'
import DialogSetNickname from '../components/DialogSetNickname'

import { setChatName, setAddressNickname } from '../actions/ChatSettings'

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
    // Chat info
    const chat = this.props.chatList.filter((x) => x.address === this.props.chatContent.address)
    var chatName, chatAddress, chatSecretCode, chatNicknames

    if (chat.length === 0){
      chatName = 'Welcome!'  
      chatAddress = null
      chatSecretCode = null
      chatNicknames = []
    } else {
      chatName = chat[0].chatName === '' ? chat[0].address : chat[0].chatName
      chatAddress = chat[0].address
      chatSecretCode = chat[0].secretCode   
      chatNicknames = chat[0].nicknames   
    }    

    return (
      <div className='chatInfoDivStyle'>
        <div className='chatTitleStyle'>{chatName}</div>

        {
          (chat.length > 0) ?
          (
            <div style={{width: '50px'}}>
              <IconButton tooltip='Chat Info' onClick={this.handleToggleDrawer}>
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
              <ListItem style={{wordWrap: 'break-word'}} primaryText={<span>{chatName}</span>} rightIconButton={<span><DialogChatSettings secretCode={chatSecretCode} chatName={chatName} address={chatAddress}/></span>} />
            </List>
            <Subheader>
              Nicknames
            </Subheader>
            <List>
              {
                this.props.chatContent.senderAddress.map(function(x, i){                  
                  return (
                    <div key={i}>
                      <DialogSetNickname
                        senderAddress={x}
                        nicknames={chatNicknames}                      
                        chatAddress={this.props.chatContent.address}                      
                        setAddressNickname={this.props.setAddressNickname}
                      />
                    </div>
                  )
                }.bind(this))
              }
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
      setAddressNickname,
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChatInfo)
