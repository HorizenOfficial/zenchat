import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Grid, Row, Col } from 'react-flexbox-grid'

import { List, ListItem } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import IconButton from 'material-ui/IconButton'
import Subheader from 'material-ui/Subheader'
import TextField from 'material-ui/TextField'

import DialogNewChat from './DialogNewChat'
import DialogAppSettings from './DialogAppSettings'
import DialogChatSettings from './DialogChatSettings'

import { addNewChat, setChatName } from '../actions/ChatSettings'
import { selectChatContent } from '../actions/ChatContent'

import CheckCircleIconAsset from 'material-ui/svg-icons/action/check-circle'
import ProblemIconAsset from 'material-ui/svg-icons/action/report-problem'
import { lightBlack, darkBlack, green500, red500 } from 'material-ui/styles/colors'

import rpcCall from "../utils/rpc"

import '../assets/scss/main.scss'


class CheckRPCConnection extends Component {
  constructor(props) {
    super(props)

    this.state = {
      connected: true      
    }

    this.checkRPCConnection = this.checkRPCConnection.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const sameRPCSettings = JSON.stringify(nextProps.rpcSettings) === JSON.stringify(this.props.rpcSettings)
    return (!sameRPCSettings)
  }

  checkRPCConnection () {
    // RPC Call
    const host = this.props.rpcHost
    const port = this.props.rpcPort
    const user = this.props.rpcUsername
    const pass = this.props.rpcPassword
    const timeout = 10000            
    
    rpcCall(host, port, user, pass, timeout).cmd('getinfo', function(err, resp, headers){      
      if (err){
        this.setState({
          connected: false
        })
      }
      else{
        this.setState({
          connected: true          
        })
      }
    }.bind(this))
  }

  componentDidUpdate() {
    this.checkRPCConnection()
  }

  componentDidMount(){
    this.checkRPCConnection()
    setInterval(this.checkRPCConnection(), 15000)
  }

  render () {    
    return (
      <span className="spanFonts">        
        RPC Status: {
                      this.state.connected ?
                      <span className="spanSuccess">Connected</span> :
                      <span className="spanAlert">Disconnected</span>
                    }
      </span>
    )
  }
}

class ChatListItem extends Component {
  render () {
    const chatName = this.props.chatName === '' ? this.props.address : this.props.chatName

    return (
      <ListItem
        onClick={() => this.props.selectChatContent(this.props.address)}
        secondaryText={<p><span style={{color: darkBlack}}>{chatName}</span><br /></p>}
        secondaryTextLines={2}
        rightIconButton={<span><DialogChatSettings secretCode={this.props.secretCode} chatName={chatName} address={this.props.address}/></span>}
      />
    )
  }
}

class ChatList extends Component {
  shouldComponentUpdate(nextProps, nextState){
    // Update if items are different
    if (JSON.stringify(nextProps.chatList) !== JSON.stringify(this.props.chatList)){
      return true;
    }
    return true
  }

  render () {        
    return (
      <div style={{height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto', overflowX: 'hidden'}}>
        <div style={{height: '50px'}}>
          <Subheader style={{padding: '0px'}}>
            <div style={{textAlign: 'right'}}>                      
              <DialogNewChat />
              <DialogAppSettings />
            </div>
          </Subheader>
        </div>
        <Divider/>
        <div style={{flex: 1, overflowY: 'auto'}}>
          <List>
            {
              this.props.chatList.map(function(chat, i){
                return (
                  <div key={i}>
                    <ChatListItem                      
                      {...chat}
                      selectChatContent={this.props.selectChatContent}                      
                    />
                    <Divider/>
                  </div>
                )
              }.bind(this))
            }        
          </List>
        </div>
        <Divider/>
        <div style={{height: '40px', textAlign: 'center', paddingTop: '15px'}}>
          <CheckRPCConnection {...this.props.rpcSettings} />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {  
  return {    
    chatList: state.chatList,
    rpcSettings: state.rpcSettings
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      addNewChat,
      setChatName,
      selectChatContent
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChatList)
