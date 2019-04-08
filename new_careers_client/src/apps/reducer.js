import { handleActions } from 'redux-actions';
import keyBy from 'lodash/keyBy';
import { gotApp, gotApps } from './actions';

const translateAppToJS = app => ({
  id: app.id,
  status: app.status,
  userId: app.user_id,
  jobId: app.job_id
});

export default handleActions({
  [gotApp]: (state, { payload: { data: app } }) => {
    const apps = keyBy(state.data, 'id');
    apps[app.id] = translateAppToJS(app);
    return {
      ...state,
      data: Object.values(apps)
    };
  },
  [gotApps]: (state, { payload }) => ({
    ...state,
    data: payload.data && payload.data.map(translateAppToJS)
  })
}, {});
