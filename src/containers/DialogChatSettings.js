/*
 * The three dots beside the list of chats
 */

import React, { Component } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { List, ListItem } from 'material-ui/List'
import { grey400, darkBlack, lightBlack, green500 } from 'material-ui/styles/colors'

import Dialog from 'material-ui/Dialog'
import IconButton from 'material-ui/IconButton'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'

import { addNewChat, setChatName, deleteChat } from '../actions/ChatSettings'

import "../assets/scss/main.scss"

const iconButtonElement = (
<IconButton touch={true} tooltip='more' tooltipPosition='bottom-left' >
  <MoreVertIcon color={grey400} />
</IconButton>
)

class ChatSettings extends React.Component {
  constructor (props) {
    super(props)    

    this.state = {
      renameDialogOpen: false,
      deleteDialogOpen: false,
      copyDialogOpen: false,
      snackbarOpen: false,
      tempRoomName: '',
    }

    this.handleRenameDialogOpen = this.handleRenameDialogOpen.bind(this)
    this.handleRenameDialogClose = this.handleRenameDialogClose.bind(this)    

    this.handleCopyDialogOpen = this.handleCopyDialogOpen.bind(this)
    this.handleCopyDialogClose = this.handleCopyDialogClose.bind(this)

    this.handleDeleteDialogOpen = this.handleDeleteDialogOpen.bind(this)
    this.handleDeleteDialogClose = this.handleDeleteDialogClose.bind(this)

    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this)
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
  }

  handleRenameDialogOpen () {
    this.setState({ renameDialogOpen: true })
  }

  handleRenameDialogClose () {
    this.setState({ renameDialogOpen: false })
  }

  handleDeleteDialogOpen () {
    this.setState({ deleteDialogOpen: true })
  }

  handleDeleteDialogClose () {
    this.setState({ deleteDialogOpen: false })
  }

  handleCopyDialogOpen () {
    this.setState({ copyDialogOpen: true })
  }

  handleCopyDialogClose () {
    this.setState({ copyDialogOpen: false })
  }

  handleSnackbarOpen () {
    this.setState({ snackbarOpen: true })
  }

  handleSnackbarClose () {
    this.setState({ snackbarOpen: false })
  }  

  render () {
    const renameActions = [      
      <FlatButton onClick={() => { this.props.setChatName(this.props.address, this.state.tempRoomName); this.handleRenameDialogClose(); }} label='Ok' primary={true}/>,
      <FlatButton label='Cancel' primary={true} onClick={this.handleRenameDialogClose} />
    ]

    const copyActions = [
      <CopyToClipboard
        text={this.props.secretCode}
        onCopy={() => { this.handleCopyDialogClose(); this.handleSnackbarOpen() } } 
      >
        <FlatButton label='Just Give It To Me' primary={true} />
      </CopyToClipboard>,
      <FlatButton label='Cancel' primary={false} onClick={this.handleCopyDialogClose} />
    ]

    const deleteActions = [
      <FlatButton onClick={() => { this.props.deleteChat(this.props.address); this.handleDeleteDialogClose(); }} label='I Understand' primary={true}/>,
      <FlatButton label='Cancel' primary={true} onClick={this.handleDeleteDialogClose} />
    ]

    return (
      <div>
        <Dialog
          title='Rename Chat'
          actions={renameActions}
          modal={false}
          open={this.state.renameDialogOpen}>
          <TextField
            hintText='Operation Eagle Hawk 917'
            floatingLabelText='Chat Name'
            floatingLabelFixed={true}
            fullWidth={true} 
            onChange={(e) => {this.setState({ tempRoomName: e.target.value })}}
            defaultValue={this.props.chatName}
            />
          <br />
        </Dialog>
        <Dialog
          title='WARNING'
          actions={copyActions}
          modal={false}
          open={this.state.copyDialogOpen}>
          <span className="spanAlert">Anyone who has access to the secret code has access to the following address:</span><br/><br/>
          {this.props.address}          
        </Dialog>
        <Dialog
          title='Are you sure you want to delete this chat?'
          actions={deleteActions}
          modal={false}
          open={this.state.deleteDialogOpen}>
          <h3 style={{textAlign: 'center'}}>{this.props.chatName}</h3><br/>
          <span className="spanAlert">If you don't have the secret code to this chat, it'll be lost <strong>forever</strong></span><br/><br/>                    
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message='Secret code copied to clipboard'
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose} />
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onClick={this.handleRenameDialogOpen}> Rename Chat
          </MenuItem>
          <MenuItem onClick={this.handleCopyDialogOpen}> Get Secret Code
          </MenuItem>
          <MenuItem onClick={this.handleDeleteDialogOpen}> Delete Chat
          </MenuItem>
        </IconMenu>
      </div>
    )
  }
}

function mapStateToProps (state) {  
  return {
    chatList: state.chatList    
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      addNewChat,
      setChatName,
      deleteChat
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChatSettings)
