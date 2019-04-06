import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';
import api from '../../../api';
import RoomHeader from '../room-header';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Message = styled.div`
  position: relative;
  width: max-content;
  border: 1px rgba(0,0,0,0.2) solid;
  border-radius: 0.25rem;
  padding: 0.5rem;
  ${({ isMe }) => (isMe ? `
  background: rgba(0,0,255,0.5);
  color: white;
  align-self: flex-end;
  ` : `
  background: white;
  color: inherit;
  `)}
  &:not(:first-of-type) {
    margin-top: 1rem;
  }
`;

const MessageTitle = styled.div`
  position: absolute;
  top: -0.7rem;
  font-size: 0.25rem;
  color: black;
  ${({ isMe }) => (isMe ? `
  right: 0.1rem;
  ` : `
  left: 0.1rem;
  `)}
`;

export default class Room extends PureComponent {
  componentDidMount() {
    this.getChat();
  }

  getChat() {
    const { roomName, gotMessages } = this.props;
    api.getChannel(`room:${roomName}`).then((channel) => {
      channel.push('get_chat').receive('ok', ({ messages }) => gotMessages(messages));
    });
  }

  render() {
    const { messages = [], currentUserId } = this.props;
    const options = messages.map(message => ({
      id: message.id,
      userId: message.from.id,
      name: message.from.name || message.from.email,
      content: message.message
    }));
    return (
      <Container>
        <RoomHeader />
        {options.map(m => (
          <Message key={m.id} isMe={m.userId === Number(currentUserId)}>
            <MessageTitle isMe={m.userId === Number(currentUserId)}>
              {m.userId === Number(currentUserId) ? 'You' : m.name}
            </MessageTitle>
            {m.content}
          </Message>
        ))}
      </Container>
    );
  }
}
