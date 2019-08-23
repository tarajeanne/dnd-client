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
      password: password.value,
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
      <form className="RegistrationForm" onSubmit={this.handleSubmit}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="username">
          <label htmlFor="RegistrationForm__username">
            Username:
          </label>
          <input
            name="username"
            type="text"
            required
            id="RegistrationForm__username"
          />
        </div>
        <div className="password">
          <label htmlFor="RegistrationForm__password">
            Password:
          </label>
          <input
            name="password"
            type="password"
            required
            id="RegistrationForm__password"
          />
        </div>
        <button type="submit">Register</button>
      </form>
    );
  }
}

export default RegistrationForm;
