import React, { PureComponent, Fragment } from 'react';
import styled from '@emotion/styled/macro';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Loading from '../../../common/components/loading';
import api from '../../../api';

const EmptyText = styled.p`
  padding: 0 1rem;
`;

const Container = styled.div`
  position: relative;
`;

const DivCell = styled(TableCell)`
  color: rgba(0,0,0,0.4);
`;

export default class UserFiles extends PureComponent {
  componentDidMount() {
    const { userId, gotFiles } = this.props;
    if (userId) api.listFilesForUser(userId).then(gotFiles);
    else api.listMyFiles().then(gotFiles);
  }

  togglePublic(file) {
    const { gotFile } = this.props;
    const attrs = {
      public: !file.public
    };
    api.updateFile(file.id, attrs).then(gotFile);
  }

  deleteFile(file) {
    const { deletedFile } = this.props;
    api.deleteFile(file.id).then(() => deletedFile(file));
  }

  render() {
    const {
      currentUserId, userId, files, emptyText, viewOnly
    } = this.props;
    const allowEdit = !userId || currentUserId === userId;
    const publicFiles = files && files.filter(f => f.public);
    const privateFiles = files && files.filter(f => !f.public);
    const getDeleteButton = file => <Button onClick={() => this.deleteFile(file)}>Delete</Button>;

    return (
      <Container>
        <Table>
          {publicFiles && !!publicFiles.length && (
            <Fragment>
              {!viewOnly && allowEdit && (
                <TableBody>
                  <TableRow>
                    <DivCell>Shown On Profile</DivCell>
                    <TableCell />
                  </TableRow>
                </TableBody>
              )}
              <TableBody>
                {publicFiles && publicFiles.map(file => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <a target="_blank" rel="noopener noreferrer" href={file.upload}>
                        {file.name}
                      </a>
                    </TableCell>
                    {allowEdit && (
                    <TableCell>
                      <Button onClick={() => this.togglePublic(file)}>Hide</Button>
                      {getDeleteButton(file)}
                    </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Fragment>
          )}
          {!viewOnly && allowEdit && privateFiles && !!privateFiles.length && (
            <Fragment>
              <TableBody>
                <TableRow>
                  <DivCell>Private Files</DivCell>
                  <TableCell />
                </TableRow>
              </TableBody>
              <TableBody>
                {privateFiles && privateFiles.map(file => (
                  <TableRow key={file.id}>
                    <TableCell>
                      <a target="_blank" rel="noopener noreferrer" href={file.upload}>
                        {file.name}
                      </a>
                    </TableCell>
                    {allowEdit && (
                    <TableCell>
                      <Button onClick={() => this.togglePublic(file)}>Show</Button>
                      {getDeleteButton(file)}
                    </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Fragment>
          )}
        </Table>
        {(!files || !files.length) && (
          <EmptyText>{emptyText || 'No files yet'}</EmptyText>
        )}
      </Container>
    );
  }
}
