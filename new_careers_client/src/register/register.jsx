import React, {PureComponent} from 'react';
import {SubmissionError} from 'redux-form';
import {RegisterContainer} from './theme';
import RegisterForm from './register-form';
import api from '../api';

export default class Register extends PureComponent {
  async registerUser({name, email, password, confirmPassword}) {
    if (password !== confirmPassword) {
      throw new SubmissionError({
        email: 'Passwords do not match',
        _error: 'Register failed'
      })
    }
    try {
      const {data} = await api.createUser({email, password, name})
      this.props.history.push('/');
    } catch (error) {
      if (error.status === 401) {
        throw new SubmissionError({
          email: 'Email already taken',
          _error: 'Register failed'
        });
      }
      throw error.statusText;
    }
  }
  render() {
    return (
      <RegisterContainer>
        <RegisterForm  onSubmit={data => this.registerUser(data)}/>
      </RegisterContainer>
    );
  }
}