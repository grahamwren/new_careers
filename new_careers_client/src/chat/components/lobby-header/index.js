import { connect } from 'react-redux';
import LobbyHeader from './lobby-header';
import { toggleChat } from '../../actions';


export default connect(undefined, {toggleChat})(LobbyHeader);
