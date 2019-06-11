import React from 'react';
import { Button, Modal, Panel } from 'react-bootstrap';
import { Trash } from '../common/svg';

class DangerZone extends React.Component {
    state = {
        showConfirmation: false
    };

    render() {
        const { canEdit, project } = this.props;
        const warning = `Delete the project '${project.name}'?`;

        return canEdit && (
            <div style={{ marginTop: '100px' }}>
                <h3>Danger Zone</h3>
                <Panel>
                    <Panel.Body>
                        <Button
                            bsStyle="danger"
                            className="muted"
                            onClick={() => this.handleDeleteClick()}>
                            <Trash /> Delete Project
                        </Button>
                    </Panel.Body>
                </Panel>

                <Modal show={this.state.showConfirmation}>
                    <Modal.Body>
                        <h3>{warning}</h3>
                        <strong>This action cannot be undone.</strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => this.handleCancelClick()}>Cancel</Button>
                        <Button bsStyle="danger" onClick={() => this.handleConfirmClick()}>Delete Project</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

    handleDeleteClick() {
        this.setState({ showConfirmation: true });
    }

    handleCancelClick() {
        this.setState({ showConfirmation: false });
    }

    handleConfirmClick() {
        const { deleteProject, project } = this.props;

        this.setState({ showConfirmation: false });

        deleteProject(project.id);
    }
}

export default DangerZone;