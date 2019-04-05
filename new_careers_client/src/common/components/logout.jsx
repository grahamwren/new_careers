import { Component } from 'react';
import { connect } from 'react-redux';
import { loggedOut } from '../../api';

class Logout extends Component {
  componentDidMount() {
    this.props.loggedOut();
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}
export default connect(undefined, { loggedOut })(Logout);
