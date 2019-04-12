import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Form } from './theme';
import api from '../../../api';

export default class FileUploadForm extends React.Component {
  handleSubmit() {
    const data = {
      file: this.uploader.files[0],
      fileName: this.fileName.value
    };
    api.uploadFile(data);
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
        <Button type="submit" >Submit</Button>
      </Form>
    );
  }
}

// export default class ({ handleSubmit }) => (
//   <Form onSubmit={handleSubmit}>
//     <FormLabel>Upload File</FormLabel>
//     <UploadComponent />
//     <Button type="submit">Submit Changes</Button>
//   </Form>
// );
