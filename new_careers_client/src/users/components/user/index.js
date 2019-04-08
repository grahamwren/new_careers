import { connect } from 'react-redux';
import User from './user';
import { getCurrentUserId } from '../../../api';

const mapStateToProps = state => ({
  currentUserId: getCurrentUserId(state)
});

export default connect(mapStateToProps)(User);
