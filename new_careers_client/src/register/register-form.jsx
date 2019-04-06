import React from 'react';
import {reduxForm, Field} from 'redux-form';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import {RegisterForm as Form} from './theme';

const TextFieldAdapter = props =>
  <TextField {...props} onChange={props.input.onChange}/>;

const RegisterForm = (props) => (
  <Form onSubmit={props.handleSubmit}>
    <FormLabel>Register</FormLabel>
    <Field
      label="Name"
      name="name"
      component={TextFieldAdapter}
      type="text"
      variant="outlined"
    />
    <Field
      label="Email"
      name="email"
      component={TextFieldAdapter}
      type="email"
      autoComplete="email"
      variant="outlined"
    />
    <Field
      label="Password"
      name="password"
      component={TextFieldAdapter}
      type="password"
      autoComplete="password"
      variant="outlined"
    />
    <Field
      label="Confirm Password"
      name="confirmPassword"
      component={TextFieldAdapter}
      type="password"
      autoComplete="password"
      variant="outlined"
    />
    <Button type="submit">Register</Button>
  </Form>
);

export default reduxForm({form: 'register'})(RegisterForm);