import React, { Fragment } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route as RawRoute } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import createStore from './store';
import { Main } from './common/layouts';
import Home from './common/components/home';
import Logout from './common/components/logout';
import Login from './login';
import Register from './register';
import JobsSearch from './jobs-search/components/jobs-list';
import Job from './jobs/job';
import JobEdit from './jobs/job-edit';
import api from './api';
import User from './users/components/user';
import UserEdit from './users/components/user-edit';
import NewJob from './jobs/new-job';
import FileUpload from './file-upload/components/file-upload';

window.api = api;

function Route({ component: Component, ...props }) {
  const component = cProps => (
    <Main {...cProps}>
      <Component {...cProps} />
    </Main>
  );
  return <RawRoute component={component} {...props} />;
}

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#F11'
    },
    secondary: {
      main: '#FFF'
    }
  }
});

export default () => (
  <Provider store={createStore()}>
    <MuiThemeProvider theme={muiTheme}>
      <Router>
        <Fragment>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/register" component={Register} />
          <Route path="/jobs" exact component={JobsSearch} />
          <Route path="/job" exact component={NewJob} />
          <Route path="/jobs/:jobId" exact component={Job} />
          <Route path="/jobs/:jobId/edit" exact component={JobEdit} />
          <Route path="/users/:userId" exact component={User} />
          <Route path="/users/:userId/edit" exact component={UserEdit} />
          <Route path="/upload-files" exact component={FileUpload} />
        </Fragment>
      </Router>
    </MuiThemeProvider>
  </Provider>
);
