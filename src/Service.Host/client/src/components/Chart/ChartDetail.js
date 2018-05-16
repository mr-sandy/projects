import React from 'react';
import ProjectTimeline from './ProjectTimeline';
import { Link } from 'react-router-dom'

export class ChartDetail extends React.Component {
    render() {
        const { months, project, columns, inhibitProjectName = false } = this.props;
        return (
            <tr>
                {!inhibitProjectName && <td><Link to={`/projects/${project.id}`} style={{ color: '#333', fontWeight: 'bold', fontSize: 'larger' }} >{project.name}</Link></td>}
                <td colSpan={columns}>
                    <ProjectTimeline months={months} project={project} />
                </td>
            {!inhibitProjectName && <td></td> }
            </tr>
        );
    }
}
