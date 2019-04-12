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
    }).then(r => r.json());
  },
  listMyFiles() {
    return fetch(`${baseUrl}/files`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(r => r.json());
  },
  getFile(id) {
    return fetch(`${baseUrl}/files/${id}`, {
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(r => r.json());
  },
  deleteFile(id) {
    return fetch(`${baseUrl}/files/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    }).then(r => r.text());
  }
};
