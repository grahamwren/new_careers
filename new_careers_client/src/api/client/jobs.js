import $ from 'jquery';
import qs from 'query-string';
import { baseUrl } from '../../config';

export default {
  createJob(job) {
    job = {
      title: job.title,
      description: job.description,
      company: job.company,
      location: job.location,
      salary: job.salary,
      salary_type: job.salaryType,
      contact_id: job.contactId
    };
    return $.ajax(`${baseUrl}/jobs`, {
      method: 'POST',
      data: JSON.stringify({ job }),
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    });
  },
  getJobs() {
    return $.ajax(`${baseUrl}/jobs`, {
      method: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  },
  getJob(id) {
    return $.ajax(`${baseUrl}/jobs/${id}`, {
      method: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
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
    return $.ajax(`${baseUrl}/jobs/${id}`, {
      type: 'PUT',
      data: JSON.stringify({ job }),
      contentType: 'application/json',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
    });
  },
  deleteJob(id) {
    return $.ajax(`${baseUrl}/jobs/${id}`, {
      type: 'DELETE',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  },
  searchJobs({
    query, orderBy, orderDir, start, limit
  } = {}) {
    const args = {
      q: query, ob: orderBy, dir: orderDir, start, lim: limit
    };
    return $.ajax(`${baseUrl}/jobs/search?${qs.stringify(args)}`, {
      type: 'GET',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  },
  applyToJob(id) {
    return $.ajax(`${baseUrl}/jobs/${id}/apply`, {
      type: 'POST',
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Authorization', `Bearer ${this.token}`);
      }
    });
  }
};
