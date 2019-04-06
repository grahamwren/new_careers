import { connect } from 'react-redux';
import Lobby from './lobby';
import {
  gotRooms, gotRoom, toggleChat, enterRoom
} from '../../actions';
import { getRooms } from '../../selectors';
import { getCurrentUserId } from '../../../api';

function mapStateToProps(state) {
  return {
    rooms: getRooms(state),
    currentUserId: getCurrentUserId(state)
  };
}

export default connect(mapStateToProps, {
  gotRoom, gotRooms, toggleChat, enterRoom
})(Lobby);
