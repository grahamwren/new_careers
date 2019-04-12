import { baseUrl } from '../../config';

export default {
  uploadFile(data) {
    const formData = new FormData();
    formData.append('file_name', data.fileName);
    formData.append('file', data.file);
    return fetch(`${baseUrl}/files`, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  listMyFiles() {
    return fetch(`${baseUrl}/files`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  listFilesForUser(userId) {
    return fetch(`${baseUrl}/users/${userId}/files`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  updateFile(id, file) {
    return fetch(`${baseUrl}/files/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ file }),
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  getFile(id) {
    return fetch(`${baseUrl}/files/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  deleteFile(id) {
    return fetch(`${baseUrl}/files/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
};
