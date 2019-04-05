import React from 'react';

const authenticatedHome = _userId => <p>You are logged in.</p>;

const unauthenticatedHome = <p>Login to use the application</p>;

export default ({ currentUserId }) => (currentUserId
  ? authenticatedHome()
  : unauthenticatedHome);
