import { connect } from 'react-redux';
import initialiseOnMount from './common/initialiseOnMount';
import Dashboard from '../components/Dashboard';
import { getProjectsLoading } from '../selectors/projects';
import { getSummaryChart } from '../selectors/charts';
import { getUserCanEdit } from '../selectors/user';
import { viewEarlierDashboard, viewLaterDashboard, zoomIn, zoomOut } from '../actions/application';
import { fetchProjectsIfRequired } from '../actions/project';

const mapStateToProps = state => ({
    loading: getProjectsLoading(state),
    chartData: getSummaryChart(state),
    canEdit: getUserCanEdit(state)
});

const initialise = () => dispatch => {
    dispatch(fetchProjectsIfRequired());
};

const mapDispatchToProps = {
    initialise,
    viewEarlierDashboard,
    viewLaterDashboard,
    zoomIn,
    zoomOut
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(Dashboard));