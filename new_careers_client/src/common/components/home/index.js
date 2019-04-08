import { connect } from 'react-redux';
import Home from './home';
import { getCurrentUserId } from '../../../api';
import { getAppsForUserId, gotApps } from '../../../apps';

function mapStateToProps(state) {
  const currentUserId = getCurrentUserId(state);
  return {
    currentUserId,
    apps: getAppsForUserId(state, { userId: currentUserId })
  };
}

export default connect(mapStateToProps, { gotApps })(Home);
