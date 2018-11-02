import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { statuses } from '../../../constants';
import { getStatusDisplayName } from '../../utility';

class ActivityReason extends React.Component {
    state = {
        reason: ''
    };

    render() {
        const { show = false, onSubmit } = this.props;

        return (
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Enter a reason for this change</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <textarea style={{ width: '100%' }} value={this.state.reason} onChange={e => this.setState({reason: e.target.value})} rows="5" />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onSubmit(this.state.reason)} bsStyle="primary">Submit</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ActivityReason;