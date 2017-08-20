import { iconStyle } from './Styles';
import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import Drawer from 'material-ui/Drawer';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';

import CheckCircleIconAsset from 'material-ui/svg-icons/action/check-circle';
import InformationIconAsset from 'material-ui/svg-icons/action/info'

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
        <Drawer docked={false} width={200} openSecondary={true} open={this.state.drawerOpen} onRequestChange={this.handleCloseDrawer}>
          <MenuItem onClick={this.handleCloseDrawer}>Menu Item</MenuItem>
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
            <ListItem rightIcon={<CheckCircleIconAsset />}>
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
