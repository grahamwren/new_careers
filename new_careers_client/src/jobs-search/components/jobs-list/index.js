import { connect } from 'react-redux';
import JobsList from './jobs-list';
import { gotJobSearchResults } from '../../actions';
import { getJobSearchData } from '../../selectors';
import { getCurrentUserId } from '../../../api';
import { getAppsForUserId, gotApps } from '../../../apps';

function mapStateToProps(state) {
  const currentUserId = getCurrentUserId(state);
  return {
    jobs: getJobSearchData(state),
    apps: getAppsForUserId(state, { userId: currentUserId }),
    currentUserId
  };
}

export default connect(mapStateToProps, { gotJobSearchResults, gotApps })(JobsList);
