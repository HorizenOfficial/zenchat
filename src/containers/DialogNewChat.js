import React, { Component } from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import { addNewChat } from '../actions/ChatSettings'

import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import '../assets/scss/main.scss'

class DialogNewChat extends React.Component {
  constructor(props){
    super(props)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.state = {
      dialogOpen: false,
      tempSecretCode: ''
    }
  }

  handleDialogOpen(){
    this.setState({
      dialogOpen: true
    })
  }

  handleDialogClose(){
    this.setState({
      dialogOpen: false
    })
  }

  render() {
    const actions = [
      <FlatButton
        label='Ok'
        primary={true}        
        onClick={() => {this.props.addNewChat(this.state.tempSecretCode); this.handleDialogClose()} }
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
      </span>
    );
  }
}

function mapStateToProps (state) {
  return {
    chatList: state.chatList    
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