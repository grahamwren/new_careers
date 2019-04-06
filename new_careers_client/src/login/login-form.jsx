import React from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { LoginForm as Form } from './theme';

const TextFieldAdapter = props => <TextField {...props} onChange={props.input.onChange} />;

const LoginForm = props => (
  <Form onSubmit={props.handleSubmit}>
    <FormLabel>Login</FormLabel>
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
    <Button type="submit">Login</Button>
  </Form>
);

export default reduxForm({ form: 'login' })(LoginForm);
