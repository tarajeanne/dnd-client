import React, { Component } from 'react'
import RegistrationForm from '../Components/RegistrationForm/RegistrationForm'
import {Redirect, Link} from 'react-router-dom';

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
    this.setState({
      redirectTo: '/'
    })
  }

  render() {
    if(this.state.redirectTo) {
      return <Redirect to="/" />
    }
    return (
      <div className="LoginPage">
        <h2>Register</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
         <p>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    )
  }
}
