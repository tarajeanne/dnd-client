import config from '../config';

const TokenService = {
  saveAuthToken(token, username) {
    window.localStorage.setItem('username', username);
    window.localStorage.setItem(process.env.TOKEN_KEY, token);
  },

  getAuthToken() {
    return window.localStorage.getItem(process.env.TOKEN_KEY);
  },

  getUserName() {
    return window.localStorage.getItem('username');
  },

  clearAuthToken() {
    window.localStorage.removeItem(process.env.TOKEN_KEY);
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  makeBasicAuthToken(username, password) {
    return window.btoa(`${username}:${password}`);
  }
}

export default TokenService;