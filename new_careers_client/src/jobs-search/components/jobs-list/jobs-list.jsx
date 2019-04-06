import React, { PureComponent } from 'react';
import styled from '@emotion/styled/macro';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import JobSearchForm from '../job-search-form';
import api from '../../../api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

export default class JobsList extends PureComponent {
  componentDidMount() {
    if (!(this.props.jobs && this.props.jobs.length)) {
      api.searchJobs({}).then(this.props.gotJobSearchResults);
    }
  }

  searchJobs(params) {
    return api
      .searchJobs(params)
      .then(this.props.gotJobSearchResults);
  }

  render() {
    const { jobs } = this.props;
    return (
      <Container>
        <JobSearchForm onSubmit={p => this.searchJobs(p)} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs && jobs.map(job => (
              <TableRow key={job.id}>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.company}</TableCell>
                <TableCell>{job.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {jobs && !jobs.length && 'No jobs found for this search'}
      </Container>
    );
  }
}
