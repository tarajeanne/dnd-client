import React, { Component } from 'react';
import LoginForm from '../Components/LoginForm/LoginForm';
import RegistrationForm from '../Components/RegistrationForm/RegistrationForm';
import { Link } from 'react-router-dom';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    }
  }
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || '/user';
    history.push(destination);
  };
  
  handleClick = () => {
    this.setState( {
      login: !this.state.login
    })
  }

  render() {
    if (this.state.login) {
      return (
        <div className="LoginPage">
          <h2>Login</h2>
          <LoginForm onLoginSuccess={this.handleLoginSuccess} />
          <p>
            If you just want to try out the app, log in under the credentials{' '}
            <i>username: testuser</i> and <i>password: testuser</i>. Characters
            under this account will be deleted occassionally.
          </p>
          <button onClick={this.handleClick}>Register</button>
        </div>
      );
    }
    else 
      return (
        <div className="LoginPage">
        <h2>Register</h2>
        <RegistrationForm
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
        <button onClick={this.handleClick}>Login</button>
      </div>
      )
    }
    
  }

