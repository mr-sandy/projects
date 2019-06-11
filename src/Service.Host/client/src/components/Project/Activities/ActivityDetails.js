import React from 'react';
import { Button, ListGroup, ListGroupItem, Badge, Table } from 'react-bootstrap';
import { getActivityDetails } from './utility';

const styles = {
    outer: {
         margin: '20px 0 15px 20px'
    },
    key: {
         paddingRight: '20px'
    },
    previousValue: {
        textDecoration: 'line-through',
        color: '#aaa'
    }
};

class ActivityDetails extends React.Component {
    render() {
        const { activity } = this.props;
        const details = getActivityDetails(activity);

        return details.length > 0
            ? (
                <table style={styles.outer}>
                    <tbody>
                        {details.map(detail => (
                            <tr key={detail.key}>
                                <td style={styles.key}>{detail.key}:</td>
                                <td>
                                    {detail.previousValue && detail.previousValue !== detail.value &&
                                        <React.Fragment>
                                            <span style={styles.previousValue}>{detail.previousValue}</span> &#x21FE;&nbsp;
                                        </React.Fragment>
                                    }
                                    <span>{detail.value}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )
            : (
                <div style={styles.outer}>
                    <em>No further details</em>
                </div>
            );
    }
}

export default ActivityDetails;