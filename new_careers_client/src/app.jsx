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
          <Route exact path="/register" component={Register}/>
          <Route path="/jobs" exact component={JobsSearch} />
          <Route path="/jobs/:jobId" exact component={Job}/>
          <Route path="/jobs/:jobId/edit" exact component={JobEdit}/>
        </Fragment>
      </Router>
    </MuiThemeProvider>
  </Provider>
);
