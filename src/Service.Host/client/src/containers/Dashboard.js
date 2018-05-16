import { connect } from 'react-redux';
import Dashboard from '../components/Dashboard';
import { getSummaryChart } from '../selectors/charts';
import { viewEarlierDashboard, viewLaterDashboard, zoomIn, zoomOut } from '../actions/application';

const mapStateToProps = state => ({
    chartData: getSummaryChart(state)
});

const mapDispatchToProps = {
    viewEarlierDashboard,
    viewLaterDashboard,
    zoomIn,
    zoomOut
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);