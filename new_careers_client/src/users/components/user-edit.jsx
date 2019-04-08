import React, { PureComponent } from 'react';
import { EditContainer } from './theme';
import UserEditForm from './user-edit-form';
import api from '../../api';

export default class UserEdit extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { user: {} };
  }

  componentDidMount() {
    const { userId } = this.props.match.params;
    api.getUser(userId).then(res => this.setState({ user: res.data }));
  }

  editUser({
    id, name, email, cover_letter
  }) {
    const { history } = this.props;
    const cb = () => history.push(`/users/${id}`);
    const user = {
      name, email, cover_letter
    };
    api.updateUser(id, user).then(cb, (error) => {
      console.log(error);
    });
  }

  render() {
    const { user } = this.state;

    return (
      <EditContainer>
        <UserEditForm onSubmit={data => this.editUser(data)} initialValues={user} />
      </EditContainer>
    );
  }
}
