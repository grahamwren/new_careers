import $ from 'jquery';
import { baseUrl } from '../../config';

export default {
  createUser(user) {
    user = {
      email: user.email,
      password: user.password,
      name: user.name
    };
    return $.ajax(`${baseUrl}/users`, {
      method: 'POST',
      data: JSON.stringify({ user }),
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    });
  },
  loginUser(email, password) {
    return $.ajax(`${baseUrl}/login`, {
      method: 'POST',
      data: JSON.stringify({ email, password }),
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    }).then((resp) => {
      // Set token on client
      if (resp.data && resp.data.token) {
        this.setToken(resp.data.token);
      }
      // Sanitize token from resp
      return {
        ...resp,
        data: { ...resp.data, token: undefined }
      };
    });
  },
  getUsers() {
    return $.ajax(`${baseUrl}/users`, {
      method: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  },
  getUser(id) {
    return $.ajax(`${baseUrl}/users/${id}`, {
      method: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  },
  updateUser(id, data) {
    const user = {
      email: data.email,
      password: data.password,
      name: data.name
    };
    return $.ajax(`${baseUrl}/users/${id}`, {
      type: 'PUT',
      data: JSON.stringify({ user }),
      contentType: 'application/json',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    });
  },
  deleteUser(id) {
    return $.ajax(`${baseUrl}/users/${id}`, {
      type: 'DELETE',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  }
};
