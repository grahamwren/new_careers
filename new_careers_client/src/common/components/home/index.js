import { connect } from 'react-redux';
import Home from './home';
import { getCurrentUserId } from '../../../api';

const mapStateToProps = state => ({
  currentUserId: getCurrentUserId(state)
});

export default connect(mapStateToProps)(Home);
