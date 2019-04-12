import React from 'react';
import styled from '@emotion/styled/macro';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import api from '../../../api';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  
  & > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;

export default class FileUploadForm extends React.Component {
  handleSubmit() {
    const { gotFile } = this.props;
    const data = {
      file: this.uploader.files[0],
      fileName: this.fileName.value
    };
    if (data.file !== undefined && data.fileName !== undefined) {
      api.uploadFile(data)
        .then(gotFile)
        .then(() => {
          this.fileName.value = '';
          this.uploader.value = '';
        });
    } else {
      throw new Error('Missing Require Field');
    }
  }

  render() {
    return (
      <Form onSubmit={e => e.preventDefault() || this.handleSubmit()}>
        <FormLabel>Upload File</FormLabel>
        <TextField
          inputRef={(ref) => {
            this.fileName = ref;
          }}
          label="File Name"
          name="file-name"
          variant="outlined"
        />
        <input
          ref={(ref) => {
            this.uploader = ref;
          }}
          type="file"
        />
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}
