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

const JobEditForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <FormLabel>Edit Job</FormLabel>
    <Field
      label="Title"
      name="title"
      component={TextFieldAdapter}
      type="text"
      variant="outlined"
    />
    <Field
      label="Company"
      name="company"
      component={TextFieldAdapter}
      type="text"
      variant="outlined"
    />
    <Field
      label="Salary"
      name="salary"
      component={TextFieldAdapter}
      type="number"
      variant="outlined"
    />
    <Field
      label="Description"
      name="description"
      component={TextFieldAdapter}
      type="text"
      variant="outlined"
    />
    <Button type="submit">Submit Changes</Button>
  </Form>
);

export default reduxForm({ form: 'job', enableReinitialize: true })(JobEditForm);
