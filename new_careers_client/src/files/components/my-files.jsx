import React from 'react';
import styled from '@emotion/styled/macro';
import Card from '@material-ui/core/Card';
import FileUploadForm from './files-upload-form';
import UserFiles from './user-files';

const CardContainer = styled.div`
  width: calc(100% - 2rem);
  @media(min-width: 60rem) {
    width: 58rem;
  }
  margin: 1rem 0;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  & > * {
    width: calc(100% - 2rem);
  }
  & > *:not(:last-child) {
    margin-bottom: 2rem;
  }

  @media(min-width: 60rem) {
    flex-direction: row;
    & > * {
      width: calc(50% - 1rem);
    }
    & > *:not(:last-child) {
      margin-bottom: 0;
      margin-right: 1rem;
    }
  }
  margin: 1rem 0;
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
