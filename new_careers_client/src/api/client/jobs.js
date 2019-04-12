import qs from 'query-string';
import { baseUrl } from '../../config';

export default {
  createJob(job) {
    const jobData = {
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      salary: job.salary,
      salary_type: job.salary_type || job.salaryType,
      contact_id: job.contact_id || job.contactId
    };
    return fetch(`${baseUrl}/jobs`, {
      method: 'POST',
      body: JSON.stringify({ job: jobData }),
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  getJobs() {
    return fetch(`${baseUrl}/jobs`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  getJob(id) {
    return fetch(`${baseUrl}/jobs/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  updateJob(id, data) {
    const job = {
      title: data.title,
      description: data.description,
      company: data.company,
      location: data.location,
      salary: data.salary,
      salary_type: data.salary_type || data.salaryType,
      contact_id: data.contact_id || data.contactId
    };
    return fetch(`${baseUrl}/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ job }),
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      }
    });
  },
  deleteJob(id) {
    return fetch(`${baseUrl}/jobs/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  searchJobs({
    query, orderBy, orderDir, start, limit
  } = {}) {
    const args = {
      q: query, ob: orderBy, dir: orderDir, start, lim: limit
    };
    return fetch(`${baseUrl}/jobs/search?${qs.stringify(args)}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  },
  applyToJob(id) {
    return fetch(`${baseUrl}/jobs/${id}/apply`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.token}`
      }
    });
  }
};
