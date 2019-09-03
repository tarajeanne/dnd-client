import jwtDecode from 'jwt-decode';

let _timeoutId;
const _TEN_SECONDS_IN_MS = 10000;

const TokenService = {
  saveAuthToken(token, username) {
    window.sessionStorage.setItem(process.env.TOKEN_KEY, token);
  },

  getAuthToken() {
    return window.sessionStorage.getItem(process.env.TOKEN_KEY);
  },

  clearAuthToken() {
    window.sessionStorage.removeItem(process.env.TOKEN_KEY);
  },

  hasAuthToken() {
    return !!TokenService.getAuthToken();
  },

  makeBasicAuthToken(username, password) {
    return window.btoa(`${username}:${password}`);
  },

  parseJwt(jwt) {
    return jwtDecode(jwt);
  },
  readJwtToken() {
    return TokenService.parseJwt(TokenService.getAuthToken());
  },
  _getMsUntilExpiry(payload) {
    return payload.exp * 1000 - Date.now();
  },
  queueCallbackBeforeExpiry(callback) {
    const msUntilExpiry = TokenService._getMsUntilExpiry(
      TokenService.readJwtToken()
    );

    _timeoutId = setTimeout(callback, msUntilExpiry - _TEN_SECONDS_IN_MS);
  },
  clearCallbackBeforeExpiry() {
    clearTimeout(_timeoutId);
  }
};

export default TokenService;
