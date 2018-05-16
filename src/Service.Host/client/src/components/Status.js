import React from 'react';
import { statuses } from '../constants';
import { statusColours } from './utility';

const style = status => ({
    padding: '4px 8px',
    fontWeight: 'normal',
    lineHeight: '1',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'text-top',
    borderRadius: '.25em',
    backgroundColor: statusColours[status]

});

const getDisplayName = status => {
    switch (status) {
        case statuses.PLANNED: return 'Planned';
        case statuses.IN_PROGRESS: return 'In Progress';
        case statuses.COMPLETE: return 'Complete';
        case statuses.AT_RISK: return 'At Risk';
        case statuses.LATE: return 'Late';
        default: return '';
    }
}

class Status extends React.Component {
    render() {
        const { status } = this.props;

        return (
            <span style={style(status)}>{getDisplayName(status)}</span>
        );
    }
}

export default Status;