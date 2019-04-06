import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import api from '../../../api';

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: auto;
  background: white; 
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
  ({ selectOptions: menuItems, handleSubmit }) => (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Go To Chat"
        name="userId"
        component={({ selectOptions, ...props }) => (
          <AdaptedSelect {...props}>
            {selectOptions}
          </AdaptedSelect>
        )}
        selectOptions={menuItems}
        variant="outlined"
      />
      <Button type="submit">Go</Button>
    </Form>
  )
);

export default class LobbyHeader extends PureComponent {
  componentDidMount() {
    const { gotUsers } = this.props;
    api.getUsers().then(gotUsers);
  }

  createChat({ userId }) {
    const { enterRoom } = this.props;
    api.getChannel('room:lobby').then(channel =>
      channel.push('get_chat', { user_id: userId }).receive('ok', chat =>
        enterRoom(chat.id)));
  }

  render() {
    const { availableUsers, currentUserId } = this.props;
    const selectOptions = availableUsers
      .filter(u => u.id !== Number(currentUserId))
      .map(u => (
        <MenuItem key={u.id} value={u.id}>
          {u.name || u.email}
        </MenuItem>
      ));
    return (
      <Footer>
        {availableUsers
         && (
         <CreateChatForm
           selectOptions={selectOptions}
           onSubmit={data => this.createChat(data)}
         />
         )}
      </Footer>
    );
  }
}
