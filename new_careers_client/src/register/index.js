import { connect } from 'react-redux';
import Register from './register';
import { gotUser } from '../users';
import { loggedIn } from '../api';

export default connect(undefined, { gotUser, loggedIn })(Register);
