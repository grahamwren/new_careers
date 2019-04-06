import React, {PureComponent} from 'react';
import {SubmissionError} from 'redux-form';
import {RegisterContainer} from './theme';
import RegisterForm from './register-form';
import api from '../api';

export default class Register extends PureComponent {
  registerUser({name, email, password, confirmPassword}) {
    const { history } = this.props;
    if (password !== confirmPassword) {
      throw new SubmissionError({
        email: 'Passwords do not match',
        _error: 'Register failed'
      })
    }
    const cb = history.push('/');
    api.createUser({email, password, name}).then(cb, (error) => {
      if (error.status === 422) {
        throw new SubmissionError({
          email: 'Email already taken',
          _error: 'Register failed'
        });
      }
      throw error.statusText;
    });
  }

  render() {
    return (
      <RegisterContainer>
        <RegisterForm  onSubmit={data => this.registerUser(data)}/>
      </RegisterContainer>
    );
  }
}