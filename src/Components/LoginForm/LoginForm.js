import React from 'react';
import AuthApiService from '../../services/auth-api-service';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null};
  }

  static propTypes = {
    onLoginSuccess: PropTypes.func
  }

  static defaultProps = {
    onLoginSuccess: () => {}
  };

  handleSubmitJwtAuth = (e) => {
    e.preventDefault();
    this.setState({ error: null })
    const { username, password } = e.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
    .then(res => {
      password.value = '';
      username.value = '';
      this.props.onLoginSuccess();

    })
    .catch(res => {
      this.setState({ erro :res.error })
    });
  };

  render() {
    const { error } = this.state;
    return (
      <form className="LoginForm" onSubmit={this.handleSubmitJwtAuth}>
        <div role="alert">{error && <p className="red">{error}</p>}</div>
        <div className="username">
          <label htmlFor="LoginForm__username">User name</label>
          <input required name="username" id="LoginForm__username" />
        </div>
        <div className="password">
          <label htmlFor="LoginForm__password">Password</label>
          <input
            required
            name="password"
            type="password"
            id="LoginForm__password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
    );
  }
}

export default LoginForm;