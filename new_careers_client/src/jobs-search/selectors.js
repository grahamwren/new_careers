import get from 'lodash/get';

export const getJobSearchData = state => get(state, 'jobSearch.data');
