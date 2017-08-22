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
        label="Ok"
        primary={true}        
        onClick={this.handleDialogClose}
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
          primaryText={<span>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span>}
          secondaryText="Potatoes are nice"
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
            floatingLabelText="znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf"
            floatingLabelFixed={true}
            fullWidth={true}
          /><br />      
        </Dialog>        
      </span>
    );
  }
}