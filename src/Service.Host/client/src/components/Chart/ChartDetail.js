import React from 'react';
import Timeline from './Timeline';
import { Link } from 'react-router-dom'

const styles = {
    name: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 'larger',
        paddingRight: '5px'
    }
};

export class ChartDetail extends React.Component {
    render() {
        const { months, project, columns, inhibitProjectName = false } = this.props;
        return (
            <tr>
                {!inhibitProjectName && <td><Link to={`/projects/${project.id}`} style={styles.name} >{project.name}</Link></td>}
                <td colSpan={columns}>
                    <Timeline months={months} project={project} />
                </td>
                {!inhibitProjectName && <td></td>}
            </tr>
        );
    }
}
