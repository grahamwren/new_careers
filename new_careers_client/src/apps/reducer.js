import { handleActions } from 'redux-actions';
import { gotApp, gotApps } from './actions';

const translateAppToJS = app => ({
  id: app.id,
  status: app.status,
  userId: app.user_id,
  jobId: app.job_id
});

export default handleActions({
  [gotApp]: (state, { payload: { data: app } }) => ({
    ...state,
    data: [
      ...state.data,
      translateAppToJS(app)
    ]
  }),
  [gotApps]: (state, { payload }) => ({
    ...state,
    data: payload.data && payload.data.map(translateAppToJS)
  })
}, {});
