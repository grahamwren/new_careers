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
  
  & > *:not(:last-child){
    margin-right: 1rem;
    flex-grow: 1;
  }
`;

const FieldAdapter = props => <TextField {...props} onChange={props.input.onChange} />;

const SearchForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      label="Query"
      name="query"
      component={FieldAdapter}
      type="text"
      autoComplete="none"
      variant="outlined"
    />
    <Button type="submit">Search</Button>
  </Form>
);

export default reduxForm({ form: 'jobSearch' })(SearchForm);
