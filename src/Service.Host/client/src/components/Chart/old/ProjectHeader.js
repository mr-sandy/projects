import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';

const styles = {
    row: {
        padding: '10px 0'
    },
    header: {
        padding: '20px 10px 10px 10px',
        fontWeight: 'bold',
        borderBottom: '1px solid #ccc',
        fontSize: '18px'
    }
};

export class ProjectHeader extends React.Component {
    render() {
        const { project, columns } = this.props;
        return (
            <tr style={styles.row}>
                <td style={styles.header} colSpan={columns}>
                    {project.name}
                    <LinkContainer style={{ marginLeft: '10px' }} to={`/projects/${project.id}`}>
                        <a className="btn btn-default btn-xs">details</a>
                    </LinkContainer >
                </td>
            </tr>
        );
    }
}
