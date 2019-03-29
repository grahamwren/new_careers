import React, {Fragment} from 'react';
import styled from '@emotion/styled/macro';
import Header from '../components/header';

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default ({children}) => (
  <Fragment>
    <Header/>
    <Container>
      {children}
    </Container>
  </Fragment>
);