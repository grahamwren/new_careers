import { handleActions } from 'redux-actions';
import keyBy from 'lodash/keyBy';
import { gotJobSearchResults, jobDeleted, gotJob } from './actions';

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
    data: payload.data && keyBy(payload.data.map(translateJobToJS), 'id')
  }),
  [jobDeleted]: (state, { payload: { id } }) => ({
    ...state,
    data: state.data && {
      ...state.data,
      [id]: undefined
    }
  }),
  [gotJob]: (state, { payload: { data } }) => ({
    ...state,
    data: {
      ...(state.data || {}),
      [data.id]: translateJobToJS(data)
    }
  })
}, {});
