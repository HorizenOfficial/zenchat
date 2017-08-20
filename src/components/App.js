import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import ChatList from './ChatList'
import ChatContent from './ChatContent'

// Styles
const zeroPaddingMargin = {
  padding: '0px',
  margin: '0px'
}

const rowZeroPaddingNoWrap = {
  height: '100vh',
  flexWrap: 'nowrap'
}

const zeroPadding = {
  padding: '0px'
}

const colBorderRight = {
  borderRight: '1px solid #ddd',
  padding: '0px'
}

// Application
class App extends React.Component {
  render () {
    return (
      <MuiThemeProvider>
        <Grid fluid style={zeroPaddingMargin}>
          <Row style={rowZeroPaddingNoWrap}>
            <Col xs={4} style={colBorderRight}>
            <ChatList/>
            </Col>
            <Col xs={8} style={zeroPadding}>
            <ChatContent/>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default App
