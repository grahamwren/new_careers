import { baseUrl } from '../../config';
import HttpError from '../http-error';

export default {
  createUser(jsUser) {
    const user = {
      email: jsUser.email,
      password: jsUser.password,
      name: jsUser.name,
      cover_letter: jsUser.coverLetter
    };
    return fetch(`${baseUrl}/users`, {
      method: 'POST',
      body: JSON.stringify({ user }),
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  loginUser(email, password) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    }).then(async (resp) => {
      if (!resp.ok) throw new HttpError(resp);

      const body = await resp.json();
      // Set token on client
      if (body.data && body.data.token) {
        this.setToken(body.data.token);
      }
      // rebuild resp object for aspect
      return {
        ...body,
        data: { ...body.data, token: undefined }
      };
    });
  },
  getUsers() {
    return fetch(`${baseUrl}/users`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  getUser(id) {
    return fetch(`${baseUrl}/users/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  updateUser(id, data) {
    const user = {
      email: data.email,
      password: data.password,
      name: data.name,
      cover_letter: data.cover_letter || data.coverLetter
    };
    return fetch(`${baseUrl}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ user }),
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  deleteUser(id) {
    return fetch(`${baseUrl}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
};
