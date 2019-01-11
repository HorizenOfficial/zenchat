import React, { Component } from 'react'

import TextField from 'material-ui/TextField'

import { stringToHex, hexToString } from '../utils/messaging'
import rpcCall from '../utils/rpc'

import '../assets/scss/ChatContent.scss'

export default class ChatSender extends Component {
  constructor(props){
    super(props)

    this.handleTextFieldKeyDown = this.handleTextFieldKeyDown.bind(this)
    this.encryptZenMessage = this.encryptZenMessage.bind(this)

    this.state = {
      textMsg: ''
    }
  }

  // ZEN Message protocol v1
  encryptZenMessage(msg, version=1){
    var obj = {
      zenmsg: {
        ver: 1,
        from: this.props.userSettings.address,
        message: msg
      }
    }
    
    const host = this.props.rpcSettings.rpcHost
    const port = this.props.rpcSettings.rpcPort
    const user = this.props.rpcSettings.rpcUsername
    const pass = this.props.rpcSettings.rpcPassword

    const fromAddress = this.props.userSettings.address
    const destinationAddress = this.props.chatContent.address

    // Convert msg to utf, and to hex, and to uppercase
    // before signing it. verifying it is also the same process
    const encodedMsg = stringToHex(msg).toUpperCase()
    
    rpcCall(host, port, user, pass, 10000).cmd('signmessage', fromAddress, encodedMsg, function(err, signed, headers){
      // Set the signed message
      obj.zenmsg.sign = signed

      // Get remaining balance
      // and redirect back to wallet
      rpcCall(host, port, user, pass, 10000).cmd('z_getbalance', fromAddress, function(err, addrBalance, headers){        
        // Get remaining balance and redirect to original address
        const remainingBalance = (((parseFloat(addrBalance) * 100000000) - 1) / 100000000).toPrecision(9)        

        // Convert to hex
        const memo = stringToHex(JSON.stringify(obj))
        const sendData = [{address: destinationAddress, amount: 0.00000001, memo: memo}, {address: fromAddress, amount: remainingBalance}]

        rpcCall(host, port, user, pass, 10000)
          .cmd('z_sendmany', fromAddress, sendData, 1, 0, function(err, resp, header){            
            // Add operation chat item
            this.props.addOperation({opid: resp, fromAddress: fromAddress, message: msg, sendData: sendData})
        }.bind(this))
      }.bind(this))      
    }.bind(this))

    // Set textbox to none
    this.setState({
      textMsg: ''
    })
  }

  handleTextFieldKeyDown(event){
    switch (event.key) {
        case 'Enter':
          this.encryptZenMessage(event.target.value)          
          break
        case 'Escape':
          // etc...
          break
        default: break
    }
  }

  render() {
    return (
      <div className='chatSenderDivStyle'>
        <TextField
          onKeyDown={this.handleTextFieldKeyDown}
          onChange={(e) => this.setState({textMsg: e.target.value})}
          value={this.state.textMsg}
          hintText='Type a message' fullWidth={true}       
        />
      </div>
    )
  }
}
