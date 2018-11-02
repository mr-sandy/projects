import React from 'react';
import { Button, Panel, FormGroup, ControlLabel } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const styles = {
    outer: {
        paddingTop: '20px'
    },
    name: {
        width: 'auto',
        fontSize: '36px',
        padding: '30px 20px'
    },
    startDateRow: {
        marginTop: '20px'
    },
    save: {
        marginLeft: '10px', float: 'right'
    },
    cancel: {
        float: 'right'
    }
};

class ProjectDetailsEditor extends React.Component {
    state = {
        name: this.props.project.name,
        startDate: moment(this.props.project.startDate)
    }

    render() {
        return (
            <form style={styles.outer} onSubmit={e => this.handleSubmit(e)}>
                <Panel>
                    <Panel.Body>
                        <input id="name" ref={node => this.input = node} style={styles.name} type="text" className="form-control" placeholder="Enter project name" value={this.state.name} onChange={e => this.handleNameChange(e)} />
                        <div style={styles.startDateRow}>
                            <FormGroup>
                                <ControlLabel>Project start</ControlLabel>
                                <DatePicker id="startDate" dateFormat="DD/MM/YYYY" selected={this.state.startDate} onChange={date => this.handleStartDateChange(date)} />
                            </FormGroup>
                        </div>
                    </Panel.Body>
                    <Panel.Footer>
                        <Button style={styles.save} bsStyle="primary" type="submit">Save</Button>
                        <Button style={styles.cancel} onClick={() => this.handleCancelClick()}>Cancel</Button>
                        <div className="clearfix"></div>
                    </Panel.Footer>
                </Panel>;
            </form>
        );
    }

    componentDidMount() {
        this.input.focus();
        this.input.select();
    }

    handleNameChange(e) {
        this.setState({ name: e.target.value });
    }

    handleStartDateChange(date) {
        this.setState({ startDate: date });
    }

    handleCancelClick() {
        this.props.onCancel();
    }

    handleSubmit(e) {
        e.preventDefault();

        const { onChange } = this.props;
        const { name, startDate } = this.state;

        if (name && startDate) {
            onChange(name, startDate);
        }
    }
}

export default ProjectDetailsEditor;