import {connect} from 'react-redux';
import Header from './header';
import {getCurrentUserId} from '../../../api';

const mapStateToProps = state => ({
  currentUserId: getCurrentUserId(state)
});

export default connect(mapStateToProps)(Header);
