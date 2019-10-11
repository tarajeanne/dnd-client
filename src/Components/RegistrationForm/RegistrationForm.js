import React, { Component } from 'react';
import AuthApiService from '../../services/auth-api-service';
import PropTypes from 'prop-types';

class RegistrationForm extends Component {
  static propTypes = {
    onRegistrationSuccess: PropTypes.func
  };

  static defaultProps = {
    onRegistrationSuccess: () => {}
  };

  state = { error: null };

  handleSubmit = (ev) => {
    ev.preventDefault();
    const { username, password } = ev.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      username: username.value,
      password: password.value
    })
      .then((user) => {
        username.value = '';
        password.value = '';
        this.props.onRegistrationSuccess(user);
      })
      .catch((res) => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="login-input-area">
          <label htmlFor="RegistrationForm__username" className="login-label">Username:</label>
          <input
            className="login-input"
            name="username"
            type="text"
            required
            id="RegistrationForm__username"
          />
        </div>
        <div className="login-input-area">
          <label htmlFor="RegistrationForm__password" className="login-label">Password:</label>
          <input
            className="login-input"
            name="password"
            type="password"
            required
            id="RegistrationForm__password"
          />
        </div>
        <button className="login-submit" type="submit">
          Register
        </button>
      </form>
    );
  }
}

export default RegistrationForm;
