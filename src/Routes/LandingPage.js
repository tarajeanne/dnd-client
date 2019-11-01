import React, { Component } from 'react';
import LoginForm from '../Components/LoginForm/LoginForm';
import { Link } from 'react-router-dom';

export default class LoginPage extends Component {
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

  render() {
    return (
      <div className="LoginPage">
        <h2>Login</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
        <p>
          If you just want to try out the app, log in under the credentials{' '}
          <i>username: testuser</i> and <i>password: testuser</i>. Characters
          under this account will be deleted occassionally.
        </p>
        <p>
          No account? <Link to="/register">Register</Link>
        </p>
      </div>
    );
  }
}
