import React from 'react';
import { reduxForm, Field } from 'redux-form';

import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { EditForm as Form } from './theme';

const TextFieldAdapter = ({ input, ...props }) => (
  <TextField
    {...props}
    value={input.value}
    onChange={input.onChange}
  />
);

const UserEditForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <FormLabel>Edit User</FormLabel>
    <Field
      label="Email"
      name="email"
      component={TextFieldAdapter}
      type="email"
      disabled
      variant="outlined"
    />
    <Field
      label="Name"
      name="name"
      component={TextFieldAdapter}
      type="text"
      variant="outlined"
    />
    <Field
      label="Cover Letter"
      name="cover_letter"
      component={TextFieldAdapter}
      type="text"
      multiline
      variant="outlined"
      helperText="Cover letter is a Markdown field"
    />
    <Button type="submit">Submit Changes</Button>
  </Form>
);

export default reduxForm({ form: 'user', enableReinitialize: true })(UserEditForm);
