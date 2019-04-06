import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';

const Header = styled.div`
  display: flex;
  justify-content: space-between; 
  font-size: 1rem;
  margin-bottom: 0.5rem;
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
        Your Conversations
        <CloseButton onClick={() => toggleChat()}>DISMISS</CloseButton>
      </Header>
    );
  }
}
