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
import ProblemIconAsset from 'material-ui/svg-icons/action/report-problem'
import ErrorIconAsset from 'material-ui/svg-icons/alert/error'
import { lightBlack, darkBlack, green500, red500 } from 'material-ui/styles/colors'

import { stringToHex, hexToString } from '../utils/messaging'
import rpcCall from "../utils/rpc"

import '../assets/scss/ChatContent.scss'

// Chat Content items
// To handle sent messages (operation ids)
class ChatContentOperationItem extends Component {
  constructor(props){
    super(props)
    
    // Nickname stuff
    var addrDisplay = this.props.nicknames[this.props.data.fromAddress] || this.props.data.fromAddress    
    // Sender address
    if (addrDisplay === this.props.userSettings.address){        
      addrDisplay = this.props.userSettings.nickname        
    }   

    this.state = {
      backgroundId: '',
      from: addrDisplay,
      isComplete: false,
      failed: false,
    }

    this.checkIsComplete = this.checkIsComplete.bind(this)
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.isComplete){
      clearInterval(this.state.backgroundId)
      this.props.removeOperation(this.props.data.opid)
    }
  }

  checkIsComplete(){
    const host = this.props.rpcSettings.rpcHost
    const port = this.props.rpcSettings.rpcPort
    const user = this.props.rpcSettings.rpcUsername
    const pass = this.props.rpcSettings.rpcPassword

    rpcCall(host, port, user, pass, 10000).cmd('z_getoperationstatus', [this.props.data.opid], function(err, resp, header){
      try{
        if (resp[0].status === 'success'){          
          this.setState({
            isComplete: true
          })          
        }
        else if (resp[0].status === 'failed'){
          this.setState({
            failed: true
          })
        }
      } catch(err){
        console.log(err)
      }
    }.bind(this))
  }

  componentDidMount(){
    this.setState({
      backgroundId: setInterval(this.checkIsComplete, 5000)
    })
  }

  componentWillReceiveProps(nextProps){
    // Update nickname
    // Convert address to nickname (if exist)      
    var addrDisplay = nextProps.nicknames[nextProps.data.fromAddress] || nextProps.data.fromAddress

    // Sender address
    if (addrDisplay === nextProps.userSettings.address){        
      addrDisplay = nextProps.userSettings.nickname        
    }   
    
    this.setState({      
      from: addrDisplay,        
    })
  }

  render () {          
    return (
      <ListItem
          rightIcon={
            this.state.isComplete ?
            <CheckCircleIconAsset color={green500}/> :
            this.state.failed ?
            <ErrorIconAsset size={15} color={red500} /> :
            <div><CircularProgress size={15}/></div>
          }
      >
        <p>
          <span className="chatMessageSender">{this.state.from}</span>
          <br />
          <span className="chatMessageContent">{this.props.data.message}</span>
          <br />
        </p>
      </ListItem>
    )
  }
}

// Chat Content items
// are the messages themselves (NOT OPERATION ID)
class ChatContentItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isValid: false,  // is this a valid memo (needs to adhere with ZEN messaging protocol)
      isVerified: true, // is the message verified by the t-addr?      
      from: '', // Who is the message from (nickname || address)
      message: '', // what does hte message contain
      address: '', // Who is the message from (address always)
    }
  }

  componentWillReceiveProps(nextProps){
    // Update nickname
    // Convert address to nickname (if exist)      
    var addrDisplay = nextProps.nicknames[this.state.address] || this.state.from

    // Sender address
    if (addrDisplay === nextProps.userSettings.address){        
      addrDisplay = nextProps.userSettings.nickname        
    }   
    
    this.setState({      
      from: addrDisplay,        
    })
  }

  componentDidMount(){    
    var zenmsg

    // ZEN Messaging Protocol v1
    // Need to put this into another file soon
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
      var addrDisplay = this.props.nicknames[zenmsg.from] || zenmsg.from

      // Sender address
      if (addrDisplay === this.props.userSettings.address){        
        addrDisplay = this.props.userSettings.nickname        
      }      

      this.setState({
        isValid: true,
        from: addrDisplay,
        message: zenmsg.message,
        address: zenmsg.from      
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
    const encodedMsg = stringToHex(zenmsg.message).toUpperCase()

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
            this.state.isVerified ?
            <CheckCircleIconAsset color={green500}/> :
            <div><ProblemIconAsset color={red500}/></div>
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
      contentData: [],
      operations: [], // operations: [ {opid: '', fromAddress: ''} ]
    }

    this.addOperation = this.addOperation.bind(this)
    this.removeOperation = this.removeOperation.bind(this)
    this.updateContentData = this.updateContentData.bind(this)
  }

  componentDidUpdate(prevProps, prevState) {
    this.updateContentData()
  }

  updateContentData() {
    const host = this.props.rpcSettings.rpcHost
    const port = this.props.rpcSettings.rpcPort
    const user = this.props.rpcSettings.rpcUsername
    const pass = this.props.rpcSettings.rpcPassword

    const address = this.props.chatContent.address    

    rpcCall(host, port, user, pass, 10000).cmd('z_listreceivedbyaddress', address, 0, function(err, resp=[], header){      
      this.setState({
        contentData: resp.reverse()
      })
    }.bind(this))
  }

  addOperation(opObj) {
    const ops = this.state.operations

    this.setState({
      operations: ops.concat(opObj)
    })    
  }

  removeOperation(opid){
    const ops = this.state.operations

    this.setState({
      operations: ops.filter((x) => x.opid !== opid)
    }) 
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
              this.state.contentData.map((x, i) => {
                return (
                  <div key={i}>
                    <ChatContentItem                                                           
                      data={x}                      
                      userSettings={this.props.userSettings}
                      rpcSettings={this.props.rpcSettings}
                      addSenderAddress={this.props.addSenderAddress}
                      nicknames={chatNicknames}
                    />
                  </div>
                )
              })
            }
            {
              this.state.operations.map((x, i) => {
                return (
                  <div key={i + this.state.contentData.length}>
                    <ChatContentOperationItem
                      data={x}
                      userSettings={this.props.userSettings}
                      rpcSettings={this.props.rpcSettings}
                      addSenderAddress={this.props.addSenderAddress}                      
                      removeOperation={this.removeOperation}
                      nicknames={chatNicknames}
                    />
                  </div>
                )
              })
            }
          </List>
        </div>
        <ChatSender
          addOperation={this.addOperation}
          chatContent={this.props.chatContent}
          userSettings={this.props.userSettings}
          rpcSettings={this.props.rpcSettings}
        />
      </div>
    )
  }
}

function mapStateToProps (state) {  
  return {
    chatList: state.chatList,    
    chatContent: state.chatContent,
    rpcSettings: state.rpcSettings,
    userSettings: state.userSettings
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