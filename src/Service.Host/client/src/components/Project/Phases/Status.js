import React from 'react';
import { statuses } from '../../../constants';
import { statusColours, getStatusDisplayName } from '../../utility';

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

class Status extends React.Component {
    render() {
        const { status } = this.props;

        return (
            <span style={style(status)}>{getStatusDisplayName(status)}</span>
        );
    }
}

export default Status;