import React from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import './Header.css';

class Header extends React.Component {
  handleLogoutClick = () => {
    TokenService.clearAuthToken();
  };

  renderUserLinks = () => {
    return (
      <div className="user-controls">
        <ul className="user-links">
          <li className="user-link">
            <Link onClick={this.handleLogoutClick} to="/">
              Logout
            </Link>
          </li>
          <li className="user-link">
            <Link to="/user">Home</Link>
          </li>
        </ul>
      </div>
    );
  };

  render() {
    return (
      <>
        {TokenService.hasAuthToken() ? this.renderUserLinks() : <></>}
        <div className="Header">
          <header className="hero">
            <h1>DnD Character Creator</h1>
            <p className="sub">for Absolute Beginners</p>
          </header>
        </div>
      </>
    );
  }
}

export default Header;
