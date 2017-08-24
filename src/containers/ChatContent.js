import React, { Component } from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'

import ChatInfo from './ChatInfo'
import ChatSender from '../components/ChatSender'

import { selectChatContent, addSenderAddress } from '../actions/ChatContent'

import CheckCircleIconAsset from 'material-ui/svg-icons/action/check-circle'
import { lightBlack, darkBlack, green500 } from 'material-ui/styles/colors'

import { stringToHex, hexToString } from '../utils/messaging'
import rpcCall from "../utils/rpc"

import '../assets/scss/ChatContent.scss'

// Chat Content items
// are the messages themselves
class ChatContentItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isValid: false,  // is this a valid memo (needs to adhere with ZEN messaging protocol)
      isVerified: true, // is the message verified by the t-addr?
      isConfirmed: true, // has the message been confirmed sent?
      from: '', // Who is the message from
      message: '', // what does hte message contain
    }
  }

  componentDidMount(){        
    var zenmsg    

    try {      
      var obj = JSON.parse(hexToString(this.props.data.memo))
      
      if (obj.zenmsg === undefined)
        throw "invalid zenmsg"

      zenmsg = obj.zenmsg

      if (zenmsg.ver === undefined ||
          zenmsg.from === undefined ||
          zenmsg.message === undefined ||
          zenmsg.sign === undefined){        
        throw "invalid zenmsg"
      }

      // Convert address to nickname (if exist)
      const addrDisplay = this.props.nicknames[zenmsg.from] || zenmsg.from      

      this.setState({
        isValid: true,
        from: addrDisplay,
        message: zenmsg.message
      })
    } catch (err) {      
      this.setState({
        isValid: false
      })
      return
    }

    const host = this.props.rpcSettings.rpcHost
    const port = this.props.rpcSettings.rpcPort
    const user = this.props.rpcSettings.rpcUsername
    const pass = this.props.rpcSettings.rpcPassword    

    // Convert msg to utf, and to hex and to uppercase before signed
    // need to do the same to verify
    const encodedMsg = stringToHex(zenmsg).toUpperCase()

    rpcCall(host, port, user, pass).cmd('verifymessage', zenmsg.from, zenmsg.sign, encodedMsg, function(err, resp, headers){
      // If is valid sender
      // TODO CHANGE BACK TO RESP
      if(true){
        this.props.addSenderAddress(zenmsg.from)        
      }
      this.setState({
        isVerified: resp
      })     
    }.bind(this))
  }

  render () {
    if (this.state.isValid) {
      return (
        <ListItem rightIcon={
            this.state.isConfirmed ?
            <CheckCircleIconAsset color={green500}/> :
            <div><CircularProgress size={15}/></div>
        }>
          <p>
            <span className="chatMessageSender">{this.state.from}</span>
            <br />
            <span className="chatMessageContent">{this.state.message}</span>
            <br />
          </p>
        </ListItem>
      )
    } else {
      return null
    }
  }
}

class ChatContent extends Component {
  constructor(props){
    super(props)

    this.state = {
      contentData: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const host = nextProps.rpcSettings.rpcHost
    const port = nextProps.rpcSettings.rpcPort
    const user = nextProps.rpcSettings.rpcUsername
    const pass = nextProps.rpcSettings.rpcPassword

    const address = nextProps.chatContent.address
    
    rpcCall(host, port, user, pass, 10000).cmd('z_listreceivedbyaddress', address, function(err, resp=[], header){      
      this.setState({
        contentData: resp
      })
    }.bind(this))
  }

  render () {
    const chat = this.props.chatList.filter((x) => x.address === this.props.chatContent.address)
    var chatNicknames = {}

    if (chat.length > 0){      
      chatNicknames = chat[0].nicknames
    }    

    return (
      <div className='chatContainerStyle'>
        <ChatInfo/>
        <div className='chatAreaStyle'>
          <List>
            {
              this.state.contentData.map((x) => {
                return (
                  <ChatContentItem 
                    data={x}
                    rpcSettings={this.props.rpcSettings}
                    addSenderAddress={this.props.addSenderAddress}
                    nicknames={chatNicknames}
                  />
                )
              })
            }
          </List>
        </div>
        <ChatSender />
      </div>
    )
  }
}

function mapStateToProps (state) {  
  return {
    chatList: state.chatList,    
    chatContent: state.chatContent,
    rpcSettings: state.rpcSettings
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      selectChatContent,
      addSenderAddress
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChatContent)