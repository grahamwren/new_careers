import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;  
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

export default class LobbyHeader extends PureComponent {
  render() {
    const { toggleChat } = this.props;
    return (
      <Header>
        <CloseButton onClick={() => toggleChat()}>DISMISS</CloseButton>
      </Header>
    );
  }
}
