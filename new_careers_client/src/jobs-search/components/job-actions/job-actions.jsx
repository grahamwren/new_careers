import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import api from '../../../api';

export default function JobActions({
  job, app, isEdit, gotApp, history, jobDeleted
}) {
  if (isEdit) {
    return (
      <Fragment>
        <Button onClick={() => history.push(`/jobs/${job.id}/edit`)}>Edit</Button>
        <Button onClick={() => api.deleteJob(job.id).then(() => jobDeleted(job))}>Delete</Button>
      </Fragment>
    );
  }

  const apply = () => api.applyToJob(job.id).then(gotApp);
  return (
    <Fragment>
      <Button disabled={Boolean(app)} onClick={apply}>
        Apply
      </Button>
    </Fragment>
  );
}
