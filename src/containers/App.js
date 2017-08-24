import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ChatApp from '../components/ChatApp'
import StepperSetup from './StepperSetup'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { setRPCUsername, setRPCPassword, setRPCHost, setRPCPort } from '../actions/RPCSettings'
import { setUserNickname, setSendAddress } from '../actions/UserSettings'

import { FOLDER_NAME, FOLDER_LOCATION, CONFIG_FILENAME, CONFIG_FILE_LOCATION } from '../constants/storage'

import fs from 'fs'
import path from 'path'


class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      configured: true
    }

    this.configureZenChat = this.configureZenChat.bind(this)
    this.isZenChatConfigured = this.isZenChatConfigured.bind(this)
  }

  // Check if zen is configured
  isZenChatConfigured() {
    // Make folder if doesn't exist
    if (!fs.existsSync(FOLDER_LOCATION)){
      fs.mkdirSync(FOLDER_LOCATION)
    }    
    
    fs.readFile(CONFIG_FILE_LOCATION, 'utf8', function onRead(err, data){
      // Create file if does'nt exist
      if(err){        
        fs.closeSync(fs.openSync(CONFIG_FILE_LOCATION, 'w'))
        this.setState({
          configured: false
        })
        return
      }

      try{
        const _settings = JSON.parse(data)        

        if (_settings.rpcSettings.rpcHost === '' ||
            _settings.rpcSettings.rpcPort === '' ||
            _settings.rpcSettings.rpcUsername === '' ||
            _settings.rpcSettings.rpcUsername === '' ||
            _settings.userSettings.rpcPassword === '' ||
            _settings.userSettings.address === ''){
              this.setState({
                configured: false
              })
            }
        
        else {
          // Set the settings
          this.props.setRPCHost(_settings.rpcSettings.rpcHost)
          this.props.setRPCPort(_settings.rpcSettings.rpcPort)
          this.props.setRPCUsername(_settings.rpcSettings.rpcUsername)
          this.props.setRPCPassword(_settings.rpcSettings.rpcPassword)
          this.props.setUserNickname(_settings.userSettings.nickname)
          this.props.setSendAddress(_settings.userSettings.address)

          // Set configured
          this.setState({
            configured: true
          })
          return
        }  
      }  catch(err){ alert(err) }   

      this.setState({
        configured: false
      })
    }.bind(this))    
  }

  // Checks if zenchat is configured
  // if it is then reload it
  configureZenChat() {
    const _settings = {
      rpcSettings: this.props.rpcSettings,
      userSettings: this.props.userSettings
    }

    fs.writeFile(CONFIG_FILE_LOCATION, JSON.stringify(_settings, null, 4), 'utf8', function onRead(err, data){
      if (err){
        alert(err);
      }
      else{
        this.setState({
          configured: true
        })
      }
    }.bind(this))    
  }

  // On mount set state
  componentDidMount() {    
    this.isZenChatConfigured()    
  }
  
  render () {    
    return (
      <MuiThemeProvider>
        {
          this.state.configured?
          <ChatApp/> :
          <StepperSetup configureZenChat={this.configureZenChat}/>
        }
      </MuiThemeProvider>
    )
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

export default connect(mapStateToProps, matchDispatchToProps)(App);
