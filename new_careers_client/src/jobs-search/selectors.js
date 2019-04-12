import get from 'lodash/get';

export function getJobSearchData(state) {
  const jobs = get(state, 'jobSearch.data');
  return jobs && Object.values(jobs);
}

export const getJob = (state, { jobId }) => {
  const jobs = getJobSearchData(state) || [];
  return jobs.find(j => j.id === Number(jobId));
};
