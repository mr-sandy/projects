import React from 'react';
import { Table, Button } from 'react-bootstrap';
import Status from './Status';
import moment from 'moment';
import { Cross } from '../../common/svg';

const styles = {
    row: canEdit => ({
        cursor: canEdit ? 'pointer' : 'default'
    }),
    cell: {
        width: '25%',
        verticalAlign: 'middle'
    }
};

class PhaseDetails extends React.Component {
    render() {
        const { phase, canEdit, canRemove } = this.props;

        return (
            <tr key={phase.phaseNumber} style={styles.row(canEdit)} onClick={() => this.handleClick()}>
                <th style={styles.cell} scope="row">
                    Phase {phase.phaseNumber}
                </th>
                <td style={styles.cell}>
                    {moment(phase.endDate).format('Do MMM YYYY')}
                </td>
                <td style={styles.cell}>
                    <Status status={phase.status} />
                </td>
                <td style={{ ...styles.cell, textAlign: 'right' }}>
                    {canRemove &&
                        <Button bsStyle="danger" className="muted" bsSize="xsmall" onClick={e => this.handleRemoveClick(e)}><Cross /></Button>
                    }
                </td>
            </tr>
        );
    }

    handleClick() {
        const { onEdit, canEdit } = this.props;

        if (canEdit) {
            onEdit();
        }
    }

    handleRemoveClick(e) {
        e.stopPropagation();

        this.props.onRemove();
    }
}

export default PhaseDetails;