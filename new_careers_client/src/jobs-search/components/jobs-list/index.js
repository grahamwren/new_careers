import { connect } from 'react-redux';
import JobsList from './jobs-list';
import { gotJobSearchResults } from '../../actions';
import { getJobSearchData } from '../../selectors';

const mapStateToProps = state => ({
  jobs: getJobSearchData(state)
});

export default connect(mapStateToProps, { gotJobSearchResults })(JobsList);
