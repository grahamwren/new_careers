import React from 'react';
import { connect } from 'react-redux';
import { EditContainer } from './theme';
import JobEditForm from './job-edit-form';
import { gotJob } from '../jobs-search';
import api, {getCurrentUserId} from '../api';

function NewJob({ gotJob: gotJobCb, history, currentUserId }) {
  const createJob = data => api.createJob(data).then(resp => history.push(`/jobs/${resp.data.id}`) && gotJobCb(resp));

  return (
    <EditContainer>
      <JobEditForm
        onSubmit={createJob}
        initialValues={{ contactId: currentUserId }}
        formTitle="Post Job"
        submitTitle="Create"
      />
    </EditContainer>
  );
}

const mapStateToProps = state => ({
  currentUserId: getCurrentUserId(state)
});

export default connect(mapStateToProps, { gotJob })(NewJob);
