import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { setRPCUsername, setRPCPassword, setRPCHost, setRPCPort } from '../actions/RPCSettings'
import { setUserNickname, setSendAddress } from '../actions/UserSettings'

import CheckCircleIconAsset from 'material-ui/svg-icons/action/check-circle'
import ProblemIconAsset from 'material-ui/svg-icons/action/report-problem'
import {red500, green500} from 'material-ui/styles/colors';

import rpcCall from "../utils/rpc"
import "../assets/scss/main.scss"


// Setup ZenChat settings page
class StepperSetup extends Component {
  constructor(props){
    super(props)

    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)
    this.getAvailableAddresses = this.getAvailableAddresses.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleCheckRPCConnection = this.handleCheckRPCConnection.bind(this)

    this.state = {
      finished: false,
      addresses: [],
      selectedAddress: '',
      stepIndex: 0,
      connectionEstablished: false,
      connectionFailed: false
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

  handleCheckRPCConnection () {
    // RPC Call
    const host = this.props.rpcSettings.rpcHost
    const port = this.props.rpcSettings.rpcPort
    const user = this.props.rpcSettings.rpcUsername
    const pass = this.props.rpcSettings.rpcPassword
    const timeout = 10000            
    
    rpcCall(host, port, user, pass, timeout).cmd('getinfo', function(err, resp, headers){        
      if (err){
        this.setState({
          connectionEstablished: false,
          connectionFailed: true
        })
      }
      else{
        this.setState({
          connectionEstablished: true,
          connectionFailed: false
        })
      }
    }.bind(this))
  }

  handleNext () {
    const {stepIndex} = this.state;
    const finished = stepIndex >= 2
    
    // Create a new RPC client and check connection settings
    // Check after first index
    // V stateful I know
    if (stepIndex === 0){
      this.handleCheckRPCConnection()
    }

    if (stepIndex === 1){
      this.getAvailableAddresses()
    }

    // Finished, should change
    // To the ChatApp on click
    if (stepIndex >= 2){
      this.props.configureZenChat()
    }
    
    // Don't let it go beyond finish
    else{
      this.setState({
        stepIndex: stepIndex + 1,      
        finished: finished
      });  
    }      
  };

  handleSelectChange (event, index, value) {
    this.setState({
      selectedAddress: value
    })
    this.props.setSendAddress(value)
  }

  handlePrev () {
    const {stepIndex} = this.state;

    if (stepIndex == 2){
      this.handleCheckRPCConnection()
    }

    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
        connectionEstablished: false,
      });
    }    
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <TextField
              hintText="127.0.0.1"
              floatingLabelText="Host"
              floatingLabelFixed={true}
              fullWidth={true}
              onChange={(e) => this.props.setRPCHost(e.target.value)}
              value={this.props.rpcSettings.rpcHost}
            />
            <TextField
              hintText="8233"
              floatingLabelText="Port"
              floatingLabelFixed={true}
              fullWidth={true}
              onChange={(e) => this.props.setRPCPort(e.target.value)}
              value={this.props.rpcSettings.rpcPort}
            />
            <TextField
              hintText="username"
              floatingLabelText="Username"
              floatingLabelFixed={true}
              fullWidth={true}
              onChange={(e) => this.props.setRPCUsername(e.target.value)}
              value={this.props.rpcSettings.rpcUsername}
            />
            <TextField
              hintText="password"
              type="password"
              floatingLabelText="Password"
              floatingLabelFixed={true}
              fullWidth={true}
              onChange={(e) => this.props.setRPCPassword(e.target.value)}
              value={this.props.rpcSettings.rpcPassword}
            />
          </div>
        );
      case 1:
        return (
          <div style={{width: '100%', margin: 'auto', textAlign: 'center'}}>
            {
              this.state.connectionFailed ?
              (
                <div>
                  <div><ProblemIconAsset color={red500} style={{width: '60', height: '60'}}/></div>                
                  <h2>Connection failed.</h2>
                  <span className="spanFonts">Make sure your daemon is running and double check your settings</span>
                </div>
              )
              :              
              this.state.connectionEstablished ?
              (
                <div>
                  <div><CheckCircleIconAsset color={green500} style={{width: '60', height: '60'}}/></div>                
                  <h2>Connection Established</h2>
                </div>
              )
              :
              (
                <div>
                  <div><CircularProgress size={100} thickness={7} /></div>
                  <h2>Establishing Connection...</h2>
                </div>
              )              
            }
          </div>
        )
      case 2:
        const addresses = this.state.addresses

        return (
          <div>
            <TextField
              hintText="Leave blank for 'me'"
              floatingLabelText="Nickname associated with the address below"
              floatingLabelFixed={true}
              fullWidth={true}
              onChange={(e) => this.props.setUserNickname(e.target.value)}
              value={this.props.userSettings.nickname}
            />
            
            <SelectField
              floatingLabelText="Address used to send messages"
              value={this.state.selectedAddress}
              onChange={this.handleSelectChange}
              fullWidth={true}
            >
              {
                addresses.map(function(x){
                  return (<MenuItem value={x} primaryText={x} fullWidth={true}/>)
                })
              }
            </SelectField>
          </div>
        )
      default:
        return 'How did you get here!';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px', width: '95%'};

    return (      
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>RPC Settings</StepLabel>
          </Step>
          <Step>
            <StepLabel>RPC Connection Test</StepLabel>
          </Step>
          <Step>
            <StepLabel>Nickname and Address</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>            
          <div>{this.getStepContent(stepIndex)}</div>
          <div style={{marginTop: 12}}>
            <FlatButton
              label="Back"
              disabled={stepIndex === 0}
              onClick={this.handlePrev}
              style={{marginRight: 12}}
            />
            <RaisedButton
              label={stepIndex === 2 ? 'Finish' : 'Next'}
              primary={true}
              onClick={this.handleNext}
              disabled={stepIndex === 1 && (!this.state.connectionEstablished)}
            />              
          </div>            
        </div>
      </div>      
    );
  }
}

function mapStateToProps(state){  
  return {
    rpcSettings: state.rpcSettings,
    userSettings: state.userSettings
  }
}

function matchDispatchToProps(dispatch){
  return bindActionCreators({
    setRPCUsername,
    setRPCPassword,
    setRPCHost,
    setRPCPort,
    setUserNickname,
    setSendAddress
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(StepperSetup);