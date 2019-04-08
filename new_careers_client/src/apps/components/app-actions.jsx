import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import cap from 'lodash/capitalize';
import { gotApp } from '../actions';
import api from '../../api';

function AppActions({ app, gotApp: gotAppCb }) {
  const getButton = action => (
    <Button
      disabled={action === app.status}
      onClick={() => {
        api.updateAppStatus(app.id, action).then(gotAppCb);
      }}
    >
      {cap(action)}
    </Button>
  );
  return (
    <Fragment>
      {getButton('new')}
      {getButton('interview')}
      {getButton('rejected')}
      {getButton('hired')}
    </Fragment>
  );
}

export default connect(undefined, { gotApp })(AppActions);
