import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import api from '../../../api';

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;  
`;

const MiniHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
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

const Form = styled.form`
  width: 100%;
  display: flex;
  & > div {
    flex-grow: 2;
  }
`;

const FieldAdapter = Component => props => (
  <FormControl>
    <InputLabel>{props.label}</InputLabel>
    <Component
      {...props}
      input={undefined}
      onChange={props.input.onChange}
      value={props.input.value || ''}
    />
  </FormControl>
);
const AdaptedSelect = FieldAdapter(Select);

const CreateChatForm = reduxForm({ form: 'startChat' })(
  ({ availableUsers, handleSubmit }) => (
    <Form handleSubmit={handleSubmit}>
      <Field
        label="Start New Chat"
        name="roomName"
        component={props => (
          <AdaptedSelect {...props}>
            {availableUsers.map(u => (
              <MenuItem key={u.value} value={u.value}>
                {u.label}
              </MenuItem>
            ))}
          </AdaptedSelect>
        )}
        variant="outlined"
      />
      <Button type="submit">Go</Button>
    </Form>
  )
);

export default class LobbyHeader extends PureComponent {
  componentDidMount() {
    const { availableUsers, gotUsers } = this.props;
    if (!availableUsers) {
      api.getUsers().then(gotUsers);
    }
  }

  createChat({ roomName }) {
    const { gotRoom } = this.props;
    gotRoom({
              id: roomName,
              user: {
                name: `Graham ${roomName}`,
              }
            });
  }

  render() {
    const { toggleChat, availableUsers } = this.props;
    return (
      <Header>
        <MiniHeader>
          <CloseButton onClick={() => toggleChat()}>DISMISS</CloseButton>
        </MiniHeader>
        {availableUsers
         && <CreateChatForm availableUsers={availableUsers} onSubmit={d => this.createChat(d)} />
        }
      </Header>
    );
  }
}
