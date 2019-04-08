import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cap from 'lodash/capitalize';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import api from '../../api/client';
import AppActions from './app-actions';
import { getJob, gotJob } from '../../jobs-search';

class AppRow extends PureComponent {
  componentDidMount() {
    const { job, app, gotJob: gotJobCb } = this.props;
    if (!job) api.getJob(app.jobId).then(gotJobCb);
  }

  render() {
    const {
      job, app, history, isEdit
    } = this.props;
    const goSomewhere = () =>
      job && history.push(isEdit ? `/users/${app.userId}` : `/jobs/${job.id}`);
    return (
      <TableRow
        style={{ cursor: 'pointer' }}
      >
        <TableCell onClick={goSomewhere}>{job && job.title}</TableCell>
        <TableCell onClick={goSomewhere}>{job && job.company}</TableCell>
        <TableCell onClick={goSomewhere}>{job && job.location}</TableCell>
        <TableCell onClick={goSomewhere}>{cap(app.status)}</TableCell>
        {isEdit && <TableCell><AppActions app={app} /></TableCell>}
      </TableRow>
    );
  }
}

const mapStateToProps = (state, { app }) => ({
  job: getJob(state, { jobId: app.jobId })
});

export default connect(mapStateToProps, { gotJob })(AppRow);
