import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import keyBy from 'lodash/keyBy';
import JobSearchForm from '../job-search-form';
import JobActions from '../job-actions';
import api from '../../../api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export default class JobsList extends PureComponent {
  componentDidMount() {
    const { currentUserId, gotApps } = this.props;
    api.getAppsForUser(currentUserId).then(gotApps);
    this.searchJobs({});
  }

  searchJobs(params) {
    const { gotJobSearchResults } = this.props;
    return api
      .searchJobs(params)
      .then(gotJobSearchResults);
  }

  render() {
    const {
      jobs, apps, currentUserId, history
    } = this.props;
    const appsByJob = keyBy(apps, 'jobId');
    const getHandleClick = job => () => history.push(`/jobs/${job.id}`);
    return (
      <Container>
        <JobSearchForm onSubmit={p => this.searchJobs(p)} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs && jobs.map(job => (
              <TableRow key={job.id} style={{ cursor: 'pointer' }}>
                <TableCell onClick={getHandleClick(job)}>{job.title}</TableCell>
                <TableCell onClick={getHandleClick(job)}>{job.company}</TableCell>
                {job.mapsUrl && (
                  <TableCell>
                    <a target="_blank" rel="noopener noreferrer" href={job.mapsUrl}>
                      &#x2924; {job.location}
                    </a>
                  </TableCell>
                )}
                {!job.mapsUrl && (
                  <TableCell onClick={getHandleClick(job)}>
                    {job.location}
                  </TableCell>
                )}
                <TableCell>
                  <JobActions
                    app={appsByJob[job.id]}
                    job={job}
                    isEdit={job.contactId === Number(currentUserId)}
                    history={history}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {jobs && !jobs.length && 'No jobs found for this search'}
      </Container>
    );
  }
}
