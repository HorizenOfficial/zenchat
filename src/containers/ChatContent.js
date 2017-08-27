import Promise from 'bluebird'

import React, { Component } from 'react'
import ReactDOM from 'react-dom';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'
import CircularProgress from 'material-ui/CircularProgress'
import TextField from 'material-ui/TextField'
import IconButton from 'material-ui/IconButton'

import ChatInfo from './ChatInfo'
import ChatSender from '../components/ChatSender'

import { selectChatContent, addSenderAddress } from '../actions/ChatContent'

import CheckCircleIconAsset from 'material-ui/svg-icons/action/check-circle'
import ProblemIconAsset from 'material-ui/svg-icons/action/report-problem'
import ErrorIconAsset from 'material-ui/svg-icons/alert/error'
import { lightBlack, darkBlack, green500, red500, orange500 } from 'material-ui/styles/colors'

import { stringToHex, hexToString } from '../utils/messaging'
import rpcCall, { rpcCallPromise } from "../utils/rpc"

import '../assets/scss/ChatContent.scss'

// Error sending, click to retry
const VerifiedMessageIcon = (
  <IconButton touch={true} tooltip='sender verified' tooltipPosition='bottom-left' >
    <CheckCircleIconAsset color={green500}/>
  </IconButton>
)

const UnverifiedMessageIcon = (
  <IconButton touch={true} tooltip='unable to verify sender' tooltipPosition='bottom-left' >
    <ProblemIconAsset color={orange500}/>
  </IconButton>
)

