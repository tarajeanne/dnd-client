import TokenService from './token-service';
import config from '../config';
const CharacterApiService =  {

  postCharacter(name) {
    return fetch(`${config.API_ENDPOINT}users/characters`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name: name
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getLists(endpoint) {
    return fetch(`${config.API_ENDPOINT}${endpoint}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },

  getCharacter(id) {
    return fetch(`${config.API_ENDPOINT}characters/${id}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },

  updateCharacter(id, endpoint, newData) {
    return fetch(`${config.API_ENDPOINT}characters/${id}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        newData: newData
      })
    }).then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },

  updateBaseStats(id, endpoint, stat, num) {
    return fetch(`${config.API_ENDPOINT}characters/${id}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        stat: stat,
        num: num
      })
    }).then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },

  updateVariableStats(id, endpoint, name, index) {
    return fetch(`${config.API_ENDPOINT}characters/${id}/${endpoint}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name: name,
        index: index
      })
    }).then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
  },

  deleteCharacter(id) {
    return fetch(`${config.API_ENDPOINT}characters/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then((res) =>{
      
      if (!res.ok){
        throw new Error('Something went wrong, please try again.');
      }
      else {
        return res;
      }
      
    })
  }
}
export default CharacterApiService;