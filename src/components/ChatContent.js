import React, { Component } from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';


class ChatContent extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>   
        <div style={{flex: 6, overflowY: 'auto', backgroundColor: '#ecf0f1'}}>      
          <List>          
            <ListItem                                    
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                  I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                </p>
              }
              secondaryTextLines={2}
            />          
            <ListItem                                    
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                  Wish I could come, but I&apos;m out of town this weekend.
                </p>
              }
              secondaryTextLines={2}
            />          
            <ListItem                        
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>Oui oui</span><br />
                  Do you have any Paris recs? Have you ever been?
                </p>
              }
              secondaryTextLines={2}
            />          
            <ListItem                                    
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                  Do you have any ideas what we can get Heidi for her birthday? How about a pony?
                </p>
              }
              secondaryTextLines={2}
            />          
            <ListItem
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                  We should eat this: grated squash. Corn and tomatillo tacos.
                </p>
              }
              secondaryTextLines={2}
            />
            <ListItem
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                  We should eat this: grated squash. Corn and tomatillo tacos.
                </p>
              }
              secondaryTextLines={2}
            />
            <ListItem
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                  We should eat this: grated squash. Corn and tomatillo tacos.
                </p>
              }
              secondaryTextLines={2}
            />
            <ListItem
              secondaryText={
                <p>
                  <span style={{color: darkBlack}}>znkz4JE6Y4m8xWoo4ryTnpxwBT5F7vFDgNf</span><br />
                  We should eat this: grated squash. Corn and tomatillo tacos.
                </p>
              }
              secondaryTextLines={2}
            />          
          </List>              
        </div>

        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '95%', height: '65px', paddingLeft: '16px'}}>          
          <TextField hintText="Type a message" fullWidth={true}/>          
        </div>
      </div>
    );
  }
}

export default ChatContent;
