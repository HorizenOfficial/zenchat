import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { handleDialogOpen, handleDialogClose } from '../actions/Rooms'

import { iconStyle } from '../components/Styles';

import {List, ListItem} from 'material-ui/List';
import Dialog from 'material-ui/Dialog';
import {grey400, darkBlack, lightBlack, green500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';


const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
  <MoreVertIcon color={grey400} />
  </IconButton>
);

class RoomSettings extends React.Component {
  render (){
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}        
        onClick={this.props.handleDialogClose}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.handleDialogClose}
      />
    ];
    console.log(this.props.dialogOpen)
    return (
      <div>
        <Dialog
          title="Set Room Name"
          actions={actions}
          modal={false}
          open={this.props.dialogOpen}          
        >          
          <TextField
            hintText="Core Devs for Eagle Hawk"
            floatingLabelText="Room Name"
            floatingLabelFixed={true}
            fullWidth={true}
          /><br />      
        </Dialog>
        <Snackbar
          open={false}
          message="Room code copied to clipboard"
          autoHideDuration={4000}
          // onRequestClose={this.handleSnackbarClose}
        />
        <IconMenu iconButtonElement={iconButtonElement}>     
          <MenuItem onClick={this.props.handleDialogOpen}>Rename Room</MenuItem>
          <MenuItem>Get Room Code</MenuItem>
        </IconMenu>
      </div>
    )
  }
}


function mapStateToProps(state){  
  return {
    dialogOpen: state.potatoes
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    handleDialogOpen,
    handleDialogClose
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(RoomSettings);