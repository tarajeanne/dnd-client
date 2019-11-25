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


  handleRegistrationSuccess = (user) => {
    this.setState({
      redirectTo: '/'
    });
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
          {/* <p>
            If you just want to try out the app, log in under the credentials{' '}
            <i>username: testuser</i> and <i>password: testuser</i>. Characters
            under this account will be deleted occassionally.
          </p> */}
          <p className="login-toggle">
            Login | <a onClick={this.handleClick}>Register</a>
          </p>
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
           <p className="login-toggle">
           <a onClick={this.handleClick}>Login</a> | Register
          </p>
      </div>
      )
    }
    
  }

