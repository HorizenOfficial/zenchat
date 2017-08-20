import { iconStyle } from './Styles';
import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
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
import {red500, yellow500, blue500} from 'material-ui/styles/colors';


// Icon buttons
const iconButtonElement = (
  <IconButton
    touch={true}
    tooltip="more"
    tooltipPosition="bottom-left"
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (
  <IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Rename Room</MenuItem>
    <MenuItem>Get Room Code</MenuItem>
  </IconMenu>
);

// Dialog
class SetSettingsDialog extends React.Component {
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
      dialogOpen: true
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Ok"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div>
        <RaisedButton label="Dialog With Date Picker" onClick={this.handleOpen} />
        <Dialog
          title="Dialog With Date Picker"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          Open a Date Picker dialog from within a dialog.          
        </Dialog>
      </div>
    );
  }
}


class ChatList extends React.Component {
  render() {
    return (
      <div style={{height: '100%', overflowY: 'auto', overflowX: 'hidden'}}>
        <ListItem disabled={true} style={{padding: '0px'}}> 
          <div style={{textAlign: 'right'}}>            
            <IconButton
              tooltip="new room"
              iconStyle={iconStyle.smallIcon}>              
              <CommunicationChatBubble color={grey400}/>
            </IconButton>
            <IconButton
              tooltip="settings"
              iconStyle={iconStyle.smallIcon}>
              <SettingsIconAsset color={grey400}/>
            </IconButton>            
          </div>
        </ListItem>

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
            rightIconButton={rightIconMenu}
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
            rightIconButton={rightIconMenu}
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
            rightIconButton={rightIconMenu}
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
            rightIconButton={rightIconMenu}
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
            rightIconButton={rightIconMenu}
          />           
        </List>                      
    </div>
    );
  }
}

export default ChatList;