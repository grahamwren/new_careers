import { connect } from 'react-redux';
import Room from './room';
import { gotMessages, gotMessage } from '../../actions';
import { getMessages } from '../../selectors';
import { getCurrentUserId } from '../../../api';

const mapStateToProps = state => ({
  messages: getMessages(state),
  currentUserId: getCurrentUserId(state)
});

export default connect(mapStateToProps, { gotMessages, gotMessage })(Room);
