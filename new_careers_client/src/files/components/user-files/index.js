import { connect } from 'react-redux';
import UserFiles from './user-files';
import { getCurrentUserId } from '../../../api';
import { gotFiles, gotFile, deletedFile } from '../../actions';
import { getFilesForUser } from '../../selectors';

function mapStateToProps(state, { userId }) {
  const currentUserId = getCurrentUserId(state);
  return {
    currentUserId,
    files: getFilesForUser(state, { userId: userId || currentUserId })
  };
}

export default connect(mapStateToProps, { gotFiles, gotFile, deletedFile })(UserFiles);
