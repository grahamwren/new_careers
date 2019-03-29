import mapValues from 'lodash/mapValues'
import userMethods from './users';

function Client() {
  this.token = localStorage.getItem('auth-token');
}

Client.prototype = mapValues({
  ...userMethods,
  logout() {
    this.token = null;
    localStorage.removeItem('auth-token');
  },
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth-token', token);
  }
}, (method, name) => {
  return async function(...a) {
    try {
      return await method.apply(this, a);
    } catch (e) {
      if (e.status === 401 && name !== 'loginUser') {
        window.location = '/logout';
      }
      throw e;
    }
  }
});

export default new Client();