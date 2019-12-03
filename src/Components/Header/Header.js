import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import TokenService from '../../services/token-service';
import IdleService from '../../services/idle-service';
import './Header.css';

class Header extends React.Component {
  static propTypes = {
    hasAuthToken: PropTypes.bool
  };

  handleLogoutClick = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  };

  renderUserLinks = () => {
    return (
      <ul className="user-links">
        <li className="user-link">
          <NavLink to="/user" activeClassName="active-link">
            Home
          </NavLink>
        </li>
        <li className="user-link">
          <Link onClick={this.handleLogoutClick} to="/">
            Logout
          </Link>
        </li>
      </ul>
    );
  };

  render() {
    return (
      <div className="Header">
        <div className="header-container">
          <header className="hero">
            <h1>DnD Character Creator</h1>
            <p className="sub">for Absolute Beginners</p>
          </header>
          <nav className="user-controls">
            {this.props.hasAuthToken ? this.renderUserLinks() : ''}
          </nav>
        </div>
      </div>
    );
  }
}

export default Header;
