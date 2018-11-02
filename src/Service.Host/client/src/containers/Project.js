import { connect } from 'react-redux';
import initialiseOnMount from './common/initialiseOnMount';
import Project from '../components/Project';
import { getProjectWithActivitiesLoading, getProjectWithActivitiesUpdating, getProjectWithActivities } from '../selectors/projectWithActivities';
import { getUserCanEdit } from '../selectors/user';
import { getProjectChart } from '../selectors/charts';
import { fetchProjectsIfRequired, fetchProjectActivities, addPhase, updateProject, updatePhase, removePhase, deleteProject } from '../actions/project';

const mapStateToProps = (state, { match }) => ({
    projectId: parseInt(match.params.projectId),
    loading: getProjectWithActivitiesLoading(state, parseInt(match.params.projectId)),
    updating: getProjectWithActivitiesUpdating(state, parseInt(match.params.projectId)),
    project: getProjectWithActivities(state, parseInt(match.params.projectId)),
    chartData: getProjectChart(state, match.params.projectId),
    canEdit: getUserCanEdit(state)
});

const initialise = ({ projectId }) => dispatch => {
    dispatch(fetchProjectsIfRequired());
    dispatch(fetchProjectActivities(projectId));
};

const mapDispatchToProps = {
    initialise,
    addPhase,
    updateProject,
    updatePhase,
    removePhase,
    deleteProject
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(Project));