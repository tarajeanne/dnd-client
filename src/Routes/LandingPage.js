import React, { Component } from 'react'
import LoginForm from '../Components/LoginForm/LoginForm';
import { Link } from 'react-router-dom';

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {},
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/user'
    history.push(destination)
  }

  render() {
    return (
      <div className='LoginPage'>
        <h2>Login</h2>
        <LoginForm
          onLoginSuccess={this.handleLoginSuccess}
        />
        <p>
          If you just want to try out the app, log in under the credentials username: testuser and password: testuser. Characters under this account will be deleted occassionally. 
        </p>
        <h2>
          No account? Register:
        </h2>
        <Link to="/register">Register</Link>
      </div>
    )
  }
}
