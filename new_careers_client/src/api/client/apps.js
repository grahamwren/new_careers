import $ from 'jquery';
import { baseUrl } from '../../config';

export default {
  getApps() {
    return $.ajax(`${baseUrl}/apps`, {
      method: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  },
  getAppsForUser(userId) {
    return $.ajax(`${baseUrl}/users/${userId}/apps`, {
      method: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  },
  getAppsForJob(jobId) {
    return $.ajax(`${baseUrl}/jobs/${jobId}/apps`, {
      method: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  },
  updateAppStatus(id, status) {
    if (['new', 'interview', 'rejected', 'hired'].includes(status)) {
      return $.ajax(`${baseUrl}/apps/${id}`, {
        type: 'PUT',
        data: JSON.stringify({ app: { status } }),
        contentType: 'application/json',
        beforeSend: (xhr) => {
          xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
          xhr.setRequestHeader('Content-Type', 'application/json');
        }
      });
    }
    throw new Error(`Status ${status} was invalid`);
  },
  deleteApp(id) {
    return $.ajax(`${baseUrl}/apps/${id}`, {
      type: 'DELETE',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  }
};
