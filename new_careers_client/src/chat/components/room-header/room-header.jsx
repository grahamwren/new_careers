import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;  
`;

const CloseButton = styled.div`
  cursor: pointer;
  font-size: 0.5rem;
  padding: 0.25rem;
  border-radius: 0.25rem;
  &:hover {
    background: rgba(0,0,0,0.2);
  }
`;

export default class RoomHeader extends PureComponent {
  render() {
    const { exitRoom } = this.props;
    return (
      <Header>
        <CloseButton onClick={() => exitRoom()}>{'<'}BACK</CloseButton>
      </Header>
    );
  }
}
