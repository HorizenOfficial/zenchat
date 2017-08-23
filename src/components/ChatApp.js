import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

import ChatList from '../containers/ChatList'
import ChatContent from '../containers/ChatContent'

// Import scss as last file otherwise it won't work
import '../assets/scss/ChatApp.scss'

// Application
export default class ChatApp extends React.Component {
  render () {
    return (      
      <Grid fluid className='zeroPaddingMargin'>
        <Row className='rowZeroPaddingNoWrap'>
          <Col xs={3} className='colBorderRight'><ChatList/></Col>
          <Col xs={9} className='zeroPadding'><ChatContent/></Col>
        </Row>
      </Grid>      
    )
  }
}
