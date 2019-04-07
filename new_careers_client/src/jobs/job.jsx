import React from 'react';
import api from '../api';
import {CardContainer, CardDetails} from './theme';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default class Job extends React.Component {
  constructor(props) {
    super(props);

    this.state = { job: {} }
  }

  componentDidMount() {
    const { jobId }  = this.props.match.params;
    api.getJob(jobId).then((res) => this.setState({job : res.data}));
  }

  render() {
    const { job } = this.state;
    return (
      <CardContainer>
        <Card>
          <CardDetails>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">{job.title}</Typography>
            </CardContent>
          </CardDetails>
        </Card>
      </CardContainer>
    );
  }
}