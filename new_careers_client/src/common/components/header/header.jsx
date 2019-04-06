import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '../link';
import api from '../../../api';

const NavBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 4rem;
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

  & > * {
    margin-left: 1rem;
  }
`;

// show user in header
const authenticateContent = user => (
  <NavBar>
    <LeftItems>
      <Link to="/jobs">Jobs</Link>
    </LeftItems>
    <RightItems>
      <Link to={`/users/${user.id}`}>
        User: {user.name}
      </Link>
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
  componentDidMount() {
    const { currentUserId, currentUser, gotUser } = this.props;
    if (currentUserId && !currentUser) return api.getUser(currentUserId).then(gotUser);
  }

  render() {
    const { currentUserId, currentUser } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <Link to="/">
            <Typography variant="h6" color="secondary">
              NewCareers
            </Typography>
          </Link>
          {currentUser && authenticateContent(currentUser)}
          {!currentUserId && unauthenticatedContent}
        </Toolbar>
      </AppBar>
    );
  }
}