const ErrorSendingIcon = (
  <IconButton touch={true} tooltip='failed to send message, tap to retry' tooltipPosition='bottom-left' >
    <ErrorIconAsset color={red500}/>
  </IconButton>
)


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
      errMessage: '',
    }

    this.checkIsComplete = this.checkIsComplete.bind(this)
    this.resendMessage = this.resendMessage.bind(this)
  }

  resendMessage(){
    const host = this.props.rpcSettings.rpcHost
    const port = this.props.rpcSettings.rpcPort
    const user = this.props.rpcSettings.rpcUsername
    const pass = this.props.rpcSettings.rpcPassword

    const fromAddress = this.props.data.fromAddress
    const message = this.props.data.message
    const sendData = this.props.data.sendData

    rpcCall(host, port, user, pass, 10000).cmd('z_sendmany', fromAddress, sendData, 1, 0, function(err, resp, header){        
        // Add operation chat item
        this.props.updateOperation(this.props.data.opid, {opid: resp, fromAddress: fromAddress, message: message, sendData: sendData})

        // Reanimte
        this.setState({
          isComplete: false,
          failed: false,
          backgroundId: setInterval(this.checkIsComplete, 5000)
        })
    }.bind(this))
  }

  componentWillUnmount() {
    clearInterval(this.state.backgroundId)
    this.props.removeOperation(this.props.data.opid)
  }

  componentDidUpdate(prevProps, prevState){    
    if (this.state.isComplete){
      clearInterval(this.state.backgroundId)
      this.props.removeOperation(this.props.data.opid)
    }
    else if (this.state.failed){
      clearInterval(this.state.backgroundId)
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
          const errMessage = resp[0].error.message
          this.setState({
            failed: true,
            errMessage: errMessage
          })
        }
      } catch(err){
        alert(err)
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
    const ErrorSendingIcon = (
      <IconButton touch={true} tooltip={'Error: ' + this.state.errMessage + ' tap to retry'} tooltipPosition='bottom-left' >
        <ErrorIconAsset color={red500}/>
      </IconButton>
    )      
    return (
      <ListItem
          rightIcon={
            this.state.isComplete ?
            VerifiedMessageIcon :
            this.state.failed ?
            ErrorSendingIcon :
            <div><CircularProgress size={15}/></div>
          }
          onClick={
            () => {
              this.state.failed ?
              this.resendMessage() : 
              null
            }
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
      isVerified: true, // is the message verified by the `verifymessage`?
      hasAttempted: false, // have we tried to convert it into a zenmsg obj and verify it?
      from: '', // Who is the message from (nickname || address)
      message: '', // what does hte message contain
      address: '', // Who is the message from (address always)
    }

    this.getMessageInfo = this.getMessageInfo.bind(this)
  }

  shouldComponentUpdate(nextProps, nextState){  
    // Only re-render valid messages
    if (nextState.isValid){
      // For the valid messages
      // only rerender if there is a change

      // Nickname update (need to modularize)
      var addrDisplay = nextProps.nicknames[nextState.address] || nextState.from
      if (addrDisplay === nextProps.userSettings.address){        
        addrDisplay = nextProps.userSettings.nickname        
      }      

      const sameIsVerified = this.state.isVerified === nextState.isVerified      
      const sameFrom = this.state.from === addrDisplay
      const sameMessage = this.state.message === nextState.message
      const sameAddress = this.state.address === nextState.addresss

      if (sameIsVerified && sameFrom && sameMessage && sameAddress){
        return false
      }      
      
      // If they're different then render them
      return true
    }

    return false
  }

  componentDidMount(){    
    this.getMessageInfo(this.props)   
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

  // Converts memo into a zenmsg object
  getMessageInfo(props){
    var zenmsg, addrDisplay
    
    // ZEN Messaging Protocol v1
    // Need to put this into another file soon
    try {            
      var obj = JSON.parse(hexToString(props.data.memo))
      
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
      addrDisplay = props.nicknames[zenmsg.from] || zenmsg.from

      // Sender address
      if (addrDisplay === props.userSettings.address){        
        addrDisplay = props.userSettings.nickname        
      }            
    } catch (err) {
      this.setState({
        hasAttempted: true
      })
      return
    }

    const host = props.rpcSettings.rpcHost
    const port = props.rpcSettings.rpcPort
    const user = props.rpcSettings.rpcUsername
    const pass = props.rpcSettings.rpcPassword

    // Convert msg to utf, and to hex and to uppercase before signed
    // need to do the same to verify
    const encodedMsg = stringToHex(zenmsg.message).toUpperCase()

    rpcCall(host, port, user, pass).cmd('verifymessage', zenmsg.from, zenmsg.sign, encodedMsg, function(err, resp, headers){      
      if(resp){
        props.addSenderAddress(zenmsg.from)
      }      
      this.setState({
        isValid: true,
        hasAttempted: true,
        isVerified: resp,
        from: addrDisplay,
        message: zenmsg.message,
        address: zenmsg.from      
      })
    }.bind(this))
  }
  
  render () {
    if (this.state.isValid && this.state.hasAttempted) {       
      return (
        <ListItem rightIcon={
            this.state.hasAttempted ?
            (
              this.state.isVerified ?
              VerifiedMessageIcon :
              UnverifiedMessageIcon
            ) :
            <CircularProgress size={16}/>
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
      operations: {}, // operations: { address: [ {opid: '', fromAddress: ''} ] }
    }

    this.addOperation = this.addOperation.bind(this)
    this.updateOperation = this.updateOperation.bind(this)
    this.removeOperation = this.removeOperation.bind(this)
    this.updateContentData = this.updateContentData.bind(this)
    this.getChatNicknames = this.getChatNicknames.bind(this)
    this.setChatNicknames = this.setChatNicknames.bind(this) 

    this.scrollToBottom = this.scrollToBottom.bind(this)
  }  

  scrollToBottom() {    
    this.messagesEnd.scrollIntoView()
  }

  shouldComponentUpdate(nextProps, nextState){    
    if (nextProps.chatContent.address === this.props.chatContent.address){
      
      // Only thing that is of concern if we get the same address
      // twice and need to update are if either one of the
      // userSettings, rpcSettings, chatList, and the contentData, operations, nicknames have changed     
      const sameUserSettings = JSON.stringify(nextProps.userSettings) === JSON.stringify(this.props.userSettings)
      const sameRPCSettings = JSON.stringify(nextProps.rpcSettings) === JSON.stringify(this.props.rpcSettings)
      const sameChatlist = JSON.stringify(nextProps.chatList) === JSON.stringify(this.props.chatList)

      const sameContentData = nextState.contentData.length === this.state.contentData.length
      const sameOperations = JSON.stringify(nextState.operations) === JSON.stringify(this.state.operations)

      const sameNicknames = JSON.stringify(this.getChatNicknames(nextProps)) === JSON.stringify(this.getChatNicknames(this.props))      

      if (sameRPCSettings && sameUserSettings && sameChatlist && sameContentData && sameOperations && sameNicknames){        
        return false
      }
    }

    return true;
  }

  componentDidMount() {
    setInterval(this.updateContentData, 30000) // Updates every 30 seconds
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.chatContent.address !== nextProps.chatContent.address){
      this.setState({
        contentData: []
      })
      this.setChatNicknames(nextProps)      
    }

    else if (JSON.stringify(this.getChatNicknames(this.props)) !== JSON.stringify(this.getChatNicknames(nextProps))) {
      this.setChatNicknames(nextProps)
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Only re-get chatcontent item if
    // the address aren't similar
    if (prevProps.chatContent.address !== this.props.chatContent.address){          
      this.updateContentData(this.props)
    }
    this.scrollToBottom()
  }

  updateContentData(props=this.props) {
    const host = props.rpcSettings.rpcHost
    const port = props.rpcSettings.rpcPort
    const user = props.rpcSettings.rpcUsername
    const pass = props.rpcSettings.rpcPassword
    const timeout = 10000

    const address = props.chatContent.address    

    var received = []

    rpcCallPromise(host, port, user, pass, timeout, ['z_listreceivedbyaddress', address, 0])
    .then(function(received=[]){

      // Get blockhash
      Promise.map(received, function(x, i){
        return rpcCallPromise(host, port, user, pass, timeout, ['gettransaction', x.txid])
        .then(function(txinfo){          
          return Object.assign({}, x, {
            blockhash: txinfo.blockhash
          })
        })
        .catch(function(err){          
          console.log('gettransaction', i, err, x.txinfo)
          return x
        })
      }, {concurrency: 5}).then(function(receivedWithBlockhash){

        // Get block height from blockhash
        Promise.map(receivedWithBlockhash, function(x, i){
          return rpcCallPromise(host, port, user, pass, timeout, ['getblock', x.blockhash])          
          .then(function(blockinfo){      
            return Object.assign({}, x, {              
              blockheight: blockinfo.height
            })
          })
          .catch(function(err){          
            console.log('getblock', i, err, x.txinfo)
            return x
          })
        }, {concurrency: 5})
        .then(function(receivedWithBlockheight){
          const receiveSorted = receivedWithBlockheight.sort((a, b) => a.blockheight - b.blockheight)
          this.setState({
            contentData: receiveSorted
          }, () => setTimeout(this.scrollToBottom, 250))
        }.bind(this))
      }.bind(this))      
    }.bind(this))    
  }

  getChatNicknames(props){
    const chat = props.chatList.filter((x) => x.address === props.chatContent.address)
    var chatNicknames = {}

    if (chat.length > 0){      
      chatNicknames = chat[0].nicknames
    }

    return chatNicknames
  }

  setChatNicknames(props){    
    this.setState({
      chatNicknames: this.getChatNicknames(props)
    })
  }

  addOperation(opObj) {    
    // Copy, don't wannt mutate
    var ops = Object.assign({}, this.state.operations)
    var curOps = ops[this.props.chatContent.address] || []
    ops[this.props.chatContent.address] = curOps.concat(opObj)    

    this.setState({
      operations: ops
    })    
  }

  removeOperation(opid){
    // Copy, don't wannt mutate
    var ops = Object.assign({}, this.state.operations)
    var curOps = ops[this.props.chatContent.address] || []
    ops[this.props.chatContent.address] = curOps.filter((x) => x.opid !== opid)

    this.setState({
      operations: ops
    }) 
  }

  updateOperation(opid, opObj) {
    // Copy, don't wannt mutate
    var ops = Object.assign({}, this.state.operations)
    var curOps = ops[this.props.chatContent.address] || []    
    curOps = curOps.map(function(x){
      if (x.opid === opid){
        return opObj
      }
      return x
    })
    ops[this.props.chatContent.address] = curOps

    this.setState({
      operations: ops
    })
  }

  render () {
    const operations = this.state.operations[this.props.chatContent.address] || []

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
                      nicknames={this.state.chatNicknames}
                    />
                  </div>
                )
              })
            }
            {              
              operations.map((x, i) => {
                return (
                  <div key={i + this.state.contentData.length}>
                    <ChatContentOperationItem
                      data={x}
                      userSettings={this.props.userSettings}
                      rpcSettings={this.props.rpcSettings}
                      addSenderAddress={this.props.addSenderAddress}
                      updateOperation={this.updateOperation}                 
                      removeOperation={this.removeOperation}
                      nicknames={this.state.chatNicknames}
                    />
                  </div>
                )
              })
            }
          </List>
          <div style={{ float:"left", clear: "both" }}
                ref={(el) => { this.messagesEnd = el; }}>
          </div>
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