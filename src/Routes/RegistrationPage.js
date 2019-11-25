import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

export default class RegistrationPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }
  static defaultProps = {
    history: {
      push: () => {}
    }
  };


  render() {
    if (this.state.redirectTo) {
      return <Redirect to="/" />;
    }
    return (
      <> </>
    );
  }
}
