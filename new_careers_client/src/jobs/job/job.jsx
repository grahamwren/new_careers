import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { CardContainer, AppListCard } from '../theme';
import api from '../../api';
import { AppList } from '../../apps/components';

export default class Job extends React.PureComponent {
  componentDidMount() {
    const { jobId, gotJob, gotApps } = this.props;
    api.getJob(jobId).then(gotJob);
    api.getAppsForJob(jobId).then(gotApps);
  }

  render() {
    const {
      history, apps, job, currentUserId
    } = this.props;
    const allowEdit = job && job.contactId === Number(currentUserId);
    return (
      <CardContainer>
        {allowEdit && (
          <CardActions>
            <Button size="small" onClick={() => history.push(`/jobs/${job.id}/edit`)}>Edit</Button>
          </CardActions>
        )}
        <Card>
          {job && (
            <CardContent style={{ padding: 20 }}>
              <Typography gutterBottom variant="subtitle1" color="textSecondary">{job.company}</Typography>
              <Typography variant="h4">{job.title}</Typography>
              <Typography gutterBottom variant="subtitle1" color="textSecondary">{job.location}</Typography>
              <Typography gutterBottom variant="subtitle2">{job.salary_type}: {job.salary}</Typography>
              <Typography variant="body1">{job.description}</Typography>
            </CardContent>
          )}
        </Card>
        <AppListCard>
          <Card>
            {allowEdit && (
              <AppList
                apps={apps}
                isEdit={job.contactId === Number(currentUserId)}
                history={history}
              />
            )}
          </Card>
        </AppListCard>
      </CardContainer>
    );
  }
}
