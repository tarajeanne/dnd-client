import TokenService from './token-service';
import config from '../config';
const UserApiService = {
  getCharactersForUser() {
    return fetch(`${config.API_ENDPOINT}users/characters`, {
      headers: {
        authorization: `bearer ${TokenService.getAuthToken()}`
      }
    }).then((res) =>
      !res.ok ? res.json().then((e) => Promise.reject(e)) : res.json()
    );
  }
};
export default UserApiService;
