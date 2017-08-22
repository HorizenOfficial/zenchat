import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ChatList from './ChatList'
import ChatContent from './ChatContent'

// Import scss as last file otherwise it won't work
import '../assets/scss/App.scss'

// Application
class App extends React.Component {
  render () {    
    return (
      <MuiThemeProvider>
        <Grid fluid className="zeroPaddingMargin">
          <Row className="rowZeroPaddingNoWrap">
            <Col xs={4} className="colBorderRight">
            <ChatList/>
            </Col>
            <Col xs={8} className="zeroPadding">
            <ChatContent/>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default App
