import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';
import api from '../../../api';
import AppList from '../../../apps/components/app-list';

const Container = styled.div`
  width: 80%;
`;

export default class Home extends PureComponent {
  componentDidMount() {
    const { currentUserId, gotApps } = this.props;
    if (currentUserId) api.getAppsForUser(currentUserId).then(gotApps);
  }

  render() {
    const { apps, history, currentUserId } = this.props;
    if (!currentUserId) {
      return <p>Login to use this application.</p>;
    }

    return (
      <Container>
        <h6>Your Current Applications</h6>
        <AppList apps={apps} history={history} />
      </Container>
    );
  }
}
