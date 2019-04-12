import { connect } from 'react-redux';
import User from './user';
import { getCurrentUserId } from '../../../api';
import { getFilesForUser, gotFiles } from '../../../files';

const mapStateToProps = (state, { match }) => ({
  currentUserId: getCurrentUserId(state),
  files: getFilesForUser(state, { userId: match.params.userId })
});

export default connect(mapStateToProps, { gotFiles })(User);
