import React, { Component } from 'react';
import LoginForm from '../Components/LoginForm/LoginForm';
import RegistrationForm from '../Components/RegistrationForm/RegistrationForm';
import './LandingPage.css';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
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
    this.setState({
      login: !this.state.login
    });
  };

  render() {
    return (
      <div className="landing-page">
        <div className="landing-page-login">
          {this.state.login && (
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
          )}
          {!this.state.login && (
            <div className="LoginPage">
              <h2>Register</h2>
              <RegistrationForm
                onRegistrationSuccess={this.handleRegistrationSuccess}
              />
              <p className="login-toggle">
                <a onClick={this.handleClick}>Login</a> | Register
              </p>
            </div>
          )}
        </div>
        <div className="landing-page-info">
          <h2>Welcome to the Dungeons and Dragons Character Creator!</h2>
          <p>
            If you're new to Dungeons and Dragons and don't know where to start,
            have no fear! This app will guide you through the most difficult and
            important part of D&D: designing your very own, 100% customized,
            perfectly unique character. Your character is more than just a set
            of stats--it's a person, with a background, with values and flaws,
            that you will grow to love through your adventures.
          </p>
          <h3>What is Dungeons and Dragons?</h3>
          <div className="video-container">
          <iframe className="video" title="Vox Dungeons and Dragons" src="https://www.youtube.com/embed/2PEt5RdNHNw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          
        </div>
      </div>
    );
  }
}
