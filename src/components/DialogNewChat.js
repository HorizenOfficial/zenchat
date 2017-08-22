import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';

export default class NewChatDialog extends React.Component {
  constructor(props){
    super(props)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.state = {
      dialogOpen: false
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
        onClick={this.handleDialogClose}
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
          <TextField hintText='Chat Code' fullWidth={true}/>          
        </Dialog>
      </span>
    );
  }
}