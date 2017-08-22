import { iconStyle } from './Styles';
import RoomSettings from './RoomSettings'
import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';

import CircularProgress from 'material-ui/CircularProgress';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

import CheckCircleIconAsset from 'material-ui/svg-icons/action/check-circle';
import InformationIconAsset from 'material-ui/svg-icons/action/info'
import {grey400, darkBlack, lightBlack, green500} from 'material-ui/styles/colors';

import '../assets/css/ChatContent.scss'

// Styles
// Container
const chatContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%'
}

// ChatContent
const chatAreaStyle = {
  flex: 1,
  overflowY: 'auto',
  backgroundColor: '#ecf0f1'
}

// ChatSending Textbox
const chatSenderDivStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '95%',
  height: '65px',
  paddingLeft: '16px'
}

// Room Title
const roomTitleStyle = {
  paddingLeft: '16px',
  fontFamily: 'Roboto'
}

// Room info div
const roomInfoDivStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  height: '46px'
}

// Components
class NicknameDialog extends React.Component {
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
          title="Set Nickname"
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

class ChatRoomInfo extends React.Component {
  constructor(props) {
    super(props);

    this.handleToggleDrawer = this.handleToggleDrawer.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.state = {
      drawerOpen: false
    }
  }

  handleToggleDrawer(){
    this.setState({drawerOpen: !this.state.drawerOpen});
  }

  handleCloseDrawer(){
    this.setState({drawerOpen: false})
  }

  render() {
    return (
      <div style={roomInfoDivStyle}>
        <span style={roomTitleStyle}>Room Chat Name Here</span>
        <div style={{marginLeft: 'auto'}}>
          <IconButton tooltip="room info" onClick={this.handleToggleDrawer}>
            <InformationIconAsset/>
          </IconButton>          
        </div>
        <Drawer width={425} docked={false} openSecondary={true} open={this.state.drawerOpen} onRequestChange={this.handleCloseDrawer}>          
          <List>
            <ListItem
              primaryText={<span>Room name here @@@@ @@@@ @@@@ @@@@ @@@@ @@@@ @@@@</span>}              
              rightIconButton={<span><RoomSettings/></span>}
            />            
          </List>
          <Subheader>Nicknames</Subheader>
          <List>            
            <NicknameDialog/>
            <NicknameDialog/>
            <NicknameDialog/>                     
          </List>
        </Drawer>
      </div>  
    )
  }
}

class ChatContent extends React.Component {
  render() {
    return (
      <div style={chatContainerStyle}>
        <ChatRoomInfo/>
        <div style={chatAreaStyle}>      
          <List>          
            <ListItem rightIcon={<CheckCircleIconAsset color={green500}/>}>
              <p>
                <span style={{color: darkBlack,  fontSize: '15px'}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                <span style={{color: lightBlack, fontSize: '14px'}}>We should eat this: grated squash. Corn and tomatillo tacos.</span><br />                  
              </p>            
            </ListItem>
            <ListItem rightIcon={<div><CircularProgress size={15}/></div>}>
              <p>
                <span style={{color: darkBlack,  fontSize: '15px'}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                <span style={{color: lightBlack, fontSize: '14px'}}>We should eat this: grated squash. Corn and tomatillo tacos.</span><br />                  
              </p>            
            </ListItem>
            <ListItem rightIcon={<CircularProgress size={15}/>}>
              <p>
                <span style={{color: darkBlack,  fontSize: '15px'}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                <span style={{color: lightBlack, fontSize: '14px'}}>We should eat this: grated squash. Corn and tomatillo tacos.</span><br />                  
              </p>            
            </ListItem>            
            <ListItem rightIcon={<CircularProgress size={15}/>}>
              <p>
                <span style={{color: darkBlack,  fontSize: '15px'}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                <span style={{color: lightBlack, fontSize: '14px'}}>We should eat this: grated squash. Corn and tomatillo tacos.</span><br />                  
              </p>            
            </ListItem>
            <ListItem rightIcon={<CircularProgress size={15}/>}>
              <p>
                <span style={{color: darkBlack,  fontSize: '15px'}}>Me</span><br />
                <span style={{color: lightBlack, fontSize: '14px'}}>We should eat this: grated squash. Corn and tomatillo tacos.</span><br />                  
              </p>            
            </ListItem>
          </List>              
        </div>

        <div style={chatSenderDivStyle}>          
          <TextField hintText="Type a message" fullWidth={true}/>  
        </div>
      </div>
    );
  }
}

export default ChatContent;
