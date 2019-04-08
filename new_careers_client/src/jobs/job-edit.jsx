import React, { PureComponent } from 'react';
import { SubmissionError } from 'redux-form';
import { EditContainer } from './theme';
import JobEditForm from './job-edit-form';
import api from '../api';

export default class JobEdit extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { job: {} }
  }

  componentDidMount() {
    const jobId = this.props.match.params.jobId;
    api.getJob(jobId).then(res => this.setState({ job: res.data }));
  }

  editJob({ id, company, title, location, salary_type, salary, description }) {
    const { history } = this.props;
    const cb = d => history.push('/jobs/' + id);
    const job = {
      company: company,
      title: title,
      location: location,
      salary_type: salary_type,
      salary: salary,
      description: description
    }
    api.updateJob(id, job).then(cb, (error) => {
      console.log(error);
    })
  }
  render () {
    const { job } = this.state;

    return (
      <EditContainer>
        <JobEditForm onSubmit={data => this.editJob(data)} job={job}/>
      </EditContainer>
    )
  }
}