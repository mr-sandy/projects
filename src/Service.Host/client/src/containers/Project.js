import { connect } from 'react-redux';
import Project from '../components/Project';
import { getProject } from '../selectors/projects';
import { getProjectChart } from '../selectors/charts';

const mapStateToProps = (state, {match}) => ({
    project:  getProject(state, match.params.projectId),
    chartData: getProjectChart(state, match.params.projectId)
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);