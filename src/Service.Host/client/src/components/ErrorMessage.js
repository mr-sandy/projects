import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

class ErrorMessage extends React.Component {
    render() {
        const { error, onRestart } = this.props;

        return (
            <Modal show={error.inError}>
                <Modal.Header>
                    <Modal.Title>An error has occurred</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Alert bsStyle="warning">
                        <h4>{error.message}</h4>
                        {error.details}
                    </Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onRestart()} bsStyle="primary">Reload page</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ErrorMessage;
