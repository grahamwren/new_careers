import get from 'lodash/get';

export const getJobSearchData = state => get(state, 'jobSearch.data');
export const getJob = (state, { jobId }) => {
  const jobs = get(state, 'jobSearch.data', []);
  return jobs.find(j => j.id === Number(jobId));
};
