import React, { PureComponent } from 'react';
import { SubmissionError } from 'redux-form';
import { LoginContainer } from './theme';
import LoginForm from './login-form';
import api from '../api';

export default class Login extends PureComponent {
  loginUser({ email, password }) {
    const { loggedIn, history } = this.props;
    const cb = d => loggedIn(d) && history.push('/');
    api.loginUser(email, password).then(cb, (error) => {
      if (error.status === 401) {
        throw new SubmissionError({
          email: 'Login information is invalid',
          _error: 'Login Failed'
        });
      }
      throw error;
    });
  }

  render() {
    return (
      <LoginContainer>
        <LoginForm onSubmit={data => this.loginUser(data)} />
      </LoginContainer>
    );
  }
}
