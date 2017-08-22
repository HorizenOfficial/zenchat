import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import ChatApp from './ChatApp'
import StepperSetup from './StepperSetup'

import fs from 'fs'

export default class App extends Component {
  constructor(props){
    super(props)

    this.isZenChatConfigured = this.isZenChatConfigured.bind(this)
    this.checkZenChatConfigured = this.checkZenChatConfigured.bind(this)

    this.state = {
      configured: this.isZenChatConfigured()
    }
  }

  // Check for folders etc
  isZenChatConfigured() {
    return false
  }

  // Checks if zenchat is configured
  // if it is then reload it
  checkZenChatConfigured() {
    this.setState({
      configured: this.isZenChatConfigured()
    })
  }
  
  render () {    
    return (
      <MuiThemeProvider>
        {this.state.configured? <ChatApp/> : <StepperSetup/>}
      </MuiThemeProvider>
    )
  }
}
