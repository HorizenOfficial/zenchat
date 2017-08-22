import RoomSettings from '../containers/Rooms'

import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid'

import {List, ListItem} from 'material-ui/List';

import Dialog from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Paper from 'material-ui/Paper';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';

import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import SettingsIconAsset from 'material-ui/svg-icons/action/settings-applications';
import SyncIconAsset from 'material-ui/svg-icons/notification/sync'
import {red500, yellow500, blue500, green500, grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import '../assets/scss/ChatContent.scss'

// Dialog
class NewRoomDialog extends React.Component {
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
          tooltip='new room'
          onClick={this.handleDialogOpen}>              
          <CommunicationChatBubble viewBox='0 0 24 24'/>
        </IconButton>
        <Dialog
          title='New Room'
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
        >          
          <TextField hintText='Room Code' fullWidth={true}/>          
        </Dialog>
      </span>
    );
  }
}

class SettingsDialog extends React.Component {
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
          tooltip='settings'
          onClick={this.handleDialogOpen}>
          <SettingsIconAsset/>
        </IconButton>
        <Dialog
          title='Settings'
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
          autoScrollBodyContent={true}
        >          
          <Grid fluid>
            <Row>
              <Col xs={6}>
                <TextField
                  hintText='Me'
                  floatingLabelText='Nickname'
                  floatingLabelFixed={true}
                  fullWidth={true}
                /><br />
              </Col>
              <Col xs={6}>
                <TextField
                  hintText='127.0.0.1'
                  floatingLabelText='RPC Host'
                  floatingLabelFixed={true}
                  fullWidth={true}
                /><br />
                <TextField
                  hintText='8232'
                  floatingLabelText='RPC Port'
                  floatingLabelFixed={true}
                  fullWidth={true}
                /><br />
                <TextField
                  hintText='username'
                  floatingLabelText='RPC Username'
                  floatingLabelFixed={true}
                  fullWidth={true}
                /><br />
                <TextField
                  hintText='password'
                  floatingLabelText='RPC Password'
                  floatingLabelFixed={true}
                  fullWidth={true}
                /><br />
              </Col>              
            </Row>
          </Grid>      
        </Dialog>
      </span>
    );
  }
}



class ChatList extends React.Component {
  render() {
    return (
      <div style={{height: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
        <Subheader style={{padding: '0px'}}> 
          <div style={{textAlign: 'right'}}>                        
            <NewRoomDialog />
            <SettingsDialog />            
          </div>
        </Subheader>

        <Divider/>

        <List>          
          <ListItem                                    
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
              </p>
            }
            secondaryTextLines={2}
            rightIconButton={<span><RoomSettings/></span>}
          />
          <Divider/>
          <ListItem                                    
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                Wish I could come, but I&apos;m out of town this weekend.
              </p>
            }
            secondaryTextLines={2}
            rightIconButton={<span><RoomSettings/></span>}
          />
          <Divider/>
          <ListItem                        
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>Oui oui</span><br />
                Do you have any Paris recs? Have you ever been?
              </p>
            }
            secondaryTextLines={2}
            rightIconButton={<span><RoomSettings/></span>}
          />
          <Divider />
          <ListItem                                    
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                Do you have any ideas what we can get Heidi for her birthday? How about a pony?
              </p>
            }
            secondaryTextLines={2}
            rightIconButton={<span><RoomSettings/></span>}
          />
          <Divider />
          <ListItem
            secondaryText={
              <p>
                <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                We should eat this: grated squash. Corn and tomatillo tacos.
              </p>
            }
            secondaryTextLines={2}
            rightIconButton={<span><RoomSettings/></span>}
          />           
        </List>                      
    </div>
    );
  }
}

export default ChatList;