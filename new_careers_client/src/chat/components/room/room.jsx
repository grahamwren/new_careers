import React, { Component } from 'react';
import styled from '@emotion/styled/macro';
import api from '../../../api';
import RoomHeader from '../room-header';
import RoomFooter from '../room-footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;


const Messages = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
  padding: 0.5rem 0;
  max-height: calc(100% - 3rem);
`;

const Message = styled.div`
  position: relative;
  width: max-content;
  border: 1px rgba(0,0,0,0.2) solid;
  border-radius: 0.25rem;
  padding: 0.5rem;
  max-width: calc(100% - 1.5rem);
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

export default class Room extends Component {
  componentDidMount() {
    const { gotMessage } = this.props;
    this.getChannel().then((channel) => {
      this.getChat(channel);
      channel.on('new_message', m => gotMessage(m) && this.scrollToBottom());
    });
  }

  getChat(channel) {
    const { gotMessages } = this.props;
    channel.push('get_chat').receive('ok', ({ messages }) => gotMessages(messages));
  }

  getChannel() {
    const { roomName } = this.props;
    return api.getChannel(`room:${roomName}`);
  }

  scrollToBottom() {
    this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
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
        <Messages>
          {options.map(m => (
            <Message key={m.id} isMe={m.userId === Number(currentUserId)}>
              <MessageTitle isMe={m.userId === Number(currentUserId)}>
                {m.userId === Number(currentUserId) ? 'You' : m.name}
              </MessageTitle>
              {m.content}
            </Message>
          ))}
          {<div
            id="messages-end"
            ref={(el) => {
              this.messagesEnd = el;
            }}
          />}
        </Messages>
        <RoomFooter getChannel={() => this.getChannel()} />
      </Container>
    );
  }
}
