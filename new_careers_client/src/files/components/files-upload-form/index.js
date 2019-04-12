import { connect } from 'react-redux';
import { gotFile } from '../../actions';
import FileUploadForm from './file-upload-form';

export default connect(undefined, { gotFile })(FileUploadForm);
