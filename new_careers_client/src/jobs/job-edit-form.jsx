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

const JobEditForm = ({ handleSubmit, formTitle, submitTitle }) => (
  <Form onSubmit={handleSubmit}>
    <FormLabel>{formTitle || 'Edit Job'}</FormLabel>
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
      label="Location"
      name="location"
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
      label="Salary Type"
      name="salary_type"
      component={TextFieldAdapter}
      type="text"
      variant="outlined"
    />
    <Field
      label="Description"
      name="description"
      component={TextFieldAdapter}
      type="text"
      multiline
      variant="outlined"
      helperText="Description is a Markdown field"
    />
    <Button type="submit">{submitTitle || 'Submit Changes'}</Button>
  </Form>
);

export default reduxForm({ form: 'job', enableReinitialize: true })(JobEditForm);
