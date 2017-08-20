import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ChatList from './ChatList'
import ChatContent from './ChatContent'

class App extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <Grid fluid style={{padding: '0px', margin: '0px'}}>
          <Row style={{height: '98vh', flexWrap: 'nowrap'}}>
            <Col md={4} style={{borderRight: '1px solid #ddd', padding: '0px'}}>            
              <ChatList/>             
            </Col>
            <Col md={8} style={{padding: '0px'}}>
              <ChatContent/>
            </Col>
          </Row>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
