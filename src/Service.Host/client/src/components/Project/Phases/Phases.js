import React from 'react';
import { Table, Button, Glyphicon, Modal } from 'react-bootstrap';
import PhaseEditor from './PhaseEditor';
import PhaseDetails from './PhaseDetails';
import { statuses } from '../../../constants';
import { sortPhases, getLastPhase, initNewPhase } from './utility';

const ConfirmRemovePhase = ({ show, phase, onConfirm, onCancel }) => (
    <Modal show={show}>
        <Modal.Body>
            <h3>Delete Phase {phase.phaseNumber}?</h3>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => onCancel()}>Cancel</Button>
            <Button bsStyle="danger" onClick={() => onConfirm(phase.phaseNumber)}>Delete Phase</Button>
        </Modal.Footer>
    </Modal>
);

class Phases extends React.Component {
    state = {
        adding: false,
        editing: false,
        removing: false
    };

    render() {
        const { project, canEdit } = this.props;
        const { editing, adding } = this.state;
        const lastPhase = getLastPhase(project);

        return (
            <div style={{ marginTop: '50px' }}>
                <Table hover>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Due</th>
                            <th>Status</th>
                            {canEdit && <th></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {project.phases.sort(sortPhases).map(phase =>
                            editing && this.state.phaseNumber === phase.phaseNumber
                                ? (
                                    <PhaseEditor
                                        key={phase.phaseNumber}
                                        phase={phase}
                                        onCancel={() => this.setState({ editing: false })}
                                        onChange={(status, endDate) => this.handleChange(status, endDate)} />
                                )
                                : (
                                    <PhaseDetails
                                        key={phase.phaseNumber}
                                        phase={phase}
                                        canEdit={canEdit && !adding && !editing}
                                        canRemove={canEdit && !adding && !editing && phase === lastPhase}
                                        onRemove={() => this.setState({ removing: true })}
                                        onEdit={() => this.setState({ editing: true, phaseNumber: phase.phaseNumber })}
                                    />
                                )
                        )}
                        {adding && (
                            <PhaseEditor
                                key="new-phase"
                                adding={true}
                                phase={initNewPhase(project)}
                                onCancel={() => this.setState({ adding: false })}
                                onChange={(status, endDate) => this.handleAdd(status, endDate)} />
                        )}
                    </tbody>
                </Table>

                {canEdit &&
                    <Button
                        bsStyle="success"
                        className="muted"
                        disabled={adding || editing}
                        onClick={() => this.setState({ adding: true })}>
                        <Glyphicon glyph="plus" /> Add Phase
                    </Button>}

                {canEdit && lastPhase &&
                    <ConfirmRemovePhase
                        show={this.state.removing}
                        phase={lastPhase}
                        onCancel={() => this.setState({ removing: false })}
                        onConfirm={phaseNumber => this.handleRemove(phaseNumber)} />}
            </div>
        );
    }

    handleAdd(status, endDate) {
        const { addPhase, project } = this.props;

        const phaseNumber = project.phases.length;

        this.setState({ adding: false });

        addPhase(project.id, phaseNumber, status, endDate);
    }

    handleRemove(phaseNumber) {
        const { removePhase, project } = this.props;

        this.setState({ removing: false })

        removePhase(project.id, phaseNumber);
    }

    handleChange(status, endDate) {
        const { updatePhase, project } = this.props;
        const { phaseNumber } = this.state;

        this.setState({ editing: false });

        updatePhase(project.id, phaseNumber, status, endDate);
    }
}

export default Phases;