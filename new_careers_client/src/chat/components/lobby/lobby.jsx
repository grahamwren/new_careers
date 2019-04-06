import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';
import api from '../../../api';
import LobbyHeader from '../lobby-header';
import LobbyFooter from '../lobby-footer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Rooms = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: scroll;
`;

const Room = styled.div`
  width: calc(100% - 1.5rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px rgba(0,0,0,0.2) solid;
  border-radius: 0.25rem;
  padding: 0.5rem;
  cursor: pointer;
  &:hover {
    border-color: rgba(255,0,0,0.5);
  }
  &:not(:first-of-type) {
    margin-top: 0.5rem;
  }
`;

export default class Lobby extends PureComponent {
  componentDidMount() {
    this.getRooms();
  }

  getRooms() {
    const { gotRooms } = this.props;
    api.getChannel('room:lobby').then((channel) => {
      channel.push('get_all_chats').receive('ok', ({ data }) => gotRooms(data));
    });
  }

  render() {
    const { rooms = [], currentUserId, enterRoom } = this.props;
    const options = rooms.map(room => ({
      id: room.id,
      user: room.first_user.id === Number(currentUserId) ? room.second_user : room.first_user
    }));
    return (
      <Container>
        <LobbyHeader />
        <Rooms>
          {options.map(op => (
            <Room key={op.id} onClick={() => enterRoom(op.id)}>
              {op.user.name || op.user.email}
            </Room>
          ))}
        </Rooms>
        <LobbyFooter/>
      </Container>
    );
  }
}
