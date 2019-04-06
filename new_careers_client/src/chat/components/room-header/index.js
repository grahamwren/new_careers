import { connect } from 'react-redux';
import RoomHeader from './room-header';
import { exitRoom } from '../../actions';

export default connect(undefined, { exitRoom })(RoomHeader);
