import React from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

class NewProject extends React.Component {
    render() {
        return (
            <Grid fluid={false}>
                <Row>
                    <Col xs={6}>
                        <h1>New Project</h1>
                        <form style={{ paddingTop: '20px' }} onSubmit={e => this.handleSubmit(e)}>
                            <div className="form-group">
                                <label htmlFor="projectName">Project Name</label>
                                <input ref={node => this.input = node} type="text" className="form-control" placeholder="Enter project name" />
                                <Button style={{ marginTop: '20px' }} bsStyle="primary" type="submit">Ok</Button>
                            </div>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }

    componentDidMount() {
        this.input.focus();
    }

    handleSubmit(e) {
        e.preventDefault();
        const { createProject, history } = this.props;

        const projectName = this.input.value.trim();

        if (projectName && createProject) {
            createProject(projectName, history);
        }
    }
}

export default NewProject;