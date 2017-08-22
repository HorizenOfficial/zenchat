import React, { Component } from 'react';

import { Grid, Row, Col } from 'react-flexbox-grid'
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';

import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

// Setup ZenChat page
export default class StepperSetup extends Component {
  constructor(props){
    super(props)

    this.handleNext = this.handleNext.bind(this)
    this.handlePrev = this.handlePrev.bind(this)

    this.state = {
      finished: false,
      stepIndex: 0,
    }
  }

  handleNext () {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev () {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
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
            />
            <TextField
              hintText="8232"
              floatingLabelText="Port"
              floatingLabelFixed={true}
              fullWidth={true}
            />
            <TextField
              hintText="username"
              floatingLabelText="Username"
              floatingLabelFixed={true}
              fullWidth={true}
            />
            <TextField
              hintText="password"
              floatingLabelText="Password"
              floatingLabelFixed={true}
              fullWidth={true}
            />
          </div>
        );
      case 1:
        return (
          <TextField
            hintText="Leave blank for 'me'"
            floatingLabelText="Your Nickname"
            floatingLabelFixed={true}
            fullWidth={true}
          />
        )
      case 2:
        return (
          <span>ZENChat is syncing with ZEN</span>
        );
      default:
        return 'How did you get here!';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}>   
        <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
          <Stepper activeStep={stepIndex}>
            <Step>
              <StepLabel>RPC Settings</StepLabel>
            </Step>
            <Step>
              <StepLabel>Nickname</StepLabel>
            </Step>
            <Step>
              <StepLabel>Welcome!</StepLabel>
            </Step>
          </Stepper>
          <div style={contentStyle}>
            {finished ? (
              <p>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    this.setState({stepIndex: 0, finished: false});
                  }}
                >
                  Click here
                </a> to reset the example.
              </p>
            ) : (
              <div>
                <p>{this.getStepContent(stepIndex)}</p>
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
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}