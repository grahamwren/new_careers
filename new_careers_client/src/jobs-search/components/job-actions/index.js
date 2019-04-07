import { connect } from 'react-redux';
import JobActions from './job-actions';
import { gotApps, gotApp } from '../../../apps';
import { jobDeleted } from '../../actions';

export default connect(undefined, { gotApps, gotApp, jobDeleted })(JobActions);
