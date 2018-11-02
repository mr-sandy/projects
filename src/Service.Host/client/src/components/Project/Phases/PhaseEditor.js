import React from 'react';
import { Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { statuses } from '../../../constants';
import { getStatusDisplayName } from '../../utility';

const styles = {
    outer: {
        backgroundColor: '#f5f5f5',
        border: '1px solid #ddd'
    },
    cell: {
        width: '25%',
        verticalAlign: 'middle'
    },
    save: {
        marginLeft: '10px',
        float: 'right'
    },
    cancel: {
        float: 'right'
    }
};

class PhaseEditor extends React.Component {
    state = {
        status: this.props.phase.status,
        endDate: moment(this.props.phase.endDate)
    }

    render() {
        const { phase, adding = false } = this.props;

        return (
            <tr style={styles.outer}>
                <th style={styles.cell} scope="row">
                    {!adding && `Phase ${phase.phaseNumber}`}
                </th>
                <td style={styles.cell}>
                    <DatePicker
                        dateFormat="Do MMM YYYY"
                        selected={this.state.endDate}
                        onChange={date => this.handleEndDateChange(date)} />
                </td>
                <td style={styles.cell}>
                    <select className="form-control" value={this.state.status} onChange={e => this.handleStatusChange(e)} >
                        {Object.values(statuses).map(status => (
                            <option key={status} value={status}>{getStatusDisplayName(status)}</option>
                        ))}
                    </select>
                </td>
                {<td style={styles.cell}>
                    <Button style={styles.save} bsStyle={adding ? 'success' : 'primary'} onClick={() => this.handleSaveClick()}>{adding ? 'Add' : 'Save'}</Button>
                    <Button style={styles.cancel} onClick={() => this.handleCancelClick()}>Cancel</Button>
                </td>}
            </tr>
        );
    }

    handleStatusChange(e) {
        this.setState({ status: e.target.value });
    }

    handleEndDateChange(date) {
        this.setState({ endDate: date });
    }

    handleCancelClick() {
        this.props.onCancel();
    }

    handleSaveClick() {
        const { onChange } = this.props;
        const { status, endDate } = this.state;

        onChange(status, endDate);
    }
}

export default PhaseEditor;