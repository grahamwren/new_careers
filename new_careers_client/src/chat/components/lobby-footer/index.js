import { connect } from 'react-redux';
import LobbyFooter from './lobby-footer';
import { gotUsers } from '../../../users';
import { enterRoom } from '../../actions';
import { getAvailableUsers } from '../../selectors';

const mapStateToProps = state => ({
  availableUsers: getAvailableUsers(state)
});

export default connect(mapStateToProps, {
  enterRoom, gotUsers
})(LobbyFooter);
