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
    const { jobs } = this.props;
    if (!(jobs && jobs.length)) {
      this.searchJobs({});
    }
  }

  searchJobs(params) {
    const { gotJobSearchResults } = this.props;
    return api
      .searchJobs(params)
      .then(gotJobSearchResults);
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
                {job.maps_url && (
                  <TableCell>
                    <a target="_blank" rel="noopener noreferrer" href={job.maps_url}>
                      &#x2924; {job.location}
                    </a>
                  </TableCell>
                )}
                {!job.maps_url && <TableCell>{job.location}</TableCell>}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {jobs && !jobs.length && 'No jobs found for this search'}
      </Container>
    );
  }
}
