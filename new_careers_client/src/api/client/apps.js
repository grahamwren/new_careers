import { baseUrl } from '../../config';

export default {
  getApps() {
    return fetch(`${baseUrl}/apps`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  getAppsForUser(userId) {
    return fetch(`${baseUrl}/users/${userId}/apps`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  getAppsForJob(jobId) {
    return fetch(`${baseUrl}/jobs/${jobId}/apps`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  updateAppStatus(id, status) {
    if (['new', 'interview', 'rejected', 'hired'].includes(status)) {
      return fetch(`${baseUrl}/apps/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ app: { status } }),
        headers: {
          Authorization: `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      });
    }
    throw new Error(`Status ${status} was invalid`);
  },
  deleteApp(id) {
    return fetch(`${baseUrl}/apps/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
};
