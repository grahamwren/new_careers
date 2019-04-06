import React, { Fragment } from 'react';
import styled from '@emotion/styled/macro';
import Header from '../components/header';
import PopUp from '../../chat/components/pop-up';

const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export default ({ children }) => (
  <Fragment>
    <Header />
    <Container>
      {children}
      <PopUp />
    </Container>
  </Fragment>
);
