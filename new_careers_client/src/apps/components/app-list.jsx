import React, { Fragment } from 'react';
import styled from '@emotion/styled/macro';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppRow from './app-row';

const EmptyText = styled.p`
  padding: 0 1rem;
`;

export default function AppList({
  apps, isEdit, history, emptyText, showUsers
}) {
  return (
    <Fragment>
      <Table>
        <TableHead>
          <TableRow>
            {showUsers && <TableCell>Applicant</TableCell>}
            <TableCell>Job Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Application Status</TableCell>
            {isEdit && <TableCell />}
          </TableRow>
        </TableHead>
        <TableBody>
          {apps && Boolean(apps.length) && apps.map(app => (
            <AppRow key={app.id} app={app} history={history} isEdit={isEdit} showUser={showUsers} />
          ))}
        </TableBody>
      </Table>
      {(!apps || !apps.length) && (
        <EmptyText>{emptyText || 'Apply to some jobs to see applications here.'}</EmptyText>
      )}
    </Fragment>
  );
}
