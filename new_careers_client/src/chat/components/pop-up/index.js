import { connect } from 'react-redux';
import PopUp from './pop-up';
import { toggleChat } from '../../actions';
import { getChatOpen, getRoomName } from '../../selectors';

const mapStateToProps = state => ({
  roomName: getRoomName(state),
  chatOpen: getChatOpen(state)
});

export default connect(mapStateToProps, { toggleChat })(PopUp);
