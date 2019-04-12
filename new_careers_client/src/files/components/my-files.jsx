import React from 'react';
import styled from '@emotion/styled/macro';
import Card from '@material-ui/core/Card';
import FileUploadForm from './files-upload-form';
import UserFiles from './user-files';

const CardContainer = styled.div`
  width: calc(100% - 2rem);
  @media(min-width: 50rem) {
    width: 48rem;
  }
  margin: 1rem 0;
`;

const Container = styled.div`
  display: flex;
  padding: 1rem;
  & > * {
    width: calc(50% - 1rem);
  }
  & > *:not(:last-child) {
    margin-right: 1rem;
  }
`;

export default function MyFiles() {
  return (
    <CardContainer>
      <Card>
        <Container>
          <UserFiles />
          <FileUploadForm />
        </Container>
      </Card>
    </CardContainer>
  );
}
