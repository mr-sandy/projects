import React from 'react';
import { ProjectHeader } from './ProjectHeader';
import { Phase } from './Phase';

export class ChartDetail extends React.Component {
    render() {
        const { project, inhibitHeader = false  } = this.props;
        return (
            <React.Fragment>
                {!inhibitHeader && <ProjectHeader {...this.props} />}
                {project.phases.map((phase, iPhase) => (
                    <Phase key={iPhase} phase={phase} />
                ))}
            </React.Fragment>
        );
    }
}
