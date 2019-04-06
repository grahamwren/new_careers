import React from 'react';
import styled from '@emotion/styled/macro';
import { reduxForm, Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Form = styled.form`
  display: flex;
  width: 100%;
  margin: 1rem 0;
  align-items: center;
  
  & > * {
    margin-right: 1rem;
  }
`;

const FieldAdapter = Component => props => <Component {...props} onChange={props.input.onChange} />;

const SearchForm = props => (
  <Form onSubmit={props.handleSubmit}>
    <Field
      label="Query"
      name="query"
      component={FieldAdapter(TextField)}
      type="text"
      autoComplete="none"
      variant="outlined"
    />
    <Field
      label="Offset"
      name="start"
      component={FieldAdapter(TextField)}
      type="number"
      autoComplete="none"
      variant="outlined"
    />
    <Field
      label="Count"
      name="limit"
      component={FieldAdapter(TextField)}
      type="number"
      autoComplete="none"
      variant="outlined"
    />
    <Button type="submit">Search</Button>
  </Form>
);

export default reduxForm({ form: 'jobSearch' })(SearchForm);
