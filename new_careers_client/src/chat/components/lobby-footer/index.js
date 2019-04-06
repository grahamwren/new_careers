import { connect } from 'react-redux';
import LobbyFooter from './lobby-footer';
import { getUsers, gotUsers } from '../../../users';
import { enterRoom } from '../../actions';
import { getCurrentUserId } from '../../../api';

const mapStateToProps = state => ({
  availableUsers: Object.values(getUsers(state) || {}),
  currentUserId: getCurrentUserId(state)
});

export default connect(mapStateToProps, {
  enterRoom, gotUsers
})(LobbyFooter);
