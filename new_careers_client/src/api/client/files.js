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
  }
};
