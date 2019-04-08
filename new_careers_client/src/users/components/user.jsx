import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardContainer, CardDetails } from './theme';
import api from '../../api';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentDidMount() {
    const { match: { params: { userId } } } = this.props;
    api.getUser(userId).then(res => this.setState({ user: res.data }));
  }

  render() {
    const { user } = this.state;

    return (
      <CardContainer>
        <Card>
          <CardDetails>
            <CardContent style={{ padding: 20 }}>
              <Typography variant="h4">{user.name}</Typography>
              <Typography gutterBottom variant="subtitle1" color="textSecondary">{user.email}</Typography>
            </CardContent>
          </CardDetails>
        </Card>
      </CardContainer>
    );
  }
}
