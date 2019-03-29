import React, {PureComponent} from 'react';
import styled from '@emotion/styled/macro';
import Link from '../link';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import api from '../../../api';

const NavBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const LeftItems = styled.div`
  display: inherit;
  align-items: inherit;
  margin-left: 1rem;

  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

const RightItems = styled.div`
  display: inherit;
  align-items: inherit;
  margin-left: auto;

  & > *:not(:first-child) {
    margin-left: 1rem;
  }
`;

// show user in header
const authenticateContent = userId => (
  <NavBar>
    <LeftItems>
      <Link to="/users">Users</Link>
    </LeftItems>
    <RightItems>
      <Link to={`/users/${userId}`}>User: {userId}</Link>
      <Link to="/logout">Logout</Link>
    </RightItems>
  </NavBar>
);

const unauthenticatedContent = (
  <NavBar>
    <RightItems>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </RightItems>
  </NavBar>
);

export default class Header extends PureComponent {

  render() {
    const currentUserId = this.props.currentUserId;
    return (
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" color="secondary">
              NewCareers
            </Typography>
          </Link>
          {currentUserId  && authenticateContent(currentUserId)}
          {!currentUserId && unauthenticatedContent}
        </Toolbar>
      </AppBar>
    );
  }
}