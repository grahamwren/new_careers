import { createAction } from 'redux-actions';

export const gotJobSearchResults = createAction('jobSearch/GOT_JOB_SEARCH_RESULTS');
export const gotJob = createAction('jobs/GOT_JOB');
export const jobDeleted = createAction('jobs/JOB_DELETED');
