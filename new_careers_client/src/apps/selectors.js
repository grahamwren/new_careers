import get from 'lodash/get';

export const getApps = state => get(state, 'apps.data');
export function getAppsForUserId(state, { userId }) {
  const apps = getApps(state);
  return apps && apps.filter(app => app.userId === Number(userId));
}
export function getAppsForJobId(state, { jobId }) {
  const apps = getApps(state);
  return apps && apps.filter(app => app.jobId === Number(jobId));
}
export function getAppForJobIdAndUserId(state, { jobId, userId }) {
  const apps = getApps(state);
  return apps && apps.find(app => app.jobId === Number(jobId) && app.userId === Number(userId));
}
