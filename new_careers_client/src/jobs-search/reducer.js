import { handleActions } from 'redux-actions';
import { gotJobSearchResults, jobDeleted } from './actions';

const translateJobToJS = job => ({
  ...job,
  maps_url: undefined,
  contact_id: undefined,
  mapsUrl: job.maps_url,
  contactId: job.contact_id
});

export default handleActions({
  [gotJobSearchResults]: (state, { payload }) => ({
    ...state,
    data: payload.data && payload.data.map(translateJobToJS)
  }),
  [jobDeleted]: (state, { payload: { id } }) => ({
    ...state,
    data: state.data && state.data.filter(job => job.id !== id)
  })
}, {});
