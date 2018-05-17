import { connect } from 'react-redux';
import initialiseOnMount from './common/initialiseOnMount';
import Project from '../components/Project';
import { getProject } from '../selectors/projects';
import { getProjectChart } from '../selectors/charts';
import { fetchProject } from '../actions/project';

const mapStateToProps = (state, {match}) => ({
    projectId:  match.params.projectId,
    project:  getProject(state, match.params.projectId),
    chartData: getProjectChart(state, match.params.projectId)
});

const initialise = ({ projectId }) => dispatch => {
    dispatch(fetchProject(projectId));
};

const mapDispatchToProps = {
    initialise
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(Project));