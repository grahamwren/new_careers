import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';
import { reduxForm, Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

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
  min-height: 2rem;
  & > div {
    flex-grow: 2;
  }
`;

const FieldAdapter = props => (
  <TextField
    {...props}
    input={undefined}
    onChange={props.input.onChange}
    value={props.input.value || ''}
  />
);

const SendMessageForm = reduxForm({ form: 'sendMessage' })(
  ({ handleSubmit }) => (
    <Form onSubmit={handleSubmit}>
      <Field
        label="New Message"
        name="message"
        component={FieldAdapter}
        variant="outlined"
      />
      <Button type="submit">Send</Button>
    </Form>
  )
);

export default class RoomFooter extends PureComponent {
  sendMessage({ message }) {
    const { getChannel } = this.props;
    getChannel().then(channel => channel.push('send', message));
  }

  render() {
    return (
      <Footer>
        <SendMessageForm
          onSubmit={data => this.sendMessage(data)}
        />
      </Footer>
    );
  }
}
