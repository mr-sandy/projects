import { connect } from 'react-redux';
import initialiseOnMount from './common/initialiseOnMount';
import Dashboard from '../components/Dashboard';
import { getSummaryChart } from '../selectors/charts';
import { viewEarlierDashboard, viewLaterDashboard, zoomIn, zoomOut } from '../actions/application';
import { fetchProjects } from '../actions/project';

const mapStateToProps = state => ({
    chartData: getSummaryChart(state)
});

const initialise = () => dispatch => {
    dispatch(fetchProjects());
};

const mapDispatchToProps = {
    initialise,
    viewEarlierDashboard,
    viewLaterDashboard,
    zoomIn,
    zoomOut
};

export default connect(mapStateToProps, mapDispatchToProps)(initialiseOnMount(Dashboard));