import { connect } from 'react-redux';
import Job from './job';
import { getJob, gotJob } from '../../jobs-search';
import { getAppsForJobId, gotApps } from '../../apps';
import { getCurrentUserId } from '../../api';

function mapStateToProps(state, props) {
  const { match: { params: { jobId } } } = props;
  return {
    job: getJob(state, { jobId }),
    apps: getAppsForJobId(state, { jobId }),
    currentUserId: getCurrentUserId(state),
    jobId
  };
}

export default connect(mapStateToProps, { gotJob, gotApps })(Job);
