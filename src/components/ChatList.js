import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';
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

const styles = {
  smallIcon: {
    width: 24,
    height: 24,
  },
  mediumIcon: {
    width: 32,
    height: 32,
  },
  largeIcon: {
    width: 60,
    height: 60,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  medium: {
    width: 96,
    height: 96,
    padding: 24,
  },
  large: {
    width: 120,
    height: 120,
    padding: 30,
  },
};

class ChatList extends React.Component {
  render() {
    return (
      <div style={{height: '100%', overflowY: 'auto'}}>
        <ListItem disabled={true} style={{padding: '0px'}}>          
          <div style={{textAlign: 'right'}}>            
            <IconButton
              tooltip="new room"
              iconStyle={styles.smallIcon}>              
              <CommunicationChatBubble color={grey400}/>
            </IconButton>
            <IconButton
              tooltip="settings"
              iconStyle={styles.smallIcon}>
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