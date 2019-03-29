import React, {PureComponent} from 'react';
import {SubmissionError} from 'redux-form';
import {LoginContainer} from './theme';
import LoginForm from './login-form';
import api from '../api';

export default class Login extends PureComponent {
  async loginUser({email, password}) {
    try {
      const {data} = await api.loginUser(email, password);
      this.props.loggedIn(data);
      this.props.history.push('/');
    } catch (error) {
      if (error.status === 401) {
        throw new SubmissionError({
          email: 'Login information is invalid',
          _error: 'Login Failed'
        });
      }
      throw error.statusText;
    }
  }

  render() {


    return (
      <LoginContainer>
        <LoginForm onSubmit={data => this.loginUser(data)}/>
      </LoginContainer>
    );
  }
}