import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {
  setRPCUsername,
  setRPCPassword,
  setRPCHost,
  setRPCPort
} from '../actions/RPCSettings'

import { setUserNickname, setSendAddress } from '../actions/UserSettings'

import rpcCall from "../utils/rpc"

import SettingsIconAsset
  from 'material-ui/svg-icons/action/settings-applications'

class SettingsDialog extends React.Component {
  constructor (props) {
    super(props)

    this.handleDialogOpen = this.handleDialogOpen.bind(this)
    this.handleDialogClose = this.handleDialogClose.bind(this)
    this.state = {
      dialogOpen: false,
      addresses: [] 
    }
  }

  // Gets available Z Addresses
  getAvailableAddresses () {
    const host = this.props.rpcSettings.rpcHost
    const port = this.props.rpcSettings.rpcPort
    const user = this.props.rpcSettings.rpcUsername
    const pass = this.props.rpcSettings.rpcPassword
    const timeout = 10000

    // Reset addresses
    this.setState({
      addresses: []
    })
    
    rpcCall(host, port, user, pass, timeout).cmd('getaddressesbyaccount',  '', function(err, resp, headers){
      const newAddresses = this.state.addresses.concat(resp)

      this.setState({
        addresses: newAddresses
      })
    }.bind(this))

    rpcCall(host, port, user, pass, timeout).cmd('z_listaddresses',  function(err, resp, headers){    
      const newAddresses = this.state.addresses.concat(resp)

      this.setState({
        addresses: newAddresses
      })    
    }.bind(this))    
  }

  handleDialogOpen () {
    // Gets addresses b4 opening
    this.getAvailableAddresses ()

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
    const addresses = this.state.addresses

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
                  floatingLabelText='Nickname associated with the address below'
                  floatingLabelFixed={true}
                  fullWidth={true}
                  onChange={(e) => this.props.setUserNickname(e.target.value)}
                  value={this.props.userSettings.nickname}
                />
                <br />
                <SelectField
                  floatingLabelText="Address used to send messages"
                  value={this.props.userSettings.address}
                  onChange={(e, i, v) => this.props.setSendAddress(v)}
                  fullWidth={true}
                >
                  {
                    addresses.map(function(x){                      
                      return (<MenuItem value={x} primaryText={x} fullWidth={true}/>)
                    })
                  }
                </SelectField>
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
      setUserNickname,
      setSendAddress
    },
    dispatch
  )
}

export default connect(mapStateToProps, matchDispatchToProps)(SettingsDialog)
