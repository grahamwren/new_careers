import { connect } from 'react-redux';
import Login from './login';
import { loggedIn } from '../api';

export default connect(undefined, { loggedIn })(Login);
