import mapValues from 'lodash/mapValues';
import userMethods from './users';
import jobMethods from './jobs';
import appMethods from './apps';
import applyAspects from './api-aspects';

function Client() {
  this.token = localStorage.getItem('auth-token');
}

Client.prototype = mapValues({
  ...userMethods,
  ...jobMethods,
  ...appMethods,
  logout() {
    this.token = null;
    localStorage.removeItem('auth-token');
  },
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth-token', token);
  }
}, applyAspects);

export default new Client();
