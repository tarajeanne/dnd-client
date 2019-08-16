import React, { Component } from 'react'
import RegistrationForm from '../Components/RegistrationForm/RegistrationForm'
import {Redirect} from 'react-router-dom';

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user => {
    console.log('registration successful!');
    this.setState({
      redirectTo: '/'
    })
  }

  render() {
    console.log('just a console');
    if(this.state.redirectTo) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <h2>Register</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </div>
    )
  }
}
