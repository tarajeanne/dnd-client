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
        <h2>
          No account? Register:
        </h2>
        <Link to="/register">Register</Link>
      </div>
    )
  }
}
