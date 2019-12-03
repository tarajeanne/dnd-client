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
        <section className="landing-page-top">
          <div className="landing-page-login">
            {this.state.login && (
              <div className="LoginPage">
                <h3 className="login-header">Login</h3>
                <LoginForm onLoginSuccess={this.handleLoginSuccess} />
                <p className="login-toggle">
                  Login | <span className="login-link" onClick={this.handleClick}>Register</span>
                </p>
              </div>
            )}
            {!this.state.login && (
              <div className="LoginPage">
                <h3 className="login-header">Register</h3>
                <RegistrationForm
                  onRegistrationSuccess={this.handleRegistrationSuccess}
                />
                <p className="login-toggle">
                  <span className="login-link" onClick={this.handleClick}>Login</span> | Register
                </p>
              </div>
            )}
          </div>
          <div className="landing-page-info">
            <h2 className="landing-header">Welcome to the Dungeons and Dragons Character Creator!</h2>
            <p>
              If you're new to Dungeons and Dragons and don't know where to
              start, have no fear! This app will guide you through the most
              difficult and important part of D&D: designing your very own, 100%
              customized, perfectly unique character. Your character is more
              than just a set of stats--it's a person, with a background, with
              values and flaws, that you will grow to love through your
              adventures.
              <p>
            If you just want to try out the app, log in under the credentials:{' '}
            <em className="error">username: <i>testuser</i></em><em className="error">password: <i>testuser</i></em>. Characters
            under this account will be deleted occassionally.
          </p>
            </p>
          </div>
        </section>

        <section className="about-dnd">
          <h3>What is Dungeons and Dragons?</h3>
          <div className="video-section">
            <div className="video-container">
              <iframe
                className="video"
                title="Vox Dungeons and Dragons"
                src="https://www.youtube.com/embed/2PEt5RdNHNw"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
          </div>

          <h3>Or, if you'd rather read about it...</h3>
          <p>
            Dungeons and Dragons is a collective story-telling game you play
            with your friends. First you create a character by selecting a race
            (like elf, dwarf, etc.), a class (like a job: fighter, wizard,
            etc.), basic stats, and background story.
          </p>
          <p>
            Then, you and your friends get together with your DM, or Dungeon
            Master. The Dungeon Master walks you through the story. She'll have
            things planned out, but you can have your character do anything, so
            the DM always needs to be on her toes. As the DM describes the
            setting and scenario, you'll make decisions for your character. Say
            you're in a shop, and you're playing a mischeivious rogue. Though
            you might not generally in real life, you'll want your rogue to try
            and steal. If you roll well, you're that much richer! If you roll
            badly, you might have just caused problems for yourself and your
            party.
          </p>
          <p>
            As you and your party adventure through this land, you'll save
            towns, get in barfights, defeat monsters, solve puzzles, and survive magical caves. Most importantly, you get the chance to strategize and laugh with your friends.
          </p>

          <h3>So what's this app for?</h3>
          <p>
            You know that big nasty rulebook from the Vox video? Don't worry about it. This app will walk you through creating your character stress-free. With simplified descriptions and a straight-forward interface, you'll have a character created in no time. All you need is a Dungeon Master, some dice, and a sense of adventure.
          </p>
          <p>
            Happy character creating!
          </p>
        </section>
      </div>
    );
  }
}
