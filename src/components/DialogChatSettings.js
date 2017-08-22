import React, { Component } from 'react'

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

const iconButtonElement = (
<IconButton touch={true} tooltip='more' tooltipPosition='bottom-left'>
  <MoreVertIcon color={grey400} />
</IconButton>
)

export default class ChatSettings extends React.Component {
  constructor (props) {
    super(props)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.handleSnackbarOpen = this.handleSnackbarOpen.bind(this)
    this.handleSnackbarClose = this.handleSnackbarClose.bind(this)

    this.state = {
      dialogOpen: false,
      snackbarOpen: false
    }
  }

  handleDialogOpen () {
    this.setState({
      dialogOpen: true
    })
  }

  handleDialogClose () {
    this.setState({
      dialogOpen: false
    })
  }

  handleSnackbarOpen () {
    this.setState({
      snackbarOpen: true
    })
  }

  handleSnackbarClose () {
    this.setState({
      snackbarOpen: false
    })
  }

  render () {
    const actions = [
      <FlatButton label='Ok' primary={true} onClick={this.handleDialogClose} />,
      <FlatButton label='Cancel' primary={true} onClick={this.handleDialogClose} />
    ]

    return (
      <div>
        <Dialog
          title='Set Room Name'
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}>
          <TextField
            hintText='Core Devs for Eagle Hawk'
            floatingLabelText='Room Name'
            floatingLabelFixed={true}
            fullWidth={true} />
          <br />
        </Dialog>
        <Snackbar
          open={this.state.snackbarOpen}
          message='Room code copied to clipboard'
          autoHideDuration={4000}
          onRequestClose={this.handleSnackbarClose} />
        <IconMenu iconButtonElement={iconButtonElement}>
          <MenuItem onClick={this.handleDialogOpen}> Rename Room
          </MenuItem>
          <MenuItem onClick={this.handleSnackbarOpen}> Get Room Code
          </MenuItem>
        </IconMenu>
      </div>
    )
  }
}
