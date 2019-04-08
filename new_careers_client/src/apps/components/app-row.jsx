import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cap from 'lodash/capitalize';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import api from '../../api/client';
import { getJob, gotJob } from '../../jobs-search';

class AppRow extends PureComponent {
  componentDidMount() {
    const { job, app, gotJob: gotJobCb } = this.props;
    if (!job) api.getJob(app.jobId).then(gotJobCb);
  }

  render() {
    const { job, app, history } = this.props;
    return (
      <TableRow
        onClick={() => job && history.push(`/jobs/${job.id}`)}
        style={{ cursor: 'pointer' }}
      >
        <TableCell>{job && job.title}</TableCell>
        <TableCell>{job && job.company}</TableCell>
        <TableCell>{job && job.location}</TableCell>
        <TableCell>{cap(app.status)}</TableCell>
      </TableRow>
    );
  }
}

const mapStateToProps = (state, { app }) => ({
  job: getJob(state, { jobId: app.jobId })
});

export default connect(mapStateToProps, { gotJob })(AppRow);
