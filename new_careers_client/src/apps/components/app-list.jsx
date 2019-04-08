import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppRow from './app-row';

export default function AppList({ apps, history }) {
  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Job Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Application Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Boolean(apps.length)
            && apps.map(app => <AppRow key={app.id} app={app} history={history} />)}
        </TableBody>
      </Table>
      {!apps.length && (
        <p>Apply to some jobs to see applications here.</p>
      )}
    </Fragment>
  );
}
