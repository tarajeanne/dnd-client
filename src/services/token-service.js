import config from '../config';

const TokenService = {
  saveAuthToken(token, username) {
    window.localStorage.setItem('username', username);
    window.localStorage.setItem(config.TOKEN_KEY, token);
  },

  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY);
  },

  getUserName() {
    return window.localStorage.getItem('username');
  },

  clearAuthToken() {
    window.localStorage.removeItem(config.TOKEN_KEY);
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  makeBasicAuthToken(username, password) {
    return window.btoa(`${username}:${password}`);
  }
}

export default TokenService;