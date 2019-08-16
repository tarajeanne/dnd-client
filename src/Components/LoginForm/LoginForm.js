import React from 'react';
import TokenService from '../../services/token-service';
import AuthApiService from '../../services/auth-api-service';
import { Button, Input } from '../../Utils/Utils';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {error: null};
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
      TokenService.saveAuthToken(res.authToken, username.value);
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
          <Input required name="username" id="LoginForm__username" />
        </div>
        <div className="password">
          <label htmlFor="LoginForm__password">Password</label>
          <Input
            required
            name="password"
            type="password"
            id="LoginForm__password"
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    );
  }
}

export default LoginForm;