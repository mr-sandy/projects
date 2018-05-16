import React from 'react';
import {statusColour} from '../utility';

const getBackgroundImage = (start, end, status) => {
    if (start === null) {
        return 'none';
    }

    const colour = statusColour(status);

    return `linear-gradient(to right, transparent ${start * 100}%, ${colour} ${start * 100}%, ${colour} ${end * 100}%, transparent ${end * 100}%)`;
};

const styles = {
    body: {
        label: {
            padding: '6px 15px',
            textAlign: 'right'
        },
        cell: ({ month, start, end, status }) => ({
            borderBottom: '1px solid #ddd',
            backgroundColor: month % 2 === 0 ? '#f7f7f7' : '#fcfcfc',
            backgroundImage: getBackgroundImage(start, end, status)
        })
    }
};

export class Phase extends React.Component {
    render() {
        const { phase } = this.props;
        return (
            <tr>
                <td style={styles.body.label}>Phase {phase.phase}</td>
                {phase.months.map((month, imonth) => (
                    <td key={imonth} style={styles.body.cell({ ...month, status: phase.status })}></td>
                ))}
            </tr>
        );
    }
}
