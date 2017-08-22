import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'

import SettingsIconAsset from 'material-ui/svg-icons/action/settings-applications'

export default class SettingsDialog extends React.Component {
  constructor (props) {
    super(props)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.state = {
      dialogOpen: false
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

  render () {
    const actions = [
      <FlatButton label='Ok' primary={true} onClick={this.handleDialogClose} />,
      <FlatButton label='Cancel' primary={true} onClick={this.handleDialogClose} />
    ]

    return (
      <span><IconButton tooltip='settings' onClick={this.handleDialogOpen}> <SettingsIconAsset/> </IconButton> <Dialog
                                                                                                              title='Settings'
                                                                                                              actions={actions}
                                                                                                              modal={false}
                                                                                                              open={this.state.dialogOpen}
                                                                                                              onRequestClose={this.handleDialogClose}
                                                                                                              autoScrollBodyContent={true} > <Grid fluid> <Row> <Col xs={6}> <TextField
                                                                                                                                                                                                                                                                                                                                                           hintText='Me'
                                                                                                                                                                                                                                                                                                                                                           floatingLabelText='Nickname'
                                                                                                                                                                                                                                                                                                                                                           floatingLabelFixed={true}
                                                                                                                                                                                                                                                                                                                                                           fullWidth={true} /><br /> </Col> <Col xs={6}> <TextField
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      hintText='127.0.0.1'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      floatingLabelText='RPC Host'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      floatingLabelFixed={true}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      fullWidth={true} /><br /> <TextField
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     hintText='8232'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     floatingLabelText='RPC Port'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     floatingLabelFixed={true}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     fullWidth={true} /><br /> <TextField
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               hintText='username'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               floatingLabelText='RPC Username'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               floatingLabelFixed={true}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               fullWidth={true} /><br /> <TextField
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 hintText='password'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 floatingLabelText='RPC Password'
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 floatingLabelFixed={true}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 fullWidth={true} /><br /> </Col> </Row> </Grid> </Dialog></span>
    )
  }
}
