import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cap from 'lodash/capitalize';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import api from '../../api/client';
import AppActions from './app-actions';
import { getJob, gotJob } from '../../jobs-search';
import { getUser, gotUser } from '../../users';

class AppRow extends PureComponent {
  componentDidMount() {
    const {
      job, app, user, gotJob: gotJobCb, gotUser: gotUserCb, showUser
    } = this.props;
    if (!job) api.getJob(app.jobId).then(gotJobCb);
    if (showUser && job && !user) api.getUser(app.userId).then(gotUserCb);
  }

  render() {
    const {
      job, app, user, history, isEdit, showUser
    } = this.props;
    const goSomewhere = () =>
      job && history.push(isEdit ? `/users/${app.userId}` : `/jobs/${job.id}`);
    return (
      <TableRow
        style={{ cursor: 'pointer' }}
      >
        {showUser && <TableCell onClick={goSomewhere}>{user && (user.name || user.email)}</TableCell>}
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
  job: getJob(state, { jobId: app.jobId }),
  user: getUser(state, { userId: app.userId })
});

export default connect(mapStateToProps, { gotJob, gotUser })(AppRow);
