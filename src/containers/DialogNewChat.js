import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import { addNewChat } from '../actions/ChatSettings'

import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import '../assets/scss/main.scss'

import rpcCall from '../utils/rpc'
import { secretCodeToWIFKey } from '../utils/zaddress'

class DialogNewChat extends React.Component {
  constructor(props){
    super(props)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleSyncDialogClose = this.handleSyncDialogClose.bind(this)
    this.handleSyncDialogOpen = this.handleSyncDialogOpen.bind(this)
    this.checkSyncStatus = this.checkSyncStatus.bind(this)    
    this.sendZImportKey = this.sendZImportKey.bind(this)

    this.state = {
      dialogOpen: false,
      dialogSyncOpen: false,
      tempSecretCode: '',
      backgroundTask: ''  // Used to check if the daemon has finished importing key
    }
  }

  handleSyncDialogOpen() {
    this.setState({ dialogSyncOpen: true })
  }

  handleSyncDialogClose() {
    this.setState({ dialogSyncOpen: false })
  }

  // Sends the request to the RPC server to import server
  sendZImportKey() {
    const host = this.props.rpcSettings.rpcHost;
    const port = this.props.rpcSettings.rpcPort;
    const user = this.props.rpcSettings.rpcUsername;
    const pass = this.props.rpcSettings.rpcPassword;

    const secretCode = this.state.tempSecretCode
    const WIFKey = secretCodeToWIFKey(secretCode)

    rpcCall(host, port, user, pass, 10000).cmd('z_importkey', WIFKey, (err, data, header) => {})
  }

  // Checks sync status for the daemon
  checkSyncStatus() {
    const host = this.props.rpcSettings.rpcHost;
    const port = this.props.rpcSettings.rpcPort;
    const user = this.props.rpcSettings.rpcUsername;
    const pass = this.props.rpcSettings.rpcPassword;
    
    rpcCall(host, port, user, pass, 10000).cmd('getinfo', function(err, resp, headers){            
      if (err){                  
      }
      else{
        this.handleSyncDialogClose()
        clearInterval(this.state.backgroundTask)
      }
    }.bind(this))
  }

  handleDialogOpen(){
    this.setState({ dialogOpen: true })
  }

  handleDialogClose(){
    this.setState({ dialogOpen: false })
  }

  render() {
    const actions = [
      <FlatButton
        label='Ok'
        primary={true}        
        onClick={() => {
          this.sendZImportKey();
          this.props.addNewChat(this.state.tempSecretCode);          
          this.handleDialogClose();
          this.handleSyncDialogOpen();
          this.setState({
            backgroundTask: setInterval(this.checkSyncStatus, 10000)
          })
        }}
      />,
      <FlatButton
        label='Cancel'
        primary={true}
        onClick={this.handleDialogClose}
      />
    ];

    return (
      <span>
        <IconButton
          tooltip='New Chat'
          onClick={this.handleDialogOpen}>              
          <CommunicationChatBubble/>
        </IconButton>
        <Dialog
          title='New Chat'
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
        >
          <span className="spanAlert">A weak secret code <strong>will</strong> compromise your room!</span>
          <TextField
            hintText='Secret Code. E.g. red pig beside take two keys on mouse' fullWidth={true}
            onChange={(e) => this.setState({ tempSecretCode: e.target.value })}
            />
        </Dialog>
        <Dialog
          title='Rescanning blockchain...'
          open={this.state.dialogSyncOpen}
        >
          <div style={{textAlign: 'center'}}>
            <CircularProgress size={75}/><br/><br/>
            <span>Rescanning blockchain, dialog will automatically close upon completion. Do NOT close your daemon. Takes ~5 - 10 minutes.</span>
          </div>          
        </Dialog>
      </span>
    );
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
      addNewChat
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(DialogNewChat)