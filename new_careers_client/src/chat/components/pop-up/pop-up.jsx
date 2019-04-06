import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';
import Fab from '@material-ui/core/Fab';
import ChatIcon from '@material-ui/icons/Chat';
import Lobby from '../lobby';
import Room from '../room';

const Container = styled.div`
  position: absolute;
  width: min-content;
  height: min-content;
  bottom: 1rem;
  right: 1rem;
`;

const Card = styled.div`
  padding: 0.5rem;
  width: 15rem;
  height: 20rem;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  background: white;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
  }
`;

const Icon = styled.div`
  margin-bottom: 0.5rem;
`;

export default class PopUp extends PureComponent {
  render() {
    const { roomName, chatOpen, toggleChat } = this.props;

    if (!chatOpen) {
      return (
        <Container>
          <Icon>
            <Fab onClick={() => toggleChat()}>
              <ChatIcon />
            </Fab>
          </Icon>
        </Container>
      );
    }

    if (roomName) {
      return (
        <Container>
          <Card>
            <Room roomName={roomName} />
          </Card>
        </Container>
      );
    }

    return (
      <Container>
        <Card>
          <Lobby />
        </Card>
      </Container>
    );
  }
}
