import React from 'react';
import api from '../api';
import {CardContainer, CardDetails} from './theme';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
            <CardContent style={{padding: 20}}>
              <Typography gutterBottom variant="subtitle1" color="textSecondary">{job.company}</Typography>
              <Typography variant="h4">{job.title}</Typography>
              <Typography gutterBottom variant="subtitle1" color="textSecondary">{job.location}</Typography>
              <Typography gutterBottom variant="subtitle2">{job.salary_type}: {job.salary}</Typography>
              <Typography variant="body1">{job.description}</Typography>
            </CardContent>
          </CardDetails>
        </Card>
      </CardContainer>
    );
  }
}