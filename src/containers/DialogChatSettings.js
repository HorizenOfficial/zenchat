import React, { Component } from 'react'

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

import { addNewChat, setChatName } from '../actions/ChatSettings'

import "../assets/scss/main.scss"

const iconButtonElement = (
<IconButton touch={true} tooltip='more' tooltipPosition='bottom-left'>
  <MoreVertIcon color={grey400} />
</IconButton>
)

class ChatSettings extends React.Component {
  constructor (props) {
    super(props)    

    this.state = {
      renameDialogOpen: false,
      copyDialogOpen: false,
      snackbarOpen: false,
      tempRoomName: '',
    }

    this.handleRenameDialogOpen = this.handleRenameDialogOpen.bind(this)
    this.handleRenameDialogClose = this.handleRenameDialogClose.bind(this)

    this.handleCopyDialogOpen = this.handleCopyDialogOpen.bind(this)
    this.handleCopyDialogClose = this.handleCopyDialogClose.bind(this)

    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this)
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this)
  }

  handleRenameDialogOpen () {
    this.setState({ renameDialogOpen: true })
  }

  handleRenameDialogClose () {
    this.setState({ renameDialogOpen: false })
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
      <FlatButton label='Ok' primary={true}
        onClick={() => { this.props.setChatName(this.props.address, this.state.tempRoomName); this.handleRenameDialogClose(); }}
      />,
      <FlatButton label='Cancel' primary={true} onClick={this.handleRenameDialogClose} />
    ]

    const copyActions = [
      <FlatButton label='I Understand' primary={true} onClick={() => { this.handleCopyDialogClose(); this.handleSnackbarOpen() } } />,
      <FlatButton label='Cancel' primary={false} onClick={this.handleCopyDialogClose} />
    ]

    return (
      <div>
        <Dialog
          title='Set Chat Name'
          actions={renameActions}
          modal={false}
          open={this.state.renameDialogOpen}>
          <TextField
            hintText='Core Devs for Eagle Hawk'
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
          Address: {this.props.address}<br/>
          Amount: 0.01 ZEN
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message='Secret code copied to clipboard'
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose} />
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onClick={this.handleRenameDialogOpen}> Rename Room
          </MenuItem>
          <MenuItem onClick={this.handleCopyDialogOpen}> Get Secret Code
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
      setChatName
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(ChatSettings)
