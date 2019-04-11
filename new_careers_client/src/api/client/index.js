import mapValues from 'lodash/mapValues';
import { Socket } from 'phoenix';
import userMethods from './users';
import jobMethods from './jobs';
import appMethods from './apps';
import fileMethods from './files';
import applyAspects from './api-aspects';
import { baseUrl } from '../../config';

function Client() {
  this.token = localStorage.getItem('auth-token');
}

Client.prototype = mapValues({
  ...userMethods,
  ...jobMethods,
  ...appMethods,
  ...fileMethods,
  logout() {
    this.token = null;
    localStorage.removeItem('auth-token');
  },
  setToken(token) {
    this.token = token;
    localStorage.setItem('auth-token', token);
  },
  getSocket() {
    if (!(this.socket && this.socket.isConnected())) {
      const socket = new Socket(`${baseUrl}/socket`, {
        params: {
          token: this.token
        }
      });
      socket.connect();
      this.socket = socket;
    }
    return this.socket;
  },
  async getChannel(channelName) {
    if (!(this.channel && this.channel.topic === channelName)) {
      await this.getSocket();
      const channel = this.socket.channel(channelName);
      await new Promise((resolve, reject) => {
        channel.join()
          .receive('ok', () => resolve(channel))
          .receive('error', reject);
      });
      this.channel = channel;
    }
    return this.channel;
  }
}, applyAspects);

export default new Client();
