import React, { PureComponent } from 'react';
import { SubmissionError } from 'redux-form';
import { RegisterContainer } from './theme';
import RegisterForm from './register-form';
import api from '../api';

export default class Register extends PureComponent {
  registerUser({
    name, email, password, confirmPassword
  }) {
    const { history, loggedIn, gotUser } = this.props;
    if (password !== confirmPassword) {
      throw new SubmissionError({
        email: 'Passwords do not match',
        _error: 'Register failed'
      });
    }
    api.createUser({ email, password, name }).then(
      user => gotUser(user) && api.loginUser(email, password),
      (error) => {
        if (error.status === 422) {
          throw new SubmissionError({
            email: 'Email already taken',
            _error: 'Register failed'
          });
        }
        throw error.statusText;
      }
    ).then(auth => loggedIn(auth) && history.push('/'));
  }

  render() {
    return (
      <RegisterContainer>
        <RegisterForm onSubmit={data => this.registerUser(data)} />
      </RegisterContainer>
    );
  }
}
