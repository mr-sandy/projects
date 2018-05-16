import { connect } from 'react-redux';
import NewProject from '../components/NewProject';
import { createProject } from '../actions/project';
import { withRouter } from 'react-router-dom';

const mapStateToProps = () => ({
});

const mapDispatchToProps = {
    createProject
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(NewProject));