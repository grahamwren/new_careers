import React, { PureComponent } from 'react';
import { CardContainer } from './theme';
import JobEditForm from './job-edit-form';
import api from '../api';

export default class JobEdit extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { job: {} };
  }

  componentDidMount() {
    const { jobId } = this.props.match.params;
    api.getJob(jobId).then(res => this.setState({ job: res.data }));
  }

  editJob({
    id, company, title, location, salary_type, salary, description
  }) {
    const { history } = this.props;
    const cb = () => history.push(`/jobs/${id}`);
    const job = {
      company,
      title,
      location,
      salary_type,
      salary,
      description
    };
    api.updateJob(id, job).then(cb, (error) => {
      console.log(error);
    });
  }

  render() {
    const { job } = this.state;

    return (
      <CardContainer>
        <JobEditForm onSubmit={data => this.editJob(data)} initialValues={job} />
      </CardContainer>
    );
  }
}
