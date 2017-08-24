import React, { Component } from 'react';

import { List, ListItem } from 'material-ui/List'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';


// Components
export default class SetNicknameDialog extends React.Component {
  constructor(props){
    super(props)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.state = {
      dialogOpen: false,      
      tempNickname: ''
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
    console.log(this.props.nicknames)
    const nickname = this.props.nicknames === undefined ? '' : (this.props.nicknames[this.props.senderAddress] || '')

    const actions = [
      <FlatButton
        label="Ok"
        primary={true}        
        onClick={() => {          
          this.props.setAddressNickname(this.props.chatAddress, this.props.senderAddress, this.state.tempNickname);
          this.handleDialogClose();
        }}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleDialogClose}
      />
    ];

    return (
      <span>
        <ListItem onClick={this.handleDialogOpen}
          primaryText={<span>{this.props.senderAddress}</span>}
          secondaryText={nickname}
        />
        <Dialog
          title="Set Your Nickname"
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
        >          
          <TextField
            hintText="Nickname"
            floatingLabelText={this.props.senderAddress}
            defaultValue={this.state.tempNickname}
            floatingLabelFixed={true}
            fullWidth={true}
            defaultValue={nickname}
            onChange={(e) => this.setState({tempNickname: e.target.value})}
          /><br />      
        </Dialog>        
      </span>
    );
  }
}