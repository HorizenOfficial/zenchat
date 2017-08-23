import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'

import {
  setRPCUsername,
  setRPCPassword,
  setRPCHost,
  setRPCPort
} from '../actions/RPCSettings'
import { setUserNickname } from '../actions/UserSettings'

import SettingsIconAsset
  from 'material-ui/svg-icons/action/settings-applications'

class SettingsDialog extends React.Component {
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
      <FlatButton label='Done' primary onClick={this.handleDialogClose} />
    ]

    return (
      <span>
        <IconButton tooltip='Settings' onClick={this.handleDialogOpen}>
          <SettingsIconAsset />
        </IconButton>

        <Dialog
          title='Settings'
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.handleDialogClose}
          autoScrollBodyContent>
          <Grid fluid>
            <Row>
              <Col xs={6}>
                <TextField
                  hintText='Me'
                  floatingLabelText='Nickname'
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={(e) => this.props.setUserNickname(e.target.value)}
                  value={this.props.userSettings.nickname}
                />
                <br />
              </Col>
              <Col xs={6}>
                <TextField
                  hintText='127.0.0.1'
                  floatingLabelText='RPC Host'
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={(e) => this.props.setRPCHost(e.target.value)}
                  value={this.props.rpcSettings.rpcHost}
                />
                <br />
                <TextField
                  hintText='8233'
                  floatingLabelText='RPC Port'
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={(e) => this.props.setRPCPort(e.target.value)}
                  value={this.props.rpcSettings.rpcPort}
                />
                <br />
                <TextField
                  hintText='username'
                  floatingLabelText='RPC Username'
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={(e) => this.props.setRPCUsername(e.target.value)}
                  value={this.props.rpcSettings.rpcUsername}
                />
                <br />
                <TextField
                  hintText='password'
                  type="password"
                  floatingLabelText='RPC Password'
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={(e) => this.props.setRPCPassword(e.target.value)}
                  value={this.props.rpcSettings.rpcPassword}
                />
                <br />
              </Col>
            </Row>
          </Grid>
        </Dialog>
      </span>
    )
  }
}

function mapStateToProps (state) {
  return {
    rpcSettings: state.rpcSettings,
    userSettings: state.userSettings
  }
}

function matchDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      setRPCUsername,
      setRPCPassword,
      setRPCHost,
      setRPCPort,
      setUserNickname
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SettingsDialog)
