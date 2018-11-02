import React from 'react';
import { Chart, ChartDetail } from '../Chart';

class ProjectTimeline extends React.Component {

    render() {
        const { chartData } = this.props;

        return (
            <div style={{ marginTop: '50px' }}>
                <Chart months={chartData.months} staticMode={true} >
                    <ChartDetail months={chartData.months} project={chartData.project} inhibitProjectName={true} columns={chartData.months.length + 1} />
                </Chart>
            </div>
        );
    }
}

export default ProjectTimeline;