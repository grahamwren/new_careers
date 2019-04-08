import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { EditForm as Form } from './theme';

import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button'

const TextFieldAdapter = props => <TextField {...props} onChange={props.input.onChange} />;

const JobEditForm = ({ handleSubmit, job }) => (
  <Form onSubmit={handleSubmit}>
    <FormLabel>Edit Job</FormLabel>
    <Field
      label="Title"
      name="title"
      component={TextFieldAdapter}
      type="text"
      variant="outlined"
      defaultValue={job.title}
    />
    <Field
      label="Company"
      name="company"
      component={TextFieldAdapter}
      type="text"
      variant="outlined"
      defaultValue={job.company}
    />
    <Field
      label="Salary"
      name="salary"
      component={TextFieldAdapter}
      type="number"
      variant="outlined"
      defaultValue={job.salary}
    />
    <Field
      label="Description"
      name="description"
      component={TextFieldAdapter}
      type="text"
      variant="outlined"
      defaultValue={job.description}
    />
    <Button type="submit">Submit Changes</Button>
  </Form>
);

export default reduxForm({ form: 'job' })(JobEditForm);