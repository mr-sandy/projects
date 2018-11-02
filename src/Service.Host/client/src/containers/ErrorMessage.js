import { connect } from 'react-redux';
import ErrorMessage from '../components/ErrorMessage';

const mapStateToProps = (state) => ({
    error: state.application.error,
    onRestart: () => window.location.reload()
});

export default connect(mapStateToProps)(ErrorMessage);