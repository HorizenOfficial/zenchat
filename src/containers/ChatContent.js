import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'

import ChatInfo from './ChatInfo'
import ChatSender from '../components/ChatSender'

import { selectChatContent } from '../actions/ChatContent'

import CheckCircleIconAsset from 'material-ui/svg-icons/action/check-circle'
import { lightBlack, darkBlack, green500 } from 'material-ui/styles/colors'

import rpcCall from "../utils/rpc"

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

class ChatContent extends Component {
  constructor (props){
    super(props)

    this.state = {
      contentData: []
    }
  }

  // Don't wanna update if its the same address
  shouldComponentUpdate(nextProps, nextState) {    
    return (this.props.chatContent.address !== nextProps.chatContent.address)
  }

  componentWillReceiveProps(nextProps) {    
    const host = nextProps.rpcSettings.rpcHost
    const port = nextProps.rpcSettings.rpcPort
    const user = nextProps.rpcSettings.rpcUsername
    const pass = nextProps.rpcSettings.rpcPassword

    const address = nextProps.chatContent.address
    
    rpcCall(host, port, user, pass, 10000).cmd('z_listreceivedbyaddress', address, function(err, resp, header){
      this.setState({
        contentData: resp
      })
    }.bind(this))
  }

  render () {
    return (
      <div className='chatContainerStyle'>
        <ChatInfo/>
        <div className='chatAreaStyle'>
          <List>
          </List>
        </div>
        <ChatSender />
      </div>
    )
  }
}

function mapStateToProps (state) {  
  return {
    chatContent: state.chatContent,
    rpcSettings: state.rpcSettings
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      selectChatContent
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChatContent)
