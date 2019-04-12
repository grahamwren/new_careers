import React from 'react';
import Markdown from 'react-markdown';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import { CardContainer, Container, Header } from '../theme';
import api from '../../../api';
import UserFiles from '../../../files/components/user-files';

export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentDidMount() {
    const { match: { params: { userId } }, gotFiles } = this.props;
    api.getUser(userId).then(res => this.setState({ user: res.data }));
    api.listFilesForUser(userId).then(gotFiles);
  }

  render() {
    const { user } = this.state;
    const { history, currentUserId, files } = this.props;
    const name = user.name || user.email;
    const allowEdit = user && user.id === Number(currentUserId);
    return (
      <CardContainer>
        {allowEdit && (
          <CardActions>
            <Button size="small" onClick={() => history.push(`/users/${user.id}/edit`)}>Edit</Button>
            <Button size="small" onClick={() => history.push('/my-files')}>My Files</Button>
          </CardActions>
        )}
        <Container>
          <Card hidden={!(files && files.length)}>
            {name && <Header>{`${name}'s Files`}</Header>}
            <UserFiles userId={user.id} viewOnly />
          </Card>
          <Card>
            <CardContent style={{ padding: 20 }}>
              <Typography variant="h4">{user.name}</Typography>
              <Typography gutterBottom variant="subtitle1" color="textSecondary">{user.email}</Typography>
              <Markdown source={user.cover_letter} />
            </CardContent>
          </Card>
        </Container>
      </CardContainer>
    );
  }
}
