import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class NewProject extends React.Component {
    state = {
        projectName: '',
        startDate: moment(),
        phases: 5
    };

    render() {
        return (
            <Grid fluid={false}>
                <Row>
                    <Col xs={6}>
                        <h1>New Project</h1>
                        <form style={{ paddingTop: '20px' }} onSubmit={e => this.handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="projectName">Project Name</label>
                                <input id="projectName" ref={node => this.input = node} type="text" className="form-control" placeholder="Enter project name" value={this.state.projectName} onChange={e => this.handleProjectNameChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phases">Number of Phases</label>
                                <input id="phases" type="number" className="form-control" value={this.state.phases} onChange={e => this.handlePhasesChange(e)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="startDate">Start Date</label>
                                <DatePicker id="startDate" dateFormat="Do MMM YYYY" selected={this.state.startDate} onChange={date => this.handleStartDateChange(date) }
                                />
                            </div>
                            <Button style={{ marginTop: '20px' }} bsStyle="primary" type="submit">Ok</Button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }

    handleProjectNameChange(event) {
        this.setState({ projectName: event.target.value });
    }

    handlePhasesChange(event) {
        this.setState({ phases: event.target.value });
    }

    handleStartDateChange(date) {
        this.setState({ startDate: date });
    }

    componentDidMount() {
        this.input.focus();
    }

    handleSubmit(e) {
        e.preventDefault();
        const { createProject, history } = this.props;

        const { projectName, phases, startDate } = this.state;

        if (projectName && phases && createProject) {
            createProject(projectName, phases, startDate, history);
        }
    }
}

export default NewProject;